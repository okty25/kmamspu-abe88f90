import React, { useState } from "react";
import { ClipboardList, X, ExternalLink, Sparkles } from "lucide-react";
import "./SanitarySurveyButton.css";

const FORM_URL = "https://forms.gle/j5vbB1iTg5YuAzpJ8";

const SanitarySurveyButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Borang Kehadiran Sanitary Survey 2026"
        className="fixed bottom-44 right-4 z-20 group flex flex-col items-center gap-2 px-3 py-4 rounded-2xl bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 slow-pulse"
        style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))" }}
      >
        <ClipboardList className="h-5 w-5 text-sky-300/90" />
        <span
          className="text-sm font-medium text-foreground/80 whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          Borang Kehadiran Sanitary Survey 2026
        </span>
      </button>

      {/* Glassmorphism modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 via-cyan-400/20 to-blue-600/30 backdrop-blur-md shadow-md" />

          {/* floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-300/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/30 blur-3xl pointer-events-none" />

          {/* card */}
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 20px 60px -10px rgba(14, 165, 233, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {/* shine */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110"
            >
              <X className="h-4 w-4 text-foreground/80" />
            </button>

            <div className="relative">
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400/40 to-blue-600/40 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
                <ClipboardList className="h-8 w-8 text-white drop-shadow" />
              </div>

              <h3 className="text-center text-xl font-semibold text-foreground mb-2">
                Borang Kehadiran
              </h3>
              <p className="text-center text-foreground/70 mb-6 flex items-center justify-center gap-1.5 font-serif text-2xl shadow-none">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                Borang Kehadiran Sanitary Survey 2026
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              </p>

              <div className="space-y-3">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border border-white/30"
                >
                  Buka Borang Kehadiran
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="w-full h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-foreground/80 text-sm font-medium transition-all"
                >
                  Batal
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-foreground/60">
                Pautan akan dibuka di tab baharu
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SanitarySurveyButton;