
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
  textClassName?: string;
  showValue?: boolean;
  suffix?: string;
  animate?: boolean;
}

export function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  className,
  color = "rgba(108, 75, 239, 1)",
  backgroundColor = "rgba(108, 75, 239, 0.2)",
  textClassName,
  showValue = true,
  suffix = "%",
  animate = true,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(value);
    }
  }, [value, animate]);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / max) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: animate ? "stroke-dashoffset 1s ease-in-out" : "none",
          }}
        />
      </svg>
      {showValue && (
        <div className={cn("absolute inset-0 flex items-center justify-center text-lg font-medium", textClassName)}>
          {progress}{suffix}
        </div>
      )}
    </div>
  );
}
