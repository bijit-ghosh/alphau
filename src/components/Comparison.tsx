
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AIWorkflow } from "./AIWorkflow";
import { comparisonData, getBarChartData, getPieChartData } from "./comparison/ComparisonData";
import { ComparisonFeatureCard } from "./comparison/ComparisonFeatureCard";
import { ImpactBarChart } from "./comparison/ImpactBarChart";
import { EnergyEfficiencyPieChart } from "./comparison/EnergyEfficiencyPieChart";
import { InnovationCircularProgress } from "./comparison/InnovationCircularProgress";

export function Comparison() {
  const comparisonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("active");
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
  
  const barData = getBarChartData(comparisonData);
  const pieData = getPieChartData();

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comparisonData.map((item, i) => (
            <ComparisonFeatureCard 
              key={i}
              feature={item.feature}
              alphau={item.alphau}
              impact={item.impact}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" ref={comparisonRef}>
          <ImpactBarChart data={barData} />
          <EnergyEfficiencyPieChart data={pieData} />
          <InnovationCircularProgress data={comparisonData} />
        </div>
        
        <AIWorkflow />
      </div>
    </div>
  );
}
