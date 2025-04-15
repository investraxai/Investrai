
export type FundCategory =
  | "Equity"
  | "Debt"
  | "Hybrid"
  | "Solution Oriented"
  | "Other";

export interface FundData {
  id: string;
  scheme_name: string;
  amc: string;
  scheme_code: string;
  nav: number;
  category: FundCategory;
  sub_category?: string;
  expense_ratio: number;
  aum: number;
  aum_category: 'Small' | 'Mid' | 'Large';
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
  };
  risk_rating: 1 | 2 | 3 | 4 | 5;
  inception_date: string;
  fund_manager?: string;
  min_sip_amount?: number;
  min_lumpsum?: number;
  exit_load?: string;
  
  // Advanced metrics
  standard_deviation?: number;
  sharpe_ratio?: number;
  treynor_ratio?: number;
  beta?: number;
  alpha?: number;
  cagr?: number;
  max_drawdown?: number;
  amc_profile?: {
    description?: string;
    total_aum?: number;
    total_schemes?: number;
  };
  fund_manager_details?: {
    name?: string;
    qualification?: string;
    experience?: number;
    aum_managed?: number;
    bio?: string;
    image_url?: string;
  };
}

export interface FundFilters {
  category?: FundCategory;
  amc?: string;
  minReturn1Y?: number;
  maxReturn1Y?: number;
  minReturn3Y?: number;
  maxReturn3Y?: number;
  minReturn5Y?: number;
  maxReturn5Y?: number;
  minExpenseRatio?: number;
  maxExpenseRatio?: number;
  minAUM?: number;
  maxAUM?: number;
  aumCategory?: 'Small' | 'Mid' | 'Large';
  searchQuery?: string;
  fundIds?: string;
  
  // Advanced filters
  minStandardDeviation?: number;
  maxStandardDeviation?: number;
  minSharpeRatio?: number; 
  maxSharpeRatio?: number;
  minTreynorRatio?: number;
  maxTreynorRatio?: number;
  minBeta?: number;
  maxBeta?: number;
  minAlpha?: number;
  maxAlpha?: number;
}
