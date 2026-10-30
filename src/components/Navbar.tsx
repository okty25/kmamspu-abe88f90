
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const menuItems = [
    { title: "Utama", href: "#home" },
    { title: "Perkhidmatan", href: "#services" },
    { title: "Tentang Kami", href: "#about" },
    { title: "Carta Organisasi", href: "#organization" },
    { title: "Berita", href: "#news" },
    { title: "Galeri Gambar", href: "#gallery" },
    { title: "Hubungi Kami", href: "#contact" },
  ];

  const handleStaffLogin = () => {
    navigate("/staff-login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="border-b border-white/20 bg-[rgba(255,255,255,0.08)] px-3 shadow-[0_12px_30px_rgba(14,116,144,0.18),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl sm:px-5 lg:px-6">
        <div className="flex h-[72px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex shrink-0 items-center justify-center rounded-full transition hover:scale-105"
                  aria-label="Open KMAM SPU logo video"
                >
                  <img
                    src="/logo_kmam_edit.png"
                    alt="KAWALAN MUTU AIR MINUM (KMAM)"
                    className="h-11 w-11 rounded-full object-cover shadow-[0_3px_10px_rgba(15,23,42,0.28)]"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader className="sr-only">
                  <DialogTitle>KAWALAN MUTU AIR MINUM (KMAM) Video</DialogTitle>
                </DialogHeader>
                <video src="/logo.mp4" controls autoPlay className="w-full h-auto" />
              </DialogContent>
            </Dialog>

            <div className="whitespace-nowrap text-[1.55rem] font-black tracking-tight text-primary drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)] sm:text-[1.7rem]">
              KMAM SPU
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center justify-center gap-4 xl:gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group relative text-[0.95rem] font-medium text-white/95 transition-all duration-200 hover:text-[#fce7a3]"
                >
                  <span className="relative inline-block after:absolute after:-bottom-2 after:left-1/2 after:h-[2.5px] after:w-full after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-[#f8e4a3] after:via-[#f4c95d] after:to-[#d29d19] after:shadow-[0_0_14px_rgba(244,201,93,0.9),0_0_26px_rgba(244,201,93,0.6)] after:transition-all after:duration-300 group-hover:after:scale-x-100">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              className="flex items-center gap-3 rounded-[16px] border border-white/35 bg-white/10 px-3 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_8px_20px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              aria-label="Current date and time"
            >
              <Clock3 className="h-4 w-4 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,0.8)]" />
              <div className="flex flex-col items-start leading-none">
                <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-white drop-shadow-[0_2px_4px_rgba(15,23,42,0.85)]">{formattedDate}</span>
                <span className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-white drop-shadow-[0_2px_4px_rgba(15,23,42,0.85)]">{formattedTime}</span>
              </div>
            </button>

            <Button
              variant="default"
              className="rounded-[16px] border border-white/35 bg-white/12 px-3.5 py-2 text-[0.95rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_20px_rgba(15,23,42,0.35)] backdrop-blur-xl transition hover:bg-white/20"
              onClick={handleStaffLogin}
            >
              <LogIn className="mr-2 h-4 w-4 drop-shadow-[0_2px_4px_rgba(15,23,42,0.8)]" />
              <span className="drop-shadow-[0_2px_4px_rgba(15,23,42,0.85)]">Log Masuk Staf</span>
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/5 px-2.5 py-1.5 text-white shadow-[0_6px_16px_rgba(15,23,42,0.35)] backdrop-blur-md"
              aria-label="Current date and time"
            >
              <Clock3 className="h-3 w-3 text-white drop-shadow-[0_2px_3px_rgba(15,23,42,0.8)]" />
              <div className="flex flex-col items-start leading-none">
                <span className="whitespace-nowrap text-[8px] font-medium tracking-[0.02em] text-white drop-shadow-[0_2px_3px_rgba(15,23,42,0.85)]">{formattedDate}</span>
                <span className="mt-0.5 font-mono text-[9px] tracking-[0.08em] text-white drop-shadow-[0_2px_3px_rgba(15,23,42,0.85)]">{formattedTime}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-sm backdrop-blur-md transition hover:border-white/50 hover:bg-white/25"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-3 mt-2 rounded-3xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-2xl sm:mx-6 lg:hidden">
          <div className="mx-auto max-w-[1500px] space-y-1 px-4 py-3 sm:px-6">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="navbar-text-shadow block rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/15 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}

            <Button
              variant="default"
              className="mt-2 w-full justify-center rounded-full border border-white/25 bg-white/15 text-sm font-medium text-white shadow-[0_8px_18px_rgba(15,23,42,0.28)] hover:bg-white/25"
              onClick={() => {
                handleStaffLogin();
                setIsOpen(false);
              }}
            >
              <LogIn className="mr-2 h-4 w-4 drop-shadow-[0_2px_4px_rgba(15,23,42,0.8)]" />
              <span className="drop-shadow-[0_2px_4px_rgba(15,23,42,0.9)]">Log Masuk Staf</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
