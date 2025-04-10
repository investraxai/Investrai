
import { FundData, FundFilters } from "@/lib/types";

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
    }
    
    // Make the API request
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/funds/${queryString}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch funds");
    }
    
    const data = await response.json();
    return data.results || data; // Handle pagination or direct results
  } catch (error) {
    console.error("Error fetching funds:", error);
    throw error;
  }
}

export async function fetchFundById(fundId: string): Promise<FundData> {
  try {
    const response = await fetch(`${API_BASE_URL}/funds/${fundId}/`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch fund details");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching fund ${fundId}:`, error);
    throw error;
  }
}

export async function fetchTopPerformingFunds(period: string = "1Y", category?: string, limit: number = 10): Promise<FundData[]> {
  try {
    const queryParams = new URLSearchParams({
      period,
      limit: limit.toString()
    });
    
    if (category) {
      queryParams.append("category", category);
    }
    
    const response = await fetch(`${API_BASE_URL}/top-funds/?${queryParams.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch top performing funds");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top performing funds:", error);
    throw error;
  }
}

export async function fetchAllAMCs(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/amcs/`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch AMCs");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AMCs:", error);
    throw error;
  }
}

export async function compareFunds(fundIds: string[]): Promise<FundData[]> {
  try {
    // Build a query with all the fund IDs
    const queryString = fundIds.map(id => `id=${id}`).join('&');
    const response = await fetch(`${API_BASE_URL}/funds/?${queryString}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to compare funds");
    }
    
    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error("Error comparing funds:", error);
    throw error;
  }
}
