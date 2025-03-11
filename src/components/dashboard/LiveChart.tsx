
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, LineChart as LineChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color: string;
  secondaryColor?: string;
  type?: "line" | "area";
  valueLabel?: string;
  showChange?: boolean;
  changeValue?: number;
  height?: number;
  refreshInterval?: number;
  tooltipFormatter?: (value: number) => string;
}

export function LiveChart({
  title,
  data: initialData,
  dataKey,
  color,
  secondaryColor,
  type = "line",
  valueLabel = "Value",
  showChange = true,
  changeValue = 0,
  height = 300,
  refreshInterval = 2000,
  tooltipFormatter = (value) => `${value}`
}: LiveChartProps) {
  const [data, setData] = useState(initialData);
  const [isPositiveChange, setIsPositiveChange] = useState(changeValue >= 0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Create new data point
        const lastPoint = prevData[prevData.length - 1];
        const lastValue = lastPoint[dataKey];
        
        // Random fluctuation between -10% and +10% of the last value
        const fluctuation = lastValue * (Math.random() * 0.2 - 0.1);
        const newValue = Math.max(0, lastValue + fluctuation);
        
        // Calculate new change percentage
        const newChange = ((newValue - prevData[0][dataKey]) / prevData[0][dataKey]) * 100;
        setIsPositiveChange(newChange >= 0);
        
        // Add new point and remove oldest if needed
        const newDataPoint = {
          ...lastPoint,
          name: new Date().toLocaleTimeString(),
          [dataKey]: newValue
        };
        
        const newData = [...prevData.slice(1), newDataPoint];
        return newData;
      });
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [dataKey, refreshInterval]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <LineChartIcon className="mr-2 h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          
          {showChange && (
            <div className={cn(
              "flex items-center text-sm rounded-full px-2 py-0.5",
              isPositiveChange ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
            )}>
              {isPositiveChange ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(changeValue).toFixed(2)}%</span>
            </div>
          )}
        </div>
        
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: 'white' }}
                  formatter={(value: number) => [tooltipFormatter(value), valueLabel]}
                />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={500}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: 'white' }}
                  formatter={(value: number) => [tooltipFormatter(value), valueLabel]}
                />
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={secondaryColor || color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${title})`}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={500}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
}
