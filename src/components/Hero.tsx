
import { useEffect, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll("[data-animate]");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-slideUp");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={heroRef} id="home" className="relative min-h-screen pt-20 flex flex-col items-center justify-center bg-hero-pattern bg-cover bg-center overflow-hidden px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-alpha-darknavy/30 to-alpha-navy z-0"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-alpha-purple/20 filter blur-[100px] animate-float opacity-60 z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-alpha-blue/20 filter blur-[100px] animate-float opacity-60 z-0" style={{ animationDelay: "1s" }}></div>
      
      <div className="max-w-5xl mx-auto text-center z-10 pt-10">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0" data-animate>
          <span className="text-xs font-medium text-gray-200">
            AI-FIRST INVESTMENT INTELLIGENCE ENGINE
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 opacity-0" data-animate>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Invest Smarter, Close Faster,
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">
            Scale With AI
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 opacity-0" data-animate>
          Transforming investment decision-making with technology-enabled solutions that drive better outcomes for firms and their clients.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center opacity-0" data-animate>
          <a 
            href="#features" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium transition-all hover:shadow-neon hover:brightness-110"
          >
            Explore Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          
          <a 
            href="#how-it-works" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
          >
            How It Works
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0" data-animate>
          <a href="#features" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-alpha-navy to-transparent z-10"></div>
    </div>
  );
}
