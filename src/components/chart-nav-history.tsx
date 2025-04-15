
import { useEffect, useState } from "react";
import { FundData } from "@/lib/types";
import { generateHistoricalNAVData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

interface ChartNavHistoryProps {
  fund: FundData;
  timeRange: "1M" | "6M" | "1Y" | "3Y" | "5Y" | "Max";
}

export function ChartNavHistory({ fund, timeRange }: ChartNavHistoryProps) {
  const [chartData, setChartData] = useState<{ date: string; nav: number }[]>([]);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [lowestValue, setLowestValue] = useState<number>(0);
  
  useEffect(() => {
    // Generate historical NAV data based on the selected time range
    let days;
    switch (timeRange) {
      case "1M":
        days = 30;
        break;
      case "6M":
        days = 180;
        break;
      case "1Y":
        days = 365;
        break;
      case "3Y":
        days = 1095;
        break;
      case "5Y":
        days = 1825;
        break;
      case "Max":
        days = 3650; // ~10 years as maximum
        break;
      default:
        days = 365;
    }
    
    const historicalData = generateHistoricalNAVData(fund, days);
    
    // Find highest and lowest values for display
    const navValues = historicalData.map(item => item.nav);
    const highest = Math.max(...navValues);
    const lowest = Math.min(...navValues);
    
    setHighestValue(highest);
    setLowestValue(lowest);
    setChartData(historicalData);
  }, [fund, timeRange]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border bg-white p-3 shadow-md text-sm">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-primary">NAV: ₹{payload[0].value?.toFixed(4)}</p>
        </div>
      );
    }
    return null;
  };
  
  // Calculate the start and current NAV values
  const startNav = chartData.length > 0 ? chartData[0].nav : 0;
  const currentNav = chartData.length > 0 ? chartData[chartData.length - 1].nav : 0;
  
  // Calculate change percentage
  const changePercentage = startNav > 0 ? ((currentNav - startNav) / startNav) * 100 : 0;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₹{fund.nav.toFixed(4)}</span>
            <span className={`flex items-center ${changePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {changePercentage >= 0 ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(2)}%
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {timeRange} change from ₹{startNav.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const dateObj = new Date(date);
                // Format based on time range
                if (timeRange === "1M" || timeRange === "6M") {
                  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
                }
                return `${dateObj.getMonth() + 1}/${dateObj.getFullYear().toString().substr(2)}`;
              }}
              minTickGap={30}
            />
            <YAxis 
              domain={[lowestValue * 0.95, highestValue * 1.05]} 
              tickFormatter={(value) => `₹${value.toFixed(0)}`} 
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="nav"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            {/* Add area under the curve with light fill */}
            <ReferenceArea y1={0} y2={chartData[0]?.nav} fill="#8B5CF620" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
