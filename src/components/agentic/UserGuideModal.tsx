
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Workflow, Database, Brain, Lightbulb, Server, Zap, Play, X } from 'lucide-react';

interface UserGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserGuideModal({ open, onOpenChange }: UserGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-alpha-darknavy border-white/10 text-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Book className="h-5 w-5 mr-2 text-alpha-blue" />
            AlphaU Agent Studio User Guide
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Learn how to build, configure, and deploy AI-powered workflows
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-5 bg-alpha-darknavy border border-white/10 rounded-md h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-alpha-blue/10 py-2">
              <Lightbulb className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="workflow" className="data-[state=active]:bg-alpha-green/10 py-2">
              <Workflow className="h-4 w-4 mr-2" />
              Building Flows
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-alpha-yellow/10 py-2">
              <Database className="h-4 w-4 mr-2" />
              Data & APIs
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-alpha-purple/10 py-2">
              <Brain className="h-4 w-4 mr-2" />
              AI Models
            </TabsTrigger>
            <TabsTrigger value="deploy" className="data-[state=active]:bg-red-500/10 py-2">
              <Server className="h-4 w-4 mr-2" />
              Deployment
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[500px] mt-4 pr-4">
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Welcome to AlphaU Agent Studio</h3>
                <p className="text-white/80">
                  AlphaU Agent Studio is a powerful platform for creating AI-driven workflows that combine market data, financial analysis, and intelligent decision-making.
                </p>
                
                <div className="bg-alpha-blue/10 border border-alpha-blue/20 rounded-md p-4">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <Zap className="h-4 w-4 mr-2 text-alpha-blue" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-white/80 list-disc pl-5">
                    <li>Visual workflow builder with drag-and-drop node system</li>
                    <li>Integration with financial APIs and data sources</li>
                    <li>Advanced AI models for market analysis and sentiment detection</li>
                    <li>Data transformation and portfolio optimization tools</li>
                    <li>Scheduling and automation capabilities</li>
                    <li>Real-time testing and debugging tools</li>
                  </ul>
                </div>
                
                <h4 className="text-white font-medium mt-6">Getting Started</h4>
                <p className="text-white/80">
                  To create your first workflow, follow these steps:
                </p>
                
                <ol className="space-y-3 text-white/80 list-decimal pl-5">
                  <li>
                    <span className="font-medium text-white">Add a Trigger Node</span> - Start with a trigger node to define when your workflow should run.
                  </li>
                  <li>
                    <span className="font-medium text-white">Add Processing Nodes</span> - Drag data sources, analysis tools, and other processing nodes from the sidebar.
                  </li>
                  <li>
                    <span className="font-medium text-white">Connect the Nodes</span> - Click and drag between node handles to create connections.
                  </li>
                  <li>
                    <span className="font-medium text-white">Configure Each Node</span> - Select nodes to view and adjust their settings in the Inspector panel.
                  </li>
                  <li>
                    <span className="font-medium text-white">Test Your Workflow</span> - Use the Debug panel to test run your workflow.
                  </li>
                  <li>
                    <span className="font-medium text-white">Deploy</span> - When ready, deploy your workflow for automatic execution.
                  </li>
                </ol>
                
                <div className="bg-alpha-green/10 border border-alpha-green/20 rounded-md p-4 mt-6">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <Play className="h-4 w-4 mr-2 text-alpha-green" />
                    Quick Tutorial
                  </h4>
                  <p className="text-white/80 mb-2">
                    Watch our 3-minute tutorial to get started quickly:
                  </p>
                  <div className="bg-alpha-navy rounded-md h-40 flex items-center justify-center border border-white/10">
                    <p className="text-white/50 text-sm">Video Tutorial (Coming Soon)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Building Workflows</h3>
                <p className="text-white/80">
                  The workflow canvas is where you'll design your AI agent's process flow. Here's how to create effective workflows:
                </p>
                
                <h4 className="text-white font-medium mt-6">Node Types</h4>
                <div className="space-y-3">
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-alpha-purple" />
                      Trigger Nodes
                    </h5>
                    <p className="text-white/70 text-sm mt-1">
                      Define when your workflow executes. Options include scheduled runs, API triggers, or event-based activation.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium flex items-center">
                      <Database className="h-4 w-4 mr-2 text-alpha-blue" />
                      Data Source Nodes
                    </h5>
                    <p className="text-white/70 text-sm mt-1">
                      Connect to market data, news feeds, uploaded files, or other external data sources.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-alpha-purple" />
                      AI Processing Nodes
                    </h5>
                    <p className="text-white/70 text-sm mt-1">
                      Apply AI models for sentiment analysis, prediction, classification, or other intelligent processing.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium flex items-center">
                      <Server className="h-4 w-4 mr-2 text-alpha-green" />
                      Output & Integration Nodes
                    </h5>
                    <p className="text-white/70 text-sm mt-1">
                      Send results to dashboards, notification systems, or other platforms.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-white font-medium mt-6">Connection Types</h4>
                <p className="text-white/80">
                  Nodes are connected via data flows, where the output from one node becomes the input for the next.
                </p>
                
                <div className="bg-alpha-yellow/10 border border-alpha-yellow/20 rounded-md p-4 mt-4">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2 text-alpha-yellow" />
                    Best Practices
                  </h4>
                  <ul className="space-y-2 text-white/80 list-disc pl-5">
                    <li>Start with simple workflows and iterate</li>
                    <li>Group related processing nodes together</li>
                    <li>Add comment nodes to document complex sections</li>
                    <li>Test each node individually before connecting</li>
                    <li>Use error handling nodes for robust workflows</li>
                    <li>Save versions of your workflow as you develop</li>
                  </ul>
                </div>
                
                <div className="bg-alpha-navy rounded-md h-40 flex items-center justify-center border border-white/10 mt-4">
                  <p className="text-white/50 text-sm">Workflow Example Diagram (Coming Soon)</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Data & API Integrations</h3>
                <p className="text-white/80">
                  AlphaU Agent Studio supports multiple ways to integrate data into your workflows.
                </p>
                
                <h4 className="text-white font-medium mt-6">Available Data Sources</h4>
                <div className="space-y-3">
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Market Data APIs</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Connect to popular financial data providers for real-time and historical market data.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Supported: Alpha Vantage, Polygon.io, Yahoo Finance, IEX Cloud, and more.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">File Uploads</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Upload and process CSV, JSON, Excel, or text files containing custom data.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Use the Data Upload panel to manage your uploaded files.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Database Connections</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Connect directly to SQL, NoSQL, or time-series databases for data processing.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Supported: PostgreSQL, MySQL, MongoDB, InfluxDB, and more.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">News & Social Media</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Analyze news articles, social media posts, and other textual content.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Sentiment analysis nodes can process these inputs for market signals.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-white font-medium mt-6">Working with APIs</h4>
                <p className="text-white/80">
                  To configure an API connection:
                </p>
                
                <ol className="space-y-2 text-white/80 list-decimal pl-5">
                  <li>Add an API connector node to your workflow</li>
                  <li>Select the API from the dropdown or enter custom endpoint details</li>
                  <li>Configure authentication (API keys, OAuth, etc.)</li>
                  <li>Set request parameters and response handling options</li>
                  <li>Test the connection before proceeding</li>
                </ol>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 mt-4">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <X className="h-4 w-4 mr-2 text-red-400" />
                    Important Security Note
                  </h4>
                  <p className="text-white/80 text-sm">
                    Never hard-code API keys or credentials in your workflow. Always use the secure credential manager in the platform settings.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="models" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">AI Models & Configuration</h3>
                <p className="text-white/80">
                  AlphaU Agent Studio provides access to various AI models optimized for different tasks.
                </p>
                
                <h4 className="text-white font-medium mt-6">Available Models</h4>
                <div className="space-y-3">
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">GPT-4o</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Versatile large language model for general text processing and reasoning.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Best for: General analysis, complex reasoning, and varied content processing.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Claude 3 Opus</h5>
                    <p className="text-white/70 text-sm mt-1">
                      High-performance model with strong reasoning capabilities.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Best for: Detailed analysis, financial report generation, and complex patterns.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">AlphaU Sentiment v2</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Specialized model fine-tuned for market sentiment analysis.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Best for: News analysis, social media sentiment, and market mood detection.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">AlphaU Financial v3</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Fine-tuned model for financial data analysis and forecasting.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Best for: Financial patterns, technical analysis, and market predictions.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-white font-medium mt-6">Model Configuration</h4>
                <p className="text-white/80">
                  When configuring AI models in your workflow, consider these parameters:
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Temperature</h5>
                    <p className="text-white/70 text-xs mt-1">
                      Controls randomness. Lower values (0.1-0.4) for more predictable, factual responses. Higher values (0.7-1.0) for more creative, varied outputs.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Max Tokens</h5>
                    <p className="text-white/70 text-xs mt-1">
                      Limits response length. Set appropriately for your task to control costs and processing time.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">System Prompt</h5>
                    <p className="text-white/70 text-xs mt-1">
                      Initial instructions that guide the model's behavior. Be specific about the desired output format and analysis approach.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Streaming</h5>
                    <p className="text-white/70 text-xs mt-1">
                      Enables token-by-token processing. Useful for real-time applications but may increase complexity.
                    </p>
                  </div>
                </div>
                
                <div className="bg-alpha-purple/10 border border-alpha-purple/20 rounded-md p-4 mt-4">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2 text-alpha-purple" />
                    Model Selection Tips
                  </h4>
                  <ul className="space-y-2 text-white/80 list-disc pl-5">
                    <li>Use specialized models for domain-specific tasks</li>
                    <li>Consider model token limits when processing large documents</li>
                    <li>Balance performance with cost based on your needs</li>
                    <li>Test different models on the same task to compare results</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deploy" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Deployment & Production</h3>
                <p className="text-white/80">
                  Once your workflow is built and tested, you can deploy it for automated execution.
                </p>
                
                <h4 className="text-white font-medium mt-6">Deployment Options</h4>
                <div className="space-y-3">
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Scheduled Execution</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Run your workflow on a time-based schedule (hourly, daily, weekly, etc.).
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Perfect for regular analyses or reports that follow consistent time patterns.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Event-Driven</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Trigger workflows based on external events (price movements, news releases, etc.).
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Ideal for time-sensitive applications that need to respond to market conditions.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">API Endpoint</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Expose your workflow as an API that can be called from other applications.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      Useful for integrating your AI workflows into existing systems.
                    </p>
                  </div>
                  
                  <div className="bg-alpha-navy/50 border border-white/10 rounded-md p-3">
                    <h5 className="text-white text-sm font-medium">Continuous Processing</h5>
                    <p className="text-white/70 text-sm mt-1">
                      Maintain a constantly running workflow that processes data in real-time.
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      For applications requiring immediate analysis of streaming data.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-white font-medium mt-6">Monitoring & Maintenance</h4>
                <p className="text-white/80">
                  After deployment, it's important to monitor your workflow's performance:
                </p>
                
                <ul className="space-y-2 text-white/80 list-disc pl-5">
                  <li>Use the dashboard to monitor execution history</li>
                  <li>Set up alerts for execution failures or anomalies</li>
                  <li>Review logs regularly to identify potential issues</li>
                  <li>Monitor resource usage and costs</li>
                  <li>Set up performance thresholds for automatic notifications</li>
                </ul>
                
                <div className="bg-alpha-blue/10 border border-alpha-blue/20 rounded-md p-4 mt-4">
                  <h4 className="text-white font-medium flex items-center mb-2">
                    <Server className="h-4 w-4 mr-2 text-alpha-blue" />
                    Production Best Practices
                  </h4>
                  <ul className="space-y-2 text-white/80 list-disc pl-5">
                    <li>Implement proper error handling for all critical nodes</li>
                    <li>Set up fallback options for external service disruptions</li>
                    <li>Use versioning when updating production workflows</li>
                    <li>Document your workflow thoroughly for team collaboration</li>
                    <li>Implement a testing strategy for workflow updates</li>
                    <li>Set up appropriate access controls for sensitive workflows</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
