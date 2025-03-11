
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
  Layers,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NodeInspector } from './NodeInspector';
import { Badge } from '@/components/ui/badge';

export function AgentSidebar() {
  const { selectedNode, isRunning } = useAgent();

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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Market Data
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Financial Analysis
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Sentiment Analysis
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Portfolio Optimization
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Risk Assessment
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
                  <div className="text-sm font-medium text-white flex items-center gap-1">
                    Alpha Scoring
                    <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                  </div>
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
            
            {isRunning && (
              <div className="mt-6 p-3 border border-alpha-green/20 bg-alpha-green/10 rounded-md animate-pulse">
                <div className="flex items-center text-alpha-green mb-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Workflow Running</span>
                </div>
                <p className="text-xs text-alpha-green/80">
                  The workflow is currently being executed. Check the console for detailed progress.
                </p>
              </div>
            )}
            
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-white/50" />
                <h3 className="text-white/80 text-xs font-medium">AI Models Available</h3>
              </div>
              <div className="text-xs text-white/60 space-y-1">
                <p>• GPT-4o (Balanced)</p>
                <p>• Claude 3 Opus (Powerful)</p>
                <p>• AlphaU Sentiment v2 (Specialized)</p>
                <p>• And 6 more models...</p>
                <p className="italic text-white/40 mt-2">Select a node to change its model</p>
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
