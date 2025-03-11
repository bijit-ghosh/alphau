
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveChart } from "@/components/dashboard/LiveChart";
import { RiskIndicator } from "@/components/dashboard/RiskIndicator";
import { comparisonData } from "@/components/comparison/ComparisonData";
import { ComparisonFeatureCard } from "@/components/comparison/ComparisonFeatureCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  TrendingUp, 
  PieChart, 
  AlertTriangle, 
  DollarSign, 
  BarChart3 
} from "lucide-react";

// Sample data for live charts
const generateSampleData = (length: number, baseValue: number, volatility: number = 0.1) => {
  const data = [];
  let value = baseValue;
  
  for (let i = 0; i < length; i++) {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (length - i));
    
    value = value + (value * (Math.random() * volatility * 2 - volatility));
    
    data.push({
      name: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: value
    });
  }
  
  return data;
};

const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState(generateSampleData(12, 75, 0.05));
  const [marketData, setMarketData] = useState(generateSampleData(12, 850, 0.08));
  const [volumeData, setVolumeData] = useState(generateSampleData(12, 120, 0.1));
  const { toast } = useToast();

  // Show a toast notification when data updates
  useEffect(() => {
    toast({
      title: "Dashboard Updated",
      description: "Real-time data has been refreshed",
      duration: 3000,
    });
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header Section */}
        <section id="home" className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investment Dashboard</h1>
          <p className="text-gray-300">Real-time analytics and performance monitoring</p>
        </section>

        {/* Risk Indicators */}
        <section id="risks" className="mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Risk Analysis</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <RiskIndicator 
              title="Market Volatility" 
              value={65} 
              threshold={{ low: 30, medium: 50, high: 70, critical: 90 }}
              description="Current market conditions show increased volatility"
            />
            <RiskIndicator 
              title="Liquidity Risk" 
              value={28} 
              threshold={{ low: 30, medium: 50, high: 70, critical: 90 }}
              description="Low risk of liquidity constraints"
            />
            <RiskIndicator 
              title="Credit Exposure" 
              value={45} 
              threshold={{ low: 30, medium: 50, high: 70, critical: 90 }}
              description="Moderate credit risk levels"
            />
            <RiskIndicator 
              title="Investment Stability" 
              value={82} 
              threshold={{ low: 30, medium: 50, high: 70, critical: 90 }}
              inverse={true}
              description="Portfolio stability score is high"
            />
          </div>
        </section>

        {/* Performance Metrics */}
        <section id="performance" className="mb-8">
          <div className="flex items-center mb-4">
            <Activity className="mr-2 h-5 w-5 text-alpha-blue" />
            <h2 className="text-xl font-semibold text-white">Performance Metrics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveChart 
              title="Portfolio Performance"
              data={performanceData}
              dataKey="value"
              color="#1D85FF"
              secondaryColor="#0057B7"
              type="area"
              valueLabel="Performance Score"
              changeValue={5.8}
              tooltipFormatter={(value) => `${value.toFixed(2)}`}
            />
            <LiveChart 
              title="Market Value ($USD)"
              data={marketData}
              dataKey="value"
              color="#6C4BEF"
              secondaryColor="#0057B7"
              type="area"
              valueLabel="USD"
              changeValue={-2.3}
              tooltipFormatter={(value) => `$${value.toFixed(2)}`}
            />
          </div>
        </section>

        {/* Market Trends */}
        <section id="trends" className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Market Trends</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <LiveChart 
              title="Trading Volume"
              data={volumeData}
              dataKey="value"
              color="#22C55E"
              secondaryColor="#0057B7"
              type="line"
              valueLabel="Volume"
              changeValue={12.5}
              tooltipFormatter={(value) => `${value.toFixed(0)}`}
            />
          </div>
        </section>

        {/* Feature Comparison */}
        <section id="comparison" className="mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="mr-2 h-5 w-5 text-alpha-yellow" />
            <h2 className="text-xl font-semibold text-white">AlphaU Advantage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonData.map((item, i) => (
              <ComparisonFeatureCard 
                key={i}
                feature={item.feature}
                alphau={item.alphau}
                impact={item.impact}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
