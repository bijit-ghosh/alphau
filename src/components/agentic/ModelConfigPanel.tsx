
import React, { useState } from 'react';
import { Brain, Sliders, Save, X, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModelConfigPanel() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4000);
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const saveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: `Model settings updated: ${model}, temp: ${temperature.toFixed(1)}`,
    });
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed left-5 bottom-32 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy z-10"
        onClick={togglePanel}
      >
        <Sliders className="h-4 w-4 mr-2" />
        AI Model Config
      </Button>
    );
  }

  return (
    <div className="fixed left-5 bottom-32 w-80 bg-alpha-darknavy border border-white/10 rounded-md shadow-lg z-10">
      <div className="flex justify-between items-center border-b border-white/10 p-3">
        <div className="flex items-center">
          <Brain className="h-4 w-4 mr-2 text-alpha-purple" />
          <h3 className="text-white text-sm font-medium">AI Model Configuration</h3>
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
      
      <div className="p-4 space-y-5">
        <div className="space-y-2">
          <label className="text-white/80 text-xs font-medium">Default AI Model</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="bg-alpha-navy/50 border-white/10 text-white text-xs">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="bg-alpha-darknavy text-white border-white/10">
              <SelectItem value="gpt-4o">GPT-4o (Balanced)</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus (Powerful)</SelectItem>
              <SelectItem value="alphaU-sentiment-v2">AlphaU Sentiment v2</SelectItem>
              <SelectItem value="llama-3-70b">Llama 3 (70B)</SelectItem>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-white/80 text-xs font-medium">Temperature</label>
            <span className="text-white/60 text-xs">{temperature.toFixed(1)}</span>
          </div>
          <Slider
            value={[temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(value) => setTemperature(value[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-white/50 text-xs">
            <span>More Predictable</span>
            <span>More Random</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-white/80 text-xs font-medium">Max Tokens</label>
            <span className="text-white/60 text-xs">{maxTokens}</span>
          </div>
          <Slider
            value={[maxTokens]}
            min={100}
            max={8000}
            step={100}
            onValueChange={(value) => setMaxTokens(value[0])}
            className="mt-2"
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <Label htmlFor="streaming-mode" className="text-white/80 text-xs font-medium">
              Enable streaming responses
            </Label>
            <p className="text-white/50 text-xs mt-1">Get tokens as they are generated</p>
          </div>
          <Switch
            id="streaming-mode"
            checked={streamingEnabled}
            onCheckedChange={setStreamingEnabled}
          />
        </div>
        
        <div className="pt-2 border-t border-white/10">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 h-8 text-xs bg-alpha-purple hover:bg-alpha-purple/90"
              onClick={saveConfig}
            >
              <Save className="h-3 w-3 mr-1" />
              Save as Default
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="flex-1 h-8 text-xs border-white/20 text-white hover:bg-white/5"
              onClick={togglePanel}
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-1 text-xs text-white/50">
          <Activity className="h-3 w-3" />
          <span>Streaming usage stats available in dashboard</span>
        </div>
      </div>
    </div>
  );
}
