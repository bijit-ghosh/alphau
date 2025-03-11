
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Database, 
  Workflow, 
  LayoutGrid, 
  Zap, 
  Search, 
  Star, 
  CloudLightning,
  X
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgent } from './AgentContext';

// Model type categories
type ModelCategory = 'popular' | 'language' | 'vision' | 'specialized';

interface ModelItem {
  id: string;
  name: string;
  description: string;
  provider: string;
  category: ModelCategory;
  tags: string[];
  tokenLimit: number;
  isPopular?: boolean;
}

interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isPopular?: boolean;
}

const models: ModelItem[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI\'s latest multimodal model with high performance on language and vision tasks',
    provider: 'OpenAI',
    category: 'language',
    tags: ['text', 'vision', 'audio'],
    tokenLimit: 32000,
    isPopular: true
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Smaller, faster version of GPT-4o for cost-effective deployments',
    provider: 'OpenAI',
    category: 'language',
    tags: ['text', 'vision'],
    tokenLimit: 16000,
    isPopular: true
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic\'s most powerful model for complex reasoning tasks',
    provider: 'Anthropic',
    category: 'language',
    tags: ['text', 'vision'],
    tokenLimit: 200000,
    isPopular: true
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balance of intelligence and speed for everyday AI tasks',
    provider: 'Anthropic',
    category: 'language',
    tags: ['text', 'vision'],
    tokenLimit: 180000
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 (70B)',
    description: 'Meta\'s open model with strong performance and flexible licensing',
    provider: 'Meta',
    category: 'language',
    tags: ['text'],
    tokenLimit: 8000
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s multimodal model with strong reasoning capabilities',
    provider: 'Google',
    category: 'language',
    tags: ['text', 'vision'],
    tokenLimit: 32000
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    description: 'Powerful mixture-of-experts model with good performance/cost balance',
    provider: 'Mistral AI',
    category: 'language',
    tags: ['text'],
    tokenLimit: 32000
  },
  {
    id: 'alphaU-sentiment-v2',
    name: 'AlphaU Sentiment v2',
    description: 'Specialized model for market sentiment analysis with high accuracy',
    provider: 'AlphaU',
    category: 'specialized',
    tags: ['finance', 'sentiment'],
    tokenLimit: 16000,
    isPopular: true
  },
  {
    id: 'alphaU-financial-v3',
    name: 'AlphaU Financial v3',
    description: 'Fine-tuned for financial data analysis and market prediction',
    provider: 'AlphaU',
    category: 'specialized',
    tags: ['finance', 'prediction'],
    tokenLimit: 32000,
    isPopular: true
  }
];

const tools: ToolItem[] = [
  {
    id: 'market-data-api',
    name: 'Market Data API',
    description: 'Connect to real-time and historical market data providers',
    category: 'finance',
    tags: ['stocks', 'crypto', 'forex'],
    isPopular: true
  },
  {
    id: 'news-aggregator',
    name: 'News Aggregator',
    description: 'Gather and analyze financial news from various sources',
    category: 'finance',
    tags: ['news', 'sentiment'],
    isPopular: true
  },
  {
    id: 'technical-indicators',
    name: 'Technical Indicators',
    description: 'Calculate and analyze technical indicators for securities',
    category: 'finance',
    tags: ['analysis', 'charts'],
    isPopular: true
  },
  {
    id: 'portfolio-optimizer',
    name: 'Portfolio Optimizer',
    description: 'Advanced portfolio optimization algorithms',
    category: 'finance',
    tags: ['optimization', 'risk'],
    isPopular: true
  },
  {
    id: 'data-connector',
    name: 'Data Connector',
    description: 'Connect to external data sources and APIs',
    category: 'utility',
    tags: ['integration', 'data']
  },
  {
    id: 'scheduler',
    name: 'Scheduler',
    description: 'Schedule workflow runs on various triggers',
    category: 'utility',
    tags: ['automation', 'time']
  },
  {
    id: 'notification',
    name: 'Notification Service',
    description: 'Send alerts and notifications via various channels',
    category: 'utility',
    tags: ['alerts', 'communication']
  }
];

