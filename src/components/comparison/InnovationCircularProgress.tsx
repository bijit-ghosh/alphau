
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles } from "lucide-react";
import { CircularProgress } from "../ui/CircularProgress";
import { motion } from "framer-motion";

interface ComparisonItem {
  feature: string;
  traditional: string;
  alphau: string;
  impact: string;
  highlight: boolean;
  impactValue: number;
  energyEfficiency: number;
  innovationScore: number;
}

interface InnovationCircularProgressProps {
  data: ComparisonItem[];
}

export function InnovationCircularProgress({ data }: InnovationCircularProgressProps) {
  const getColor = (index: number, value: number) => {
    // Base colors
    const baseColors = [
      "#0057B7", // Blue
      "#1D85FF", // Light Blue
      "#6C4BEF", // Purple
      "#22C55E", // Green
    ];
    
    // Return base color based on index
    return baseColors[index % baseColors.length];
  };

  return (
    <GlassCard className="p-6 animate-on-scroll" highlightTop highlightColor="from-alpha-purple to-alpha-blue">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 mr-2 text-alpha-purple" />
        <h3 className="text-xl font-semibold text-white">Rapid Innovation</h3>
      </div>
      <p className="text-gray-300 mb-6 mx-auto text-center max-w-[90%]">
        Innovation scores across investment processes
      </p>
      <div className="grid grid-cols-2 gap-6 mt-2 mb-4">
        {data.map((item, i) => (
          <motion.div 
            key={i} 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <CircularProgress 
              value={item.innovationScore} 
              max={100}
              size={i === 3 ? 90 : 80} 
              strokeWidth={10}
              color={getColor(i, item.innovationScore)}
              backgroundColor="rgba(255,255,255,0.1)"
              textClassName="text-white text-lg font-bold"
              animate={true}
            />
            <div className="flex flex-col items-center mt-3">
              <span className="text-sm text-white font-medium mb-1">{item.feature}</span>
              <motion.div 
                className="h-1 w-16 rounded-full bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${getColor(i, item.innovationScore)}88, ${getColor(i, item.innovationScore)})`
                }}
                initial={{ width: 0 }}
                animate={{ width: '4rem' }}
                transition={{ duration: 0.7, delay: 0.3 + (i * 0.1) }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Explanation legend */}
      <motion.div 
        className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-1 text-xs text-gray-300">
          <Sparkles className="w-3 h-3 text-alpha-purple mr-1" />
          <span>Higher scores indicate greater innovation potential</span>
        </div>
      </motion.div>
    </GlassCard>
  );
}
