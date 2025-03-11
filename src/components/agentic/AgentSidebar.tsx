
import React from 'react';
import { useAgent } from './AgentContext';
import { 
  TrendingUp, 
  Brain, 
  LineChart, 
  Shield, 
  Gauge, 
  Zap, 
  SendToBack, 
  Settings, 
  Layers
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { NodeInspector } from './NodeInspector';

export function AgentSidebar() {
  const { selectedNode } = useAgent();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 h-full bg-alpha-darknavy border-r border-white/5 flex flex-col overflow-auto">
      <Tabs defaultValue="nodes" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-2 bg-alpha-darknavy border-b border-white/5">
          <TabsTrigger value="nodes" className="data-[state=active]:bg-alpha-blue/10">
            <Layers className="h-4 w-4 mr-2" /> Nodes
          </TabsTrigger>
          <TabsTrigger value="inspector" className="data-[state=active]:bg-alpha-blue/10">
            <Settings className="h-4 w-4 mr-2" /> Inspector
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nodes" className="flex-1 overflow-auto p-0">
          <div className="p-4">
            <h3 className="text-white text-sm font-medium mb-2">AlphaU Node Types</h3>
            <p className="text-white/60 text-xs mb-4">Drag nodes to the canvas to build your workflow</p>
          
            <div className="space-y-2">
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'trigger')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-purple/20">
                  <Zap className="h-4 w-4 text-alpha-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Trigger</div>
                  <div className="text-xs text-white/60">Start workflow execution</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'marketData')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-blue/20">
                  <TrendingUp className="h-4 w-4 text-alpha-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Market Data</div>
                  <div className="text-xs text-white/60">Fetch market data</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'financialAnalysis')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-lightblue/20">
                  <LineChart className="h-4 w-4 text-alpha-lightblue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Financial Analysis</div>
                  <div className="text-xs text-white/60">Analyze financial data</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'sentimentAnalysis')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-purple/20">
                  <Brain className="h-4 w-4 text-alpha-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Sentiment Analysis</div>
                  <div className="text-xs text-white/60">Analyze market sentiment</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'portfolioOptimization')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-green/20">
                  <LineChart className="h-4 w-4 text-alpha-green" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Portfolio Optimization</div>
                  <div className="text-xs text-white/60">Optimize asset allocation</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'riskAssessment')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-yellow/20">
                  <Shield className="h-4 w-4 text-alpha-yellow" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Risk Assessment</div>
                  <div className="text-xs text-white/60">Evaluate investment risks</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'alphaScoring')}
              >
                <div className="p-1 mr-2 rounded bg-alpha-yellow/20">
                  <Gauge className="h-4 w-4 text-alpha-yellow" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Alpha Scoring</div>
                  <div className="text-xs text-white/60">Generate AlphaScore™</div>
                </div>
              </div>
              
              <div 
                className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                draggable
                onDragStart={(e) => onDragStart(e, 'output')}
              >
                <div className="p-1 mr-2 rounded bg-gray-500/20">
                  <SendToBack className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Output</div>
                  <div className="text-xs text-white/60">Process final results</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inspector" className="flex-1 overflow-auto p-4">
          {selectedNode ? (
            <NodeInspector node={selectedNode} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Settings className="h-10 w-10 text-white/20 mb-2" />
              <h3 className="text-white/60 text-sm">No node selected</h3>
              <p className="text-white/40 text-xs mt-1">
                Select a node in the workflow to configure it
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
