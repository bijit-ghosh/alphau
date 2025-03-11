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
  hoverEffect = true
}: GlassCardProps) {
  return <div className="make it more dynamics and fully accommodated the words in the boundary ">
      {highlightTop && <div className={cn("absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r", highlightColor, "animate-pulse")} />}
      {children}
    </div>;
}