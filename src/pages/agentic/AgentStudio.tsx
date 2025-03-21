
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentWorkflow } from "@/components/agentic/AgentWorkflow";
import { AgentSidebar } from "@/components/agentic/AgentSidebar";
import { AgentHeader } from "@/components/agentic/AgentHeader";
import { useToast } from "@/hooks/use-toast";
import { AgentProvider } from "@/components/agentic/AgentContext";
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserGuideModal } from "@/components/agentic/UserGuideModal";
import { MarketplacePanel } from "@/components/agentic/MarketplacePanel";
import { DataUploadPanel } from "@/components/agentic/DataUploadPanel";
import { ModelConfigPanel } from "@/components/agentic/ModelConfigPanel";
import { DebuggingPanel } from "@/components/agentic/DebuggingPanel";
import { InvestmentWorkflowScreenshots } from "@/components/agentic/InvestmentWorkflowScreenshots";

const AgentStudio = () => {
  const { toast } = useToast();
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);
  
  return (
    <DashboardLayout>
      <AgentProvider>
        <div className="h-full flex flex-col">
          <AgentHeader />
          <div className="flex-1 flex overflow-hidden">
            <AgentSidebar />
            {showScreenshots ? (
              <div className="flex-1 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 left-2 z-10 bg-alpha-darknavy/60 text-white hover:bg-alpha-darknavy"
                  onClick={() => setShowScreenshots(false)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Workflow Editor
                </Button>
                <InvestmentWorkflowScreenshots />
              </div>
            ) : (
              <div className="flex-1 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10 bg-alpha-darknavy/60 text-white hover:bg-alpha-darknavy"
                  onClick={() => setShowScreenshots(true)}
                >
                  View Investment Workflow Examples
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <AgentWorkflow />
              </div>
            )}
          </div>
          
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
