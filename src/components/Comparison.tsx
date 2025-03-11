
import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";

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
      impact: "10x faster deal processing",
      highlight: true,
    },
    {
      feature: "Financial Modeling",
      traditional: "Excel-based, limited scope",
      alphau: "AI-first, automated scenario modeling",
      impact: "95% reduction in modeling time",
      highlight: true,
    },
    {
      feature: "Risk Intelligence",
      traditional: "Static & reactive",
      alphau: "AI-driven, predictive insights",
      impact: "Identify 40% more risk factors",
      highlight: true,
    },
    {
      feature: "Decision Execution",
      traditional: "Human bias & inefficiencies",
      alphau: "Automated Buy/Hold/Reject scoring",
      impact: "Eliminate 85% of decision bias",
      highlight: true,
    },
    {
      feature: "Processing Time",
      traditional: "Weeks to months",
      alphau: "70% faster processing",
      impact: "From months to days",
      highlight: false,
    },
    {
      feature: "Accuracy",
      traditional: "Highly variable",
      alphau: "50% improved investment accuracy",
      impact: "Higher portfolio performance",
      highlight: false,
    },
    {
      feature: "Scalability",
      traditional: "Limited by human resources",
      alphau: "Infinitely scalable",
      impact: "No limits on deal volume",
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
            See how AlphaU's AI-powered platform transforms traditional investment processes
          </p>
        </div>
        
        <GlassCard className="p-0 overflow-hidden">
          <div className="mt-0 overflow-x-auto" ref={comparisonRef}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-white/20 bg-gradient-to-r from-alpha-blue/20 to-alpha-purple/20">
                  <th className="px-6 py-4 text-white font-medium">Feature</th>
                  <th className="px-6 py-4 text-white font-medium">Traditional Investment Process</th>
                  <th className="px-6 py-4 text-white font-medium">AlphaU AI Execution</th>
                  <th className="px-6 py-4 text-white font-medium">Business Impact</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr 
                    key={i} 
                    className={cn(
                      "border-b border-white/10 opacity-0 transition-all hover:bg-white/5",
                      row.highlight ? "bg-white/5" : ""
                    )}
                  >
                    <td className="px-6 py-5 text-white font-medium">{row.feature}</td>
                    <td className="px-6 py-5 text-gray-300 flex items-center">
                      <div className="flex-shrink-0 p-1 mr-3 rounded-full bg-red-500/20">
                        <X className="h-4 w-4 text-red-400" />
                      </div>
                      {row.traditional}
                    </td>
                    <td className="px-6 py-5 text-gray-300 flex items-center">
                      <div className="flex-shrink-0 p-1 mr-3 rounded-full bg-green-500/20">
                        <Check className="h-4 w-4 text-green-400" />
                      </div>
                      {row.alphau}
                    </td>
                    <td className="px-6 py-5 text-white">
                      <span className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-alpha-blue/30 to-alpha-purple/30 border border-alpha-purple/20">
                        {row.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
        
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
