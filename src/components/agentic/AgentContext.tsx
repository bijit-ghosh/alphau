
import React, { createContext, useContext, useState } from 'react';
import { Node, Edge, addEdge, Connection } from '@xyflow/react';
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
  saveWorkflow: () => void;
  runWorkflow: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState<string>('New AlphaU Workflow');

  const onNodesChange = (changes: any) => {
    setNodes((nds) => {
      // Apply the changes to the nodes
      const updatedNodes = changes.reduce((acc: Node[], change: any) => {
        if (change.type === 'remove') {
          return acc.filter((node) => node.id !== change.id);
        }
        if (change.type === 'position' || change.type === 'dimensions') {
          return acc.map((node) => {
            if (node.id === change.id) {
              return { ...node, position: change.position || node.position };
            }
            return node;
          });
        }
        return acc;
      }, [...nds]);
      
      return updatedNodes;
    });
  };

  const onEdgesChange = (changes: any) => {
    setEdges((eds) => {
      // Apply the changes to the edges
      const updatedEdges = changes.reduce((acc: Edge[], change: any) => {
        if (change.type === 'remove') {
          return acc.filter((edge) => edge.id !== change.id);
        }
        return acc;
      }, [...eds]);
      
      return updatedEdges;
    });
  };

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const addNode = (type: NodeType, position: { x: number, y: number }) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
      position,
    };
    
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = () => {
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
  };

  const runWorkflow = () => {
    // In a real app, this would trigger the workflow execution
    toast({
      title: "Workflow Running",
      description: `${workflowName} is now executing`,
    });
    
    // Simulate a workflow run with a delay
    setTimeout(() => {
      toast({
        title: "Workflow Complete",
        description: `${workflowName} has completed execution`,
      });
    }, 3000);
  };

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
        saveWorkflow,
        runWorkflow,
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
