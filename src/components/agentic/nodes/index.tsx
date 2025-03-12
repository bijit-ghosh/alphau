import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  TrendingUp, 
  Brain, 
  LineChart, 
  Shield, 
  Gauge, 
  Zap, 
  SendToBack, 
  ArrowRight,
  Bell,
  Sparkles
} from 'lucide-react';

const handleStyle = { 
  background: '#fff', 
  border: '1px solid #0057B7', 
  width: 8, 
  height: 8 
};

const nodeBaseStyle = `
  p-4 rounded-md transition-shadow text-sm font-medium text-white
  border border-white/10 shadow-md w-[200px]
`;

// Market Data Node
export const MarketDataNode = memo(({ data }: { data: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Simulate data loading effect
    if (data.isProcessing) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [data.isProcessing]);

  return (
    <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-blue/80 to-alpha-purple/80 ${isLoading ? 'animate-pulse' : ''}`}>
      <div className="flex items-center mb-2">
        <TrendingUp className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        <div className="font-medium">{data.label || 'Market Data'}</div>
      </div>
      
      <div className="text-xs text-white/80">
        <p>Fetches real-time market data from financial APIs</p>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
        id="output"
        className="source-handle"
      />
    </div>
  );
});

// Historical Data Node
export const HistoricalDataNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-blue/80 to-alpha-lightblue/80`}>
    <div className="flex items-center mb-2">
      <TrendingUp className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Historical Data'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Retrieves historical financial data and trends</p>
    </div>
    
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// News Data Node
export const NewsDataNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-purple/80 to-alpha-blue/80`}>
    <div className="flex items-center mb-2">
      <TrendingUp className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'News Data'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Fetches financial news and press releases</p>
    </div>
    
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Financial Analysis Node
export const FinancialAnalysisNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-blue/80 to-alpha-lightblue/80`}>
    <div className="flex items-center mb-2">
      <LineChart className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Financial Analysis'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Analyzes financial metrics and fundamentals</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Sentiment Analysis Node
export const SentimentAnalysisNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-purple/80 to-alpha-blue/80`}>
    <div className="flex items-center mb-2">
      <Brain className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Sentiment Analysis'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Analyzes market sentiment from news and social media</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Technical Analysis Node
export const TechnicalAnalysisNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-green/80 to-alpha-blue/80`}>
    <div className="flex items-center mb-2">
      <LineChart className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Technical Analysis'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Chart pattern and technical indicator analysis</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Portfolio Optimization Node
export const PortfolioOptimizationNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-green/80 to-alpha-blue/80`}>
    <div className="flex items-center mb-2">
      <LineChart className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Portfolio Optimization'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Optimizes portfolio allocation based on risk/reward profiles</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Risk Assessment Node
export const RiskAssessmentNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-yellow/80 to-alpha-green/80`}>
    <div className="flex items-center mb-2">
      <Shield className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Risk Assessment'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Evaluates investment risks using proprietary models</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Alpha Scoring Node
export const AlphaScoringNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-lightblue/80 to-alpha-yellow/80`}>
    <div className="flex items-center mb-2">
      <Gauge className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Alpha Scoring'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Generates proprietary AlphaScore™ for investment opportunities</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Trigger Node
export const TriggerNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-purple/90 to-alpha-blue/90`}>
    <div className="flex items-center mb-2">
      <Zap className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Trigger'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Schedule: {data.schedule || 'Daily'}</p>
      <p>Time: {data.time || '9:30 AM'}</p>
    </div>
    
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
      id="output"
    />
  </div>
));

// Output Node
export const OutputNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-[#333] to-[#111]`}>
    <div className="flex items-center mb-2">
      <SendToBack className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Output'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Delivers final results to specified destination</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
  </div>
));

// Alert Node
export const AlertNode = memo(({ data }: { data: any }) => (
  <div className={`${nodeBaseStyle} bg-gradient-to-r from-alpha-yellow/80 to-alpha-red/80`}>
    <div className="flex items-center mb-2">
      <Bell className="w-4 h-4 mr-2" />
      <div className="font-medium">{data.label || 'Alert'}</div>
    </div>
    
    <div className="text-xs text-white/80">
      <p>Sends alerts based on specified conditions</p>
    </div>
    
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
      id="input"
    />
  </div>
));

// Connection Line component with enhanced visuals
export const ConnectionLine = ({ fromX, fromY, toX, toY }: any) => {
  return (
    <g>
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0057B7" />
          <stop offset="50%" stopColor="#6C4BEF" />
          <stop offset="100%" stopColor="#0057B7" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke="url(#connectionGradient)"
        strokeWidth={2}
        className="animated"
        strokeDasharray="5,5"
        d={`M${fromX},${fromY} C${fromX + 50},${fromY} ${toX - 50},${toY} ${toX},${toY}`}
        style={{
          animation: 'flowingDash 1s linear infinite'
        }}
      />
      <circle cx={toX} cy={toY} fill="#6C4BEF" r={3} className="animate-pulse" />
      <Sparkles 
        style={{
          position: 'absolute',
          transform: `translate(${(fromX + toX) / 2 - 8}px, ${(fromY + toY) / 2 - 8}px)`,
          width: '16px',
          height: '16px',
          color: '#6C4BEF',
        }}
        className="animate-pulse"
      />
    </g>
  );
};

// Define the node types map for ReactFlow
export const nodeTypes = {
  marketData: MarketDataNode,
  historicalData: HistoricalDataNode,
  newsData: NewsDataNode,
  financialAnalysis: FinancialAnalysisNode,
  sentimentAnalysis: SentimentAnalysisNode,
  technicalAnalysis: TechnicalAnalysisNode,
  portfolioOptimization: PortfolioOptimizationNode,
  riskAssessment: RiskAssessmentNode,
  alphaScoring: AlphaScoringNode,
  trigger: TriggerNode,
  output: OutputNode,
  alertNode: AlertNode,
};

// Enhanced edge with dynamic visuals
export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: any) => {
  const edgePath = `M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${
    targetX - 50
  },${targetY} ${targetX},${targetY}`;

  return (
    <>
      <defs>
        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0057B7" />
          <stop offset="50%" stopColor="#6C4BEF" />
          <stop offset="100%" stopColor="#0057B7" />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={2}
        stroke="url(#edge-gradient)"
      />
      
      <path
        d={edgePath}
        strokeWidth={2}
        stroke="rgba(108, 75, 239, 0.5)"
        strokeDasharray="5,5"
        className="animate-pulse"
        style={{ animationDuration: "3s" }}
        filter="url(#glow)"
      />
      
      <circle r="3" fill="#6C4BEF" filter="url(#glow)">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>
      
      <ArrowRight
        className="text-alpha-blue animate-pulse"
        style={{
          position: 'absolute',
          transform: `translate(${targetX - 15}px, ${targetY - 8}px)`,
          width: '16px',
          height: '16px',
        }}
      />
    </>
  );
};

export const edgeTypes = {
  custom: CustomEdge,
};
