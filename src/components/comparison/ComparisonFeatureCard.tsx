
import { Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ComparisonFeatureCardProps {
  feature: string;
  alphau: string;
  impact: string;
}

export function ComparisonFeatureCard({ feature, alphau, impact }: ComparisonFeatureCardProps) {
  return (
    <GlassCard className="flex flex-col p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">{feature}</h3>
      <div className="flex items-center text-gray-300">
        <div className="flex-shrink-0 p-1 mr-3 rounded-full bg-green-500/20">
          <Check className="h-4 w-4 text-green-400" />
        </div>
        {alphau}
      </div>
      <div className="mt-auto">
        <span className="inline-block px-4 py-2 rounded-full text-sm bg-alpha-blue text-white font-medium border border-alpha-blue/50">
          {impact}
        </span>
      </div>
    </GlassCard>
  );
}
