
import React from 'react';
import { useAgent } from './AgentContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Save, PlusCircle } from 'lucide-react';

export function AgentHeader() {
  const { 
    workflowName, 
    setWorkflowName, 
    saveWorkflow, 
    runWorkflow 
  } = useAgent();

  return (
    <div className="h-14 border-b border-white/5 bg-alpha-darknavy/80 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="flex items-center bg-alpha-blue/10 rounded-md p-1 mr-4">
          <div className="relative h-6 w-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF] rounded-full opacity-20 blur-sm"></div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF]">
              A
            </div>
          </div>
          <span className="text-xs font-medium text-white ml-1">Agent Studio</span>
        </div>
        
        <Input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="h-8 text-sm w-64 bg-alpha-darknavy border-white/10 text-white"
          placeholder="Workflow name"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs h-8 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white"
          onClick={() => {
            // Create new workflow logic would go here
            window.location.reload();
          }}
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          New
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs h-8 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white"
          onClick={saveWorkflow}
        >
          <Save className="h-3.5 w-3.5 mr-1" />
          Save
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          className="text-xs h-8 bg-alpha-blue hover:bg-alpha-blue/90 text-white"
          onClick={runWorkflow}
        >
          <Play className="h-3.5 w-3.5 mr-1" />
          Run Workflow
        </Button>
      </div>
    </div>
  );
}