export function MarketplacePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { addNode } = useAgent();

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || 
      (categoryFilter === 'popular' && model.isPopular) ||
      model.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || 
      (categoryFilter === 'popular' && tool.isPopular) ||
      tool.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (!isExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-alpha-darknavy border-t border-white/10 flex items-center justify-between px-4 z-10">
        <div className="flex items-center">
          <LayoutGrid size={18} className="text-alpha-blue mr-2" />
          <span className="text-white text-sm font-medium">AI Models & Tools Marketplace</span>
          <Badge variant="outline" className="ml-3 text-xs bg-alpha-blue/10 text-alpha-blue border-alpha-blue/20">
            {models.length} Models
          </Badge>
          <Badge variant="outline" className="ml-2 text-xs bg-alpha-green/10 text-alpha-green border-alpha-green/20">
            {tools.length} Tools
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => setIsExpanded(true)}
        >
          <Zap size={16} className="mr-1 text-alpha-purple" />
          Open Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-96 bg-alpha-darknavy border-t border-white/10 flex flex-col z-10">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center">
          <LayoutGrid size={20} className="text-alpha-blue mr-2" />
          <h3 className="text-white text-base font-medium">AI Models & Tools Marketplace</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => setIsExpanded(false)}
        >
          <X size={16} className="mr-1" />
          Close
        </Button>
      </div>
      
      <div className="p-4 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search models and tools..."
            className="pl-9 bg-alpha-navy/30 border-white/10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48 bg-alpha-navy/30 border-white/10 text-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-alpha-darknavy text-white border-white/10">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="language">Language Models</SelectItem>
            <SelectItem value="vision">Vision Models</SelectItem>
            <SelectItem value="specialized">Specialized Models</SelectItem>
            <SelectItem value="finance">Finance Tools</SelectItem>
            <SelectItem value="utility">Utility Tools</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="models" className="w-full">
          <TabsList className="w-full flex justify-start px-4 bg-alpha-darknavy border-b border-white/10">
            <TabsTrigger value="models" className="data-[state=active]:bg-alpha-blue/10">
              <Bot className="h-4 w-4 mr-2" />
              AI Models
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-alpha-green/10">
              <Zap className="h-4 w-4 mr-2" />
              Integration Tools
            </TabsTrigger>
            <TabsTrigger value="workflows" className="data-[state=active]:bg-alpha-purple/10">
              <Workflow className="h-4 w-4 mr-2" />
              Template Workflows
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="p-4 grid grid-cols-3 gap-4">
            {filteredModels.length > 0 ? filteredModels.map(model => (
              <div key={model.id} className="bg-alpha-navy/30 border border-white/10 rounded-md p-4 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      model.provider === 'OpenAI' ? 'bg-green-500/20' :
                      model.provider === 'Anthropic' ? 'bg-purple-500/20' :
                      model.provider === 'Meta' ? 'bg-blue-500/20' :
                      model.provider === 'Google' ? 'bg-red-500/20' :
                      model.provider === 'Mistral AI' ? 'bg-yellow-500/20' :
                      'bg-alpha-blue/20'
                    }`}>
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="text-white font-medium">{model.name}</h4>
                  </div>
                  {model.isPopular && (
                    <Badge variant="outline" className="bg-alpha-yellow/10 text-alpha-yellow border-alpha-yellow/20 text-[10px]">
                      <Star className="h-3 w-3 mr-1" /> Popular
                    </Badge>
                  )}
                </div>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{model.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {model.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-alpha-navy text-white/60 border-white/20 text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/50 text-xs">{model.provider} • {(model.tokenLimit/1000)}k tokens</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 text-xs border-alpha-blue text-alpha-blue hover:bg-alpha-blue/10"
                  >
                    <CloudLightning className="h-3 w-3 mr-1" />
                    Add to Flow
                  </Button>
                </div>
              </div>
            )) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-10 text-white/50">
                <Search className="h-10 w-10 mb-2 opacity-20" />
                <p>No models found matching your search criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tools" className="p-4 grid grid-cols-3 gap-4">
            {filteredTools.length > 0 ? filteredTools.map(tool => (
              <div key={tool.id} className="bg-alpha-navy/30 border border-white/10 rounded-md p-4 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      tool.category === 'finance' ? 'bg-alpha-green/20' : 'bg-alpha-blue/20'
                    }`}>
                      {tool.category === 'finance' ? 
                        <Database className="h-4 w-4 text-white" /> :
                        <Zap className="h-4 w-4 text-white" />
                      }
                    </div>
                    <h4 className="text-white font-medium">{tool.name}</h4>
                  </div>
                  {tool.isPopular && (
                    <Badge variant="outline" className="bg-alpha-yellow/10 text-alpha-yellow border-alpha-yellow/20 text-[10px]">
                      <Star className="h-3 w-3 mr-1" /> Popular
                    </Badge>
                  )}
                </div>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{tool.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-alpha-navy text-white/60 border-white/20 text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/50 text-xs">Category: {tool.category}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 text-xs border-alpha-green text-alpha-green hover:bg-alpha-green/10"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Add to Flow
                  </Button>
                </div>
              </div>
            )) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-10 text-white/50">
                <Search className="h-10 w-10 mb-2 opacity-20" />
                <p>No tools found matching your search criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="workflows" className="p-4">
            <div className="flex flex-col items-center justify-center py-10 text-white/50">
              <Workflow className="h-10 w-10 mb-2 opacity-20" />
              <p className="mb-2">Template workflows coming soon</p>
              <p className="text-sm">Save your current workflow as a template to see it here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
