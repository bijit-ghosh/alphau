
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Sector } from "recharts";
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
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#ffffff" fontSize="16px" fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#ffffff" fontSize="14px">
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

  const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    const isActive = index === activeIndex;

    return (
      <text 
        x={x} 
        y={y} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fill="white"
        fontSize={isActive ? "13px" : "12px"}
        fontWeight={isActive ? "bold" : "normal"}
        opacity={isActive ? 1 : 0.9}
      >
        {name}: {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
              labelLine={false}
              label={customLabel}
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
      
      {/* Interactive hint text */}
      <motion.p 
        className="text-center text-xs text-gray-400 mt-2"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Hover over segments for details
      </motion.p>
    </GlassCard>
  );
}
