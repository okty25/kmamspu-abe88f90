import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, TriangleAlert as AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridPattern } from "@/components/ui/grid-pattern";
import { supabase } from "@/integrations/supabase/client";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Note: Client-side rate limiting is for UX only (user feedback).
  // Actual security is enforced by Supabase's built-in auth rate limiting.
  // Do not rely on these client-side checks for security.
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Lockout timer check
  useEffect(() => {
    if (lockoutEndTime) {
      const checkLockout = setInterval(() => {
        if (Date.now() >= lockoutEndTime) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setLoginAttempts(0);
        }
      }, 1000);
      return () => clearInterval(checkLockout);
    }
  }, [lockoutEndTime]);

  const recordFailedAttempt = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      setIsLocked(true);
      setLockoutEndTime(Date.now() + LOCKOUT_TIME);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Akaun dikunci",
        description: "Terlalu banyak percubaan log masuk yang gagal. Cuba lagi dalam 15 minit.",
        variant: "destructive",
      });
      return;
    }

    // Basic input validation
    if (!email || !password) {
      toast({
        title: "Ralat",
        description: "Sila masukkan emel dan kata laluan",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Ralat",
        description: "Kata laluan mestilah sekurang-kurangnya 6 aksara",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        recordFailedAttempt();
        
        // Generic error message to prevent user enumeration
        toast({
          title: "Log masuk gagal",
          description: `Emel atau kata laluan tidak sah. ${MAX_LOGIN_ATTEMPTS - loginAttempts - 1} percubaan lagi.`,
          variant: "destructive",
        });
        return;
      }

      if (data.session) {
        // Reset attempts on successful login
        setLoginAttempts(0);

        // Record the login in the database
        const { error: logError } = await supabase
          .from("staff_login_logs")
          .insert({
            user_id: data.user.id,
            email: email.trim().toLowerCase(),
            user_agent: navigator.userAgent,
          });

        if (logError) {
          console.error("Failed to record login log:", logError.message);
        }

        toast({
          title: "Log masuk berjaya",
          description: "Selamat datang ke Papan Pemuka Staf KMAM SPU",
        });
        navigate("/dashboard");
      }
    } catch {
      toast({
        title: "Ralat",
        description: "Ralat berlaku semasa log masuk. Sila cuba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GridPattern className="fixed inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Laman Utama
        </Button>
        
        <div className="max-w-md mx-auto glass p-8">
          <img
            src="/logo_kmam_edit.png"
            alt="Logo KMAM SPU"
            className="mx-auto mb-6 h-24 w-24 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <LogIn className="mr-2 h-6 w-6" />
            Log Masuk Staf
          </h1>
          
          {isLocked && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-center">
              <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
              <span className="text-sm text-destructive">
                Akaun dikunci sementara kerana terlalu banyak percubaan gagal
              </span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Emel
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan emel anda"
                disabled={isLocked}
                maxLength={255}
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Kata Laluan
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata laluan"
                disabled={isLocked}
                maxLength={100}
                autoComplete="current-password"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isLocked}
            >
              {isLoading ? "Log Masuk..." : "Log Masuk"}
            </Button>
          </form>
          
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Hubungi pentadbir jika anda tiada akaun
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;