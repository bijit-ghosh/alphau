
import { useEffect, useRef } from "react";
import { Brain, TrendingUp, ShieldCheck, Search } from "lucide-react";

interface CircleAnimationProps {
  className?: string;
}

export function CircleAnimation({ className }: CircleAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-rotate");
            entry.target.querySelectorAll(".icon-container").forEach((icon, i) => {
              (icon as HTMLElement).style.animationDelay = `${i * 0.2}s`;
              icon.classList.add("animate-fadeIn");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className={`relative flex items-center justify-center w-full h-96 ${className}`}>
      <div className="w-64 h-64 border-4 border-dashed rounded-full border-alpha-blue/30 animate-rotate opacity-0">
        <div className="relative w-full h-full">
          {/* Center AI Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-alpha-blue to-alpha-purple flex items-center justify-center shadow-neon">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          {/* Orbital Icons */}
          <div className="icon-container absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-400 to-alpha-green flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">MarketScout™</div>
          </div>
          
          <div className="icon-container absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-alpha-yellow flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">AlphaScore™</div>
          </div>
          
          <div className="icon-container absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-0">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-400 to-alpha-blue flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">Decision™</div>
          </div>
          
          <div className="icon-container absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="p-3 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">RiskSentinel™</div>
          </div>
        </div>
      </div>
    </div>
  );
}
