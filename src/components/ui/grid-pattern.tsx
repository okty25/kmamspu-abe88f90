
import React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  offsetX?: number;
  offsetY?: number;
}

export const GridPattern = ({
  size = 32,
  offsetX = 0,
  offsetY = 0,
  className,
  ...props
}: GridPatternProps) => {
  const patternId = React.useId();

  return (
    <div
      className={cn(
        "absolute inset-0 opacity-[0.025] dark:opacity-[0.05]",
        className
      )}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${offsetX} ${offsetY})`}
          >
            <path
              d="M.5.5h31v31h-31z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
