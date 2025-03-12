
import React, { useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  XYPosition,
  Connection,
  OnConnectStart,
  NodeMouseHandler,
  ConnectionLineType
} from '@xyflow/react';
import { useAgent } from './AgentContext';
import { nodeTypes, edgeTypes, ConnectionLine } from './nodes';
import { useToast } from '@/hooks/use-toast';
import { ZapIcon, Move, Magnet } from 'lucide-react';

import '@xyflow/react/dist/style.css';

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

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) {
        console.error('Could not get flow container bounds');
        return;
      }

      const position: XYPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      console.log('Drop position:', position);

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

  const handleConnectionStart = useCallback(() => {
    // Visual feedback when starting a connection
    document.body.classList.add('connecting');
  }, []);

  const handleConnectionEnd = useCallback(() => {
    // Remove visual feedback when connection ends
    document.body.classList.remove('connecting');
  }, []);

  // Fixed type definition for onConnectStart handler
  const handleConnectStart: OnConnectStart = useCallback((_, { nodeId, handleType }) => {
    console.log('Connection started from:', nodeId, handleType);
  }, []);

  const handleConnect = useCallback((params: Connection) => {
    console.log('Connection created:', params);
    onConnect(params);
    
    toast({
      title: "Connection Created",
      description: `Connected node ${params.source} to ${params.target}`,
      className: "connection-toast",
    });
  }, [onConnect, toast]);

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-alpha-darknavy to-black" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onConnectStart={handleConnectStart}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
        connectionLineComponent={ConnectionLine}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnectStart={handleConnectionStart}
        onConnectEnd={handleConnectionEnd}
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
            <div className="flex items-center text-xs text-white/50 bg-alpha-navy/50 rounded p-1 border border-white/10">
              <Move size={12} className="mr-1" />
              <span>Drag nodes from sidebar and connect them to create workflow</span>
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
    </div>
  );
}

export function AgentWorkflow() {
  return (
    <ReactFlowProvider>
      <AgentWorkflowContent />
    </ReactFlowProvider>
  );
}
