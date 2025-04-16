
import React, { useState, useEffect } from 'react';
import { FundData } from '@/lib/types';
import { FundSelector } from '@/components/fund-selector';
import { ComparisonTable } from '@/components/comparison-table';
import { ComparisonChart } from '@/components/comparison-chart';
import { FundOpinions } from '@/components/fund-opinions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // Sample YouTube videos for fund opinions based on first selected fund
  const getOpinions = (fundName: string) => [
    {
      title: `${fundName} vs ICICI Prudential Balanced Advantage Fund 2024 | Which is Better?`,
      channelName: 'ZFunds',
      timeAgo: '6 months ago',
      videoUrl: 'https://youtube.com/watch?v=example1',
      thumbnailUrl: 'public/lovable-uploads/1d9ea1a6-96c4-4373-9ee9-bfe8d0e48be8.png'
    },
    {
      title: `#FundTalk on Hybrid Funds with Srinivasan Ramamurthy`,
      channelName: `${fundName.split(' ')[0]} Mutual Fund`,
      timeAgo: '2 years ago',
      videoUrl: 'https://youtube.com/watch?v=example2',
    },
    {
      title: `Top 3 ${fundName.split(' ')[0]} Mutual Funds | ${fundName.split(' ')[0]} Mutual Fund | ${fundName.split(' ')[0]} Midcap Fund | ${fundName}`,
      channelName: 'ZFunds',
      timeAgo: '3 years ago',
      videoUrl: 'https://youtube.com/watch?v=example3',
    },
    {
      title: `${fundName} 2020 | Review in Hindi | ${fundName.split(' ')[0]} बैलेंस एडवांटेज फंड`,
      channelName: 'ZFunds',
      timeAgo: '4 years ago',
      videoUrl: 'https://youtube.com/watch?v=example4',
    },
    {
      title: `${fundName.toUpperCase()} REVIEW|${fundName.split(' ')[0]} MUTUAL FUND|BEST ${fundName.split(' ')[0]} MUTUAL FUND TO INVEST|Aliceblue|${fundName.split(' ')[0]}|`,
      channelName: 'Invest Empires',
      timeAgo: '4 years ago',
      videoUrl: 'https://youtube.com/watch?v=example5',
    },
    {
      title: `Mutual Funds SIP Investment vs Lump Sum for Beginners`,
      channelName: 'Asset Yogi',
      timeAgo: '5 years ago',
      videoUrl: 'https://youtube.com/watch?v=example6',
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compare Mutual Funds</CardTitle>
          <CardDescription>Select up to 4 funds to compare their performance, returns, and ratings.</CardDescription>
        </CardHeader>
        <CardContent>
          <FundSelector 
            funds={allFunds} 
            onSelect={addFund}
            buttonLabel="Search and add funds to compare"
          />

          {selectedFunds.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund) => (
                  <Button key={fund.id} variant="secondary" onClick={() => removeFund(fund)}>
                    {fund.scheme_name} <X className="ml-2 h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedFunds.length >= 2 && (
        <Tabs defaultValue="returns" className="space-y-6">
          <TabsList className="w-full sm:w-auto justify-start">
            <TabsTrigger value="returns" className="flex-1 sm:flex-none">Returns</TabsTrigger>
            <TabsTrigger value="comparison" className="flex-1 sm:flex-none">Comparison</TabsTrigger>
            <TabsTrigger value="opinions" className="flex-1 sm:flex-none">Expert Opinions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="returns">
            <ComparisonChart funds={selectedFunds} />
          </TabsContent>
          
          <TabsContent value="comparison">
            <ComparisonTable funds={selectedFunds} />
          </TabsContent>
          
          <TabsContent value="opinions">
            <FundOpinions 
              fundName={selectedFunds[0].scheme_name}
              opinions={getOpinions(selectedFunds[0].scheme_name)}
            />
          </TabsContent>
        </Tabs>
      )}

      {selectedFunds.length < 2 && selectedFunds.length > 0 && (
        <p className="text-center text-muted-foreground">Select at least two funds to see the comparison.</p>
      )}
    </div>
  );
};
