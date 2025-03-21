
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, BarChart2, FileText, Briefcase, ArrowRight, MessageSquare, Lock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const InvestmentWorkflowScreenshots = () => {
  const [selectedTab, setSelectedTab] = useState('sourcing');
  
  return (
    <div className="h-full bg-gradient-to-br from-alpha-darknavy to-black p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">AlphaU Investment Workflow Examples</h2>
        <p className="text-gray-400 mb-6">Interactive visual examples of the investment workflow stages</p>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="sourcing" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Sourcing</span>
            </TabsTrigger>
            <TabsTrigger value="screening" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Screening</span>
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Scoring</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Portfolio</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Sourcing Tab */}
          <TabsContent value="sourcing" className="w-full">
            <Card className="p-6 bg-alpha-darknavy border-alpha-navy">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Deal Sourcing & Discovery</h3>
                <Badge variant="outline" className="bg-alpha-blue/20 text-alpha-blue border-alpha-blue/30">
                  Stage 1
                </Badge>
              </div>
              
              <div className="mb-8">
                <div className="relative">
                  <div className="flex gap-2 p-4 bg-black/30 rounded-lg border border-white/10 mb-4">
                    <textarea 
                      className="w-full bg-transparent border-none text-white placeholder-white/50 resize-none focus:outline-none focus:ring-0" 
                      placeholder="Find SaaS companies in the B2B space with ARR growth > 100% YoY, seed to Series A stage, in the US or Europe, with founding teams that have prior exits"
                      rows={3}
                    />
                    <Button variant="ghost" className="bg-alpha-purple text-white hover:bg-alpha-purple/80 self-end">
                      Search
                    </Button>
                  </div>
                  
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70">
                    <MessageSquare className="h-6 w-6 mb-2 animate-pulse" />
                    <p className="text-sm">AlphaU is processing your request...</p>
                    <Progress value={65} className="w-64 mt-3" />
                  </div>
                </div>
                
                <div className="mt-12 p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-white">Results: Top Matches (24)</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">Filter</Button>
                      <Button variant="outline" size="sm" className="text-xs">Export</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { 
                        name: 'TechCloud AI', 
                        industry: 'B2B SaaS - DevOps', 
                        stage: 'Series A',
                        growth: '168% YoY',
                        score: 92,
                        founded: '2020',
                        location: 'Boston, MA'
                      },
                      { 
                        name: 'Revflow Analytics', 
                        industry: 'B2B SaaS - FinTech', 
                        stage: 'Seed',
                        growth: '212% YoY',
                        score: 88,
                        founded: '2021',
                        location: 'London, UK'
                      },
                      { 
                        name: 'SecureStack', 
                        industry: 'B2B SaaS - Cybersecurity', 
                        stage: 'Series A',
                        growth: '124% YoY',
                        score: 86,
                        founded: '2019',
                        location: 'Berlin, Germany'
                      },
                    ].map((company, i) => (
                      <div key={i} className="p-4 bg-black/30 rounded-md border border-white/10 hover:border-alpha-blue/50 transition cursor-pointer">
                        <div className="flex justify-between">
                          <div>
                            <h5 className="font-semibold text-white">{company.name}</h5>
                            <div className="text-sm text-gray-400 mt-1">
                              {company.industry} • Founded {company.founded} • {company.location}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-xl font-bold text-alpha-green">{company.score}</div>
                            <div className="text-xs text-gray-400">Match Score</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-3">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-white/5 text-xs">
                              {company.stage}
                            </Badge>
                            <Badge variant="outline" className="bg-alpha-green/10 text-alpha-green text-xs">
                              {company.growth}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs text-alpha-blue">
                            View Details <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-alpha-blue/10 border border-alpha-blue/20 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Data Sources
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {['Crunchbase', 'PitchBook', 'CB Insights', 'LinkedIn', 'AlphaU Proprietary Data', 'Public Filings'].map((source, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-alpha-blue/5">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Screening Tab */}
          <TabsContent value="screening" className="w-full">
            <Card className="p-6 bg-alpha-darknavy border-alpha-navy">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge variant="outline" className="mb-2 bg-alpha-green/10 text-alpha-green">Selected Deal</Badge>
                  <h3 className="text-xl font-semibold text-white">TechCloud AI - Detailed Evaluation</h3>
                </div>
                <Badge variant="outline" className="bg-alpha-purple/20 text-alpha-purple border-alpha-purple/30">
                  Stage 2
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Company Overview</h4>
                  <p className="text-sm text-white mb-4">
                    TechCloud AI provides DevOps automation tools for enterprise software teams, with a focus on CI/CD optimization and cloud cost management.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Founded:</span>
                      <span className="text-white">2020</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Funding Stage:</span>
                      <span className="text-white">Series A</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Round:</span>
                      <span className="text-white">$12M (8 months ago)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">Boston, MA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Team Size:</span>
                      <span className="text-white">48 employees</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Key Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">ARR Growth</span>
                        <span className="text-sm font-medium text-alpha-green">168% YoY</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">Customer Retention</span>
                        <span className="text-sm font-medium text-alpha-green">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">Gross Margin</span>
                        <span className="text-sm font-medium text-alpha-yellow">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">CAC Payback</span>
                        <span className="text-sm font-medium text-alpha-green">9.2 months</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">Cash Runway</span>
                        <span className="text-sm font-medium text-alpha-yellow">16 months</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">AlphaU Scoring</h4>
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-alpha-blue to-alpha-purple flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">86</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Team Quality:</span>
                      <span className="text-alpha-green">Very Strong</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Market Opportunity:</span>
                      <span className="text-alpha-green">Excellent</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Product Advantage:</span>
                      <span className="text-alpha-yellow">Good</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Competitive Position:</span>
                      <span className="text-alpha-yellow">Moderate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Financial Health:</span>
                      <span className="text-alpha-green">Strong</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Key Strengths</h4>
                  <ul className="space-y-2">
                    {[
                      'Strong founding team with previous exits at Atlassian',
                      'Rapid customer acquisition (38 new enterprise clients in last quarter)',
                      'Proprietary ML algorithm for cloud cost optimization (3 patents)',
                      'High net dollar retention (142%) indicating product stickiness',
                      'Clear path to profitability within 18 months'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-alpha-green shrink-0 mt-0.5" />
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Risk Factors</h4>
                  <ul className="space-y-2">
                    {[
                      'Increasing competition from cloud providers (AWS, Azure)',
                      'Recently lost CTO to competitor (potential IP risk)',
                      'Enterprise sales cycle longer than expected (avg. 4.2 months)',
                      'Geographic concentration risk (82% US customers)',
                      'Higher than industry average customer acquisition costs'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-alpha-yellow shrink-0 mt-0.5" />
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button className="bg-alpha-purple hover:bg-alpha-purple/90 text-white">
                  Move to Scoring Stage
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  Request More Data
                </Button>
                <Button variant="ghost" className="text-white">
                  Add to Watchlist
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          {/* Scoring Tab */}
          <TabsContent value="scoring" className="w-full">
            <Card className="p-6 bg-alpha-darknavy border-alpha-navy">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge variant="outline" className="mb-2 bg-alpha-blue/10 text-alpha-blue">Detailed Analysis</Badge>
                  <h3 className="text-xl font-semibold text-white">TechCloud AI - Investment Scoring</h3>
                </div>
                <Badge variant="outline" className="bg-alpha-yellow/20 text-alpha-yellow border-alpha-yellow/30">
                  Stage 3
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="col-span-2 bg-black/20 border-white/10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-white">Valuation & Return Simulation</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7">Run Scenario</Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">Compare</Button>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-black/30 rounded-md border border-white/10 flex items-center justify-center">
                    {/* This is a placeholder for a chart */}
                    <div className="text-center text-white/50">
                      <BarChart2 className="h-12 w-12 mx-auto mb-2 text-alpha-blue/70" />
                      <p>Monte Carlo Simulation showing projected returns across 1000 scenarios</p>
                      <p className="text-xs mt-2">(Interactive chart with outcome probabilities)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">Expected IRR</div>
                      <div className="text-lg font-bold text-alpha-green">42.8%</div>
                      <div className="text-xs text-white/50">Range: 28% - 65%</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">MOIC</div>
                      <div className="text-lg font-bold text-alpha-green">4.2x</div>
                      <div className="text-xs text-white/50">Range: 2.6x - 6.5x</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">Exit Timeline</div>
                      <div className="text-lg font-bold text-white">4.8 yrs</div>
                      <div className="text-xs text-white/50">Range: 3.5 - 6 yrs</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4">Simulation Parameters</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-400">Exit Valuation Multiple</label>
                        <span className="text-xs text-white">8.5x ARR</span>
                      </div>
                      <div className="relative pt-2">
                        <div className="h-1.5 bg-black/30 rounded-full">
                          <div className="absolute h-1.5 bg-alpha-blue rounded-full" style={{ width: '65%' }}></div>
                          <div className="absolute h-3 w-3 bg-white rounded-full border-2 border-alpha-blue" style={{ left: '65%', top: '-3px' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>5x</span>
                          <span>15x</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-400">ARR Growth Rate (Y1-Y3)</label>
                        <span className="text-xs text-white">85% → 45%</span>
                      </div>
                      <div className="relative pt-2">
                        <div className="h-1.5 bg-black/30 rounded-full">
                          <div className="absolute h-1.5 bg-alpha-blue rounded-full" style={{ width: '70%' }}></div>
                          <div className="absolute h-3 w-3 bg-white rounded-full border-2 border-alpha-blue" style={{ left: '70%', top: '-3px' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>20%</span>
                          <span>120%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-400">Burn Rate Multiple</label>
                        <span className="text-xs text-white">1.2x</span>
                      </div>
                      <div className="relative pt-2">
                        <div className="h-1.5 bg-black/30 rounded-full">
                          <div className="absolute h-1.5 bg-alpha-blue rounded-full" style={{ width: '40%' }}></div>
                          <div className="absolute h-3 w-3 bg-white rounded-full border-2 border-alpha-blue" style={{ left: '40%', top: '-3px' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0.5x</span>
                          <span>2.5x</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-400">Dilution (Future Rounds)</label>
                        <span className="text-xs text-white">35%</span>
                      </div>
                      <div className="relative pt-2">
                        <div className="h-1.5 bg-black/30 rounded-full">
                          <div className="absolute h-1.5 bg-alpha-blue rounded-full" style={{ width: '50%' }}></div>
                          <div className="absolute h-3 w-3 bg-white rounded-full border-2 border-alpha-blue" style={{ left: '50%', top: '-3px' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>15%</span>
                          <span>60%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-400">Gross Margin at Scale</label>
                        <span className="text-xs text-white">82%</span>
                      </div>
                      <div className="relative pt-2">
                        <div className="h-1.5 bg-black/30 rounded-full">
                          <div className="absolute h-1.5 bg-alpha-blue rounded-full" style={{ width: '82%' }}></div>
                          <div className="absolute h-3 w-3 bg-white rounded-full border-2 border-alpha-blue" style={{ left: '82%', top: '-3px' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>50%</span>
                          <span>90%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button size="sm" className="w-full bg-alpha-blue hover:bg-alpha-blue/90 text-white text-xs">
                        Update Simulation
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-white">AI-Suggested Scenarios</h4>
                    <Badge variant="outline" className="text-xs bg-alpha-purple/10 text-alpha-purple">
                      AlphaU Recommendations
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Base Case',
                        description: 'Current market conditions with expected growth trajectory',
                        irr: '42.8%',
                        moic: '4.2x',
                        probability: '65%'
                      },
                      {
                        name: 'Market Downturn',
                        description: 'Economic recession with extended fundraising cycles',
                        irr: '28.4%',
                        moic: '2.6x',
                        probability: '20%'
                      },
                      {
                        name: 'Accelerated Growth',
                        description: 'Enterprise adoption accelerates with international expansion',
                        irr: '68.2%',
                        moic: '7.1x',
                        probability: '15%'
                      }
                    ].map((scenario, i) => (
                      <div key={i} className="p-3 bg-black/30 rounded-md border border-white/10">
                        <h5 className="font-medium text-white text-sm">{scenario.name}</h5>
                        <p className="text-xs text-gray-400 mt-1 mb-3">{scenario.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-gray-400">IRR</div>
                            <div className="font-medium text-white">{scenario.irr}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">MOIC</div>
                            <div className="font-medium text-white">{scenario.moic}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Prob.</div>
                            <div className="font-medium text-white">{scenario.probability}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button className="bg-alpha-green hover:bg-alpha-green/90 text-white">
                  Generate Investment Memo
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  Adjust Parameters
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  Schedule IC Discussion
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="w-full">
            <Card className="p-6 bg-alpha-darknavy border-alpha-navy">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge variant="outline" className="mb-2 bg-alpha-green/10 text-alpha-green">Investment Decision</Badge>
                  <h3 className="text-xl font-semibold text-white">TechCloud AI - Recommendations & Due Diligence</h3>
                </div>
                <Badge variant="outline" className="bg-alpha-red/20 text-alpha-red border-alpha-red/30">
                  Stage 4
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-alpha-blue" />
                    Investment Thesis
                  </h4>
                  
                  <div className="space-y-3 text-sm text-white">
                    <p>
                      TechCloud AI presents a compelling investment opportunity in the rapidly growing DevOps automation space, with a proprietary ML engine that significantly reduces cloud infrastructure costs for enterprise clients.
                    </p>
                    <p>
                      The company's strong founding team (ex-Atlassian) has demonstrated product-market fit with impressive customer retention metrics and a growing enterprise client base, despite a competitive landscape.
                    </p>
                    <p>
                      With a clear path to profitability, expansion into international markets, and potential acquisition interest from major cloud providers, TechCloud AI is positioned for a successful exit within 4-5 years.
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h5 className="text-sm font-medium text-white mb-2">Recommended Deal Terms</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-400">Valuation Cap</div>
                        <div className="font-medium text-white">$85M</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Investment Size</div>
                        <div className="font-medium text-white">$3.5M - $5M</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Ownership Target</div>
                        <div className="font-medium text-white">5-7%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Instrument</div>
                        <div className="font-medium text-white">Priced Round</div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-alpha-yellow" />
                    Critical Due Diligence Questions
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      {
                        question: "What impact has the recent CTO departure had on product development timelines?",
                        category: "Team",
                        priority: "High"
                      },
                      {
                        question: "How is the company addressing the increasing competition from cloud providers?",
                        category: "Competition",
                        priority: "High"
                      },
                      {
                        question: "What is the strategy to reduce CAC and shorten enterprise sales cycles?",
                        category: "Sales",
                        priority: "Medium"
                      },
                      {
                        question: "Details on international expansion plans and timeline?",
                        category: "Growth",
                        priority: "Medium"
                      },
                      {
                        question: "IP protection status for the ML algorithms (patents filed vs. granted)?",
                        category: "Legal",
                        priority: "High"
                      }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-black/30 rounded-md border border-white/10">
                        <div className="flex justify-between mb-1">
                          <Badge variant="outline" className={`text-xs ${
                            item.priority === 'High' ? 'bg-alpha-red/10 text-alpha-red' : 
                            'bg-alpha-yellow/10 text-alpha-yellow'
                          }`}>
                            {item.priority} Priority
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white/5">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-white mt-1">{item.question}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-alpha-purple" />
                      Additional AI-Generated Insights
                    </h4>
                    <Button variant="outline" size="sm" className="text-xs">Refresh Analysis</Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <h5 className="font-medium text-white text-sm">Market Timing</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Market conditions for DevOps companies suggest optimal entry point, with valuations down 18% from peak but strong strategic acquisition interest.
                      </p>
                    </div>
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <h5 className="font-medium text-white text-sm">Portfolio Synergies</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Strong potential synergies with existing portfolio companies CloudSecure and DevFlow. Possible combined go-to-market strategy could accelerate growth.
                      </p>
                    </div>
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <h5 className="font-medium text-white text-sm">Competitive Landscape</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        Recent M&A activity suggests consolidation in the space. TechCloud's patent portfolio provides defensive moat against four key competitors.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button className="bg-alpha-green hover:bg-alpha-green/90 text-white">
                  Proceed to Term Sheet
                </Button>
                <Button variant="outline" className="border-alpha-blue/30 text-alpha-blue">
                  Schedule Founder Meeting
                </Button>
                <Button variant="outline" className="border-alpha-red/30 text-alpha-red">
                  Request Legal Review
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="w-full">
            <Card className="p-6 bg-alpha-darknavy border-alpha-navy">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge variant="outline" className="mb-2 bg-alpha-blue/10 text-alpha-blue">Portfolio Management</Badge>
                  <h3 className="text-xl font-semibold text-white">Active Portfolio Monitoring & Optimization</h3>
                </div>
                <Badge variant="outline" className="bg-alpha-green/20 text-alpha-green border-alpha-green/30">
                  Stage 5
                </Badge>
              </div>
              
              <div className="grid grid-cols-12 gap-6 mb-6">
                <Card className="col-span-8 bg-black/20 border-white/10 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-white">Portfolio Performance Dashboard</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">Fund III</Badge>
                      <Button variant="outline" size="sm" className="text-xs h-7">Filter</Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">Export</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-white/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-black/30">
                        <tr>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">Company</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">Investment Date</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">Stage</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">Current Value</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">MOIC</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">IRR</th>
                          <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">Health</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          {
                            name: 'TechCloud AI',
                            date: 'May 2023',
                            stage: 'Series A',
                            value: '$6.2M',
                            moic: '1.4x',
                            irr: '38.2%',
                            health: 'Strong'
                          },
                          {
                            name: 'DataSync',
                            date: 'Jan 2022',
                            stage: 'Series B',
                            value: '$12.8M',
                            moic: '2.6x',
                            irr: '56.4%',
                            health: 'Strong'
                          },
                          {
                            name: 'SecureNet',
                            date: 'Apr 2021',
                            stage: 'Series C',
                            value: '$18.5M',
                            moic: '3.1x',
                            irr: '45.8%',
                            health: 'Strong'
                          },
                          {
                            name: 'QuantumCode',
                            date: 'Oct 2022',
                            stage: 'Series A',
                            value: '$3.8M',
                            moic: '0.9x',
                            irr: '-12.4%',
                            health: 'At Risk'
                          },
                          {
                            name: 'Blockvault',
                            date: 'Mar 2023',
                            stage: 'Seed',
                            value: '$2.1M',
                            moic: '1.1x',
                            irr: '8.6%',
                            health: 'Moderate'
                          }
                        ].map((company, i) => (
                          <tr key={i} className={`${i % 2 === 0 ? 'bg-black/10' : 'bg-black/20'} hover:bg-alpha-blue/5 cursor-pointer`}>
                            <td className="px-4 py-3 text-white font-medium">{company.name}</td>
                            <td className="px-4 py-3 text-gray-300">{company.date}</td>
                            <td className="px-4 py-3 text-gray-300">{company.stage}</td>
                            <td className="px-4 py-3 text-white font-medium">{company.value}</td>
                            <td className={`px-4 py-3 font-medium ${
                              parseFloat(company.moic) >= 1.5 ? 'text-alpha-green' :
                              parseFloat(company.moic) < 1 ? 'text-alpha-red' : 'text-alpha-yellow'
                            }`}>
                              {company.moic}
                            </td>
                            <td className={`px-4 py-3 font-medium ${
                              parseFloat(company.irr) >= 30 ? 'text-alpha-green' :
                              parseFloat(company.irr) < 0 ? 'text-alpha-red' : 'text-alpha-yellow'
                            }`}>
                              {company.irr}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={`
                                ${company.health === 'Strong' ? 'bg-alpha-green/10 text-alpha-green' :
                                  company.health === 'At Risk' ? 'bg-alpha-red/10 text-alpha-red' :
                                  'bg-alpha-yellow/10 text-alpha-yellow'}
                              `}>
                                {company.health}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                
                <Card className="col-span-4 bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4">Portfolio Optimization Actions</h4>
                  
                  <div className="space-y-3">
                    {[
                      {
                        company: 'TechCloud AI',
                        action: 'Growth Acceleration',
                        description: 'Introduce to enterprise clients in financial services vertical',
                        priority: 'Medium'
                      },
                      {
                        company: 'QuantumCode',
                        action: 'Restructuring Support',
                        description: 'Assist with cost reduction and refocus on core product',
                        priority: 'High'
                      },
                      {
                        company: 'DataSync',
                        action: 'Exit Planning',
                        description: 'Begin preparation for potential acquisition in next 12-18 months',
                        priority: 'Medium'
                      }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-black/30 rounded-md border border-white/10">
                        <div className="flex justify-between mb-1">
                          <Badge className="text-xs bg-alpha-blue/80 hover:bg-alpha-blue">
                            {item.company}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            item.priority === 'High' ? 'bg-alpha-red/10 text-alpha-red' : 
                            'bg-alpha-yellow/10 text-alpha-yellow'
                          }`}>
                            {item.priority} Priority
                          </Badge>
                        </div>
                        <h5 className="font-medium text-white text-sm">{item.action}</h5>
                        <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                      </div>
                    ))}
                    
                    <Button className="w-full mt-2 bg-alpha-purple/90 hover:bg-alpha-purple text-white text-xs">
                      View All Recommended Actions
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4">TechCloud AI - Growth Analysis</h4>
                  
                  <div className="h-48 bg-black/30 rounded-md border border-white/10 flex items-center justify-center mb-4">
                    {/* This is a placeholder for a chart */}
                    <div className="text-center text-white/50">
                      <LineChart className="h-12 w-12 mx-auto mb-2 text-alpha-green/70" />
                      <p>ARR Growth Rate vs. Projection</p>
                      <p className="text-xs mt-2">(Interactive timeline chart showing actual vs. projected growth)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">Current ARR</div>
                      <div className="text-sm font-bold text-white">$8.4M</div>
                      <div className="text-xs text-alpha-green">+142% YoY</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">Runway</div>
                      <div className="text-sm font-bold text-white">14.5 months</div>
                      <div className="text-xs text-alpha-yellow">-1.5 months</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded-md border border-white/10">
                      <div className="text-xs text-gray-400">Next Round</div>
                      <div className="text-sm font-bold text-white">Q2 2024</div>
                      <div className="text-xs text-white/50">Series B</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-black/20 border-white/10 p-4">
                  <h4 className="text-sm font-medium text-white mb-4">Fund Performance Overview</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="text-sm text-gray-400">Total Portfolio Value</div>
                      <div className="text-xl font-bold text-white">$148.2M</div>
                      <div className="text-xs text-alpha-green">+24.8% from cost basis</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded-md border border-white/10">
                      <div className="text-sm text-gray-400">Unrealized MOIC</div>
                      <div className="text-xl font-bold text-white">2.1x</div>
                      <div className="text-xs text-alpha-green">Top quartile performance</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-alpha-green"></div>
                      <span className="text-xs text-white">Performing (68%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-alpha-yellow"></div>
                      <span className="text-xs text-white">Moderate (22%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-alpha-red"></div>
                      <span className="text-xs text-white">At Risk (10%)</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button className="bg-alpha-blue hover:bg-alpha-blue/90 text-white">
                  Generate Portfolio Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  Schedule Portfolio Review
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 p-4 border border-white/10 rounded-lg bg-black/20">
          <h3 className="text-lg font-medium text-white mb-3">Enterprise Features</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-2 items-center p-3 bg-black/30 rounded-md border border-white/10">
              <Lock className="h-5 w-5 text-alpha-yellow" />
              <div>
                <h4 className="text-sm font-medium text-white">Secure Vault</h4>
                <p className="text-xs text-gray-400">Encrypted storage for confidential files</p>
              </div>
            </div>
            <div className="flex gap-2 items-center p-3 bg-black/30 rounded-md border border-white/10">
              <MessageSquare className="h-5 w-5 text-alpha-blue" />
              <div>
                <h4 className="text-sm font-medium text-white">Collaboration Hub</h4>
                <p className="text-xs text-gray-400">Data room and team messaging</p>
              </div>
            </div>
            <div className="flex gap-2 items-center p-3 bg-black/30 rounded-md border border-white/10">
              <ArrowRight className="h-5 w-5 text-alpha-green" />
              <div>
                <h4 className="text-sm font-medium text-white">Platform Integration</h4>
                <p className="text-xs text-gray-400">Connect to existing tools & data sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
