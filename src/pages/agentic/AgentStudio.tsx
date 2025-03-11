
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentWorkflow } from "@/components/agentic/AgentWorkflow";
import { AgentSidebar } from "@/components/agentic/AgentSidebar";
import { AgentHeader } from "@/components/agentic/AgentHeader";
import { useToast } from "@/hooks/use-toast";
import { AgentProvider } from "@/components/agentic/AgentContext";

const AgentStudio = () => {
  const { toast } = useToast();
  
  return (
    <DashboardLayout>
      <AgentProvider>
        <div className="h-full flex flex-col">
          <AgentHeader />
          <div className="flex-1 flex overflow-hidden">
            <AgentSidebar />
            <AgentWorkflow />
          </div>
        </div>
      </AgentProvider>
    </DashboardLayout>
  );
};

export default AgentStudio;
