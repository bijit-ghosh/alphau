
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
        "relative rounded-xl p-6 backdrop-blur-md bg-white/5 border border-white/10 shadow-glass",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      {highlightTop && (
        <div className={cn("absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r", highlightColor)} />
      )}
      {children}
    </div>
  );
}
