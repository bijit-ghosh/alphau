
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nodeTypes } from './nodes';
import { useToast } from '@/hooks/use-toast';

// Initial node types specific to AlphaU
export type NodeType = 
  | 'marketData' 
  | 'historicalData'
  | 'newsData'
  | 'financialAnalysis' 
  | 'sentimentAnalysis'
  | 'technicalAnalysis'
  | 'portfolioOptimization'
  | 'riskAssessment'
  | 'alphaScoring'
  | 'trigger'
  | 'output'
  | 'alertNode'
  // Investment workflow specific nodes
  | 'dealSourcing'
  | 'dealScreening'
  | 'valuation'
  | 'dueDiligence'
  | 'portfolioMonitoring';

// Model types available for the AI nodes
export type ModelType =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'llama-3-70b'
  | 'gemini-pro'
  | 'mixtral-8x7b'
  | 'alphaU-sentiment-v2'
  | 'alphaU-financial-v3'
  | 'alphaU-valuation-v1'
  | 'alphaU-duediligence-v2';

// Default nodes for a new workflow
const initialNodes: Node[] = [
  {
    id: 'dealSourcing-1',
    type: 'dealSourcing',
    data: { 
      label: 'Investment Sourcing',
      sources: 'all',
      criteria: 'SaaS, B2B, $2M-$10M ARR, North America',
      modelType: 'alphaU-financial-v3',
    },
    position: { x: 250, y: 100 },
  },
];

// Default edges for a new workflow
const initialEdges: Edge[] = [];

interface AgentContextType {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  workflowName: string;
  setWorkflowName: (name: string) => void;
  addNode: (type: NodeType, position: { x: number, y: number }) => void;
  updateNodeData: (nodeId: string, data: Record<string, any>) => void;
  saveWorkflow: () => void;
  runWorkflow: () => void;
  isRunning: boolean;
  availableModels: ModelType[];
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState<string>('AlphaU Investment Analysis Workflow');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { toast } = useToast();
  
