
import { Brain, Database, LineChart, Cpu, ArrowRight, Target, ShieldCheck, Calculator, BarChart, ExternalLink, Workflow } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

export function AIWorkflow() {
  const steps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Sourcing & Screening",
      description: "Identify high-potential investments through real-time data analysis"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Due Diligence",
      description: "Comprehensive risk assessment to evaluate deal viability"
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Valuation & Decisioning",
      description: "Financial modeling with AI-driven scenario analysis"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Portfolio Management",
      description: "Post-investment optimization and performance tracking"
    },
    {
      icon: <ExternalLink className="h-6 w-6" />,
      title: "Exit Strategy",
      description: "Maximize returns with optimal timing and method"
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "End-to-End Orchestration",
      description: "Seamless AI workflow across all investment stages"
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          AlphaU's Investment Lifecycle AI
        </h3>
        <p className="max-w-2xl mx-auto text-gray-300">
          Our advanced AI pipeline transforms raw data into actionable investment intelligence across the entire deal lifecycle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
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
