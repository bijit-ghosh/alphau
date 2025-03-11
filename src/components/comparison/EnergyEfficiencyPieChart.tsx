
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface EnergyEfficiencyPieChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.9}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        fill={fill}
        opacity={0.4}
      />
      <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill="#ffffff" fontSize="16px" fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#ffffff" fontSize="14px">
        {`${value}%`}
      </text>
    </g>
  );
};

export function EnergyEfficiencyPieChart({ data }: EnergyEfficiencyPieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <GlassCard className="p-6 animate-on-scroll" highlightTop highlightColor="from-alpha-yellow to-alpha-purple">
      <div className="flex items-center mb-4">
        <Zap className="w-5 h-5 mr-2 text-alpha-yellow" />
        <h3 className="text-xl font-semibold text-white">Energy Efficiency</h3>
      </div>
      <p className="text-gray-300 mb-6 mx-auto text-center max-w-[90%]">
        Resource optimization by implementation area
      </p>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  strokeWidth={index === activeIndex ? 2 : 1}
                  stroke={index === activeIndex ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 25, 47, 0.95)', 
                border: '1px solid rgba(108, 75, 239, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
              labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}
              itemStyle={{ color: 'white', padding: '2px 0' }}
              formatter={(value) => [`${value}%`, 'Efficiency']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend items with animation */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((entry, index) => (
          <motion.div 
            key={index}
            className={`flex items-center p-2 rounded-md cursor-pointer ${index === activeIndex ? 'bg-white/10' : ''}`}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            onClick={() => setActiveIndex(index)}
          >
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-sm text-white">{entry.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Interactive hint text */}
      <motion.p 
        className="text-center text-xs text-gray-400 mt-4"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click segments for details
      </motion.p>
    </GlassCard>
  );
}
