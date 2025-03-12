
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
  X,
  FileSpreadsheet,
  ChartBar,
  ChartLine,
  Share,
  FileInput,
  Server,
  Code,
  LayoutDashboard,
  Network,
  Layers,
  Globe,
  Trello,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  FileText
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgent } from './AgentContext';

// Model type categories
type ModelCategory = 'popular' | 'language' | 'vision' | 'specialized';

// Tool categories
type ToolCategory = 'finance' | 'data-integration' | 'analytics' | 'bi' | 'utility' | 'communication' | 'document';

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
  category: ToolCategory;
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
  // Finance tools
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
    tags: ['optimization', 'risk']
  },
  {
    id: 'economic-indicators',
    name: 'Economic Indicators',
    description: 'Access to global economic indicators and forecasts',
    category: 'finance',
    tags: ['economy', 'forecasts']
  },
  {
    id: 'crypto-analytics',
    name: 'Crypto Analytics',
    description: 'Advanced cryptocurrency market analytics and insights',
    category: 'finance',
    tags: ['crypto', 'blockchain']
  },
  
  // Data Integration tools
  {
    id: 'database-connector',
    name: 'Database Connector',
    description: 'Connect to SQL, NoSQL, and other database systems',
    category: 'data-integration',
    tags: ['database', 'ETL'],
    isPopular: true
  },
  {
    id: 'api-integration',
    name: 'API Integration Hub',
    description: 'Connect to thousands of APIs with pre-built connectors',
    category: 'data-integration',
    tags: ['api', 'rest', 'graphql'],
    isPopular: true
  },
  {
    id: 'data-transformation',
    name: 'Data Transformation Engine',
    description: 'Transform, clean, and prepare data from any source',
    category: 'data-integration',
    tags: ['etl', 'cleaning']
  },
  {
    id: 'file-parser',
    name: 'File Parser',
    description: 'Extract structured data from PDF, CSV, Excel, and more',
    category: 'data-integration',
    tags: ['file', 'extraction']
  },
  {
    id: 'web-scraper',
    name: 'Web Scraper',
    description: 'Extract data from websites and web applications',
    category: 'data-integration',
    tags: ['web', 'scraping']
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage Connector',
    description: 'Connect to AWS S3, Google Cloud Storage, Azure Blob Storage',
    category: 'data-integration',
    tags: ['cloud', 'storage']
  },
  {
    id: 'erp-connector',
    name: 'ERP Connector',
    description: 'Integrate with popular ERP systems like SAP, Oracle, NetSuite',
    category: 'data-integration',
    tags: ['erp', 'enterprise']
  },
  
  // Analytics tools
  {
    id: 'time-series-analysis',
    name: 'Time Series Analysis',
    description: 'Advanced time series forecasting and pattern detection',
    category: 'analytics',
    tags: ['forecasting', 'trends'],
    isPopular: true
  },
  {
    id: 'ml-modeling',
    name: 'ML Modeling',
    description: 'Build and deploy machine learning models without code',
    category: 'analytics',
    tags: ['machine learning', 'prediction'],
    isPopular: true
  },
  {
    id: 'correlation-analyzer',
    name: 'Correlation Analyzer',
    description: 'Discover relationships between variables and datasets',
    category: 'analytics',
    tags: ['correlation', 'analysis']
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    description: 'Identify outliers and abnormal patterns in your data',
    category: 'analytics',
    tags: ['anomaly', 'detection']
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics',
    description: 'Forecast future trends and behaviors using historical data',
    category: 'analytics',
    tags: ['prediction', 'forecasting']
  },
  {
    id: 'text-analytics',
    name: 'Text Analytics',
    description: 'Extract insights from text data with NLP techniques',
    category: 'analytics',
    tags: ['nlp', 'text']
  },
  {
    id: 'statistical-analytics',
    name: 'Statistical Analytics',
    description: 'Perform robust statistical analysis on your data',
    category: 'analytics',
    tags: ['statistics', 'analysis']
  },
  
  // BI tools
  {
    id: 'dashboard-builder',
    name: 'Dashboard Builder',
    description: 'Create interactive dashboards with drag-and-drop simplicity',
    category: 'bi',
    tags: ['visualization', 'dashboard'],
    isPopular: true
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    description: 'Generate customized reports with scheduling capabilities',
    category: 'bi',
    tags: ['reporting', 'scheduling'],
    isPopular: true
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Create stunning visualizations for complex data',
    category: 'bi',
    tags: ['charts', 'graphs']
  },
  {
    id: 'bi-connector',
    name: 'BI Connector',
    description: 'Connect to popular BI tools like Tableau, Power BI, and Looker',
    category: 'bi',
    tags: ['integration', 'export']
  },
  {
    id: 'kpi-tracker',
    name: 'KPI Tracker',
    description: 'Monitor key performance indicators with customizable alerts',
    category: 'bi',
    tags: ['kpi', 'metrics']
  },
  {
    id: 'embedded-analytics',
    name: 'Embedded Analytics',
    description: 'Embed analytics and dashboards into any application',
    category: 'bi',
    tags: ['embedded', 'integration']
  },
  
  // Communication tools
  {
    id: 'email-sender',
    name: 'Email Sender',
    description: 'Send personalized emails and newsletters based on workflow results',
    category: 'communication',
    tags: ['email', 'notification'],
    isPopular: true
  },
  {
    id: 'slack-integration',
    name: 'Slack Integration',
    description: 'Post messages and alerts directly to Slack channels',
    category: 'communication',
    tags: ['slack', 'notification'],
    isPopular: true
  },
  {
    id: 'teams-connector',
    name: 'Microsoft Teams Connector',
    description: 'Send notifications and alerts to Microsoft Teams',
    category: 'communication',
    tags: ['teams', 'microsoft']
  },
  {
    id: 'sms-gateway',
    name: 'SMS Gateway',
    description: 'Send text message alerts and notifications',
    category: 'communication',
    tags: ['sms', 'mobile']
  },
  
  // Document tools
  {
    id: 'document-generator',
    name: 'Document Generator',
    description: 'Create PDF, Word, and Excel documents from workflow data',
    category: 'document',
    tags: ['pdf', 'office'],
    isPopular: true
  },
  {
    id: 'document-analyzer',
    name: 'Document Analyzer',
    description: 'Extract data and insights from uploaded documents',
    category: 'document',
    tags: ['extraction', 'analysis']
  },
  {
    id: 'contract-analyzer',
    name: 'Contract Analyzer',
    description: 'Analyze legal contracts for key terms and risks',
    category: 'document',
    tags: ['legal', 'contracts']
  },
  
  // Utility tools
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
  },
  {
    id: 'webhook-handler',
    name: 'Webhook Handler',
    description: 'Create and manage webhooks for external system integration',
    category: 'utility',
    tags: ['webhook', 'integration']
  },
  {
    id: 'event-listener',
    name: 'Event Listener',
    description: 'Listen for and respond to external events and triggers',
    category: 'utility',
    tags: ['events', 'automation']
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

  // Function to get the appropriate icon for a tool category
  const getCategoryIcon = (category: ToolCategory) => {
    switch(category) {
      case 'finance': return <Database className="h-4 w-4 text-white" />;
      case 'data-integration': return <Share className="h-4 w-4 text-white" />;
      case 'analytics': return <ChartLine className="h-4 w-4 text-white" />;
      case 'bi': return <LayoutDashboard className="h-4 w-4 text-white" />;
      case 'communication': return <MessageSquare className="h-4 w-4 text-white" />;
      case 'document': return <FileText className="h-4 w-4 text-white" />;
      case 'utility': return <Zap className="h-4 w-4 text-white" />;
      default: return <Zap className="h-4 w-4 text-white" />;
    }
  };

  // Function to get background color based on tool category
  const getCategoryColor = (category: ToolCategory) => {
    switch(category) {
      case 'finance': return 'bg-alpha-green/20';
      case 'data-integration': return 'bg-blue-500/20';
      case 'analytics': return 'bg-purple-500/20';
      case 'bi': return 'bg-amber-500/20';
      case 'communication': return 'bg-red-500/20';
      case 'document': return 'bg-teal-500/20';
      case 'utility': return 'bg-alpha-blue/20';
      default: return 'bg-alpha-blue/20';
    }
  };

  // Function to get text color based on tool category
  const getCategoryTextColor = (category: ToolCategory) => {
    switch(category) {
      case 'finance': return 'border-alpha-green text-alpha-green hover:bg-alpha-green/10';
      case 'data-integration': return 'border-blue-400 text-blue-400 hover:bg-blue-400/10';
      case 'analytics': return 'border-purple-400 text-purple-400 hover:bg-purple-400/10';
      case 'bi': return 'border-amber-400 text-amber-400 hover:bg-amber-400/10';
      case 'communication': return 'border-red-400 text-red-400 hover:bg-red-400/10';
      case 'document': return 'border-teal-400 text-teal-400 hover:bg-teal-400/10';
      case 'utility': return 'border-alpha-blue text-alpha-blue hover:bg-alpha-blue/10';
      default: return 'border-alpha-blue text-alpha-blue hover:bg-alpha-blue/10';
    }
  };

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
            <SelectItem value="data-integration">Data Integration</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
            <SelectItem value="bi">Business Intelligence</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="document">Document Processing</SelectItem>
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
          
          <TabsContent value="tools" className="p-4">
            <div className="grid grid-cols-7 gap-2 mb-4">
              <Button 
                size="sm" 
                variant={categoryFilter === 'all' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('all')}
              >
                All Tools
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'finance' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('finance')}
              >
                <Database className="h-3 w-3 mr-1" />
                Finance
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'data-integration' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('data-integration')}
              >
                <Share className="h-3 w-3 mr-1" />
                Data Integration
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'analytics' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('analytics')}
              >
                <ChartLine className="h-3 w-3 mr-1" />
                Analytics
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'bi' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('bi')}
              >
                <LayoutDashboard className="h-3 w-3 mr-1" />
                BI
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'communication' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('communication')}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Communication
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'document' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('document')}
              >
                <FileText className="h-3 w-3 mr-1" />
                Documents
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'utility' ? 'default' : 'outline'}
                className="h-8 text-xs"
                onClick={() => setCategoryFilter('utility')}
              >
                <Zap className="h-3 w-3 mr-1" />
                Utility
              </Button>
              <Button 
                size="sm" 
                variant={categoryFilter === 'popular' ? 'default' : 'outline'}
                className="h-8 text-xs col-span-2"
                onClick={() => setCategoryFilter('popular')}
              >
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {filteredTools.length > 0 ? filteredTools.map(tool => (
                <div key={tool.id} className="bg-alpha-navy/30 border border-white/10 rounded-md p-4 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${getCategoryColor(tool.category)}`}>
                        {getCategoryIcon(tool.category)}
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
                    <span className="text-white/50 text-xs capitalize">{tool.category.replace('-', ' ')}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className={`h-7 text-xs ${getCategoryTextColor(tool.category)}`}
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
            </div>
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
