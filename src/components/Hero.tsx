
import { Droplet } from "lucide-react";
import kkmLogo from "@/assets/kkm-logo.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Hero = () => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleLogoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/20 to-background pt-16" aria-label="Bahagian Utama">
      <div className="absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      <div className="waves" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <article className="text-center max-w-4xl mx-auto">
          <header className="flex flex-col items-center justify-center mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="relative w-32 h-32 mb-4 cursor-pointer hover:scale-110 transition-transform duration-300 overflow-hidden rounded-full"
                  onMouseMove={handleLogoHover}
                  role="button"
                  aria-label="Klik untuk tonton video KMAM SPU"
                >
                  <img
                    src="/logo_kmam_edit.png"
                    alt="Logo KMAM SPU - Kawalan Mutu Air Minum Seberang Perai Utara"
                    className="w-full h-full object-cover"
                    width="128"
                    height="128"
                  />
                  {ripples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute rounded-full bg-white/30 animate-ping"
                      style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: '20px',
                        height: '20px',
                        animationDuration: '0.6s'
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader className="sr-only">
                  <DialogTitle>Video Pengenalan KMAM SPU</DialogTitle>
                </DialogHeader>
                <video
                  src="/logo.mp4"
                  controls
                  autoPlay
                  className="w-full h-auto"
                  aria-label="Video pengenalan Kawalan Mutu Air Minum SPU"
                />
              </DialogContent>
            </Dialog>
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full animate-float" aria-hidden="true">
              <Droplet className="w-6 h-6 text-primary animate-wave" />
            </div>
          </header>

          <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
            <img
              src={kkmLogo}
              alt="Logo Kementerian Kesihatan Malaysia - Kami Sedia Membantu"
              className="w-16 h-16 md:w-24 md:h-24 object-contain flex-shrink-0"
              width="96"
              height="96"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-balance text-left">
              Kawalan Mutu Air Minum Seberang Perai Utara
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Memastikan kualiti air minum yang selamat dan bersih untuk komuniti di Pulau Pinang melalui pemantauan berkala, analisis makmal profesional, dan konsultasi teknikal yang komprehensif.
          </p>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sebagai sebahagian daripada Jabatan Kesihatan Negeri Pulau Pinang, kami komited untuk melindungi kesihatan awam dengan standard pemantauan air yang tertinggi di kawasan Kepala Batas dan Seberang Perai Utara.
          </p>

          <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Navigasi Pantas">
            <a
              href="#services"
              className="glass glass-hover px-8 py-3 text-primary font-medium rounded-xl shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
              aria-label="Lihat perkhidmatan kami"
            >
              Perkhidmatan Kami
            </a>
            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              aria-label="Hubungi kami untuk maklumat lanjut"
            >
              Hubungi Kami
            </a>
          </nav>
        </article>
      </div>
    </section>
  );
};

export default Hero;
