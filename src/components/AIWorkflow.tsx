
import { Search, Filter, BarChart, FileText, Briefcase, Lock, MessageSquare } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

export function AIWorkflow() {
  const steps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Sourcing",
      description: "Screen potential deals across Pitchbook, Crunchbase, and proprietary databases"
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Screening",
      description: "Detailed evaluation of deals with AI-powered metrics and scoring"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Scoring & Simulation",
      description: "Run scenarios and adjust parameters for dynamic investment scoring"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Recommendations",
      description: "AI-generated insights, due diligence tasks, and founder FAQ preparation"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Portfolio Management",
      description: "Optimize existing investments with valuation monitoring and growth tracking"
    }
  ];

  const features = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Secure Vault",
      description: "Enterprise-grade storage for confidential investment documents"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Collaboration",
      description: "Integrated data room and chat for seamless team communication"
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          AlphaU's End-to-End Investment Workflow
        </h3>
        <p className="max-w-2xl mx-auto text-gray-300">
          An intelligent platform for the entire investment lifecycle, from deal sourcing to portfolio optimization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
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
                <div className="w-6 h-0.5 bg-alpha-purple/50"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center mb-6">
        <h4 className="text-xl font-semibold text-white mb-4">Enterprise-Grade Features</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {features.map((feature, index) => (
          <GlassCard key={index} className="h-full">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-alpha-yellow/20 to-alpha-green/20 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