  const availableModels: ModelType[] = [
    'gpt-4o',
    'gpt-4o-mini',
    'claude-3-opus',
    'claude-3-sonnet',
    'llama-3-70b',
    'gemini-pro',
    'mixtral-8x7b',
    'alphaU-sentiment-v2',
    'alphaU-financial-v3',
    'alphaU-valuation-v1',
    'alphaU-duediligence-v2'
  ];

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    console.log('Connecting nodes:', connection);
    setEdges((eds) => addEdge(
      { 
        ...connection, 
        type: 'custom',
        animated: true
      }, 
      eds
    ));
  }, []);

  const updateNodeData = useCallback((nodeId: string, data: Record<string, any>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      })
    );
    console.log(`Updated node ${nodeId} with data:`, data);
  }, []);

  const addNode = useCallback((type: NodeType, position: { x: number, y: number }) => {
    let newNodeData = {};
    
    // Set default data based on node type
    switch (type) {
      case 'marketData':
        newNodeData = { 
          label: 'Market Data',
          source: 'alphaUInternal',
          symbols: 'AAPL,MSFT,GOOGL',
          modelType: 'alphaU-financial-v3'
        };
        break;
      case 'historicalData':
        newNodeData = { 
          label: 'Historical Data',
          period: '5y',
          interval: 'daily',
          symbols: 'AAPL,MSFT,GOOGL'
        };
        break;
      case 'newsData':
        newNodeData = { 
          label: 'News Data',
          sources: 'all',
          keywords: 'finance,markets',
          modelType: 'alphaU-sentiment-v2'
        };
        break;
      case 'sentimentAnalysis':
        newNodeData = { 
          label: 'Sentiment Analysis',
          sentimentSource: 'all',
          model: 'alphaU-sentiment-v2'
        };
        break;
      case 'financialAnalysis':
        newNodeData = { 
          label: 'Financial Analysis',
          indicators: 'all',
          modelType: 'gpt-4o'
        };
        break;
      case 'technicalAnalysis':
        newNodeData = { 
          label: 'Technical Analysis',
          indicators: 'MA,RSI,MACD',
          timeframe: 'daily'
        };
        break;
      case 'portfolioOptimization':
        newNodeData = { 
          label: 'Portfolio Optimization',
          strategy: 'balanced',
          modelType: 'alphaU-financial-v3'
        };
        break;
      case 'riskAssessment':
        newNodeData = { 
          label: 'Risk Assessment',
          riskProfile: 'moderate',
          modelType: 'claude-3-opus'
        };
        break;
      case 'alphaScoring':
        newNodeData = { 
          label: 'Alpha Scoring',
          weightings: 'default',
          modelType: 'alphaU-financial-v3'
        };
        break;
      case 'alertNode':
        newNodeData = { 
          label: 'Alert',
          condition: 'price > threshold',
          channel: 'email',
          recipients: 'user@example.com'
        };
        break;
      case 'output':
        newNodeData = { 
          label: 'Output',
          outputType: 'dashboard',
          format: 'json'
        };
        break;
      case 'trigger':
        newNodeData = { 
          label: 'Trigger',
          schedule: 'daily',
          time: '09:30'
        };
        break;
      // Investment workflow specific node types
      case 'dealSourcing':
        newNodeData = { 
          label: 'Deal Sourcing',
          sources: 'Crunchbase,PitchBook,AlphaU Data',
          criteria: 'SaaS, B2B, $2M-$10M ARR',
          modelType: 'alphaU-financial-v3'
        };
        break;
      case 'dealScreening':
        newNodeData = { 
          label: 'Deal Screening',
          criteria: 'Growth rate > 80%, retention > 90%',
          threshold: 'min_score=70',
          modelType: 'alphaU-financial-v3'
        };
        break;
      case 'valuation':
        newNodeData = { 
          label: 'Valuation Analysis',
          methods: 'DCF,Comparables,Monte Carlo',
          scenarios: 'base,upside,downside',
          modelType: 'alphaU-valuation-v1'
        };
        break;
      case 'dueDiligence':
        newNodeData = { 
          label: 'Due Diligence',
          areas: 'legal,financial,technical,team',
          depth: 'comprehensive',
          modelType: 'alphaU-duediligence-v2'
        };
        break;
      case 'portfolioMonitoring':
        newNodeData = { 
          label: 'Portfolio Monitoring',
          metrics: 'ARR,CAC,LTV,Burn Rate',
          frequency: 'monthly',
          alerts: 'on',
          modelType: 'alphaU-financial-v3'
        };
        break;
      default:
        const nodeTypeStr = String(type);
        newNodeData = { 
          label: nodeTypeStr.charAt(0).toUpperCase() + nodeTypeStr.slice(1) 
        };
    }
    
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      data: newNodeData,
      position,
    };
    
    setNodes((nds) => [...nds, newNode]);
    console.log('Added new node:', newNode);
    
    toast({
      title: "Node Added",
      description: `Added ${newNode.data.label} node to workflow`,
    });
  }, [toast]);

  const saveWorkflow = useCallback(() => {
    // In a real app, this would save to a backend
    const workflow = {
      name: workflowName,
      nodes,
      edges,
    };
    console.log('Saving workflow:', workflow);
    
    toast({
      title: "Workflow Saved",
      description: `${workflowName} has been saved successfully`,
    });
  }, [workflowName, nodes, edges, toast]);

  const runWorkflow = useCallback(() => {
    // In a real app, this would trigger the workflow execution
    setIsRunning(true);
    
    toast({
      title: "Workflow Running",
      description: `${workflowName} is now executing`,
    });
    
    // Simulate workflow execution with node-by-node processing
    const nodeIds = new Set<string>();
    edges.forEach(edge => {
      nodeIds.add(edge.source);
      nodeIds.add(edge.target);
    });
    
    let processedCount = 0;
    const totalNodes = nodeIds.size;
    
    nodeIds.forEach(nodeId => {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        const delay = 500 + Math.random() * 1500; // Random delay between 0.5-2s
        setTimeout(() => {
          toast({
            title: `Processing ${node.data.label}`,
            description: `Running node with ${node.data.modelType || 'default'} configuration`,
          });
          
          processedCount++;
          if (processedCount >= totalNodes) {
            setTimeout(() => {
              setIsRunning(false);
              toast({
                title: "Workflow Complete",
                description: `${workflowName} has completed execution`,
              });
            }, 1000);
          }
        }, delay);
      }
    });
    
    // Fallback in case there are no nodes/edges
    if (nodeIds.size === 0) {
      setTimeout(() => {
        setIsRunning(false);
        toast({
          title: "Workflow Complete",
          description: `No nodes to process in workflow`,
        });
      }, 1000);
    }
  }, [workflowName, nodes, edges, toast]);

  return (
    <AgentContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        selectedNode,
        setSelectedNode,
        workflowName,
        setWorkflowName,
        addNode,
        updateNodeData,
        saveWorkflow,
        runWorkflow,
        isRunning,
        availableModels
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
