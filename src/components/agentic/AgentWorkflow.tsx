
import React, { useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import { useAgent } from './AgentContext';
import { nodeTypes, edgeTypes, ConnectionLine } from './nodes';
import { useToast } from '@/hooks/use-toast';
import { PlusIcon, ZapIcon } from 'lucide-react';
import { MarketplacePanel } from './MarketplacePanel';

import '@xyflow/react/dist/style.css';

// Wrap the internal component with the ReactFlowProvider
function AgentWorkflowContent() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    setSelectedNode,
    addNode,
    runWorkflow
  } = useAgent();
  
  const { toast } = useToast();
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();

  // Effect to fit view whenever nodes change
  useEffect(() => {
    const timer = setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    }, 200);
    return () => clearTimeout(timer);
  }, [nodes.length, reactFlowInstance]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (!type) {
        console.log('No type data found in drop event');
        return;
      }

      console.log('Dropping node of type:', type);

      // Get the position where the node was dropped
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) {
        console.error('Could not get flow container bounds');
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      console.log('Drop position:', position);

      // Use the addNode function from the context that we destructured above
      addNode(type as any, position);

      toast({
        title: "Node Added",
        description: `Added ${type} node to workflow`,
      });
    },
    [toast, addNode, reactFlowInstance]
  );

  const handleRunTest = useCallback(() => {
    runWorkflow();
    toast({
      title: "Running Test",
      description: "Testing workflow execution...",
    });
  }, [runWorkflow, toast]);

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-alpha-darknavy to-black" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
        connectionLineComponent={ConnectionLine}
        onDrop={onDrop}
        onDragOver={onDragOver}
        minZoom={0.2}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true,
        }}
      >
        <Background color="#6C4BEF" gap={24} size={1.5} />
        <Controls className="bg-alpha-darknavy/80 border border-white/10 rounded-md" />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'trigger') return '#0057B7';
            if (n.type === 'output') return '#333';
            return '#6C4BEF';
          }}
          nodeColor={(n) => {
            if (n.type === 'trigger') return '#0057B7';
            if (n.type === 'output') return '#333';
            return '#6C4BEF';
          }}
          className="bg-alpha-darknavy/80 border border-white/10 rounded-md"
        />
        <Panel position="top-right" className="mr-20">
          <div className="flex space-x-2">
            <div className="text-xs text-white/50 bg-alpha-navy/50 rounded p-1 border border-white/10">
              Drag nodes from sidebar to create your workflow
            </div>
            <button 
              onClick={handleRunTest}
              className="flex items-center space-x-1 text-xs bg-alpha-green/20 text-alpha-green hover:bg-alpha-green/30 transition rounded p-1 border border-alpha-green/30"
            >
              <ZapIcon size={12} />
              <span>Test Run</span>
            </button>
          </div>
        </Panel>
      </ReactFlow>
      <MarketplacePanel />
    </div>
  );
}

// Export component wrapped in ReactFlowProvider to fix the zustand error
export function AgentWorkflow() {
  return (
    <ReactFlowProvider>
      <AgentWorkflowContent />
    </ReactFlowProvider>
  );
}
