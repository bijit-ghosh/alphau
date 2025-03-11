
import { useEffect, useRef } from "react";
import { AIWorkflow } from "./AIWorkflow";
import { comparisonData, getBarChartData, getPieChartData } from "./comparison/ComparisonData";
import { ComparisonFeatureCard } from "./comparison/ComparisonFeatureCard";
import { ImpactBarChart } from "./comparison/ImpactBarChart";
import { EnergyEfficiencyPieChart } from "./comparison/EnergyEfficiencyPieChart";
import { InnovationCircularProgress } from "./comparison/InnovationCircularProgress";
import { motion } from "framer-motion";

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
    <div id="comparison" className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-alpha-navy/5 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-alpha-blue/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-alpha-purple/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">AlphaU</span> Advantage
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Quantifiable business impact through AI-powered investment intelligence
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comparisonData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ComparisonFeatureCard 
                feature={item.feature}
                alphau={item.alphau}
                impact={item.impact}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 mb-16"
          ref={comparisonRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ImpactBarChart data={barData} />
          <EnergyEfficiencyPieChart data={pieData} />
          <InnovationCircularProgress data={comparisonData} />
        </motion.div>
        
        <AIWorkflow />
      </div>
    </div>
  );
}
