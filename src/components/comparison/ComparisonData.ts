
export interface ComparisonItem {
  feature: string;
  traditional: string;
  alphau: string;
  impact: string;
  highlight: boolean;
  impactValue: number;
  energyEfficiency: number;
  innovationScore: number;
}

export const comparisonData: ComparisonItem[] = [
  {
    feature: "Deal Sourcing",
    traditional: "Manual research and outreach",
    alphau: "AI-powered real-time deal discovery",
    impact: "3.5x higher deal flow volume",
    highlight: true,
    impactValue: 350,
    energyEfficiency: 80,
    innovationScore: 92,
  },
  {
    feature: "Financial Modeling",
    traditional: "Excel-based manual modeling",
    alphau: "AI-automated scenario modeling",
    impact: "95% faster analysis time",
    highlight: true,
    impactValue: 95,
    energyEfficiency: 75,
    innovationScore: 88,
  },
  {
    feature: "Risk Intelligence",
    traditional: "Limited risk factor analysis",
    alphau: "AI-driven predictive insights",
    impact: "40% better risk prediction",
    highlight: true,
    impactValue: 40,
    energyEfficiency: 65,
    innovationScore: 78,
  },
  {
    feature: "Decision Execution",
    traditional: "Subjective decision making",
    alphau: "Data-driven AlphaScore™",
    impact: "85% more accurate decisions",
    highlight: true,
    impactValue: 85,
    energyEfficiency: 90,
    innovationScore: 95,
  }
];

export const getBarChartData = (data: ComparisonItem[]) => {
  return data.map(item => ({
    name: item.feature,
    value: item.impactValue,
    fill: "#0057B7"
  }));
};

export const getPieChartData = () => [
  { name: "Deal Sourcing", value: 80, fill: "#0057B7" },
  { name: "Financial Modeling", value: 75, fill: "#1D85FF" },
  { name: "Risk Intelligence", value: 65, fill: "#6C4BEF" },
  { name: "Decision Execution", value: 90, fill: "#22C55E" },
];
