
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles } from "lucide-react";
import { CircularProgress } from "../ui/CircularProgress";

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
  return (
    <GlassCard className="p-6 animate-on-scroll">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 mr-2 text-alpha-purple" />
        <h3 className="text-xl font-semibold text-white">Rapid Innovation</h3>
      </div>
      <p className="text-gray-300 mb-6">Innovation scores across investment processes</p>
      <div className="h-64 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {data.map((item, i) => (
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
  );
}
