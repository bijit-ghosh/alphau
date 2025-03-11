
import { useEffect, useRef } from "react";
import { LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AIWorkflow } from "./AIWorkflow";

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
      impact: "3.5x higher deal flow volume",
      highlight: true,
    },
    {
      impact: "95% faster analysis time",
      highlight: true,
    },
    {
      impact: "40% better risk prediction",
      highlight: true,
    },
    {
      impact: "85% more accurate decisions",
      highlight: true,
    }
  ];
  
  return (
    <div id="comparison" className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-alpha-navy/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">AlphaU</span> Advantage
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Quantifiable business impact through AI-powered investment intelligence
          </p>
        </div>
        
        <GlassCard className="p-0 overflow-hidden mb-16">
          <div className="mt-0 overflow-x-auto" ref={comparisonRef}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-white/20 bg-gradient-to-r from-alpha-blue/20 to-alpha-purple/20">
                  <th className="px-6 py-4 text-white font-medium">Impact</th>
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
        
        <AIWorkflow />
      </div>
    </div>
  );
}
