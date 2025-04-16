
import { FundData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, addDays, subMonths, subDays, isAfter } from "date-fns";

interface ComparisonChartProps {
  funds: FundData[];
}

export function ComparisonChart({ funds }: ComparisonChartProps) {
  if (!funds.length) return null;

  const colors = ["#0066FF", "#00BCD4", "#FF4081", "#4CAF50"];
  const today = new Date();
  const startDate = subMonths(today, 12); // 1 year ago

  // Generate dates for the full year with daily data points
  const dates = [];
  for (let d = new Date(startDate); isAfter(today, d) || d.getDate() === today.getDate(); d = addDays(d, 5)) {
    dates.push(new Date(d));
  }

  // Prepare data for the chart with interpolated returns
  const chartData = dates.map((date, index) => {
    const dataPoint: any = {
      date: format(date, "MMM d, yyyy"),
    };
    
    funds.forEach((fund, i) => {
      // More realistic return simulation with proper trends
      // Start from a base and add cumulative returns that follow a trend
      const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const baseReturn = (fund.returns["1Y"] / 365) * daysSinceStart;
      
      // Add some variation but maintain the fund's general performance trend
      const trendFactor = 0.7 + (Math.sin(index / 10) * 0.3);
      const randomWalk = (Math.sin(index / 5 + i * 10) * fund.returns["1Y"] / 20);
      
      // Percentage return value
      dataPoint[fund.scheme_name] = +(baseReturn * trendFactor + randomWalk).toFixed(2);
    });
    
    return dataPoint;
  });

  // Ensure the first data point starts at 0% return
  if (chartData.length > 0) {
    funds.forEach(fund => {
      chartData[0][fund.scheme_name] = 0;
    });
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">
          {funds[0]?.scheme_name} Returns Comparison
          <p className="text-sm font-normal text-muted-foreground mt-1">
            Compare {funds[0]?.scheme_name} with other mutual funds
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            {funds.map((fund, index) => (
              <div key={fund.id} className="flex items-center gap-2 mr-4 mb-1">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: colors[index % colors.length] }} 
                />
                <span className="text-sm font-medium">{fund.scheme_name}</span>
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(startDate, "MMM d, yyyy")} → {format(today, "MMM d, yyyy")}
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return format(date, "MMM d");
                }}
                minTickGap={50}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
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
