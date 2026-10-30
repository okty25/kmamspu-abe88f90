
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Cloudflare Turnstile site key (publishable - safe for client-side)
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "" // Honeypot field for bot detection - hidden from users
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { toast } = useToast();


  // Load Turnstile script
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="turnstile"]')) {
      setTurnstileLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  // Initialize Turnstile widget when loaded
  useEffect(() => {
    if (turnstileLoaded && turnstileRef.current && window.turnstile && !widgetIdRef.current) {
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        'expired-callback': () => {
          setTurnstileToken(null);
        },
        'error-callback': () => {
          setTurnstileToken(null);
        },
        theme: 'auto',
        size: 'normal'
      });
    }
  }, [turnstileLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetTurnstile = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot detection - if honeypot is filled, silently "succeed"
    if (formData.honeypot) {
      toast({
        title: "Berjaya!",
        description: "Mesej anda telah dihantar.",
      });
      return;
    }
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Sila isi semua medan yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Sila masukkan alamat emel yang sah",
        variant: "destructive",
      });
      return;
    }

    // CAPTCHA validation
    if (!turnstileToken) {
      toast({
        title: "Error",
        description: "Sila lengkapkan pengesahan CAPTCHA",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
          turnstileToken,
        },
      });

      if (error) throw error;
      if (data && data.success === false) {
        throw new Error(data.error || "Ralat berlaku semasa menghantar mesej.");
      }

      toast({
        title: "Berjaya!",
        description: "Mesej anda telah dihantar. Kami akan membalas secepat mungkin.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: ""
      });
      resetTurnstile();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Ralat berlaku semasa menghantar mesej. Sila cuba lagi.";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="heading text-center">Hubungi Kami</h2>
        <p className="subheading text-center max-w-2xl mx-auto">
          Hubungi kami untuk sebarang pertanyaan atau maklum balas
        </p>

        <div className="mt-12">
          <div className="glass p-3 overflow-hidden rounded-xl">
            <iframe
              title="Lokasi Pejabat KMAM SPU"
              src="https://www.google.com/maps?q=Aras+1,+Wisma+Persekutuan,+Jalan+Bertam+2,+13200+Kepala+Batas,+Pulau+Pinang&output=embed"
              className="w-full h-[400px] border-0 rounded-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <div className="glass p-6 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Alamat</h3>
                <p className="text-muted-foreground">Aras 1, Wisma Persekutuan, Jalan Bertam 2, 13200 Kepala Batas, Pulau Pinang</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Telefon</h3>
                <p className="text-muted-foreground">Sila hubungi melalui borang di bawah</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Emel</h3>
                <p className="text-muted-foreground">contact@kmamspu.my</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
            <div className="space-y-4">
              {/* Honeypot field - hidden from users, catches bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <Input 
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                />
              </div>
              <Input 
                name="name"
                placeholder="Nama" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input 
                name="email"
                type="email" 
                placeholder="Emel" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input 
                name="subject"
                placeholder="Subjek" 
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
              <Textarea 
                name="message"
                placeholder="Mesej" 
                className="min-h-[120px]" 
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {/* Cloudflare Turnstile CAPTCHA Widget */}
              <div 
                ref={turnstileRef} 
                className="flex justify-center"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !turnstileToken}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Menghantar..." : "Hantar Mesej"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
