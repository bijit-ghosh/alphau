
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAgent } from './AgentContext';

interface NodeInspectorProps {
  node: any;
}

export function NodeInspector({ node }: NodeInspectorProps) {
  const { nodes, edges } = useAgent();
  const [label, setLabel] = useState(node.data.label || '');
  
  // Update form when selected node changes
  useEffect(() => {
    setLabel(node.data.label || '');
  }, [node]);
  
  // Update node data when form changes
  const updateNodeData = (key: string, value: any) => {
    // This would be implemented in a real app to update the node's data
    console.log(`Update node ${node.id} ${key} to ${value}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm font-medium">Node Inspector</h3>
        <Badge variant="outline" className="text-xs">
          {node.type}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="node-name" className="text-xs text-white/80">Node Name</Label>
          <Input 
            id="node-name" 
            value={label} 
            onChange={(e) => {
              setLabel(e.target.value);
              updateNodeData('label', e.target.value);
            }}
            className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
          />
        </div>
        
        {node.type === 'trigger' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="schedule" className="text-xs text-white/80">Schedule</Label>
              <Select 
                defaultValue={node.data.schedule || 'daily'} 
                onValueChange={(value) => updateNodeData('schedule', value)}
              >
                <SelectTrigger id="schedule" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trigger-time" className="text-xs text-white/80">Trigger Time</Label>
              <Input 
                id="trigger-time" 
                defaultValue={node.data.time || '09:30'} 
                onChange={(e) => updateNodeData('time', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
          </>
        )}
        
        {node.type === 'marketData' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="data-source" className="text-xs text-white/80">Data Source</Label>
              <Select 
                defaultValue={node.data.source || 'alphaUInternal'} 
                onValueChange={(value) => updateNodeData('source', value)}
              >
                <SelectTrigger id="data-source" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="alphaUInternal">AlphaU Internal Data</SelectItem>
                  <SelectItem value="bloomberg">Bloomberg</SelectItem>
                  <SelectItem value="reuters">Reuters</SelectItem>
                  <SelectItem value="alphavantage">Alpha Vantage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-symbols" className="text-xs text-white/80">Symbols (comma separated)</Label>
              <Input 
                id="data-symbols" 
                defaultValue={node.data.symbols || 'AAPL,MSFT,GOOGL'} 
                onChange={(e) => updateNodeData('symbols', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
          </>
        )}
        
        {node.type === 'sentimentAnalysis' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="sentiment-sources" className="text-xs text-white/80">Data Sources</Label>
              <Select 
                defaultValue={node.data.sentimentSource || 'all'} 
                onValueChange={(value) => updateNodeData('sentimentSource', value)}
              >
                <SelectTrigger id="sentiment-sources" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select sources" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="news">Financial News</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="earnings">Earnings Calls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sentiment-model" className="text-xs text-white/80">AI Model</Label>
              <Select 
                defaultValue={node.data.model || 'alphaU-sentiment-v2'} 
                onValueChange={(value) => updateNodeData('model', value)}
              >
                <SelectTrigger id="sentiment-model" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="alphaU-sentiment-v1">AlphaU Sentiment v1</SelectItem>
                  <SelectItem value="alphaU-sentiment-v2">AlphaU Sentiment v2</SelectItem>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {node.type === 'output' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="output-type" className="text-xs text-white/80">Output Type</Label>
              <Select 
                defaultValue={node.data.outputType || 'dashboard'} 
                onValueChange={(value) => updateNodeData('outputType', value)}
              >
                <SelectTrigger id="output-type" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select output type" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="email">Email Report</SelectItem>
                  <SelectItem value="api">API Endpoint</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="output-format" className="text-xs text-white/80">Format</Label>
              <Select 
                defaultValue={node.data.format || 'json'} 
                onValueChange={(value) => updateNodeData('format', value)}
              >
                <SelectTrigger id="output-format" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-white/80 text-xs font-medium mb-2">Node Information</h4>
        <div className="space-y-1 text-xs text-white/60">
          <p>ID: {node.id}</p>
          <p>Type: {node.type}</p>
          <p>Position: x:{Math.round(node.position.x)}, y:{Math.round(node.position.y)}</p>
          <p>Connections: {
            edges.filter(e => e.source === node.id || e.target === node.id).length
          }</p>
        </div>
      </div>
    </div>
  );
}
