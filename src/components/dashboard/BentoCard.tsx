import React from "react";
import { cn } from "@/lib/utils";

export type Accent = "safe" | "warn" | "alert";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: Accent;
  onClick?: () => void;
  label?: string;
}

const BentoCard = ({ children, className, accent = "safe", onClick, label }: BentoCardProps) => {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={label}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      onClick={onClick}
      onMouseMove={handleMove}
      style={{ ["--glow" as string]: `var(--${accent})` }}
      className={cn(
        "glass-panel p-5 overflow-hidden",
        onClick && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BentoCard;
