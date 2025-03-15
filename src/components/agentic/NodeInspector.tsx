
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
import { Brain, Cpu, Gauge, Target, ShieldCheck, Calculator, BarChart4, ExternalLink, FileText, Workflow } from 'lucide-react';

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
           'riskAssessment', 'alphaScoring', 'marketData', 'investmentSourcing',
           'dealScreening', 'dueDiligence', 'complianceRisk', 'valuationModeling',
           'scenarioAnalysis', 'portfolioManagement', 'performanceAnalysis',
           'exitStrategy', 'liquidityAnalysis', 'investmentOrchestration'].includes(nodeType);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    updateNodeData(node.id, { label: newLabel });
  };

  const handleSelectChange = (key: string, value: string) => {
    updateNodeData(node.id, { [key]: value });
  };

  // Get icon based on node type
  const getNodeIcon = () => {
    switch (node.type) {
      case 'investmentSourcing':
      case 'dealScreening':
        return <Target className="h-3 w-3" />;
      case 'dueDiligence':
      case 'complianceRisk':
        return <ShieldCheck className="h-3 w-3" />;
      case 'valuationModeling':
      case 'scenarioAnalysis':
        return <Calculator className="h-3 w-3" />;
      case 'portfolioManagement':
      case 'performanceAnalysis':
        return <BarChart4 className="h-3 w-3" />;
      case 'exitStrategy':
      case 'liquidityAnalysis':
        return <ExternalLink className="h-3 w-3" />;
      case 'investmentReport':
        return <FileText className="h-3 w-3" />;
      case 'investmentOrchestration':
        return <Workflow className="h-3 w-3" />;
      default:
        return <Brain className="h-3 w-3" />;
    }
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
        
        {/* Investment Sourcing settings */}
        {node.type === 'investmentSourcing' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="data-sources" className="text-xs text-white/80">Data Sources</Label>
              <Select 
                defaultValue={node.data.dataSources || 'all'} 
                onValueChange={(value) => handleSelectChange('dataSources', value)}
              >
                <SelectTrigger id="data-sources" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select data sources" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="financial">Financial Data</SelectItem>
                  <SelectItem value="alternative">Alternative Data</SelectItem>
                  <SelectItem value="proprietary">Proprietary Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-sectors" className="text-xs text-white/80">Target Sectors</Label>
              <Input 
                id="target-sectors" 
                defaultValue={node.data.targetSectors || 'technology,healthcare,finance'} 
                onChange={(e) => handleSelectChange('targetSectors', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
          </>
        )}
        
        {/* Due Diligence settings */}
        {node.type === 'dueDiligence' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="diligence-areas" className="text-xs text-white/80">Diligence Areas</Label>
              <Input 
                id="diligence-areas" 
                defaultValue={node.data.diligenceAreas || 'legal,financial,operational'} 
                onChange={(e) => handleSelectChange('diligenceAreas', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diligence-depth" className="text-xs text-white/80">Diligence Depth</Label>
              <Select 
                defaultValue={node.data.depth || 'comprehensive'} 
                onValueChange={(value) => handleSelectChange('depth', value)}
              >
                <SelectTrigger id="diligence-depth" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="forensic">Forensic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* Valuation Modeling settings */}
        {node.type === 'valuationModeling' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="valuation-methods" className="text-xs text-white/80">Valuation Methods</Label>
              <Input 
                id="valuation-methods" 
                defaultValue={node.data.valuationMethods || 'DCF,comparables,multiples'} 
                onChange={(e) => handleSelectChange('valuationMethods', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount-rate" className="text-xs text-white/80">Discount Rate</Label>
              <Input 
                id="discount-rate" 
                defaultValue={node.data.discountRate || '10%'} 
                onChange={(e) => handleSelectChange('discountRate', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
          </>
        )}
        
        {/* Portfolio Management settings */}
        {node.type === 'portfolioManagement' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="metrics" className="text-xs text-white/80">Key Metrics</Label>
              <Input 
                id="metrics" 
                defaultValue={node.data.metrics || 'revenue,profitability,growth'} 
                onChange={(e) => handleSelectChange('metrics', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-xs text-white/80">Update Frequency</Label>
              <Select 
                defaultValue={node.data.frequency || 'monthly'} 
                onValueChange={(value) => handleSelectChange('frequency', value)}
              >
                <SelectTrigger id="frequency" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* Exit Strategy settings */}
        {node.type === 'exitStrategy' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="exit-options" className="text-xs text-white/80">Exit Options</Label>
              <Input 
                id="exit-options" 
                defaultValue={node.data.exitOptions || 'IPO,M&A,secondary'} 
                onChange={(e) => handleSelectChange('exitOptions', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timing-analysis" className="text-xs text-white/80">Include Timing Analysis</Label>
              <Select 
                defaultValue={node.data.timingAnalysis || 'true'} 
                onValueChange={(value) => handleSelectChange('timingAnalysis', value)}
              >
                <SelectTrigger id="timing-analysis" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* Investment Report settings */}
        {node.type === 'investmentReport' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="report-type" className="text-xs text-white/80">Report Type</Label>
              <Select 
                defaultValue={node.data.reportType || 'comprehensive'} 
                onValueChange={(value) => handleSelectChange('reportType', value)}
              >
                <SelectTrigger id="report-type" className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-alpha-darknavy border-white/10 text-white">
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="format" className="text-xs text-white/80">Format</Label>
              <Input 
                id="format" 
                defaultValue={node.data.format || 'pdf,dashboard'} 
                onChange={(e) => handleSelectChange('format', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients" className="text-xs text-white/80">Recipients</Label>
              <Input 
                id="recipients" 
                defaultValue={node.data.recipients || 'investment committee'} 
                onChange={(e) => handleSelectChange('recipients', e.target.value)}
                className="h-8 text-sm bg-alpha-darknavy border-white/10 text-white"
              />
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
          {node.type.includes('investment') && (
            <p className="flex items-center gap-1 mt-1">
              {getNodeIcon()} Type: Investment Lifecycle Node
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
