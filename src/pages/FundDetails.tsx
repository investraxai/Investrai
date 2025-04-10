
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ChartNavHistory } from "@/components/chart-nav-history";
import { SIPCalculator } from "@/components/sip-calculator";
import { getFundById } from "@/lib/mock-data";
import { FundData } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const FundDetails = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const [fund, setFund] = useState<FundData | null>(null);
  const [timeRange, setTimeRange] = useState<"1Y" | "3Y" | "5Y">("1Y");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fundId) {
      const fundData = getFundById(fundId);
      if (fundData) {
        setFund(fundData);
      }
      setLoading(false);
    }
  }, [fundId]);

  if (loading) {
    return (
      <Layout>
        <div className="container flex h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <p className="text-lg">Loading fund details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!fund) {
    return (
      <Layout>
        <div className="container flex h-[60vh] items-center justify-center px-4">
          <Alert className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Fund not found. Please check the URL and try again.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const getRiskLabel = (risk: number) => {
    switch (risk) {
      case 1:
        return "Very Low";
      case 2:
        return "Low";
      case 3:
        return "Moderate";
      case 4:
        return "High";
      case 5:
        return "Very High";
      default:
        return "Unknown";
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6">
        <div className="space-y-6">
          <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {fund.scheme_name}
              </h1>
              <Badge className="w-fit">{fund.category}</Badge>
            </div>
            <p className="text-muted-foreground">{fund.amc}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Latest NAV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{fund.nav.toFixed(4)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fund AUM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{fund.aum >= 1000 ? (fund.aum / 1000).toFixed(2) + "K" : fund.aum} Cr
                </div>
                <div className="text-sm text-muted-foreground">{fund.aum_category} sized fund</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Expense Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fund.expense_ratio}%</div>
                <div className="text-sm text-muted-foreground">Annual fees</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fund Overview</CardTitle>
              <CardDescription>Key information about this fund</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Sub Category</h3>
                    <p>{fund.sub_category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Fund Manager</h3>
                    <p>{fund.fund_manager || "Not available"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Inception Date</h3>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {fund.inception_date}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Risk Rating</h3>
                    <div className="flex items-center gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-8 rounded-sm ${
                              i < fund.risk_rating ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        ))}
                      <span className="ml-2">{getRiskLabel(fund.risk_rating)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Min SIP Investment</h3>
                    <p>₹{fund.min_sip_amount || 500}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Min Lumpsum</h3>
                    <p>₹{fund.min_lumpsum || 5000}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Exit Load</h3>
                    <p>{fund.exit_load || "Nil"}</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="mb-4 text-lg font-medium">Performance</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {["1Y", "3Y", "5Y"].map((period) => (
                    <div key={period} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <div className="text-muted-foreground">{period} Returns</div>
                        <div className="flex items-center text-xl font-semibold">
                          {fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0 ? (
                            <TrendingUp className="mr-1 h-5 w-5 text-gain" />
                          ) : (
                            <TrendingDown className="mr-1 h-5 w-5 text-loss" />
                          )}
                          <span
                            className={
                              fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0
                                ? "text-gain"
                                : "text-loss"
                            }
                          >
                            {fund.returns[period as "1Y" | "3Y" | "5Y"]}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">NAV History</h2>
                  <TabsList>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="3Y">3Y</TabsTrigger>
                    <TabsTrigger value="5Y">5Y</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="1Y">
                  <ChartNavHistory fund={fund} timeRange="1Y" />
                </TabsContent>
                <TabsContent value="3Y">
                  <ChartNavHistory fund={fund} timeRange="3Y" />
                </TabsContent>
                <TabsContent value="5Y">
                  <ChartNavHistory fund={fund} timeRange="5Y" />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <SIPCalculator fund={fund} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FundDetails;
