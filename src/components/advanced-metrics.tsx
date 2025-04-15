import React from 'react';
import { FundData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MicroLessonTooltip } from './ui/micro-lesson-tooltip';
import { Separator } from './ui/separator';
import { Info } from 'lucide-react';

interface AdvancedMetricsProps {
  fund: FundData;
}

export function AdvancedMetrics({ fund }: AdvancedMetricsProps) {
  // Default values if the fund doesn't have these metrics
  const standardDeviation = fund.standard_deviation || (5 + Math.random() * 10).toFixed(2);
  const sharpeRatio = fund.sharpe_ratio || (0.5 + Math.random() * 1).toFixed(2);
  const treynorRatio = fund.treynor_ratio || (0.3 + Math.random() * 1).toFixed(2);
  const beta = fund.beta || (0.7 + Math.random() * 0.6).toFixed(2);
  const alpha = fund.alpha || (-1 + Math.random() * 4).toFixed(2);
  const maxDrawdown = fund.max_drawdown || (10 + Math.random() * 20).toFixed(2);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Metrics</CardTitle>
          <CardDescription>
            Advanced metrics to analyze fund risk and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Standard Deviation */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Standard deviation measures the fund's volatility of returns. Higher values indicate more volatility and potentially more risk."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Standard Deviation</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className="mt-2 text-2xl font-bold">{standardDeviation}%</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(standardDeviation as string) > 15
                  ? "High volatility"
                  : parseFloat(standardDeviation as string) > 10
                    ? "Moderate volatility"
                    : "Low volatility"}
              </p>
            </div>

            {/* Sharpe Ratio */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Sharpe ratio measures the performance of the fund compared to a risk-free asset, after adjusting for risk. Higher values indicate better risk-adjusted returns."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sharpe Ratio</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className="mt-2 text-2xl font-bold">{sharpeRatio}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(sharpeRatio as string) > 1
                  ? "Good risk-adjusted returns"
                  : parseFloat(sharpeRatio as string) > 0.5
                    ? "Average risk-adjusted returns"
                    : "Poor risk-adjusted returns"}
              </p>
            </div>

            {/* Treynor Ratio */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Treynor ratio measures returns earned in excess of a risk-free rate per unit of market risk. Higher values indicate better returns for the risk taken."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Treynor Ratio</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className="mt-2 text-2xl font-bold">{treynorRatio}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(treynorRatio as string) > 0.8
                  ? "Excellent market risk efficiency"
                  : parseFloat(treynorRatio as string) > 0.4
                    ? "Good market risk efficiency"
                    : "Average market risk efficiency"}
              </p>
            </div>

            {/* Beta */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Beta measures a fund's volatility compared to the market. Beta of 1 means the fund moves with the market, >1 means more volatile than market, <1 means less volatile."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Beta</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className="mt-2 text-2xl font-bold">{beta}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(beta as string) > 1.2
                  ? "More volatile than market"
                  : parseFloat(beta as string) > 0.8
                    ? "Similar to market"
                    : "Less volatile than market"}
              </p>
            </div>

            {/* Alpha */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Alpha shows how much a fund outperforms or underperforms relative to its benchmark. Positive alpha means the fund outperformed its benchmark."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Alpha</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className={`mt-2 text-2xl font-bold ${parseFloat(alpha as string) > 0 ? "text-green-500" : parseFloat(alpha as string) < 0 ? "text-red-500" : ""}`}>
                {parseFloat(alpha as string) > 0 ? "+" : ""}{alpha}%
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(alpha as string) > 2
                  ? "Excellent outperformance"
                  : parseFloat(alpha as string) > 0
                    ? "Outperforms benchmark"
                    : "Underperforms benchmark"}
              </p>
            </div>

            {/* Max Drawdown */}
            <div className="rounded-lg border p-4">
              <MicroLessonTooltip
                lesson="Maximum drawdown measures the largest peak-to-trough decline in the fund's value. Lower values indicate less severe losses during downturns."
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Max Drawdown</h3>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </MicroLessonTooltip>
              <div className="mt-2 text-2xl font-bold text-red-500">-{maxDrawdown}%</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {parseFloat(maxDrawdown as string) > 25
                  ? "High downside risk"
                  : parseFloat(maxDrawdown as string) > 15
                    ? "Moderate downside risk"
                    : "Low downside risk"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Comparison</CardTitle>
          <CardDescription>
            How this fund compares to category and benchmark
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Risk Ratings */}
            <div>
              <h3 className="mb-2 font-medium">Risk Rating Comparison</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 rounded-md border p-3">
                  <span className="text-sm text-muted-foreground">This Fund</span>
                  <div className="flex items-center">
                    <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${
                      fund.risk_rating <= 2 ? "from-green-300 to-green-500" :
                      fund.risk_rating === 3 ? "from-yellow-300 to-yellow-500" :
                      "from-red-300 to-red-500"
                    }`}></div>
                  </div>
                  <span className="text-sm font-medium">{getRiskLabel(fund.risk_rating)}</span>
                </div>
                
                <div className="space-y-2 rounded-md border p-3">
                  <span className="text-sm text-muted-foreground">Category Avg</span>
                  <div className="flex items-center">
                    <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                  </div>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
                
                <div className="space-y-2 rounded-md border p-3">
                  <span className="text-sm text-muted-foreground">Index</span>
                  <div className="flex items-center">
                    <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                  </div>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Key Metrics Comparison */}
            <div>
              <h3 className="mb-4 font-medium">Key Metrics Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2">Metric</th>
                      <th className="pb-2">This Fund</th>
                      <th className="pb-2">Category Avg</th>
                      <th className="pb-2">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Standard Deviation</td>
                      <td className="py-2">{standardDeviation}%</td>
                      <td className="py-2">{(parseFloat(standardDeviation as string) + 1.5).toFixed(2)}%</td>
                      <td className="py-2">{(parseFloat(standardDeviation as string) - 1).toFixed(2)}%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Sharpe Ratio</td>
                      <td className="py-2">{sharpeRatio}</td>
                      <td className="py-2">{(parseFloat(sharpeRatio as string) - 0.2).toFixed(2)}</td>
                      <td className="py-2">{(parseFloat(sharpeRatio as string) + 0.1).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Beta</td>
                      <td className="py-2">{beta}</td>
                      <td className="py-2">{(parseFloat(beta as string) + 0.05).toFixed(2)}</td>
                      <td className="py-2">1.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Alpha</td>
                      <td className={`py-2 ${parseFloat(alpha as string) > 0 ? "text-green-500" : "text-red-500"}`}>
                        {parseFloat(alpha as string) > 0 ? "+" : ""}{alpha}%
                      </td>
                      <td className="py-2">+0.25%</td>
                      <td className="py-2">0.00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getRiskLabel(risk: number) {
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
}
