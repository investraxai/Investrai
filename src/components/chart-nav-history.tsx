
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
} from "recharts";

interface ChartNavHistoryProps {
  fund: FundData;
  timeRange: "1Y" | "3Y" | "5Y";
}

export function ChartNavHistory({ fund, timeRange }: ChartNavHistoryProps) {
  const [chartData, setChartData] = useState<{ date: string; nav: number }[]>([]);
  
  useEffect(() => {
    // Generate historical NAV data based on the selected time range
    const days = timeRange === "1Y" ? 365 : timeRange === "3Y" ? 1095 : 1825;
    const historicalData = generateHistoricalNAVData(fund, days);
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
        <div className="bg-white p-2 border rounded shadow-sm text-sm">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-chartBlue">NAV: ₹{payload[0].value?.toFixed(4)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">NAV History ({timeRange})</CardTitle>
      </CardHeader>
      <CardContent>
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
                  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear().toString().substr(2)}`;
                }}
                minTickGap={30}
              />
              <YAxis 
                domain={["auto", "auto"]} 
                tickFormatter={(value) => `₹${value}`} 
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
