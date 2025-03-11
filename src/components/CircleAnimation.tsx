
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
      {/* Glowing background */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-alpha-blue/5 to-alpha-purple/5 filter blur-[50px] animate-pulse"></div>
      
      {/* Orbital paths with animated dash */}
      <div className="w-64 h-64 border-4 border-dashed rounded-full border-alpha-blue/30 animate-rotate opacity-0 relative">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="calc(32rem / 2)" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-dash" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 87, 183, 0.4)" />
              <stop offset="50%" stopColor="rgba(108, 75, 239, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 87, 183, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="relative w-full h-full">
          {/* Center AI Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-alpha-blue to-alpha-purple flex items-center justify-center shadow-neon group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-alpha-blue to-alpha-purple blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <Brain className="w-10 h-10 text-white relative z-10" />
          </div>
          
          {/* Orbital Icons */}
          <div className="icon-container absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:scale-110 transition-transform duration-300">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-400 to-alpha-green flex items-center justify-center shadow-lg relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/50 to-alpha-green/50 blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <Search className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">MarketScout™</div>
          </div>
          
          <div className="icon-container absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 hover:scale-110 transition-transform duration-300">
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-alpha-yellow flex items-center justify-center shadow-lg relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/50 to-alpha-yellow/50 blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <TrendingUp className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">AlphaScore™</div>
          </div>
          
          <div className="icon-container absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-0 hover:scale-110 transition-transform duration-300">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-400 to-alpha-blue flex items-center justify-center shadow-lg relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/50 to-alpha-blue/50 blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <TrendingUp className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">Decision™</div>
          </div>
          
          <div className="icon-container absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:scale-110 transition-transform duration-300">
            <div className="p-3 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/50 to-pink-500/50 blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <ShieldCheck className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="mt-2 text-center text-white text-xs font-medium">RiskSentinel™</div>
          </div>
          
          {/* Add connection lines */}
          <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-full h-full">
              <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="3,3" className="animate-pulse" />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(108, 75, 239, 0)" />
                  <stop offset="50%" stopColor="rgba(108, 75, 239, 0.5)" />
                  <stop offset="100%" stopColor="rgba(108, 75, 239, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
