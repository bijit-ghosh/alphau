
import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Comparison() {
  const comparisonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("tr").forEach((row, i) => {
              setTimeout(() => {
                row.classList.add("animate-fadeIn");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (comparisonRef.current) {
      observer.observe(comparisonRef.current);
    }
    
    return () => {
      if (comparisonRef.current) {
        observer.unobserve(comparisonRef.current);
      }
    };
  }, []);
  
  const comparisonData = [
    {
      feature: "Deal Sourcing",
      traditional: "Manual, slow, human-driven",
      alphau: "AI-powered, real-time",
      highlight: true,
    },
    {
      feature: "Financial Modeling",
      traditional: "Excel-based, limited scope",
      alphau: "AI-first, automated scenario modeling",
      highlight: true,
    },
    {
      feature: "Risk Intelligence",
      traditional: "Static & reactive",
      alphau: "AI-driven, predictive insights",
      highlight: true,
    },
    {
      feature: "Decision Execution",
      traditional: "Human bias & inefficiencies",
      alphau: "Automated Buy/Hold/Reject scoring",
      highlight: true,
    },
    {
      feature: "Processing Time",
      traditional: "Weeks to months",
      alphau: "70% faster processing",
      highlight: false,
    },
    {
      feature: "Accuracy",
      traditional: "Highly variable",
      alphau: "50% improved investment accuracy",
      highlight: false,
    },
    {
      feature: "Scalability",
      traditional: "Limited by human resources",
      alphau: "Infinitely scalable",
      highlight: false,
    },
  ];
  
  return (
    <div id="comparison" className="py-20 px-4 md:px-8 bg-alpha-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">AlphaU</span> Advantage
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            See how AlphaU's AI-powered platform compares to traditional investment processes
          </p>
        </div>
        
        <div className="mt-12 overflow-x-auto" ref={comparisonRef}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-white/10 opacity-0">
                <th className="pb-4 text-gray-300 font-medium">Feature</th>
                <th className="pb-4 text-gray-300 font-medium">Traditional Investment Process</th>
                <th className="pb-4 text-gray-300 font-medium">AlphaU AI Execution</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr 
                  key={i} 
                  className={cn(
                    "border-b border-white/10 opacity-0",
                    row.highlight ? "bg-white/5" : ""
                  )}
                >
                  <td className="py-4 text-white font-medium">{row.feature}</td>
                  <td className="py-4 text-gray-300 flex items-center">
                    <X className="mr-2 h-4 w-4 text-red-400" />
                    {row.traditional}
                  </td>
                  <td className="py-4 text-gray-300 flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-400" />
                    {row.alphau}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
          <div className="p-6 bg-alpha-blue/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to transform your investment process?</h3>
                <p className="text-gray-300">Experience the power of AI-driven investment intelligence</p>
              </div>
              <a 
                href="#contact" 
                className="mt-4 md:mt-0 inline-flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium transition-all hover:shadow-neon hover:brightness-110"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
