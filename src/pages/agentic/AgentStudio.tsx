
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentWorkflow } from "@/components/agentic/AgentWorkflow";
import { AgentSidebar } from "@/components/agentic/AgentSidebar";
import { AgentHeader } from "@/components/agentic/AgentHeader";
import { useToast } from "@/hooks/use-toast";
import { AgentProvider } from "@/components/agentic/AgentContext";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserGuideModal } from "@/components/agentic/UserGuideModal";

const AgentStudio = () => {
  const { toast } = useToast();
  const [showUserGuide, setShowUserGuide] = useState(false);
  
  return (
    <DashboardLayout>
      <AgentProvider>
        <div className="h-full flex flex-col">
          <AgentHeader />
          <div className="flex-1 flex overflow-hidden">
            <AgentSidebar />
            <AgentWorkflow />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-5 right-5 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy"
            onClick={() => setShowUserGuide(true)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            How to Use
          </Button>
          <UserGuideModal open={showUserGuide} onOpenChange={setShowUserGuide} />
        </div>
      </AgentProvider>
    </DashboardLayout>
  );
};

export default AgentStudio;
