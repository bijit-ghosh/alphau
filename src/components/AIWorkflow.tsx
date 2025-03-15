
import { Brain, Database, LineChart, Cpu, ArrowRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

export function AIWorkflow() {
  const steps = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Ingestion",
      description: "Real-time processing of market data, financial statements, and alternative data sources"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Analysis",
      description: "Multi-model AI system analyzes patterns, risks, and opportunities"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Predictive Modeling",
      description: "Generate forward-looking scenarios and investment outcomes"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AlphaScore™",
      description: "Automated scoring system provides actionable investment recommendations"
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          How AlphaU's AI Agent Works
        </h3>
        <p className="max-w-2xl mx-auto text-gray-300">
          Our advanced AI pipeline transforms raw data into actionable investment intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <GlassCard className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gradient-to-r from-alpha-blue/20 to-alpha-purple/20 mb-4">
                  {step.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            </GlassCard>
            
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-alpha-purple/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
