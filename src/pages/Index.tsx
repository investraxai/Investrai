
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { FundCard } from "@/components/fund-card";
import { StatsCard } from "@/components/stats-card";
import { FundData } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, LineChart, PieChart, BarChart3 } from "lucide-react";
import { fetchFunds, fetchTopPerformingFunds } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  // Use React Query to fetch data
  const { data: allFunds, isLoading: isLoadingAllFunds } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      try {
        return await fetchFunds();
      } catch (error) {
        toast({
          title: "Error fetching funds",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
        return [];
      }
    },
  });
  
  const { data: topFunds } = useQuery({
    queryKey: ["topFunds"],
    queryFn: async () => {
      try {
        return await fetchTopPerformingFunds("1Y", undefined, 6);
      } catch (error) {
        toast({
          title: "Error fetching top funds",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
        return [];
      }
    },
  });
  
  const { data: equityFunds } = useQuery({
    queryKey: ["categoryFunds", "Equity"],
    queryFn: async () => {
      try {
        return await fetchFunds({ category: "Equity" });
      } catch (error) {
        return [];
      }
    },
    select: data => data.slice(0, 6)
  });
  
  const { data: debtFunds } = useQuery({
    queryKey: ["categoryFunds", "Debt"],
    queryFn: async () => {
      try {
        return await fetchFunds({ category: "Debt" });
      } catch (error) {
        return [];
      }
    },
    select: data => data.slice(0, 6)
  });
  
  const { data: hybridFunds } = useQuery({
    queryKey: ["categoryFunds", "Hybrid"],
    queryFn: async () => {
      try {
        return await fetchFunds({ category: "Hybrid" });
      } catch (error) {
        return [];
      }
    },
    select: data => data.slice(0, 6)
  });
  
  // Calculate market statistics
  const totalFunds = allFunds?.length || 0;
  const avgReturn1Y = allFunds?.reduce((sum, fund) => sum + fund.returns["1Y"], 0) / (totalFunds || 1) || 0;
  const topGainer = allFunds?.reduce((max, fund) => 
    fund.returns["1Y"] > max.returns["1Y"] ? fund : max, allFunds[0] || { returns: { "1Y": 0 }, scheme_name: "" }) || { returns: { "1Y": 0 }, scheme_name: "" };
  const fundCategories = allFunds ? [...new Set(allFunds.map(fund => fund.category))].length : 0;
  
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
          {isLoadingAllFunds ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-muted-foreground">Loading funds...</p>
            </div>
          ) : (
            <Tabs defaultValue="top-funds" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="top-funds">Top Funds</TabsTrigger>
                <TabsTrigger value="equity">Equity</TabsTrigger>
                <TabsTrigger value="debt">Debt</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>
              
              <TabsContent value="top-funds">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {topFunds?.map(fund => (
                    <FundCard key={fund.id} fund={fund} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="equity">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {equityFunds?.map(fund => (
                    <FundCard key={fund.id} fund={fund} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="debt">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {debtFunds?.map(fund => (
                    <FundCard key={fund.id} fund={fund} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="hybrid">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {hybridFunds?.map(fund => (
                    <FundCard key={fund.id} fund={fund} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
