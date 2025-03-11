
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { Zap } from "lucide-react";

interface EnergyEfficiencyPieChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export function EnergyEfficiencyPieChart({ data }: EnergyEfficiencyPieChartProps) {
  return (
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
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
  );
}
