
import { useEffect, useRef } from "react";
import { GlassCard } from "./ui/GlassCard";
import { CircleAnimation } from "./CircleAnimation";
import { Calculator, LineChart, Workflow, FileText } from "lucide-react";

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".how-it-works-card").forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("animate-fadeIn");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      title: "AlphaScore™ Algorithm",
      description: "Proprietary algorithm that analyzes complex data to generate investment rating scores between 0-100, based on financials, risk, and alternative data.",
      icon: <Calculator className="h-6 w-6" />,
      highlight: "investment rating scores between 0-100",
    },
    {
      title: "Advanced AI-Powered Modeling",
      description: "Utilizes machine learning and artificial intelligence to build predictive models for Automated DCF, LBO, Monte Carlo simulations for accurate pricing.",
      icon: <LineChart className="h-6 w-6" />,
      highlight: "Automated DCF, LBO, Monte Carlo simulations",
    },
    {
      title: "Automated Decision-Making",
      description: "Buy / Hold / Reject Decisioning: AI automates investment recommendations based on comprehensive analysis of all available data.",
      icon: <Workflow className="h-6 w-6" />,
      highlight: "Buy / Hold / Reject",
    },
    {
      title: "Comprehensive Reporting",
      description: "AI-generated investment memos & deal reports that synthesize insights and provide clear, actionable information.",
      icon: <FileText className="h-6 w-6" />,
      highlight: "investment memos & deal reports",
    },
  ];
  
  return (
    <div id="how-it-works" className="relative py-20 px-4 md:px-8 bg-alpha-darknavy overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-alpha-purple/10 filter blur-[100px]"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-alpha-blue/10 filter blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">AlphaU</span> Works
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            AlphaScore™, AI-Powered Modeling, and Decision Automation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={sectionRef}>
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {features.map((feature, i) => (
                <GlassCard 
                  key={i} 
                  className="how-it-works-card opacity-0 transition-all duration-500" 
                  highlightTop
                >
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full p-3 bg-gradient-to-br from-alpha-blue to-alpha-purple text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">
                        {feature.description.split(feature.highlight).map((part, i, arr) => (
                          i === arr.length - 1 ? (
                            <span key={i}>{part}</span>
                          ) : (
                            <span key={i}>
                              {part}
                              <span className="text-alpha-blue font-medium">{feature.highlight}</span>
                            </span>
                          )
                        ))}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <CircleAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}
