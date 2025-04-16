
import { FundData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface ComparisonChartProps {
  funds: FundData[];
}

export function ComparisonChart({ funds }: ComparisonChartProps) {
  if (!funds.length) return null;

  const colors = ["#0066FF", "#00BCD4", "#FF4081", "#4CAF50"];
  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);

  // Generate dates for X-axis
  const dates = [];
  for (let d = new Date(startDate); d <= today; d.setMonth(d.getMonth() + 1)) {
    dates.push(new Date(d));
  }

  // Prepare data for the chart with interpolated monthly returns
  const chartData = dates.map(date => {
    const dataPoint: any = {
      date: format(date, "MMM yyyy"),
    };
    
    funds.forEach((fund, index) => {
      // Simulate monthly returns with some randomization based on 1Y return
      const baseReturn = fund.returns["1Y"] / 12;
      const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2
      dataPoint[fund.scheme_name] = +(baseReturn * randomFactor).toFixed(2);
    });
    
    return dataPoint;
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Returns Comparison
          <span className="text-sm font-normal text-muted-foreground">
            {format(startDate, "MMM d, yyyy")} → {format(today, "MMM d, yyyy")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              {funds.map((fund, index) => (
                <Line
                  key={fund.id}
                  type="monotone"
                  dataKey={fund.scheme_name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
