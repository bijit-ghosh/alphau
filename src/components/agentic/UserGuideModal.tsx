
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  Workflow, 
  Lightbulb, 
  InfoIcon,
  HelpCircle, 
  PlayCircle, 
  Save,
  LayoutDashboard,
  Share,
  ChartLine,
  ListChecks
} from 'lucide-react';

interface UserGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserGuideModal({ open, onOpenChange }: UserGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-alpha-darknavy text-white border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-alpha-purple" />
            Agent Studio User Guide
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Learn how to create powerful AI workflows with AlphaU Agent Studio
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="getting-started" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="getting-started">
              <PlayCircle className="h-4 w-4 mr-2" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="building-workflows">
              <Workflow className="h-4 w-4 mr-2" />
              Building Workflows
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Share className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="best-practices">
              <Lightbulb className="h-4 w-4 mr-2" />
              Best Practices
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started" className="space-y-4">
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <InfoIcon className="h-5 w-5 mr-2 text-alpha-purple" />
                What is Agent Studio?
              </h3>
              <p className="text-white/70 leading-relaxed">
                AlphaU Agent Studio is a powerful tool for creating AI-driven workflows for financial analysis, data processing, and automated decision-making. It allows you to connect different AI agents, data sources, and tools to create complex workflows without coding.
              </p>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <ListChecks className="h-5 w-5 mr-2 text-alpha-blue" />
                Key Features
              </h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span>Drag-and-drop workflow builder for creating complex AI pipelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span>Specialized financial AI models for market data analysis, sentiment analysis, and portfolio optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span>Integration with external data sources, APIs, and tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span>Real-time workflow execution and monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span>Save and share workflows with your team</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <PlayCircle className="h-5 w-5 mr-2 text-alpha-green" />
                Quick Start Guide
              </h3>
              <ol className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">1</span>
                  <span><strong>Create a new workflow:</strong> Start with a trigger node that will initiate your workflow execution.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">2</span>
                  <span><strong>Add processing nodes:</strong> Drag and drop AI and data processing nodes from the sidebar onto the canvas.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">3</span>
                  <span><strong>Connect nodes:</strong> Click and drag from one node's output handle to another node's input handle to create connections.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">4</span>
                  <span><strong>Configure nodes:</strong> Select a node and use the Inspector panel to customize its settings and AI model.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">5</span>
                  <span><strong>Save and run:</strong> Save your workflow and run it to test its execution.</span>
                </li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="building-workflows" className="space-y-4">
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Workflow className="h-5 w-5 mr-2 text-alpha-blue" />
                Workflow Basics
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                A workflow in Agent Studio consists of connected nodes that process data and make decisions. Each workflow should have a trigger node to start execution and typically ends with an output node.
              </p>
              <p className="text-white/70 leading-relaxed">
                Nodes process data sequentially along the connections you create, transforming inputs into outputs that feed into subsequent nodes.
              </p>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Bot className="h-5 w-5 mr-2 text-alpha-purple" />
                Node Types
              </h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <div className="bg-alpha-purple/20 p-1 rounded mr-2 flex-shrink-0">
                    <Zap className="h-4 w-4 text-alpha-purple" />
                  </div>
                  <div>
                    <strong>Trigger Nodes:</strong> Start workflow execution based on schedule, event, or manual activation.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-alpha-blue/20 p-1 rounded mr-2 flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-alpha-blue" />
                  </div>
                  <div>
                    <strong>Market Data Nodes:</strong> Fetch and process financial market data from various sources.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-alpha-lightblue/20 p-1 rounded mr-2 flex-shrink-0">
                    <ChartLine className="h-4 w-4 text-alpha-lightblue" />
                  </div>
                  <div>
                    <strong>Analysis Nodes:</strong> Perform financial analysis, sentiment analysis, and other data processing tasks.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-alpha-green/20 p-1 rounded mr-2 flex-shrink-0">
                    <LayoutDashboard className="h-4 w-4 text-alpha-green" />
                  </div>
                  <div>
                    <strong>Integration Nodes:</strong> Connect to external tools, databases, and APIs for data exchange.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-500/20 p-1 rounded mr-2 flex-shrink-0">
                    <Share className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <strong>Output Nodes:</strong> Process final results and deliver them to dashboards, notifications, or external systems.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Save className="h-5 w-5 mr-2 text-alpha-yellow" />
                Saving and Managing Workflows
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                You can save workflows for future use and create templates from successful workflows. To save a workflow:
              </p>
              <ol className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="bg-alpha-yellow/20 text-alpha-yellow rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">1</span>
                  <span>Click the "Save" button in the header toolbar</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-yellow/20 text-alpha-yellow rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">2</span>
                  <span>Give your workflow a descriptive name</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-yellow/20 text-alpha-yellow rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">3</span>
                  <span>Optionally add tags and a description</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-yellow/20 text-alpha-yellow rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">4</span>
                  <span>Click "Save Workflow" to store it</span>
                </li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Share className="h-5 w-5 mr-2 text-alpha-blue" />
                Available Integrations
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                Agent Studio offers a wide range of integrations with external tools, data sources, and platforms to enhance your workflows:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-alpha-navy/50 p-3 rounded border border-white/5">
                  <h4 className="font-medium text-alpha-green mb-1">Financial Data Sources</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Bloomberg Data API</li>
                    <li>• Yahoo Finance</li>
                    <li>• Alpha Vantage</li>
                    <li>• Polygon.io</li>
                    <li>• FRED Economic Data</li>
                  </ul>
                </div>
                
                <div className="bg-alpha-navy/50 p-3 rounded border border-white/5">
                  <h4 className="font-medium text-blue-400 mb-1">Data Storage & Processing</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• PostgreSQL</li>
                    <li>• MongoDB</li>
                    <li>• Redis</li>
                    <li>• Amazon S3</li>
                    <li>• Google BigQuery</li>
                  </ul>
                </div>
                
                <div className="bg-alpha-navy/50 p-3 rounded border border-white/5">
                  <h4 className="font-medium text-purple-400 mb-1">Analytics & Visualization</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Tableau</li>
                    <li>• Power BI</li>
                    <li>• Grafana</li>
                    <li>• Looker</li>
                    <li>• Custom Dashboards</li>
                  </ul>
                </div>
                
                <div className="bg-alpha-navy/50 p-3 rounded border border-white/5">
                  <h4 className="font-medium text-amber-400 mb-1">Communications & Alerts</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Email</li>
                    <li>• Slack</li>
                    <li>• Microsoft Teams</li>
                    <li>• SMS via Twilio</li>
                    <li>• Custom webhooks</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Zap className="h-5 w-5 mr-2 text-alpha-green" />
                Setting Up Integrations
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                To add and configure integrations in your workflow:
              </p>
              <ol className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">1</span>
                  <span><strong>Access the Marketplace:</strong> Open the Integration Tools Marketplace from the bottom panel of the Agent Studio.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">2</span>
                  <span><strong>Browse Categories:</strong> Explore different categories of integration tools available.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">3</span>
                  <span><strong>Add to Workflow:</strong> Click "Add to Flow" on the integration you want to use.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">4</span>
                  <span><strong>Configure Credentials:</strong> Set up API keys, connection strings, or other required authentication details in the Inspector panel.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-alpha-green/20 text-alpha-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs flex-shrink-0">5</span>
                  <span><strong>Test Connection:</strong> Use the "Test Connection" button to verify your integration is working properly.</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Workflow className="h-5 w-5 mr-2 text-alpha-yellow" />
                Custom Integration Development
              </h3>
              <p className="text-white/70 leading-relaxed">
                For advanced users, Agent Studio supports custom integration development. You can create your own integration nodes using the AlphaU Integration SDK, which allows you to connect to any external system or API. Contact the AlphaU support team for more information on developing custom integrations.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="best-practices" className="space-y-4">
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <Lightbulb className="h-5 w-5 mr-2 text-alpha-yellow" />
                Workflow Optimization Tips
              </h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-alpha-yellow mr-2">•</span>
                  <span><strong>Keep workflows focused:</strong> Create smaller, more specialized workflows instead of one large complex workflow.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-yellow mr-2">•</span>
                  <span><strong>Use appropriate AI models:</strong> Match the AI model to the specific task - use specialized models for financial tasks and more general models for broader tasks.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-yellow mr-2">•</span>
                  <span><strong>Balance real-time vs. batch processing:</strong> Not everything needs to run in real-time; consider scheduling batch processing for non-urgent tasks.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-yellow mr-2">•</span>
                  <span><strong>Test incrementally:</strong> Test each node and connection before building the entire workflow.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-yellow mr-2">•</span>
                  <span><strong>Document your workflows:</strong> Add descriptions and comments to nodes for easier maintenance and collaboration.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <InfoIcon className="h-5 w-5 mr-2 text-alpha-blue" />
                Common Workflow Patterns
              </h3>
              <div className="space-y-3 text-white/70">
                <div>
                  <h4 className="font-medium text-alpha-blue">Data Enrichment Pipeline</h4>
                  <p className="text-sm">Trigger → Market Data → Sentiment Analysis → Financial Analysis → Output</p>
                  <p className="text-xs text-white/50 mt-1">Best for enriching raw market data with sentiment and financial insights.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-alpha-green">Portfolio Advisory Workflow</h4>
                  <p className="text-sm">Trigger → Market Data → Risk Assessment → Portfolio Optimization → Output</p>
                  <p className="text-xs text-white/50 mt-1">Ideal for generating portfolio recommendations with risk analysis.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-alpha-purple">Market Intelligence Workflow</h4>
                  <p className="text-sm">Trigger → News Data → Sentiment Analysis → Alpha Scoring → Alert System</p>
                  <p className="text-xs text-white/50 mt-1">Perfect for generating real-time market intelligence based on news and sentiment.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-alpha-yellow">Data Integration Workflow</h4>
                  <p className="text-sm">Trigger → Database Connector → Data Transformation → Analysis → BI Dashboard</p>
                  <p className="text-xs text-white/50 mt-1">Effective for connecting external data sources to internal analysis systems.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-alpha-navy/30 p-4 rounded-md">
              <h3 className="text-lg font-medium flex items-center mb-2">
                <HelpCircle className="h-5 w-5 mr-2 text-alpha-blue" />
                Getting Help
              </h3>
              <p className="text-white/70 leading-relaxed mb-3">
                If you need additional assistance with Agent Studio:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span><strong>Documentation:</strong> Visit our comprehensive documentation portal for detailed guides and tutorials.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span><strong>Support:</strong> Contact our support team via the help icon in the top navbar.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span><strong>Community:</strong> Join our user community to share workflows and get advice from other users.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-alpha-blue mr-2">•</span>
                  <span><strong>Training:</strong> Enroll in our training programs to become an AlphaU Agent Studio expert.</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button onClick={() => onOpenChange(false)}>Close Guide</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
