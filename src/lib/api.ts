
import { FundData, FundFilters } from "@/lib/types";
import { indianMutualFunds, filterFunds, getAllAMCs } from "./mock-indian-funds";

const API_BASE_URL = import.meta.env.DEV 
  ? "http://localhost:8000/api" 
  : "/api";

export async function fetchFunds(filters?: FundFilters): Promise<FundData[]> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.amc) queryParams.append("amc", filters.amc);
      if (filters.minReturn1Y !== undefined) queryParams.append("minReturn1Y", filters.minReturn1Y.toString());
      if (filters.maxReturn1Y !== undefined) queryParams.append("maxReturn1Y", filters.maxReturn1Y.toString());
      if (filters.minReturn3Y !== undefined) queryParams.append("minReturn3Y", filters.minReturn3Y.toString());
      if (filters.maxReturn3Y !== undefined) queryParams.append("maxReturn3Y", filters.maxReturn3Y.toString());
      if (filters.minReturn5Y !== undefined) queryParams.append("minReturn5Y", filters.minReturn5Y.toString());
      if (filters.maxReturn5Y !== undefined) queryParams.append("maxReturn5Y", filters.maxReturn5Y.toString());
      if (filters.minExpenseRatio !== undefined) queryParams.append("minExpenseRatio", filters.minExpenseRatio.toString());
      if (filters.maxExpenseRatio !== undefined) queryParams.append("maxExpenseRatio", filters.maxExpenseRatio.toString());
      if (filters.minAUM !== undefined) queryParams.append("minAUM", filters.minAUM.toString());
      if (filters.maxAUM !== undefined) queryParams.append("maxAUM", filters.maxAUM.toString());
      if (filters.aumCategory) queryParams.append("aumCategory", filters.aumCategory);
      if (filters.searchQuery) queryParams.append("searchQuery", filters.searchQuery);
      if (filters.fundIds) queryParams.append("fundIds", filters.fundIds);
    }
    
    // First try to fetch from the backend API
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    try {
      console.log(`Attempting to fetch from backend API: ${API_BASE_URL}/funds/${queryString}`);
      const response = await fetch(`${API_BASE_URL}/funds/${queryString}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched data from backend API", data);
        return data.results || data; // Handle pagination or direct results
      }
      
      // If backend API fails, use mock data
      console.log("Backend API request failed, using mock data instead");
      throw new Error("Backend API unavailable");
    } catch (error) {
      console.log("Using mock data as fallback", error);
      // Use mock data as fallback
      return filterFunds(filters);
    }
  } catch (error) {
    console.error("Error in fetchFunds:", error);
    // Final fallback to mock data
    return filterFunds(filters);
  }
}

export async function fetchFundById(fundId: string): Promise<FundData> {
  try {
    // First try to fetch from the backend API
    try {
      console.log(`Attempting to fetch fund ${fundId} from backend API`);
      const response = await fetch(`${API_BASE_URL}/funds/${fundId}/`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched fund from backend API", data);
        return data;
      }
      
      throw new Error("Backend API unavailable");
    } catch (error) {
      console.log("Using mock data as fallback for fund details", error);
      // Use mock data as fallback
      const fund = indianMutualFunds.find(f => f.id === fundId);
      if (fund) {
        return fund;
      }
      throw new Error(`Fund with ID ${fundId} not found`);
    }
  } catch (error) {
    console.error(`Error fetching fund ${fundId}:`, error);
    throw error;
  }
}

export async function fetchTopPerformingFunds(period: string = "1Y", category?: string, limit: number = 10): Promise<FundData[]> {
  try {
    // First try to fetch from the backend API
    try {
      const queryParams = new URLSearchParams({
        period,
        limit: limit.toString()
      });
      
      if (category) {
        queryParams.append("category", category);
      }
      
      console.log(`Attempting to fetch top funds from backend API`);
      const response = await fetch(`${API_BASE_URL}/top-funds/?${queryParams.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched top funds from backend API", data);
        return data;
      }
      
      throw new Error("Backend API unavailable");
    } catch (error) {
      console.log("Using mock data as fallback for top funds", error);
      // Use mock data as fallback
      let filteredFunds = [...indianMutualFunds];
      
      if (category) {
        filteredFunds = filteredFunds.filter(fund => fund.category === category);
      }
      
      // Sort by the specified period's returns in descending order
      filteredFunds.sort((a, b) => b.returns[period as keyof typeof b.returns] - a.returns[period as keyof typeof a.returns]);
      
      // Return the top N funds
      return filteredFunds.slice(0, limit);
    }
  } catch (error) {
    console.error("Error fetching top performing funds:", error);
    throw error;
  }
}

export async function fetchAllAMCs(): Promise<string[]> {
  try {
    // First try to fetch from the backend API
    try {
      console.log("Attempting to fetch AMCs from backend API");
      const response = await fetch(`${API_BASE_URL}/amcs/`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched AMCs from backend API", data);
        return data;
      }
      
      throw new Error("Backend API unavailable");
    } catch (error) {
      console.log("Using mock data as fallback for AMCs", error);
      // Use mock data as fallback
      return getAllAMCs();
    }
  } catch (error) {
    console.error("Error fetching AMCs:", error);
    return getAllAMCs(); // Final fallback
  }
}

export async function compareFunds(fundIds: string[]): Promise<FundData[]> {
  try {
    // First try to fetch from the backend API
    try {
      // Build a query with all the fund IDs
      const queryString = fundIds.map(id => `id=${id}`).join('&');
      console.log(`Attempting to compare funds from backend API`);
      const response = await fetch(`${API_BASE_URL}/funds/?${queryString}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched comparison data from backend API", data);
        return data.results || data;
      }
      
      throw new Error("Backend API unavailable");
    } catch (error) {
      console.log("Using mock data as fallback for fund comparison", error);
      // Use mock data as fallback
      return indianMutualFunds.filter(fund => fundIds.includes(fund.id));
    }
  } catch (error) {
    console.error("Error comparing funds:", error);
    throw error;
  }
}
