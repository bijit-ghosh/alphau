
import React from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

type RiskLevel = "low" | "medium" | "high" | "critical";

interface RiskIndicatorProps {
  title: string;
  value: number;
  threshold: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  description?: string;
  inverse?: boolean;
}

export function RiskIndicator({ 
  title, 
  value, 
  threshold, 
  description, 
  inverse = false 
}: RiskIndicatorProps) {
  const getRiskLevel = (): RiskLevel => {
    if (inverse) {
      if (value >= threshold.low) return "low";
      if (value >= threshold.medium) return "medium";
      if (value >= threshold.high) return "high";
      return "critical";
    } else {
      if (value <= threshold.low) return "low";
      if (value <= threshold.medium) return "medium";
      if (value <= threshold.high) return "high";
      return "critical";
    }
  };

  const riskLevel = getRiskLevel();
  
  const riskColors = {
    low: {
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: <CheckCircle className="h-5 w-5 text-green-400" />
    },
    medium: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />
    },
    high: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      icon: <AlertTriangle className="h-5 w-5 text-orange-400" />
    },
    critical: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: <XCircle className="h-5 w-5 text-red-400" />
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className={cn(
        "p-4 relative overflow-hidden",
        riskColors[riskLevel].bg,
        riskColors[riskLevel].border
      )}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {riskColors[riskLevel].icon}
        </div>
        
        <div className="flex items-baseline">
          <span className={cn("text-3xl font-bold", riskColors[riskLevel].text)}>
            {value}%
          </span>
          <span className="ml-2 text-sm text-gray-300">
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </span>
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-300">{description}</p>
        )}
        
        <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className={cn(
              "h-full rounded-full",
              riskLevel === "low" ? "bg-green-400" :
              riskLevel === "medium" ? "bg-yellow-400" :
              riskLevel === "high" ? "bg-orange-400" : "bg-red-400"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}
