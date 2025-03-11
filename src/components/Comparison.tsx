import { useEffect, useRef } from "react";
import { Check, LineChart, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AIWorkflow } from "./AIWorkflow";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar } from "recharts";
import { CircularProgress } from "./ui/CircularProgress";

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
  
  const comparisonData = [
    {
      feature: "Deal Sourcing",
      traditional: "Manual research and outreach",
      alphau: "AI-powered real-time deal discovery",
      impact: "3.5x higher deal flow volume",
      highlight: true,
      impactValue: 350,
      energyEfficiency: 80,
      innovationScore: 92,
    },
    {
      feature: "Financial Modeling",
      traditional: "Excel-based manual modeling",
      alphau: "AI-automated scenario modeling",
      impact: "95% faster analysis time",
      highlight: true,
      impactValue: 95,
      energyEfficiency: 75,
      innovationScore: 88,
    },
    {
      feature: "Risk Intelligence",
      traditional: "Limited risk factor analysis",
      alphau: "AI-driven predictive insights",
      impact: "40% better risk prediction",
      highlight: true,
      impactValue: 40,
      energyEfficiency: 65,
      innovationScore: 78,
    },
    {
      feature: "Decision Execution",
      traditional: "Subjective decision making",
      alphau: "Data-driven AlphaScore™",
      impact: "85% more accurate decisions",
      highlight: true,
      impactValue: 85,
      energyEfficiency: 90,
      innovationScore: 95,
    }
  ];

  const barData = comparisonData.map(item => ({
    name: item.feature,
    value: item.impactValue,
    fill: "#0057B7"
  }));

  const pieData = [
    { name: "Deal Sourcing", value: 80, fill: "#0057B7" },
    { name: "Financial Modeling", value: 75, fill: "#1D85FF" },
    { name: "Risk Intelligence", value: 65, fill: "#6C4BEF" },
    { name: "Decision Execution", value: 90, fill: "#22C55E" },
  ];

  const radialData = comparisonData.map((item, index) => ({
    name: item.feature,
    value: item.innovationScore,
    fill: index === 0 ? "#0057B7" : 
          index === 1 ? "#1D85FF" : 
          index === 2 ? "#6C4BEF" : "#22C55E",
  }));

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
            <GlassCard key={i} className="flex flex-col p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">{item.feature}</h3>
              <div className="flex items-center text-gray-300">
                <div className="flex-shrink-0 p-1 mr-3 rounded-full bg-green-500/20">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                {item.alphau}
              </div>
              <div className="mt-auto">
                <span className="inline-block px-4 py-2 rounded-full text-sm bg-alpha-blue text-white font-medium border border-alpha-blue/50">
                  {item.impact}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" ref={comparisonRef}>
          {/* Impact Graph */}
          <GlassCard className="p-6 animate-on-scroll">
            <div className="flex items-center mb-4">
              <LineChart className="w-5 h-5 mr-2 text-alpha-blue" />
              <h3 className="text-xl font-semibold text-white">Impact</h3>
            </div>
            <p className="text-gray-300 mb-6">Performance improvement over traditional methods</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" domain={[0, 350]} stroke="rgba(255,255,255,0.5)" />
                  <YAxis dataKey="name" type="category" width={100} stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A192F', border: '1px solid rgba(255,255,255,0.1)' }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => [`${value}%`, 'Improvement']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          
          {/* Energy Efficiency */}
          <GlassCard className="p-6 animate-on-scroll">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 mr-2 text-alpha-yellow" />
              <h3 className="text-xl font-semibold text-white">Energy Efficiency</h3>
            </div>
            <p className="text-gray-300 mb-4 px-2 max-w-full break-words">
              Resource optimization by implementation area
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A192F', border: '1px solid rgba(255,255,255,0.1)' }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => [`${value}%`, 'Efficiency']}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          
          {/* Rapid Innovation */}
          <GlassCard className="p-6 animate-on-scroll">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 mr-2 text-alpha-purple" />
              <h3 className="text-xl font-semibold text-white">Rapid Innovation</h3>
            </div>
            <p className="text-gray-300 mb-6">Innovation scores across investment processes</p>
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {comparisonData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <CircularProgress 
                      value={item.innovationScore} 
                      max={100}
                      size={i === 3 ? 80 : 70} 
                      color={
                        i === 0 ? "#0057B7" : 
                        i === 1 ? "#1D85FF" : 
                        i === 2 ? "#6C4BEF" : "#22C55E"
                      }
                      backgroundColor="rgba(255,255,255,0.1)"
                      textClassName="text-white text-sm"
                    />
                    <span className="text-xs text-gray-300 mt-2 text-center">{item.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
        
        <AIWorkflow />
      </div>
    </div>
  );
}
