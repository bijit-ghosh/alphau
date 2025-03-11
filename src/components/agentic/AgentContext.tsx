
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nodeTypes } from './nodes';
import { toast } from '@/hooks/use-toast';

// Initial node types specific to AlphaU
export type NodeType = 
  | 'marketData' 
  | 'financialAnalysis' 
  | 'sentimentAnalysis'
  | 'portfolioOptimization'
  | 'riskAssessment'
  | 'alphaScoring'
  | 'trigger'
  | 'output';

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
  | 'alphaU-financial-v3';

// Default nodes for a new workflow
const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    data: { 
      label: 'Market Open Trigger',
      schedule: 'daily',
      time: '09:30',
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
  const [workflowName, setWorkflowName] = useState<string>('New AlphaU Workflow');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const availableModels: ModelType[] = [
    'gpt-4o',
    'gpt-4o-mini',
    'claude-3-opus',
    'claude-3-sonnet',
    'llama-3-70b',
    'gemini-pro',
    'mixtral-8x7b',
    'alphaU-sentiment-v2',
    'alphaU-financial-v3'
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
      default:
        newNodeData = { label: type.charAt(0).toUpperCase() + type.slice(1) };
    }
    
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      data: newNodeData,
      position,
    };
    
    setNodes((nds) => [...nds, newNode]);
    console.log('Added new node:', newNode);
  }, []);

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
  }, [workflowName, nodes, edges]);

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
  }, [workflowName, nodes, edges]);

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
