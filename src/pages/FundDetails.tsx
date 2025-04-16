
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FundData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartNavHistory } from '@/components/chart-nav-history';
import { generateHistoricalNAVData, getFundById } from '@/lib/mock-data';
import { SIPCalculator } from '@/components/sip-calculator';
import { StatsCard } from '@/components/stats-card';
import { ArrowLeft, Calendar, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdvancedMetrics } from '@/components/advanced-metrics';
import { AMCProfile } from '@/components/amc-profile';
import { FundManagerProfile } from '@/components/fund-manager-profile';
import { FundPerformance3D } from '@/components/visualizations/FundPerformance3D';

type RouteParams = {
  fundId: string;
  [key: string]: string | undefined;
};

export const FundDetails: React.FC = () => {
  const { fundId } = useParams<RouteParams>();
  const [fund, setFund] = useState<FundData | undefined>(undefined);
  const [navData, setNavData] = useState<{ date: string; nav: number }[]>([]);

  useEffect(() => {
    if (fundId) {
      const foundFund = getFundById(fundId);
      setFund(foundFund);

      if (foundFund) {
        const historicalData = generateHistoricalNAVData(foundFund, 365);
        setNavData(historicalData);
      }
    }
  }, [fundId]);

  if (!fund) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{fund.scheme_name}</CardTitle>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Funds
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Category" value={fund.category} icon={<PieChart className="h-4 w-4" />} />
            <StatsCard title="AMC" value={fund.amc} icon={<TrendingUp className="h-4 w-4" />} />
            <StatsCard title="Inception Date" value={fund.inception_date} icon={<Calendar className="h-4 w-4" />} />
            <StatsCard title="NAV" value={fund.nav.toString()} icon={<DollarSign className="h-4 w-4" />} />
          </div>

          <Tabs defaultValue="performance" className="mt-6">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="calculator">SIP Calculator</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Metrics</TabsTrigger>
              <TabsTrigger value="amc">AMC Profile</TabsTrigger>
              <TabsTrigger value="manager">Fund Manager</TabsTrigger>
              <TabsTrigger value="visualization">3D Visualization</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>NAV History</CardTitle>
                  <CardDescription>Historical NAV data for the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartNavHistory fund={fund} timeRange="1Y" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="calculator" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>SIP Calculator</CardTitle>
                  <CardDescription>Calculate potential returns on your SIP investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <SIPCalculator fund={fund} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Metrics</CardTitle>
                  <CardDescription>Key metrics for fund analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdvancedMetrics fund={fund} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amc" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>AMC Profile</CardTitle>
                  <CardDescription>About {fund.amc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <AMCProfile fund={fund} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="manager" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Manager Details</CardTitle>
                  <CardDescription>About {fund.fund_manager}</CardDescription>
                </CardHeader>
                <CardContent>
                  <FundManagerProfile fund={fund} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="visualization" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>3D Performance Visualization</CardTitle>
                  <CardDescription>Interactive 3D representation of fund performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <FundPerformance3D funds={[fund]} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
