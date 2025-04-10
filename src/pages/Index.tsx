
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { FundCard } from "@/components/fund-card";
import { StatsCard } from "@/components/stats-card";
import { mockFunds, getTopPerformingFunds } from "@/lib/mock-data";
import { FundData } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, LineChart, PieChart, BarChart3 } from "lucide-react";

const Home = () => {
  const [topFunds, setTopFunds] = useState<FundData[]>([]);
  const [equityFunds, setEquityFunds] = useState<FundData[]>([]);
  const [debtFunds, setDebtFunds] = useState<FundData[]>([]);
  const [hybridFunds, setHybridFunds] = useState<FundData[]>([]);
  
  useEffect(() => {
    // Get top performing funds
    setTopFunds(getTopPerformingFunds(mockFunds, 6));
    
    // Filter funds by category
    setEquityFunds(mockFunds
      .filter(fund => fund.category === "Equity")
      .sort((a, b) => b.returns["1Y"] - a.returns["1Y"])
      .slice(0, 6));
      
    setDebtFunds(mockFunds
      .filter(fund => fund.category === "Debt")
      .sort((a, b) => b.returns["1Y"] - a.returns["1Y"])
      .slice(0, 6));
      
    setHybridFunds(mockFunds
      .filter(fund => fund.category === "Hybrid")
      .sort((a, b) => b.returns["1Y"] - a.returns["1Y"])
      .slice(0, 6));
  }, []);
  
  // Calculate market statistics
  const totalFunds = mockFunds.length;
  const avgReturn1Y = mockFunds.reduce((sum, fund) => sum + fund.returns["1Y"], 0) / totalFunds;
  const topGainer = mockFunds.reduce((max, fund) => 
    fund.returns["1Y"] > max.returns["1Y"] ? fund : max, mockFunds[0]);
  const fundCategories = [...new Set(mockFunds.map(fund => fund.category))].length;
  
  return (
    <Layout>
      <section className="py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore the Best Mutual Funds in India
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Research, compare, and track top-performing mutual funds with our powerful screener and analytics tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Funds"
              value={totalFunds}
              description="Available for screening"
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <StatsCard
              title="Avg 1Y Return"
              value={`${avgReturn1Y.toFixed(2)}%`}
              description="Across all categories"
              trend={avgReturn1Y}
              icon={<LineChart className="h-4 w-4" />}
            />
            <StatsCard
              title="Top Gainer"
              value={`${topGainer.returns["1Y"].toFixed(2)}%`}
              description={topGainer.scheme_name.substring(0, 20) + "..."}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatsCard
              title="Fund Categories"
              value={fundCategories}
              description="Equity, Debt, Hybrid and more"
              icon={<PieChart className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>
      
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="top-funds" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="top-funds">Top Funds</TabsTrigger>
              <TabsTrigger value="equity">Equity</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
            </TabsList>
            
            <TabsContent value="top-funds">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topFunds.map(fund => (
                  <FundCard key={fund.id} fund={fund} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="equity">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {equityFunds.map(fund => (
                  <FundCard key={fund.id} fund={fund} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="debt">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {debtFunds.map(fund => (
                  <FundCard key={fund.id} fund={fund} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hybrid">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hybridFunds.map(fund => (
                  <FundCard key={fund.id} fund={fund} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
