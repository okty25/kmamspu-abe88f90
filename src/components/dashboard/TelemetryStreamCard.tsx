import React from "react";
import { Waves } from "lucide-react";
import BentoCard from "./BentoCard";

export interface LogEntry {
  id: number;
  time: string;
  text: string;
  status: "safe" | "warn" | "alert";
}

interface Props {
  logs: LogEntry[];
  onClick: () => void;
}

const Row = ({ e }: { e: LogEntry }) => (
  <div className="flex items-center gap-3 border-b border-border/60 py-2 text-xs">
    <span className="tabular-nums text-muted-foreground">{e.time}</span>
    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `hsl(var(--${e.status}))`, boxShadow: `0 0 8px hsl(var(--${e.status}))` }} />
    <span className="truncate text-foreground/90">{e.text}</span>
  </div>
);

const TelemetryStreamCard = ({ logs, onClick }: Props) => (
  <BentoCard accent="warn" onClick={onClick} label="Aliran telemetri langsung" className="min-h-[300px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Waves className="h-4 w-4" style={{ color: "hsl(var(--warn))" }} />
        Telemetri Langsung
      </div>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> LIVE
      </span>
    </div>
    <div className="relative mt-3 h-[230px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)]">
      <div className="ticker-track">
        {[...logs, ...logs].map((e, i) => (
          <Row key={`${e.id}-${i}`} e={e} />
        ))}
      </div>
    </div>
  </BentoCard>
);

export default TelemetryStreamCard;
