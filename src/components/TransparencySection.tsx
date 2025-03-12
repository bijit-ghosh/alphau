
import React from "react";
import { Eye, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function TransparencySection() {
  return (
    <div className="py-20 px-4 md:px-8 bg-alpha-darknavy relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-alpha-blue/5 rounded-full filter blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-alpha-purple/5 rounded-full filter blur-3xl -translate-x-1/2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-left mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-6 w-6 text-alpha-blue" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Total <span className="bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">Transparency</span>
            </h2>
          </div>
          <p className="text-gray-300">
            See the work — trace every action that AI takes
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-alpha-blue flex items-center justify-center rounded-md">
                <span className="text-xs text-white font-semibold">AI</span>
              </div>
              <p className="text-sm text-white font-medium">Action Details</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-300 font-mono mb-2">// Investment Risk Analysis</p>
              <p className="text-xs text-gray-300 font-mono">
                <span className="text-alpha-blue">function</span> <span className="text-alpha-purple">analyzeRisk</span>(data) {`{`} <br/>
                &nbsp;&nbsp;<span className="text-alpha-blue">const</span> riskScore = data.volatility * 0.4 + data.marketCondition * 0.3 + data.sectorTrend * 0.3; <br/>
                &nbsp;&nbsp;<span className="text-alpha-blue">return</span> {`{`} score: riskScore, confidence: 0.92 {`}`}; <br/>
                {`}`}
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-3 py-2 text-gray-400 font-medium">Timestamp</th>
                  <th className="text-left px-3 py-2 text-gray-400 font-medium">Action Performed</th>
                  <th className="text-left px-3 py-2 text-gray-400 font-medium">Confidence</th>
                  <th className="text-left px-3 py-2 text-gray-400 font-medium">Risk Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "09:45:22", action: "Data Collection", confidence: "High", risk: "Low", confColor: "bg-green-500", riskColor: "bg-green-500" },
                  { time: "09:46:05", action: "Market Analysis", confidence: "High", risk: "Medium", confColor: "bg-green-500", riskColor: "bg-yellow-500" },
                  { time: "09:47:18", action: "Risk Assessment", confidence: "Medium", risk: "High", confColor: "bg-yellow-500", riskColor: "bg-red-500" },
                  { time: "09:48:30", action: "Recommendation", confidence: "High", risk: "Medium", confColor: "bg-green-500", riskColor: "bg-yellow-500" },
                  { time: "09:49:45", action: "Report Generation", confidence: "High", risk: "Low", confColor: "bg-green-500", riskColor: "bg-green-500" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-3 py-2 text-gray-400">{row.time}</td>
                    <td className="px-3 py-2 text-white">{row.action}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs text-white ${row.confColor}`}>
                        {row.confidence}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs text-white ${row.riskColor}`}>
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
