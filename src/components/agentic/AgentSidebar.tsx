
import React, { useState, useMemo } from 'react';
import { useAgent } from './AgentContext';
import { Search, Brain, ChevronDown, ChevronRight, TrendingUp, LineChart, Shield, Gauge, Zap, SendToBack } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { NodeType } from './AgentContext';

// Define a consistent interface for all node items
interface NodeItem {
  type: string;
  icon: React.ReactNode;
  bgColor: string;
  label: string;
  description: string;
  category: string;
  ai?: boolean;
}

export function AgentSidebar() {
  const { selectedNode, setSelectedNode } = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Data Sources': true,
    'Analysis': true,
    'Processing': true,
    'Output': true
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Node types available in the sidebar
  const nodeItems: NodeItem[] = [
    // Data Source Nodes
    { 
      type: 'marketData', 
      icon: <TrendingUp size={18} />, 
      bgColor: 'from-alpha-blue/80 to-alpha-purple/80',
      label: 'Market Data',
      description: 'Fetches real-time market data',
      category: 'Data Sources'
    },
    { 
      type: 'historicalData', 
      icon: <TrendingUp size={18} />, 
      bgColor: 'from-alpha-blue/80 to-alpha-lightblue/80',
      label: 'Historical Data',
      description: 'Retrieves historical financial data',
      category: 'Data Sources'
    },
    { 
      type: 'newsData', 
      icon: <TrendingUp size={18} />, 
      bgColor: 'from-alpha-purple/80 to-alpha-blue/80',
      label: 'News Data',
      description: 'Fetches financial news and press releases',
      category: 'Data Sources',
      ai: true
    },
    
    // Analysis Nodes
    { 
      type: 'financialAnalysis', 
      icon: <LineChart size={18} />, 
      bgColor: 'from-alpha-blue/80 to-alpha-lightblue/80',
      label: 'Financial Analysis',
      description: 'Analyzes financial metrics',
      category: 'Analysis',
      ai: true
    },
    { 
      type: 'sentimentAnalysis', 
      icon: <Brain size={18} />, 
      bgColor: 'from-alpha-purple/80 to-alpha-blue/80',
      label: 'Sentiment Analysis',
      description: 'Analyzes market sentiment',
      category: 'Analysis',
      ai: true
    },
    { 
      type: 'technicalAnalysis', 
      icon: <LineChart size={18} />, 
      bgColor: 'from-alpha-green/80 to-alpha-blue/80',
      label: 'Technical Analysis',
      description: 'Chart pattern and technical indicator analysis',
      category: 'Analysis'
    },
    
    // Processing Nodes
    { 
      type: 'portfolioOptimization', 
      icon: <LineChart size={18} />, 
      bgColor: 'from-alpha-green/80 to-alpha-blue/80',
      label: 'Portfolio Optimization',
      description: 'Optimizes portfolio allocation',
      category: 'Processing',
      ai: true
    },
    { 
      type: 'riskAssessment', 
      icon: <Shield size={18} />, 
      bgColor: 'from-alpha-yellow/80 to-alpha-green/80',
      label: 'Risk Assessment',
      description: 'Evaluates investment risks',
      category: 'Processing',
      ai: true
    },
    { 
      type: 'alphaScoring', 
      icon: <Gauge size={18} />, 
      bgColor: 'from-alpha-lightblue/80 to-alpha-yellow/80',
      label: 'Alpha Scoring',
      description: 'Generates proprietary AlphaScore™',
      category: 'Processing',
      ai: true
    },
    
    // Flow Control and Output
    { 
      type: 'trigger', 
      icon: <Zap size={18} />, 
      bgColor: 'from-alpha-purple/90 to-alpha-blue/90',
      label: 'Trigger',
      description: 'Starts workflow execution',
      category: 'Output'
    },
    { 
      type: 'output', 
      icon: <SendToBack size={18} />, 
      bgColor: 'from-[#333] to-[#111]',
      label: 'Output',
      description: 'Delivers final results',
      category: 'Output'
    },
    { 
      type: 'alertNode', 
      icon: <SendToBack size={18} />, 
      bgColor: 'from-alpha-yellow/80 to-alpha-red/80',
      label: 'Alert',
      description: 'Sends alerts based on conditions',
      category: 'Output'
    },
  ];

  // Filter nodes based on search query and active filter
  const filteredNodes = useMemo(() => {
    return nodeItems.filter(node => {
      const matchesSearch = searchQuery === '' || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFilter = activeFilter === null || 
        (activeFilter === 'AI' && node.ai) || 
        (activeFilter !== 'AI' && node.category === activeFilter);
        
      return matchesSearch && matchesFilter;
    });
  }, [nodeItems, searchQuery, activeFilter]);

  // Group nodes by category
  const groupedNodes = useMemo(() => {
    const groups: Record<string, NodeItem[]> = {};
    
    filteredNodes.forEach(node => {
      if (!groups[node.category]) {
        groups[node.category] = [];
      }
      groups[node.category].push(node);
    });
    
    return groups;
  }, [filteredNodes]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(prev => prev === filter ? null : filter);
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log(`Started dragging node of type: ${nodeType}`);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 bg-alpha-darknavy border-r border-white/10 h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full bg-alpha-navy/30 text-white border border-white/10 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-alpha-blue/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          <Badge 
            variant={activeFilter === 'AI' ? "default" : "outline"}
            className={`cursor-pointer ${activeFilter === 'AI' ? 'bg-alpha-blue' : 'bg-alpha-navy/30 hover:bg-alpha-navy/50'}`}
            onClick={() => handleFilterClick('AI')}
          >
            <Brain className="h-3 w-3 mr-1" />
            AI Nodes
          </Badge>
          {['Data Sources', 'Analysis', 'Processing', 'Output'].map(category => (
            <Badge 
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={`cursor-pointer ${activeFilter === category ? 'bg-alpha-blue' : 'bg-alpha-navy/30 hover:bg-alpha-navy/50'}`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {Object.entries(groupedNodes).map(([category, nodes]) => (
          <div key={category} className="mb-2">
            <div 
              className="flex items-center px-4 py-2 cursor-pointer text-white hover:bg-white/5"
              onClick={() => toggleCategory(category)}
            >
              {expandedCategories[category] ? 
                <ChevronDown className="h-4 w-4 mr-2 text-white/70" /> : 
                <ChevronRight className="h-4 w-4 mr-2 text-white/70" />
              }
              <span className="text-sm font-medium">{category}</span>
              <Badge className="ml-2 bg-alpha-navy/50 text-xs">{nodes.length}</Badge>
            </div>
            
            {expandedCategories[category] && (
              <div className="pl-4 pr-2 space-y-2 my-2">
                {nodes.map((node) => (
                  <div
                    key={node.type}
                    className={`
                      p-3 rounded-md cursor-grab bg-gradient-to-r ${node.bgColor}
                      border border-white/10 text-white
                      hover:shadow-md transition-shadow
                    `}
                    draggable
                    onDragStart={(event) => onDragStart(event, node.type)}
                  >
                    <div className="flex items-center">
                      <div className="bg-white/10 rounded-full p-1.5 mr-2">
                        {node.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{node.label}</h3>
                        <p className="text-xs text-white/70 mt-0.5">{node.description}</p>
                      </div>
                    </div>
                    {node.ai && (
                      <Badge className="mt-2 bg-alpha-blue/40 text-xs">
                        <Brain className="h-2.5 w-2.5 mr-1" />
                        AI Powered
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
