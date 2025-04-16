
import React, { useState, useEffect } from 'react';
import { FundData } from '@/lib/types';
import { FundSelector } from '@/components/fund-selector';
import { ComparisonTable } from '@/components/comparison-table';
import { ComparisonChart } from '@/components/comparison-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { getFundById } from '@/lib/mock-data';

export const CompareFunds: React.FC = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundData[]>([]);
  const [allFunds, setAllFunds] = useState<FundData[]>([]);

  useEffect(() => {
    // Fetch all funds
    const fetchAllFunds = async () => {
      try {
        const response = await fetch('/api/funds/');
        if (response.ok) {
          const data = await response.json();
          setAllFunds(data);
        } else {
          // Fallback to mock data if API fails
          setAllFunds(getAllMockFunds());
        }
      } catch (error) {
        console.error("Error fetching funds:", error);
        // Fallback to mock data
        setAllFunds(getAllMockFunds());
      }
    };

    fetchAllFunds();
  }, []);

  // Helper function to get all mock funds
  const getAllMockFunds = (): FundData[] => {
    const funds: FundData[] = [];
    for (let i = 1; i <= 50; i++) {
      const fund = getFundById(`fund-${i}`);
      if (fund) funds.push(fund);
    }
    return funds;
  };

  const addFund = (fund: FundData) => {
    if (selectedFunds.find((f) => f.id === fund.id)) {
      toast.warning('Fund already selected');
      return;
    }
    if (selectedFunds.length < 4) {
      setSelectedFunds([...selectedFunds, fund]);
    } else {
      toast.warning('Maximum 4 funds can be compared');
    }
  };

  const removeFund = (fundToRemove: FundData) => {
    setSelectedFunds(selectedFunds.filter((fund) => fund.id !== fundToRemove.id));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Compare Mutual Funds</CardTitle>
          <CardDescription>Select up to 4 funds to compare.</CardDescription>
        </CardHeader>
        <CardContent>
          <FundSelector 
            funds={allFunds} 
            onSelect={addFund} 
            buttonLabel="Select a fund to compare"
          />

          {selectedFunds.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Funds:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund) => (
                  <Button key={fund.id} variant="secondary" onClick={() => removeFund(fund)}>
                    {fund.scheme_name} <X className="ml-2 h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          )}

          {selectedFunds.length >= 2 && (
            <>
              <ComparisonTable funds={selectedFunds} />
              <ComparisonChart funds={selectedFunds} />
            </>
          )}

          {selectedFunds.length < 2 && selectedFunds.length > 0 && (
            <p className="mt-4 text-warning">Select at least two funds to see the comparison.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
