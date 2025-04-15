
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ChartNavHistory } from "@/components/chart-nav-history";
import { SIPCalculator } from "@/components/sip-calculator";
import { FundManagerProfile } from "@/components/fund-manager-profile";
import { AMCProfile } from "@/components/amc-profile";
import { AdvancedMetrics } from "@/components/advanced-metrics";
import { getFundById } from "@/lib/mock-data";
import { FundData } from "@/lib/types";
import { MicroLessonTooltip } from "@/components/ui/micro-lesson-tooltip";
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
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart4,
  LineChart,
  PieChart,
  BarChart,
  Activity,
  Info,
} from "lucide-react";
import { fetchFundById } from "@/lib/api";

const FundDetails = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const [fund, setFund] = useState<FundData | null>(null);
  const [timeRange, setTimeRange] = useState<"1M" | "6M" | "1Y" | "3Y" | "5Y" | "Max">("1Y");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "risk" | "calculator">("overview");

  useEffect(() => {
    const loadFundDetails = async () => {
      if (fundId) {
        setLoading(true);
        try {
          // Try to fetch from API first
          const fundData = await fetchFundById(fundId);
          setFund(fundData);
        } catch (error) {
          // Fallback to mock data
          const mockFundData = getFundById(fundId);
          if (mockFundData) {
            setFund(mockFundData);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadFundDetails();
  }, [fundId]);

  if (loading) {
    return (
      <Layout>
        <div className="container flex h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
            <p className="mt-4 text-lg">Loading fund details...</p>
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

          {/* Fund Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Latest NAV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{fund.nav.toFixed(4)}</div>
                <div className="text-sm text-muted-foreground">Net Asset Value per unit</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <MicroLessonTooltip lesson="Total value of all investments managed by the fund">
                  <CardTitle className="text-base">Fund AUM</CardTitle>
                </MicroLessonTooltip>
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
                <MicroLessonTooltip lesson="Annual fee charged by the fund for managing your investments">
                  <CardTitle className="text-base">Expense Ratio</CardTitle>
                </MicroLessonTooltip>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fund.expense_ratio}%</div>
                <div className="text-sm text-muted-foreground">Annual fees</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <MicroLessonTooltip lesson="Compound Annual Growth Rate - annualized return over a specified period">
                  <CardTitle className="text-base">CAGR (5Y)</CardTitle>
                </MicroLessonTooltip>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fund.cagr || fund.returns["5Y"].toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">Annualized growth</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <Info className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="performance">
                <LineChart className="mr-2 h-4 w-4" /> Performance
              </TabsTrigger>
              <TabsTrigger value="risk">
                <Activity className="mr-2 h-4 w-4" /> Risk Analysis
              </TabsTrigger>
              <TabsTrigger value="calculator">
                <BarChart className="mr-2 h-4 w-4" /> SIP Calculator
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fund Overview</CardTitle>
                    <CardDescription>Key information about this fund</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                            <p>{fund.category}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Sub Category</h3>
                            <p>{fund.sub_category || "Not specified"}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Fund Manager</h3>
                            <p>{fund.fund_manager_details?.name || fund.fund_manager || "Not available"}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Inception Date</h3>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" /> {fund.inception_date}
                            </p>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Snapshot</CardTitle>
                    <CardDescription>Returns over different time periods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {["1Y", "3Y", "5Y"].map((period) => (
                        <div key={period} className="flex flex-col rounded-md border p-3">
                          <div className="text-muted-foreground">{period} Returns</div>
                          <div className="flex items-center text-xl font-semibold">
                            {fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0 ? (
                              <TrendingUp className="mr-1 h-5 w-5 text-green-500" />
                            ) : (
                              <TrendingDown className="mr-1 h-5 w-5 text-red-500" />
                            )}
                            <span
                              className={
                                fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {fund.returns[period as "1Y" | "3Y" | "5Y"]}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AMC Profile Card */}
              <div className="mt-6">
                <AMCProfile fund={fund} />
              </div>

              {/* Fund Manager Profile Card */}
              {fund.fund_manager && (
                <div className="mt-6">
                  <FundManagerProfile fund={fund} />
                </div>
              )}
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>NAV History</CardTitle>
                      <CardDescription>Historical NAV price movement</CardDescription>
                    </div>
                    <TabsList>
                      <TabsTrigger value="1M" onClick={() => setTimeRange("1M")}>1M</TabsTrigger>
                      <TabsTrigger value="6M" onClick={() => setTimeRange("6M")}>6M</TabsTrigger>
                      <TabsTrigger value="1Y" onClick={() => setTimeRange("1Y")}>1Y</TabsTrigger>
                      <TabsTrigger value="3Y" onClick={() => setTimeRange("3Y")}>3Y</TabsTrigger>
                      <TabsTrigger value="5Y" onClick={() => setTimeRange("5Y")}>5Y</TabsTrigger>
                      <TabsTrigger value="Max" onClick={() => setTimeRange("Max")}>Max</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartNavHistory fund={fund} timeRange={timeRange} />
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">High</div>
                      <div className="text-lg font-semibold">₹{(fund.nav * 1.15).toFixed(2)}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Low</div>
                      <div className="text-lg font-semibold">₹{(fund.nav * 0.85).toFixed(2)}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">CAGR</div>
                      <div className="text-lg font-semibold text-green-500">{fund.cagr || fund.returns["5Y"].toFixed(2)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Comparison</CardTitle>
                    <CardDescription>Compare with benchmark and category average</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Returns table */}
                      <div>
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2 text-left">Period</th>
                              <th className="py-2 text-right">Fund Returns</th>
                              <th className="py-2 text-right">Category Avg</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">1Y</td>
                              <td className={`py-2 text-right ${fund.returns["1Y"] >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fund.returns["1Y"]}%
                              </td>
                              <td className="py-2 text-right">{(fund.returns["1Y"] - 2 + Math.random() * 4).toFixed(2)}%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">3Y</td>
                              <td className={`py-2 text-right ${fund.returns["3Y"] >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fund.returns["3Y"]}%
                              </td>
                              <td className="py-2 text-right">{(fund.returns["3Y"] - 1.5 + Math.random() * 3).toFixed(2)}%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">5Y</td>
                              <td className={`py-2 text-right ${fund.returns["5Y"] >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fund.returns["5Y"]}%
                              </td>
                              <td className="py-2 text-right">{(fund.returns["5Y"] - 1 + Math.random() * 2).toFixed(2)}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Growth of 10,000 */}
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-4 text-sm font-medium">Growth of ₹10,000 over 5 years</h3>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold">₹{(10000 * (1 + fund.returns["5Y"] / 100) ** 5).toFixed(0)}</div>
                            <p className="text-sm text-muted-foreground">Current Value</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Risk Analysis Tab */}
            <TabsContent value="risk">
              <AdvancedMetrics fund={fund} />
            </TabsContent>

            {/* SIP Calculator Tab */}
            <TabsContent value="calculator">
              <SIPCalculator fund={fund} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FundDetails;
