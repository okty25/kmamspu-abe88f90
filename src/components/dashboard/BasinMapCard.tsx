import React from "react";
import { Radar } from "lucide-react";
import BentoCard from "./BentoCard";

export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "safe" | "warn" | "alert";
}

interface Props {
  stations: Station[];
  onClick: () => void;
}

const BasinMapCard = ({ stations, onClick }: Props) => (
  <BentoCard accent="safe" onClick={onClick} label="Peta Lokasi Persampelan" className="min-h-[280px] lg:col-span-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Radar className="h-4 w-4 text-primary" />
        Peta Lokasi PERSAMPELAN
      </div>
      <span className="text-xs text-muted-foreground">{stations.length} stesen</span>
    </div>

    <div
      className="relative mt-4 h-[180px] w-full overflow-hidden rounded-xl border border-border bg-muted/30 sm:h-[210px]"
    >
      <iframe
        title="Peta Lembangan Air"
        src="https://www.google.com/maps/d/embed?mid=1AcQQCOjWc1YIhR0MJzVrTpmLifhJ2O0&ehbc=2E312F"
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
      />

    </div>

    <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
      {(["safe", "warn", "alert"] as const).map((k) => (
        <span key={k} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: `hsl(var(--${k}))` }} />
          {k === "safe" ? "Selamat" : k === "warn" ? "Amaran" : "Kritikal"}
        </span>
      ))}
    </div>
  </BentoCard>
);

export default BasinMapCard;
