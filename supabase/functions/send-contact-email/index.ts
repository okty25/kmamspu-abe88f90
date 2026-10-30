import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour per IP

// In-memory rate limit store (resets on function cold start, but provides protection during active periods)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Get client IP from request headers
function getClientIp(req: Request): string {
  // Try various headers that might contain the client IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for may contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  
  // Fallback to a default identifier if no IP is found
  return "unknown";
}

// Check if request is rate limited
function isRateLimited(clientIp: string): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
  // Clean up expired entries
  if (record && now >= record.resetTime) {
    rateLimitStore.delete(clientIp);
  }
  
  const currentRecord = rateLimitStore.get(clientIp);
  
  if (!currentRecord) {
    // First request from this IP
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }
  
  if (currentRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    const resetIn = currentRecord.resetTime - now;
    return { limited: true, remaining: 0, resetIn };
  }
  
  // Increment counter
  currentRecord.count++;
  rateLimitStore.set(clientIp, currentRecord);
  
  return { 
    limited: false, 
    remaining: MAX_REQUESTS_PER_WINDOW - currentRecord.count,
    resetIn: currentRecord.resetTime - now
  };
}

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Honeypot field for bot detection
  turnstileToken?: string; // Cloudflare Turnstile CAPTCHA token
}

// HTML escape function to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string, clientIp: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
  
  if (!secretKey || secretKey.trim() === "") {
    console.warn("TURNSTILE_SECRET_KEY not configured - skipping CAPTCHA verification");
    // If secret key is not configured, allow the request (graceful degradation)
    return { success: true };
  }
  
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: clientIp,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { success: true };
    } else {
      const errorCodes = result["error-codes"] || [];
      console.error("Turnstile verification failed:", errorCodes);
      
      // If the secret key is invalid, allow the request with warning (graceful degradation)
      if (errorCodes.includes("invalid-input-secret")) {
        console.warn("Invalid Turnstile secret key - allowing request");
        return { success: true };
      }
      
      return { success: false, error: "Pengesahan CAPTCHA gagal" };
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    // On network error, allow the request (graceful degradation)
    return { success: true };
  }
}

// Input validation function
function validateContactInput(data: ContactEmailRequest): { valid: boolean; error?: string } {
  const { name, email, subject, message, honeypot } = data;
  
  // Check honeypot field - if filled, it's likely a bot
  if (honeypot && honeypot.trim().length > 0) {
    // Return success to not alert the bot, but don't process
    return { valid: false, error: "BOT_DETECTED" };
  }
  
  // Check required fields
  if (!name || !email || !subject || !message) {
    return { valid: false, error: "Semua medan diperlukan" };
  }
  
  // Validate lengths
  if (name.length > 100) {
    return { valid: false, error: "Nama terlalu panjang (maksimum 100 aksara)" };
  }
  if (email.length > 255) {
    return { valid: false, error: "Emel terlalu panjang (maksimum 255 aksara)" };
  }
  if (subject.length > 200) {
    return { valid: false, error: "Subjek terlalu panjang (maksimum 200 aksara)" };
  }
  if (message.length > 5000) {
    return { valid: false, error: "Mesej terlalu panjang (maksimum 5000 aksara)" };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Format emel tidak sah" };
  }
  
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = getClientIp(req);
  const rateLimit = isRateLimited(clientIp);
  
  if (rateLimit.limited) {
    const retryAfter = Math.ceil(rateLimit.resetIn / 1000);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Terlalu banyak permintaan. Cuba lagi kemudian.",
        retryAfter
      }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
          ...corsHeaders 
        },
      }
    );
  }

  try {
    const requestData: ContactEmailRequest = await req.json();
    
    // Validate input on server-side
    const validation = validateContactInput(requestData);
    
    // Silent success for honeypot detection (don't alert bots)
    if (!validation.valid && validation.error === "BOT_DETECTED") {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Mesej telah dihantar berjaya"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: validation.error 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Verify Turnstile CAPTCHA token
    const { turnstileToken } = requestData;
    if (turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: turnstileResult.error || "Pengesahan CAPTCHA gagal"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }
    
    const { name, email, subject, message } = requestData;

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Store the contact submission in the database (sanitized data)
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      })
      .select()
      .single();

    if (dbError) {
      throw new Error("Failed to store contact submission");
    }

    // Send email with properly escaped HTML to prevent XSS
    const recipientEmail = Deno.env.get("CONTACT_EMAIL_TO") ?? "contact@kmamspu.my";

    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Mesej Hubungi Kami: ${escapeHtml(subject)}`,
      html: `
        <h2>Mesej Baru dari Laman Web</h2>
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Emel:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subjek:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mesej:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Mesej ini dihantar dari borang hubungi kami di laman web.</em></p>
      `,
    });

    // Update the submission to mark email as sent
    if (emailResponse.data?.id) {
      await supabase
        .from("contact_submissions")
        .update({ email_sent: true })
        .eq("id", submission.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mesej telah dihantar berjaya",
        submissionId: submission.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Ralat berlaku semasa menghantar mesej" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
