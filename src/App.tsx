
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StaffLogin from "./pages/StaffLogin";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Security component to handle CSP and other security measures
const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Add security headers via meta tags
    const addMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Content Security Policy
    addMetaTag('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.swing2app.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https:; " +
      "frame-src 'self' https://www.swing2app.com https://docs.google.com https://www.google.com https://www.facebook.com https://web.facebook.com https://*.elf.site; " +
      "object-src 'none';"
    );

    // Other security headers
    addMetaTag('X-Content-Type-Options', 'nosniff');
    addMetaTag('X-Frame-Options', 'SAMEORIGIN');
    addMetaTag('X-XSS-Protection', '1; mode=block');
    addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Safe clickjacking prevention that handles iframe restrictions
    try {
      // Check if we're in an iframe and have access to parent
      if (window.self !== window.top && window.top) {
        // Try to access parent location - this will throw if not allowed
        const parentLocation = window.top.location.href;
        
        // Only redirect if we're not in a trusted environment (like Lovable preview)
        const trustedDomains = ['lovable.app', 'lovable.dev', 'localhost'];
        const isInTrustedEnvironment = trustedDomains.some(domain => 
          parentLocation.includes(domain) || window.location.href.includes(domain)
        );
        
        if (!isInTrustedEnvironment) {
          window.top.location.href = window.self.location.href;
        }
      }
    } catch {
      // Silently handle SecurityError - we're likely in a sandboxed iframe
      // No logging needed in production
    }
  }, []);

  return <>{children}</>;
};

// Component to handle authentication and page transition logic
const LoginHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Session validation is now handled in Dashboard component
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SecurityProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LoginHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </SecurityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
