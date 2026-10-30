import React from "react";
import { Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BentoCard from "./BentoCard";

export interface Reading {
  time: string;
  ph: number;
  turbidity: number;
  oxygen: number;
}

interface Props {
  data: Reading[];
  onClick: () => void;
}

const ParameterChartCard = ({ data, onClick }: Props) => (
  <BentoCard accent="safe" onClick={onClick} label="Analitik parameter 24 jam" className="min-h-[300px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Activity className="h-4 w-4 text-primary" />
        Analitik 24 Jam
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="text-primary">pH</span>
        <span style={{ color: "hsl(var(--warn))" }}>Kekeruhan</span>
        <span style={{ color: "hsl(var(--alert))" }}>Oksigen</span>
      </div>
    </div>

    <div className="mt-4 h-[230px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
          <defs>
            {[
              ["gPh", "var(--safe)"],
              ["gTur", "var(--warn)"],
              ["gOx", "var(--alert)"],
            ].map(([id, v]) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`hsl(${v})`} stopOpacity={0.55} />
                <stop offset="100%" stopColor={`hsl(${v})`} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="hsl(var(--primary) / 0.08)" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--primary) / 0.3)",
              borderRadius: 12,
              color: "hsl(var(--popover-foreground))",
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="ph" stroke="hsl(var(--safe))" strokeWidth={2} fill="url(#gPh)" />
          <Area type="monotone" dataKey="turbidity" stroke="hsl(var(--warn))" strokeWidth={2} fill="url(#gTur)" />
          <Area type="monotone" dataKey="oxygen" stroke="hsl(var(--alert))" strokeWidth={2} fill="url(#gOx)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </BentoCard>
);

export default ParameterChartCard;
