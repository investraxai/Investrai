
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundData } from "@/lib/types";
import { calculateSIPReturns } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { MicroLessonTooltip } from "./ui/micro-lesson-tooltip";

interface SIPCalculatorProps {
  fund: FundData;
}

export function SIPCalculator({ fund }: SIPCalculatorProps) {
  const [investmentType, setInvestmentType] = useState<"sip" | "lumpsum">("sip");
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [lumpSumAmount, setLumpSumAmount] = useState(100000);
  const [years, setYears] = useState(5);
  const [results, setResults] = useState({
    totalInvested: 0,
    estimatedReturns: 0,
    maturityValue: 0,
    tax: 0,
    postTaxValue: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  // Use the fund's 5Y return for calculations, or fallback to a default
  const expectedReturn = fund.returns["5Y"] || fund.cagr || 12;

  useEffect(() => {
    let calculatedResults;
    if (investmentType === "sip") {
      // Calculate SIP returns
      calculatedResults = calculateSIPReturns(monthlyAmount, years, expectedReturn);
    } else {
      // Calculate lumpsum returns
      const maturityValue = lumpSumAmount * Math.pow(1 + expectedReturn / 100, years);
      const estimatedReturns = maturityValue - lumpSumAmount;
      
      calculatedResults = {
        totalInvested: lumpSumAmount,
        estimatedReturns: estimatedReturns,
        maturityValue: maturityValue,
      };
    }
    
    // Calculate tax (assuming 15% tax rate on gains for demonstration)
    const tax = calculatedResults.estimatedReturns * 0.15;
    const postTaxValue = calculatedResults.maturityValue - tax;
    
    setResults({
      ...calculatedResults,
      tax,
      postTaxValue,
    });

    // Generate chart data for bar chart
    setChartData([
      {
        name: "Investment Breakup",
        "Amount Invested": calculatedResults.totalInvested,
        "Estimated Returns": calculatedResults.estimatedReturns,
        "Tax": tax,
      },
    ]);
    
    // Generate pie chart data
    setPieData([
      { name: "Amount Invested", value: calculatedResults.totalInvested, color: "#0EA5E9" },
      { name: "Estimated Returns", value: calculatedResults.estimatedReturns, color: "#8B5CF6" },
      { name: "Tax", value: tax, color: "#F97316" },
    ]);
  }, [monthlyAmount, lumpSumAmount, years, expectedReturn, investmentType]);

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)} K`;
    } else {
      return `₹${value.toFixed(2)}`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Let's calculate your returns after tax</CardTitle>
        <CardDescription>Estimate future wealth based on your investment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Tabs value={investmentType} onValueChange={(v) => setInvestmentType(v as "sip" | "lumpsum")}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="sip">Monthly SIP</TabsTrigger>
              <TabsTrigger value="lumpsum">One Time</TabsTrigger>
            </TabsList>
          
            <TabsContent value="sip" className="mt-4">
              <div className="mb-6 grid gap-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="monthlyAmount">Monthly Investment Amount (₹)</Label>
                    <span className="text-sm font-medium">₹{monthlyAmount.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="monthlyAmount"
                    min={500}
                    max={100000}
                    step={500}
                    value={[monthlyAmount]}
                    onValueChange={(value) => setMonthlyAmount(value[0])}
                    className="mb-2 w-full"
                  />
                  <Input
                    id="monthlyAmountInput"
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 500 && value <= 100000) {
                        setMonthlyAmount(value);
                      }
                    }}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="years">Investment period (years)</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYears(Math.max(1, years - 1))}
                        disabled={years <= 1}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center">{years}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYears(Math.min(30, years + 1))}
                        disabled={years >= 30}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Slider
                    id="years"
                    min={1}
                    max={30}
                    step={1}
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="cagr">
                    CAGR (%)
                  </Label>
                  <MicroLessonTooltip lesson="Compound Annual Growth Rate - the annualized return of the investment">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </MicroLessonTooltip>
                  <Input 
                    id="cagr" 
                    value={expectedReturn.toFixed(2)} 
                    className="w-24" 
                    disabled 
                  />
                  <span className="text-sm text-muted-foreground">Based on fund's 5Y returns</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lumpsum" className="mt-4">
              <div className="mb-6 grid gap-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="lumpSumAmount">One-time Investment Amount (₹)</Label>
                    <span className="text-sm font-medium">₹{lumpSumAmount.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="lumpSumAmount"
                    min={1000}
                    max={10000000}
                    step={1000}
                    value={[lumpSumAmount]}
                    onValueChange={(value) => setLumpSumAmount(value[0])}
                    className="mb-2 w-full"
                  />
                  <Input
                    id="lumpSumAmountInput"
                    type="number"
                    value={lumpSumAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1000) {
                        setLumpSumAmount(value);
                      }
                    }}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="yearsLumpSum">Investment period (years)</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYears(Math.max(1, years - 1))}
                        disabled={years <= 1}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center">{years}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYears(Math.min(30, years + 1))}
                        disabled={years >= 30}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Slider
                    id="yearsLumpSum"
                    min={1}
                    max={30}
                    step={1}
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="cagrLumpsum">
                    CAGR (%)
                  </Label>
                  <MicroLessonTooltip lesson="Compound Annual Growth Rate - the annualized return of the investment">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </MicroLessonTooltip>
                  <Input 
                    id="cagrLumpsum" 
                    value={expectedReturn.toFixed(2)} 
                    className="w-24" 
                    disabled 
                  />
                  <span className="text-sm text-muted-foreground">Based on fund's 5Y returns</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-4">
              <div>
                <div className="mb-4 flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Invested</span>
                  <span className="font-semibold">{formatCurrency(results.totalInvested)}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground">+ Returns ({expectedReturn}%)</span>
                  <span className="font-semibold text-primary">{formatCurrency(results.estimatedReturns)}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground">- Tax (15%)</span>
                  <span className="font-semibold text-orange-500">{formatCurrency(results.tax)}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-lg font-semibold">You make</span>
                  <span className="text-xl font-bold">{formatCurrency(results.postTaxValue)}</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {investmentType === "sip" ? (
                  <p>A SIP of ₹{monthlyAmount.toLocaleString()} done in this fund over {years} years would be valued at {formatCurrency(results.postTaxValue)} (post-tax) today.</p>
                ) : (
                  <p>A one-time investment of ₹{lumpSumAmount.toLocaleString()} in this fund over {years} years would be valued at {formatCurrency(results.postTaxValue)} (post-tax) today.</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Note: Tax calculations are based on a 15% capital gains tax rate for demonstration purposes. Actual tax implications may vary based on your tax bracket and holding period.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
