import { useEffect, useRef } from "react";
import { GlassCard } from "./ui/GlassCard";
import { CircularProgress } from "./ui/CircularProgress";
import { Brain, TrendingUp, LineChart, Clock, Shield, Zap } from "lucide-react";

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".feature-card").forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("animate-fadeIn");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      title: "Real-Time AI Analysis",
      description: "AlphaU delivers real-time AI-powered investment decisioning for fast, accurate insights.",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-alpha-purple",
    },
    {
      title: "AlphaScore™",
      description: "Proprietary algorithm that generates investment rating scores between 0-100 based on comprehensive data analysis.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-yellow-400 to-alpha-yellow",
    },
    {
      title: "Predictive Modeling",
      description: "AI-first, automated scenario modeling that predicts outcomes with greater accuracy than traditional methods.",
      icon: <LineChart className="h-6 w-6" />,
      color: "from-blue-400 to-alpha-blue",
    },
    {
      title: "70% Faster Processing",
      description: "Automate deal execution with AI to dramatically reduce processing time and increase efficiency.",
      icon: <Clock className="h-6 w-6" />,
      color: "from-green-400 to-alpha-green",
    },
    {
      title: "Risk Intelligence",
      description: "AI-driven risk intelligence that provides predictive insights instead of reactive analysis.",
      icon: <Shield className="h-6 w-6" />,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Scalable Solutions",
      description: "Easily scale your investment operations with customizable AI workflows tailored to your needs.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-orange-400 to-red-500",
    },
  ];
  
  return (
    <div id="features" className="relative py-20 px-4 md:px-8 bg-features-pattern overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-alpha-navy to-transparent"></div>
      
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-alpha-blue/10 to-alpha-purple/10 filter blur-[120px] animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-alpha-purple/10 to-alpha-blue/10 filter blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Revolutionary Investment <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple animate-pulse">Intelligence</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            AlphaU's platform combines advanced AI technologies to transform your investment process with unparalleled speed and accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={featuresRef}>
          {features.map((feature, i) => (
            <GlassCard 
              key={i} 
              className="feature-card opacity-0 h-full transform transition-all duration-300 hover:translate-y-[-4px]"
              highlightTop
              highlightColor={feature.color}
            >
              <div className={`mb-4 rounded-full p-3 inline-flex bg-gradient-to-br ${feature.color} transform transition-all duration-300 hover:scale-110 hover:rotate-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
              <CircularProgress 
                value={70} 
                max={100}
                color="rgba(108, 75, 239, 1)"
                backgroundColor="rgba(108, 75, 239, 0.2)"
                size={120}
                textClassName="text-white font-bold text-xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Faster Deal Processing</h3>
              <p className="mt-2 text-gray-300">Compared to traditional methods</p>
            </div>
            
            <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
              <CircularProgress 
                value={50} 
                max={100}
                color="rgba(29, 133, 255, 1)"
                backgroundColor="rgba(29, 133, 255, 0.2)"
                size={120}
                textClassName="text-white font-bold text-xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Improved Investment Accuracy</h3>
              <p className="mt-2 text-gray-300">More accurate than human analysts</p>
            </div>
            
            <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-105">
              <CircularProgress 
                value={100} 
                max={100}
                color="rgba(34, 197, 94, 1)"
                backgroundColor="rgba(34, 197, 94, 0.2)"
                size={120}
                textClassName="text-white font-bold text-xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-white">Scalable Intelligence</h3>
              <p className="mt-2 text-gray-300">Grows with your investment needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
