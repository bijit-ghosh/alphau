
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentWorkflow } from "@/components/agentic/AgentWorkflow";
import { AgentSidebar } from "@/components/agentic/AgentSidebar";
import { AgentHeader } from "@/components/agentic/AgentHeader";
import { useToast } from "@/hooks/use-toast";
import { AgentProvider } from "@/components/agentic/AgentContext";
import { HelpCircle, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserGuideModal } from "@/components/agentic/UserGuideModal";
import { MarketplacePanel } from "@/components/agentic/MarketplacePanel";
import { DataUploadPanel } from "@/components/agentic/DataUploadPanel";
import { ModelConfigPanel } from "@/components/agentic/ModelConfigPanel";
import { DebuggingPanel } from "@/components/agentic/DebuggingPanel";
import { LiveChart } from "@/components/dashboard/LiveChart";

const AgentStudio = () => {
  const { toast } = useToast();
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showDemoCharts, setShowDemoCharts] = useState(false);
  
  // Demo data for investment chart
  const investmentData = [
    { name: "Q1", value: 850, alpha: 5.2 },
    { name: "Q2", value: 920, alpha: 7.8 },
    { name: "Q3", value: 980, alpha: 6.5 },
    { name: "Q4", value: 1060, alpha: 9.2 },
    { name: "Q1", value: 1150, alpha: 10.5 },
    { name: "Q2", value: 1290, alpha: 12.1 },
  ];
  
  return (
    <DashboardLayout>
      <AgentProvider>
        <div className="h-full flex flex-col">
          <AgentHeader />
          <div className="flex-1 flex overflow-hidden">
            <AgentSidebar />
            <div className="flex-1 flex flex-col overflow-auto">
              <AgentWorkflow />
              
              {showDemoCharts && (
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LiveChart
                    title="Investment Portfolio Performance"
                    data={investmentData}
                    dataKey="value"
                    color="#6C4BEF"
                    secondaryColor="#0057B7"
                    type="area"
                    valueLabel="Value ($M)"
                    showChange={true}
                    changeValue={12.1}
                    height={250}
                    tooltipFormatter={(value) => `$${value}M`}
                  />
                  <LiveChart
                    title="Alpha Generation"
                    data={investmentData}
                    dataKey="alpha"
                    color="#00C2A8"
                    secondaryColor="#6C4BEF"
                    type="line"
                    valueLabel="Alpha (%)"
                    showChange={true}
                    changeValue={8.6}
                    height={250}
                    tooltipFormatter={(value) => `${value}%`}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Toggle Charts Button */}
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-5 left-5 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy"
            onClick={() => setShowDemoCharts(!showDemoCharts)}
          >
            <PieChart className="h-4 w-4 mr-2" />
            {showDemoCharts ? "Hide Results" : "Show Results"}
          </Button>
          
          {/* User Guide Button */}
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-5 right-5 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy"
            onClick={() => setShowUserGuide(true)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            How to Use
          </Button>
          
          {/* Integration Panels */}
          <MarketplacePanel />
          <DataUploadPanel />
          <ModelConfigPanel />
          <DebuggingPanel />
          
          {/* Modals */}
          <UserGuideModal open={showUserGuide} onOpenChange={setShowUserGuide} />
        </div>
      </AgentProvider>
    </DashboardLayout>
  );
};

export default AgentStudio;
