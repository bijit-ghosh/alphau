
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { LineChart } from "lucide-react";

interface ImpactBarChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export function ImpactBarChart({ data }: ImpactBarChartProps) {
  return (
    <GlassCard className="p-6 animate-on-scroll">
      <div className="flex items-center mb-4">
        <LineChart className="w-5 h-5 mr-2 text-alpha-blue" />
        <h3 className="text-xl font-semibold text-white">Impact</h3>
      </div>
      <p className="text-gray-300 mb-6">Performance improvement over traditional methods</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
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
  );
}
