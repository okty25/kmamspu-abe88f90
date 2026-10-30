import React from "react";
import { Droplets } from "lucide-react";
import BentoCard, { Accent } from "./BentoCard";

interface Props {
  index: number;
  accent: Accent;
  onClick: () => void;
}

const SafetyIndexCard = ({ index, accent, onClick }: Props) => {
  const level = 100 - index;

  return (
    <BentoCard accent={accent} onClick={onClick} label="Indeks Keselamatan Air" className="relative min-h-[280px]">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Droplets className="h-4 w-4 text-primary" />
          Indeks Keselamatan Air
        </div>
        <div className="mt-6 flex items-end gap-3">
          <span className="text-6xl font-bold tabular-nums text-foreground">{index.toFixed(1)}</span>
          <span className="mb-2 text-2xl text-muted-foreground">%</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {accent === "safe" ? "Optimum — semua parameter dalam julat selamat" : accent === "warn" ? "Perhatian — parameter menghampiri had" : "Kritikal — tindakan segera diperlukan"}
        </p>
      </div>

      {/* Fluid wave visual */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[1.25rem]"
        style={{ height: `${Math.max(18, Math.min(70, level + 30))}%` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, hsl(var(--${accent}) / 0.28), hsl(var(--${accent}) / 0.05))` }}
        />
        {[0, 1].map((i) => (
          <svg
            key={i}
            className="absolute bottom-0 left-0 h-24 w-[200%]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              animation: `fluid-wave ${i === 0 ? 9 : 14}s linear infinite`,
              opacity: i === 0 ? 0.5 : 0.28,
            }}
          >
            <path
              d="M0,60 C150,110 300,10 600,60 C900,110 1050,10 1200,60 L1200,120 L0,120 Z"
              fill={`hsl(var(--${accent}) / 0.55)`}
            />
          </svg>
        ))}
      </div>
    </BentoCard>
  );
};

export default SafetyIndexCard;
