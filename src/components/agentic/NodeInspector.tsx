
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
import { ModelType } from './AgentContext';
import { Brain, Cpu, Gauge } from 'lucide-react';

interface NodeInspectorProps {
  node: any;
}

export function NodeInspector({ node }: NodeInspectorProps) {
  const { nodes, edges, updateNodeData, availableModels } = useAgent();
  const [label, setLabel] = useState(node.data.label || '');
  
  // Update form when selected node changes
  useEffect(() => {
    setLabel(node.data.label || '');
  }, [node]);
  
  // Helper to check if node type uses AI models
  const usesAIModel = (nodeType: string): boolean => {
    return ['financialAnalysis', 'sentimentAnalysis', 'portfolioOptimization', 
           'riskAssessment', 'alphaScoring', 'marketData'].includes(nodeType);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    updateNodeData(node.id, { label: newLabel });
  };

  const handleSelectChange = (key: string, value: string) => {
    updateNodeData(node.id, { [key]: value });
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
            onChange={handleLabelChange}
            className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
          />
        </div>
        
        {/* Model selection for AI nodes */}
        {usesAIModel(node.type) && (
          <div className="space-y-2">
            <Label htmlFor="model-type" className="text-xs text-white/80 flex items-center gap-1">
              <Brain className="h-3 w-3" /> AI Model
            </Label>
            <Select 
              defaultValue={node.data.modelType || 'gpt-4o'} 
              onValueChange={(value) => handleSelectChange('modelType', value)}
            >
              <SelectTrigger id="model-type" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-alpha-darknavy border-white/10 text-white max-h-56">
                <div className="p-1 text-xs text-white/50">Standard Models</div>
                <SelectItem value="gpt-4o">GPT-4o (Balanced)</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus (Powerful)</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet (Balanced)</SelectItem>
                <SelectItem value="llama-3-70b">Llama 3 70B (Open Source)</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro (Balanced)</SelectItem>
                <SelectItem value="mixtral-8x7b">Mixtral 8x7B (Fast)</SelectItem>
                
                <div className="p-1 text-xs text-white/50 mt-1">Specialized Models</div>
                <SelectItem value="alphaU-sentiment-v2">AlphaU Sentiment v2</SelectItem>
                <SelectItem value="alphaU-financial-v3">AlphaU Financial v3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {node.type === 'trigger' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="schedule" className="text-xs text-white/80">Schedule</Label>
              <Select 
                defaultValue={node.data.schedule || 'daily'} 
                onValueChange={(value) => handleSelectChange('schedule', value)}
              >
                <SelectTrigger id="schedule" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom Cron</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trigger-time" className="text-xs text-white/80">Trigger Time</Label>
              <Input 
                id="trigger-time" 
                defaultValue={node.data.time || '09:30'} 
                onChange={(e) => handleSelectChange('time', e.target.value)}
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
                onValueChange={(value) => handleSelectChange('source', value)}
              >
                <SelectTrigger id="data-source" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="alphaUInternal">AlphaU Internal Data</SelectItem>
                  <SelectItem value="bloomberg">Bloomberg</SelectItem>
                  <SelectItem value="reuters">Reuters</SelectItem>
                  <SelectItem value="alphavantage">Alpha Vantage</SelectItem>
                  <SelectItem value="yfinance">Yahoo Finance</SelectItem>
                  <SelectItem value="iex">IEX Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-symbols" className="text-xs text-white/80">Symbols (comma separated)</Label>
              <Input 
                id="data-symbols" 
                defaultValue={node.data.symbols || 'AAPL,MSFT,GOOGL'} 
                onChange={(e) => handleSelectChange('symbols', e.target.value)}
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
                onValueChange={(value) => handleSelectChange('sentimentSource', value)}
              >
                <SelectTrigger id="sentiment-sources" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select sources" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="news">Financial News</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="earnings">Earnings Calls</SelectItem>
                  <SelectItem value="sec">SEC Filings</SelectItem>
                  <SelectItem value="reports">Analyst Reports</SelectItem>
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
                onValueChange={(value) => handleSelectChange('outputType', value)}
              >
                <SelectTrigger id="output-type" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select output type" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="email">Email Report</SelectItem>
                  <SelectItem value="api">API Endpoint</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="slack">Slack Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="output-format" className="text-xs text-white/80">Format</Label>
              <Select 
                defaultValue={node.data.format || 'json'} 
                onValueChange={(value) => handleSelectChange('format', value)}
              >
                <SelectTrigger id="output-format" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
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
          {node.data.modelType && (
            <p className="flex items-center gap-1 mt-1">
              <Cpu className="h-3 w-3" /> Model: {node.data.modelType}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
