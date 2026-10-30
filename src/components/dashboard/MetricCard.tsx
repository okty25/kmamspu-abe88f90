import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import BentoCard, { Accent } from "./BentoCard";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
  unit?: string;
  delta: number;
  accent: Accent;
  onClick: () => void;
}

const MetricCard = ({ icon: Icon, title, value, unit, delta, accent, onClick }: Props) => {
  const Trend = delta >= 0 ? TrendingUp : TrendingDown;
  return (
    <BentoCard accent={accent} onClick={onClick} label={title} className="min-h-[130px]">
      <div className="flex items-start justify-between">
        <div
          className="rounded-xl p-2"
          style={{ background: `hsl(var(--${accent}) / 0.12)`, boxShadow: `inset 0 0 0 1px hsl(var(--${accent}) / 0.25)` }}
        >
          <Icon className="h-4 w-4" style={{ color: `hsl(var(--${accent}))` }} />
        </div>
        <span className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground">
          <Trend className="h-3 w-3" />
          {Math.abs(delta).toFixed(2)}
        </span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
      </p>
    </BentoCard>
  );
};

export default MetricCard;
