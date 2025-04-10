
import { FundData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ComparisonChartProps {
  funds: FundData[];
}

export function ComparisonChart({ funds }: ComparisonChartProps) {
  if (!funds.length) return null;

  // Colors for the lines
  const colors = ["#8B5CF6", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];

  // Prepare data for the chart
  const chartData = [
    { period: "1Y Return", ...funds.reduce((acc, fund) => ({ ...acc, [fund.scheme_name]: fund.returns["1Y"] }), {}) },
    { period: "3Y Return", ...funds.reduce((acc, fund) => ({ ...acc, [fund.scheme_name]: fund.returns["3Y"] }), {}) },
    { period: "5Y Return", ...funds.reduce((acc, fund) => ({ ...acc, [fund.scheme_name]: fund.returns["5Y"] }), {}) },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`]} />
              <Legend />
              {funds.map((fund, index) => (
                <Line
                  key={fund.id}
                  type="monotone"
                  dataKey={fund.scheme_name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
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
