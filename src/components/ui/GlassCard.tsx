
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  highlightTop?: boolean;
  highlightColor?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  highlightTop = false,
  highlightColor = "from-alpha-blue to-alpha-purple",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "relative rounded-xl p-6 backdrop-blur-md bg-white/5 border border-white/10",
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:mask-gradient-to-r before:animate-gradient-x",
        "after:absolute after:inset-0 after:-z-10 after:rounded-xl after:blur-xl",
        "after:bg-gradient-to-r after:from-alpha-blue/20 after:via-alpha-purple/20 after:to-alpha-blue/20",
        "after:opacity-0 after:transition-opacity after:duration-500",
        hoverEffect && [
          "transition-all duration-300",
          "hover:shadow-lg hover:bg-white/10 hover:border-white/20",
          "hover:scale-[1.02] hover:after:opacity-100",
          "hover:before:via-white/20",
        ],
        className
      )}
    >
      {highlightTop && (
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r",
          highlightColor,
          "animate-pulse"
        )} />
      )}
      {children}
    </div>
  );
}
