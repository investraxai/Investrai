
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
} from "recharts";

interface SIPCalculatorProps {
  fund: FundData;
}

export function SIPCalculator({ fund }: SIPCalculatorProps) {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(5);
  const [results, setResults] = useState({
    totalInvested: 0,
    estimatedReturns: 0,
    maturityValue: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  // Use the fund's 5Y return for calculations
  const expectedReturn = fund.returns["5Y"];

  useEffect(() => {
    // Calculate SIP returns based on inputs
    const calculatedResults = calculateSIPReturns(
      monthlyAmount,
      years,
      expectedReturn
    );
    setResults(calculatedResults);

    // Generate chart data
    const totalInvested = monthlyAmount * 12 * years;
    setChartData([
      {
        name: "Investment Breakup",
        "Amount Invested": totalInvested,
        "Estimated Returns": calculatedResults.estimatedReturns,
      },
    ]);
  }, [monthlyAmount, years, expectedReturn]);

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyAmount">Monthly Investment</Label>
              <span className="text-sm font-medium">₹{monthlyAmount}</span>
            </div>
            <Slider
              id="monthlyAmount"
              min={500}
              max={100000}
              step={500}
              value={[monthlyAmount]}
              onValueChange={(value) => setMonthlyAmount(value[0])}
              className="w-full"
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

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="years">Investment Period (Years)</Label>
              <span className="text-sm font-medium">{years} Years</span>
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm text-muted-foreground">Invested Amount</div>
              <div className="text-xl font-bold">
                {formatCurrency(results.totalInvested)}
              </div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm text-muted-foreground">Est. Returns</div>
              <div className="text-xl font-bold">
                {formatCurrency(results.estimatedReturns)}
              </div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-xl font-bold">
                {formatCurrency(results.maturityValue)}
              </div>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 10000000) {
                      return `${(value / 10000000).toFixed(0)}Cr`;
                    } else if (value >= 100000) {
                      return `${(value / 100000).toFixed(0)}L`;
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}K`;
                    }
                    return value;
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Amount",
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="Amount Invested"
                  stackId="a"
                  fill="#0EA5E9"
                  name="Amount Invested"
                />
                <Bar
                  dataKey="Estimated Returns"
                  stackId="a"
                  fill="#8B5CF6"
                  name="Estimated Returns"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-muted-foreground">
            Note: Calculations are based on {expectedReturn}% annual returns (fund's
            5Y CAGR). Actual returns may vary.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
