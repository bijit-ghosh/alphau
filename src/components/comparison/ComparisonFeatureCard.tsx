
import { Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

interface ComparisonFeatureCardProps {
  feature: string;
  alphau: string;
  impact: string;
}

export function ComparisonFeatureCard({ feature, alphau, impact }: ComparisonFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <GlassCard className="flex flex-col p-6 space-y-4 h-full relative overflow-hidden">
        {/* Subtle animated gradient background */}
        <div 
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-alpha-blue via-alpha-purple to-transparent rounded-xl -z-10"
          style={{ 
            backgroundSize: '200% 200%',
            animation: 'gradientAnimation 8s ease infinite'
          }}
        />
        
        <h3 className="text-xl font-semibold text-white">{feature}</h3>
        
        <div className="flex items-center text-gray-300">
          <div className="flex-shrink-0 p-1 mr-3 rounded-full bg-green-500/20">
            <Check className="h-4 w-4 text-green-400" />
          </div>
          <div className="max-w-full break-words">{alphau}</div>
        </div>
        
        <div className="mt-auto">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full text-sm bg-alpha-blue text-white font-medium border border-alpha-blue/50"
            whileHover={{ 
              backgroundColor: '#1D85FF', 
              boxShadow: '0 0 12px rgba(29, 133, 255, 0.5)'
            }}
          >
            {impact}
          </motion.span>
        </div>
        
        {/* Add pulsing highlight effect at the top right */}
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple opacity-70">
          <div className="absolute inset-0 rounded-full animate-ping bg-alpha-blue opacity-75"></div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
