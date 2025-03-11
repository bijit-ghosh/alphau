
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { LineChart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface ImpactBarChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export function ImpactBarChart({ data }: ImpactBarChartProps) {
  return (
    <GlassCard className="p-6 animate-on-scroll" highlightTop highlightColor="from-alpha-blue to-alpha-lightblue">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-5 h-5 mr-2 text-alpha-blue" />
        <h3 className="text-xl font-semibold text-white">Impact</h3>
      </div>
      <p className="text-gray-300 mb-6 px-2">Performance improvement over traditional methods</p>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            barGap={8} 
            margin={{ right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number" 
              domain={[0, 350]} 
              stroke="rgba(255,255,255,0.5)"
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120} 
              stroke="rgba(255,255,255,0.5)"
              tickLine={false}
              axisLine={false}
              style={{ fill: '#e0e0e0', fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 25, 47, 0.95)', 
                border: '1px solid rgba(108, 75, 239, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
              labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}
              itemStyle={{ color: 'white', padding: '2px 0' }}
              formatter={(value: number) => [`${value}%`, 'Improvement']}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill}
                  radius={[0, 4, 4, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Add a subtle animated gradient at the bottom */}
      <motion.div 
        className="w-full h-1 mt-2 rounded-full bg-gradient-to-r from-alpha-blue via-alpha-purple to-alpha-blue"
        initial={{ opacity: 0.5, backgroundPosition: '0% 50%' }}
        animate={{ 
          opacity: 0.7, 
          backgroundPosition: '100% 50%',
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </GlassCard>
  );
}
