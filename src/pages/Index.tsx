import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FundData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FundCard } from '@/components/fund-card';
import { ScreenCard } from '@/components/screen-card';
import { getTopPerformingFunds } from '@/lib/mock-data';
import { FilterIcon, Search, TrendingUp } from 'lucide-react';

const Index = () => {
  const [funds, setFunds] = useState<FundData[]>([]);
  const [topFunds, setTopFunds] = useState<FundData[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [amcFilter, setAmcFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [allAMCs, setAllAMCs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch funds from the Django backend API
    const fetchFunds = async () => {
      try {
        let url = '/api/funds/';
        const params = new URLSearchParams();
        if (categoryFilter) params.append('category', categoryFilter);
        if (amcFilter) params.append('amc', amcFilter);
        if (searchQuery) params.append('searchQuery', searchQuery);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFunds(data);
      } catch (error) {
        console.error("Could not fetch funds:", error);
      }
    };

    fetchFunds();
  }, [categoryFilter, amcFilter, searchQuery]);

  useEffect(() => {
    // Fetch top performing funds from the Django backend API
    const fetchTopFunds = async () => {
      try {
        const response = await fetch('/api/top-funds/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTopFunds(data);
      } catch (error) {
        console.error("Could not fetch top funds:", error);
      }
    };

    fetchTopFunds();
  }, []);

  useEffect(() => {
    // Fetch all AMCs from the Django backend API
    const fetchAllAMCs = async () => {
      try {
        const response = await fetch('/api/amcs/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllAMCs(data);
      } catch (error) {
        console.error("Could not fetch AMCs:", error);
      }
    };

    fetchAllAMCs();
  }, []);

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleAmcChange = (amc: string) => {
    setAmcFilter(amc);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedFunds = [...funds].sort((a, b) => {
    const returnA = a.returns["1Y"] || 0;
    const returnB = b.returns["1Y"] || 0;

    if (sortOrder === 'asc') {
      return returnA - returnB;
    } else {
      return returnB - returnA;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mutual Fund Screener</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search funds..."
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Button variant="outline" onClick={handleSortOrderChange}>
            Sort by 1Y Returns <TrendingUp className="ml-2" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="funds" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="funds">Funds</TabsTrigger>
          <TabsTrigger value="top">Top Performing</TabsTrigger>
          <TabsTrigger value="screens">Screens</TabsTrigger>
        </TabsList>
        <TabsContent value="funds" className="space-y-4">
          <div className="flex space-x-4">
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="Debt">Debt</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Solution Oriented">Solution Oriented</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={handleAmcChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by AMC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All AMCs</SelectItem>
                {allAMCs.map(amc => (
                  <SelectItem key={amc} value={amc}>{amc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedFunds.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="top" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topFunds.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="screens" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ScreenCard
              title="High Sharpe Ratio Funds"
              description="Funds with a Sharpe Ratio > 1.0"
              filter={{ minSharpeRatio: 1.0 }}
            />
            <ScreenCard
              title="Low Expense Ratio Funds"
              description="Funds with Expense Ratio < 1.0%"
              filter={{ maxExpenseRatio: 1.0 }}
            />
            <ScreenCard
              title="High AUM Funds"
              description="Funds with AUM > 10,000 Cr"
              filter={{ minAUM: 10000 }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
