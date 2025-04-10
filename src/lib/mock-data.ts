
import { FundData, FundCategory } from "@/lib/types";

// Helper function to generate random returns between min and max
function getRandomReturn(min: number, max: number): number {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

// Helper function to get a random date within the last 30 years
function getRandomInceptionDate(): string {
  const years = Math.floor(Math.random() * 30); // 0-30 years ago
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split('T')[0];
}

// Generate mock data
export const generateMockFunds = (count: number = 50): FundData[] => {
  const categories: FundCategory[] = ["Equity", "Debt", "Hybrid", "Solution Oriented", "Other"];
  const amcs = [
    "HDFC Mutual Fund",
    "ICICI Prudential",
    "SBI Mutual Fund",
    "Axis Mutual Fund",
    "Aditya Birla Sun Life",
    "Kotak Mahindra",
    "Nippon India",
    "DSP",
    "UTI",
    "Franklin Templeton",
  ];
  
  const equitySubCategories = [
    "Large Cap", 
    "Mid Cap", 
    "Small Cap", 
    "Multi Cap", 
    "ELSS", 
    "Focused", 
    "Dividend Yield",
    "Value"
  ];
  
  const debtSubCategories = [
    "Overnight", 
    "Liquid", 
    "Ultra Short Duration", 
    "Low Duration", 
    "Money Market",
    "Short Duration", 
    "Corporate Bond"
  ];
  
  const hybridSubCategories = [
    "Conservative", 
    "Balanced", 
    "Aggressive", 
    "Dynamic Asset Allocation",
    "Multi Asset Allocation"
  ];
  
  const solutionSubCategories = ["Retirement", "Children's Fund"];
  
  const getSubCategory = (category: FundCategory): string => {
    switch (category) {
      case "Equity":
        return equitySubCategories[Math.floor(Math.random() * equitySubCategories.length)];
      case "Debt":
        return debtSubCategories[Math.floor(Math.random() * debtSubCategories.length)];
      case "Hybrid":
        return hybridSubCategories[Math.floor(Math.random() * hybridSubCategories.length)];
      case "Solution Oriented":
        return solutionSubCategories[Math.floor(Math.random() * solutionSubCategories.length)];
      default:
        return "Other";
    }
  };
  
  // Fund managers
  const fundManagers = [
    "Prashant Jain", 
    "Sankaran Naren", 
    "Neelesh Surana", 
    "R. Srinivasan",
    "Anoop Bhaskar", 
    "Jinesh Gopani", 
    "Mahesh Patil", 
    "Rajeev Thakkar",
    "Sohini Andani", 
    "Sailesh Raj Bhan"
  ];

  const funds: FundData[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amc = amcs[Math.floor(Math.random() * amcs.length)];
    const subCategory = getSubCategory(category);
    
    // Different return ranges for different categories to be more realistic
    let returns1Y, returns3Y, returns5Y;
    
    if (category === "Equity") {
      returns1Y = getRandomReturn(-10, 30);
      returns3Y = getRandomReturn(5, 25);
      returns5Y = getRandomReturn(8, 20);
    } else if (category === "Debt") {
      returns1Y = getRandomReturn(3, 12);
      returns3Y = getRandomReturn(5, 10);
      returns5Y = getRandomReturn(6, 9);
    } else {
      returns1Y = getRandomReturn(0, 20);
      returns3Y = getRandomReturn(5, 15);
      returns5Y = getRandomReturn(7, 12);
    }
    
    // AUM values more realistic (in crores)
    const aum = Math.round(100 + Math.random() * 40000);
    let aumCategory: 'Small' | 'Mid' | 'Large';
    
    if (aum < 1000) {
      aumCategory = 'Small';
    } else if (aum < 10000) {
      aumCategory = 'Mid';
    } else {
      aumCategory = 'Large';
    }

    funds.push({
      id: `FUND${i + 1000}`,
      scheme_name: `${amc} ${subCategory} ${category === "Equity" ? "Fund" : category === "Debt" ? "Fund" : "Scheme"}`,
      amc,
      scheme_code: `${100000 + i}`,
      nav: +(10 + Math.random() * 990).toFixed(4), // NAV between 10 and 1000
      category,
      sub_category: subCategory,
      expense_ratio: +(0.1 + Math.random() * 2.4).toFixed(2), // Between 0.1% and 2.5%
      aum,
      aum_category: aumCategory,
      returns: {
        "1Y": returns1Y,
        "3Y": returns3Y,
        "5Y": returns5Y,
      },
      risk_rating: Math.ceil(Math.random() * 5) as any,
      inception_date: getRandomInceptionDate(),
      fund_manager: fundManagers[Math.floor(Math.random() * fundManagers.length)],
      min_sip_amount: Math.round((500 + Math.random() * 4500) / 100) * 100, // SIP in multiples of 100
      min_lumpsum: Math.round((1000 + Math.random() * 24000) / 1000) * 1000, // Lumpsum in multiples of 1000
      exit_load: Math.random() > 0.3 
        ? `${Math.random() > 0.5 ? "1" : "0.5"}% if redeemed within ${Math.floor(Math.random() * 3) + 1} year(s)` 
        : "Nil"
    });
  }

  return funds;
};

// Generate 100 mock funds
export const mockFunds = generateMockFunds(100);

// Get top performing funds
export const getTopPerformingFunds = (funds: FundData[] = mockFunds, limit: number = 5): FundData[] => {
  return [...funds]
    .sort((a, b) => b.returns["1Y"] - a.returns["1Y"])
    .slice(0, limit);
};

// Filter funds based on filters
export const filterFunds = (filters: any, funds: FundData[] = mockFunds): FundData[] => {
  return funds.filter((fund) => {
    // Filter by category
    if (filters.category && fund.category !== filters.category) {
      return false;
    }

    // Filter by AMC
    if (filters.amc && fund.amc !== filters.amc) {
      return false;
    }

    // Filter by 1Y returns
    if (filters.minReturn1Y !== undefined && fund.returns["1Y"] < filters.minReturn1Y) {
      return false;
    }
    if (filters.maxReturn1Y !== undefined && fund.returns["1Y"] > filters.maxReturn1Y) {
      return false;
    }

    // Filter by 3Y returns
    if (filters.minReturn3Y !== undefined && fund.returns["3Y"] < filters.minReturn3Y) {
      return false;
    }
    if (filters.maxReturn3Y !== undefined && fund.returns["3Y"] > filters.maxReturn3Y) {
      return false;
    }

    // Filter by 5Y returns
    if (filters.minReturn5Y !== undefined && fund.returns["5Y"] < filters.minReturn5Y) {
      return false;
    }
    if (filters.maxReturn5Y !== undefined && fund.returns["5Y"] > filters.maxReturn5Y) {
      return false;
    }

    // Filter by expense ratio
    if (filters.minExpenseRatio !== undefined && fund.expense_ratio < filters.minExpenseRatio) {
      return false;
    }
    if (filters.maxExpenseRatio !== undefined && fund.expense_ratio > filters.maxExpenseRatio) {
      return false;
    }

    // Filter by AUM
    if (filters.minAUM !== undefined && fund.aum < filters.minAUM) {
      return false;
    }
    if (filters.maxAUM !== undefined && fund.aum > filters.maxAUM) {
      return false;
    }

    // Filter by AUM category
    if (filters.aumCategory && fund.aum_category !== filters.aumCategory) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery && 
        !fund.scheme_name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !fund.amc.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });
};

// Get fund by ID
export const getFundById = (id: string): FundData | undefined => {
  return mockFunds.find((fund) => fund.id === id);
};

// Get all unique AMCs
export const getAllAMCs = (): string[] => {
  return [...new Set(mockFunds.map((fund) => fund.amc))].sort();
};

// Generate historical NAV data for charts
export const generateHistoricalNAVData = (fund: FundData, days: number = 365) => {
  const data: { date: string; nav: number }[] = [];
  const endDate = new Date();
  const currentNAV = fund.nav;
  
  // Extrapolate backwards based on return rates
  const dailyReturn1Y = Math.pow(1 + fund.returns["1Y"] / 100, 1/365) - 1;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (days - i - 1));
    
    // Add some random noise to make it look realistic
    const noise = 1 + (Math.random() * 0.01 - 0.005);
    const daysFromEnd = days - i - 1;
    const navAtDay = currentNAV / Math.pow(1 + dailyReturn1Y, daysFromEnd) * noise;
    
    data.push({
      date: date.toISOString().split('T')[0],
      nav: +navAtDay.toFixed(4)
    });
  }
  
  return data;
};

// Calculate SIP returns
export const calculateSIPReturns = (
  monthlyAmount: number,
  years: number,
  annualReturns: number // in percentage
): { totalInvested: number; estimatedReturns: number; maturityValue: number } => {
  const months = years * 12;
  const monthlyRate = Math.pow(1 + annualReturns / 100, 1 / 12) - 1;
  let totalAmount = 0;
  
  for (let i = 0; i < months; i++) {
    totalAmount = (totalAmount + monthlyAmount) * (1 + monthlyRate);
  }
  
  const totalInvested = monthlyAmount * months;
  const estimatedReturns = totalAmount - totalInvested;
  
  return {
    totalInvested,
    estimatedReturns,
    maturityValue: totalAmount
  };
};
