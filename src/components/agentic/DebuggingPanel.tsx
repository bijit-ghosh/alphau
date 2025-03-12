
import React, { useState } from 'react';
import { Bug, AlertCircle, Play, X, RefreshCcw, Clock, Terminal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LogEntry {
  id: number;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  nodeId?: string;
  details?: string;
}

export function DebuggingPanel() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('logs');
  
  // Sample log data
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date(),
      level: 'info',
      message: 'Workflow execution started',
      details: 'Trigger node activated'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 2000),
      level: 'info',
      message: 'Market Data node processing',
      nodeId: 'node-1',
      details: 'Fetching data from API endpoint'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 4000),
      level: 'warning',
      message: 'API rate limit approaching',
      nodeId: 'node-1',
      details: '80% of rate limit consumed'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 6000),
      level: 'error',
      message: 'Sentiment Analysis failed',
      nodeId: 'node-3',
      details: 'Error: Connection timeout after 30s'
    }
  ]);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const clearLogs = () => {
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All debug logs have been cleared.",
    });
  };

  const runTest = () => {
    toast({
      title: "Test Started",
      description: "Running diagnostic test on workflow...",
    });
    
    // Simulate adding a new log
    setTimeout(() => {
      setLogs(prevLogs => [
        {
          id: prevLogs.length + 1,
          timestamp: new Date(),
          level: 'info',
          message: 'Test execution completed',
          details: 'All nodes validated successfully'
        },
        ...prevLogs
      ]);
      
      toast({
        title: "Test Complete",
        description: "Diagnostic test completed successfully.",
      });
    }, 2000);
  };

  const getLevelColor = (level: 'info' | 'warning' | 'error') => {
    switch (level) {
      case 'info': return 'bg-blue-500/20 text-blue-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed left-5 bottom-44 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy z-10"
        onClick={togglePanel}
      >
        <Bug className="h-4 w-4 mr-2" />
        Debug & Test
      </Button>
    );
  }

  return (
    <div className="fixed left-5 bottom-44 w-96 h-80 bg-alpha-darknavy border border-white/10 rounded-md shadow-lg z-10 flex flex-col">
      <div className="flex justify-between items-center border-b border-white/10 p-3">
        <div className="flex items-center">
          <Bug className="h-4 w-4 mr-2 text-alpha-yellow" />
          <h3 className="text-white text-sm font-medium">Debug & Test</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/5"
          onClick={togglePanel}
        >
          <X size={14} />
        </Button>
      </div>
      
      <Tabs defaultValue="logs" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-alpha-darknavy border-b border-white/10 p-0 h-auto">
          <TabsTrigger value="logs" className="text-xs py-2 data-[state=active]:bg-alpha-blue/10">
            <Terminal className="h-3 w-3 mr-1" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="tests" className="text-xs py-2 data-[state=active]:bg-alpha-yellow/10">
            <Play className="h-3 w-3 mr-1" />
            Run Tests
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs py-2 data-[state=active]:bg-alpha-green/10">
            <Clock className="h-3 w-3 mr-1" />
            Performance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="flex-1 p-0 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-white/5">
            <div className="flex items-center">
              <Badge className={`text-[10px] mr-2 ${logs.length > 0 ? 'bg-alpha-green/20 text-alpha-green' : 'bg-gray-500/20 text-gray-400'}`}>
                {logs.length} entries
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 py-0 px-2 text-xs text-white/70 hover:text-white"
                onClick={clearLogs}
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 py-0 px-2 text-xs text-white/70 hover:text-white"
                onClick={() => {
                  setLogs([...logs]);
                  toast({ title: "Logs Refreshed" });
                }}
              >
                <RefreshCcw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="bg-alpha-navy/30 border border-white/5 rounded-sm p-2">
                    <div className="flex justify-between mb-1">
                      <Badge className={`text-[10px] ${getLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="text-white/40 text-[10px]">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white text-xs font-medium">{log.message}</p>
                    {log.nodeId && (
                      <p className="text-white/60 text-xs">Node: {log.nodeId}</p>
                    )}
                    {log.details && (
                      <p className="text-white/60 text-xs mt-1">{log.details}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/40">
                <Terminal className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">No logs to display</p>
                <p className="text-xs">Run your workflow to generate logs</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="tests" className="flex-1 p-4 overflow-auto">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-4 w-full">
              <h4 className="text-white text-sm font-medium mb-2">Run Diagnostic Test</h4>
              <p className="text-white/60 text-xs mb-3">
                Test your workflow execution without affecting production data
              </p>
              <Button 
                className="w-full bg-alpha-yellow hover:bg-alpha-yellow/90 text-xs"
                onClick={runTest}
              >
                <Play className="h-3 w-3 mr-1" />
                Run Test
              </Button>
            </div>
            
            <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-4 w-full">
              <h4 className="text-white text-sm font-medium mb-2">Validate Workflow</h4>
              <p className="text-white/60 text-xs mb-3">
                Check for issues or potential problems in your workflow
              </p>
              <Button 
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 text-xs"
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Validate
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="flex-1 p-4 overflow-auto">
          <div className="space-y-4">
            <div>
              <h4 className="text-white text-sm font-medium mb-2">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-3">
                  <p className="text-white/60 text-xs">Avg. Execution Time</p>
                  <p className="text-white text-lg font-medium">2.4s</p>
                </div>
                <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-3">
                  <p className="text-white/60 text-xs">Token Usage (24h)</p>
                  <p className="text-white text-lg font-medium">12,845</p>
                </div>
                <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-3">
                  <p className="text-white/60 text-xs">API Calls (24h)</p>
                  <p className="text-white text-lg font-medium">87</p>
                </div>
                <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-3">
                  <p className="text-white/60 text-xs">Success Rate</p>
                  <p className="text-white text-lg font-medium">98.2%</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-medium mb-2">Bottlenecks</h4>
              <div className="bg-alpha-navy/40 border border-white/10 rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-white text-xs font-medium">Sentiment Analysis</p>
                  <Badge className="bg-red-500/20 text-red-400 text-[10px]">Slow</Badge>
                </div>
                <p className="text-white/60 text-xs">Avg. 1.8s per execution (75% of total)</p>
                <Separator className="my-2 bg-white/5" />
                <div className="flex justify-between items-center mb-1">
                  <p className="text-white text-xs font-medium">Market Data</p>
                  <Badge className="bg-yellow-500/20 text-yellow-400 text-[10px]">Medium</Badge>
                </div>
                <p className="text-white/60 text-xs">Avg. 0.6s per execution (25% of total)</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/5 text-xs"
              >
                <RefreshCcw className="h-3 w-3 mr-1" />
                Refresh Metrics
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
