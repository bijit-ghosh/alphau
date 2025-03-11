
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';
import { useAgent } from './AgentContext';
import { nodeTypes, edgeTypes, ConnectionLine } from './nodes';
import { useToast } from '@/hooks/use-toast';

import '@xyflow/react/dist/style.css';

export function AgentWorkflow() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    setSelectedNode,
    addNode
  } = useAgent();
  
  const { toast } = useToast();

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
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
      
      if (!type) return;

      // Get the position where the node was dropped
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Use the addNode function from the context that we destructured above
      addNode(type as any, position);

      toast({
        title: "Node Added",
        description: `Added ${type} node to workflow`,
      });
    },
    [toast, addNode]
  );

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-alpha-darknavy to-black">
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
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
