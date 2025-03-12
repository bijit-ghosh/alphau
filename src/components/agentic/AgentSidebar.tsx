
import React, { useState } from 'react';
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
  AlertCircle,
  Database,
  Server,
  Share,
  FileSpreadsheet,
  BarChart,
  Mail
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NodeInspector } from './NodeInspector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define a proper type for node objects to avoid TypeScript errors
interface NodeItem {
  type: string;
  icon: React.ReactNode;
  bgColor: string;
  label: string;
  description: string;
  category: string;
  ai?: boolean; // Make ai property optional
}

export function AgentSidebar() {
  const { selectedNode, isRunning } = useAgent();
  const [activeNodeCategory, setActiveNodeCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filterNodes = (category: string) => {
    setActiveNodeCategory(category);
  };

  const filteredNodes = (): NodeItem[] => {
    const nodes: Record<string, NodeItem> = {
      trigger: {
        type: 'trigger',
        icon: <Zap className="h-4 w-4 text-alpha-purple" />,
        bgColor: 'bg-alpha-purple/20',
        label: 'Trigger',
        description: 'Start workflow execution',
        category: 'core'
      },
      marketData: {
        type: 'marketData',
        icon: <TrendingUp className="h-4 w-4 text-alpha-blue" />,
        bgColor: 'bg-alpha-blue/20',
        label: 'Market Data',
        description: 'Fetch market data',
        category: 'finance',
        ai: true
      },
      financialAnalysis: {
        type: 'financialAnalysis',
        icon: <LineChart className="h-4 w-4 text-alpha-lightblue" />,
        bgColor: 'bg-alpha-lightblue/20',
        label: 'Financial Analysis',
        description: 'Analyze financial data',
        category: 'finance',
        ai: true
      },
      sentimentAnalysis: {
        type: 'sentimentAnalysis',
        icon: <Brain className="h-4 w-4 text-alpha-purple" />,
        bgColor: 'bg-alpha-purple/20',
        label: 'Sentiment Analysis',
        description: 'Analyze market sentiment',
        category: 'finance',
        ai: true
      },
      portfolioOptimization: {
        type: 'portfolioOptimization',
        icon: <LineChart className="h-4 w-4 text-alpha-green" />,
        bgColor: 'bg-alpha-green/20',
        label: 'Portfolio Optimization',
        description: 'Optimize asset allocation',
        category: 'finance',
        ai: true
      },
      riskAssessment: {
        type: 'riskAssessment',
        icon: <Shield className="h-4 w-4 text-alpha-yellow" />,
        bgColor: 'bg-alpha-yellow/20',
        label: 'Risk Assessment',
        description: 'Evaluate investment risks',
        category: 'finance',
        ai: true
      },
      alphaScoring: {
        type: 'alphaScoring',
        icon: <Gauge className="h-4 w-4 text-alpha-yellow" />,
        bgColor: 'bg-alpha-yellow/20',
        label: 'Alpha Scoring',
        description: 'Generate AlphaScore™',
        category: 'finance',
        ai: true
      },
      databaseConnector: {
        type: 'databaseConnector',
        icon: <Database className="h-4 w-4 text-blue-400" />,
        bgColor: 'bg-blue-400/20',
        label: 'Database Connector',
        description: 'Connect to databases',
        category: 'integration'
      },
      apiIntegration: {
        type: 'apiIntegration',
        icon: <Share className="h-4 w-4 text-purple-400" />,
        bgColor: 'bg-purple-400/20',
        label: 'API Integration',
        description: 'Connect to external APIs',
        category: 'integration'
      },
      dataTransformation: {
        type: 'dataTransformation',
        icon: <FileSpreadsheet className="h-4 w-4 text-green-400" />,
        bgColor: 'bg-green-400/20',
        label: 'Data Transformation',
        description: 'Transform data formats',
        category: 'integration'
      },
      analyticsEngine: {
        type: 'analyticsEngine',
        icon: <BarChart className="h-4 w-4 text-amber-400" />,
        bgColor: 'bg-amber-400/20',
        label: 'Analytics Engine',
        description: 'Advanced data analytics',
        category: 'analytics'
      },
      notificationSystem: {
        type: 'notificationSystem',
        icon: <Mail className="h-4 w-4 text-blue-400" />,
        bgColor: 'bg-blue-400/20',
        label: 'Notification System',
        description: 'Send alerts and reports',
        category: 'integration'
      },
      output: {
        type: 'output',
        icon: <SendToBack className="h-4 w-4 text-gray-500" />,
        bgColor: 'bg-gray-500/20',
        label: 'Output',
        description: 'Process final results',
        category: 'core'
      }
    };
    
    // Filter by search term
    const searchFilteredNodes = Object.values(nodes).filter(node => 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
      node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filter by category
    if (activeNodeCategory === 'all') {
      return searchFilteredNodes;
    } else if (activeNodeCategory === 'ai') {
      return searchFilteredNodes.filter(node => node.ai === true);
    } else {
      return searchFilteredNodes.filter(node => node.category === activeNodeCategory);
    }
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
            <p className="text-white/60 text-xs mb-3">Drag nodes to the canvas to build your workflow</p>
            
            <div className="relative mb-3">
              <Input
                placeholder="Search nodes..."
                className="bg-alpha-navy/50 border-white/10 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              <Button 
                size="sm" 
                variant={activeNodeCategory === 'all' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => filterNodes('all')}
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={activeNodeCategory === 'finance' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => filterNodes('finance')}
              >
                Finance
              </Button>
              <Button 
                size="sm" 
                variant={activeNodeCategory === 'integration' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => filterNodes('integration')}
              >
                Integration
              </Button>
              <Button 
                size="sm" 
                variant={activeNodeCategory === 'analytics' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => filterNodes('analytics')}
              >
                Analytics
              </Button>
              <Button 
                size="sm" 
                variant={activeNodeCategory === 'ai' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => filterNodes('ai')}
              >
                AI Nodes
              </Button>
            </div>
          
            <div className="space-y-2">
              {filteredNodes().map((node) => (
                <div 
                  key={node.type}
                  className="flex items-center p-2 bg-alpha-blue/10 rounded-md cursor-move hover:bg-alpha-blue/20 border border-white/10"
                  draggable
                  onDragStart={(e) => onDragStart(e, node.type)}
                >
                  <div className={`p-1 mr-2 rounded ${node.bgColor}`}>
                    {node.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white flex items-center gap-1">
                      {node.label}
                      {node.ai && (
                        <Badge className="ml-1 text-[9px] py-0 h-4" variant="outline">AI</Badge>
                      )}
                    </div>
                    <div className="text-xs text-white/60">{node.description}</div>
                  </div>
                </div>
              ))}
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
