
// Types for fund data
export interface FundData {
  id: string;
  scheme_name: string;
  amc: string; // Asset Management Company
  scheme_code: string;
  nav: number;
  category: FundCategory;
  sub_category?: string;
  expense_ratio: number;
  aum: number; // Assets Under Management in crores
  aum_category: 'Small' | 'Mid' | 'Large';
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
  };
  risk_rating: 1 | 2 | 3 | 4 | 5; // 1 = Low, 5 = High
  inception_date: string;
  fund_manager?: string;
  min_sip_amount?: number;
  min_lumpsum?: number;
  exit_load?: string;
}

export type FundCategory =
  | "Equity"
  | "Debt"
  | "Hybrid"
  | "Solution Oriented"
  | "Other";

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
  fundIds?: string; // Added this property to support fetching funds by IDs
}
