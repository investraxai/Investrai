
import { FundData } from "@/lib/types";
import { ArrowUp, ArrowDown, Star, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const riskLabels: Record<number, string> = {
  1: "Very Low",
  2: "Low",
  3: "Moderate",
  4: "High",
  5: "Very High",
};

interface ComparisonTableProps {
  funds: FundData[];
}

export function ComparisonTable({ funds }: ComparisonTableProps) {
  if (!funds.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-3 pl-4 text-left font-medium text-muted-foreground">Metric</th>
            {funds.map((fund) => (
              <th key={fund.id} className="p-3 text-left font-medium">
                {fund.scheme_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {/* Fund Type */}
          <tr className="border-t hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Category</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {fund.category}
                </span>
                {fund.sub_category && (
                  <span className="ml-2 text-xs text-muted-foreground">{fund.sub_category}</span>
                )}
              </td>
            ))}
          </tr>

          {/* 1Y Return */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">1Y Return</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                <span className={fund.returns["1Y"] >= 0 ? "gain-text" : "loss-text"}>
                  {fund.returns["1Y"] >= 0 ? "+" : ""}
                  {fund.returns["1Y"].toFixed(2)}%
                  {fund.returns["1Y"] >= 0 ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  )}
                </span>
              </td>
            ))}
          </tr>

          {/* 3Y Return */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">3Y Return</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                <span className={fund.returns["3Y"] >= 0 ? "gain-text" : "loss-text"}>
                  {fund.returns["3Y"] >= 0 ? "+" : ""}
                  {fund.returns["3Y"].toFixed(2)}%
                  {fund.returns["3Y"] >= 0 ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  )}
                </span>
              </td>
            ))}
          </tr>

          {/* 5Y Return */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">5Y Return</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                <span className={fund.returns["5Y"] >= 0 ? "gain-text" : "loss-text"}>
                  {fund.returns["5Y"] >= 0 ? "+" : ""}
                  {fund.returns["5Y"].toFixed(2)}%
                  {fund.returns["5Y"] >= 0 ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  )}
                </span>
              </td>
            ))}
          </tr>

          {/* NAV */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">NAV</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                ₹{fund.nav.toFixed(2)}
              </td>
            ))}
          </tr>

          {/* Expense Ratio */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">
              <div className="flex items-center">
                Expense Ratio
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">
                        The percentage of assets deducted each year for expenses
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {fund.expense_ratio.toFixed(2)}%
              </td>
            ))}
          </tr>

          {/* AUM */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">
              <div className="flex items-center">
                AUM
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Assets Under Management in crores</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                ₹{fund.aum.toLocaleString("en-IN")} Cr
                <span className="ml-2 text-xs text-muted-foreground">({fund.aum_category})</span>
              </td>
            ))}
          </tr>

          {/* Risk Level */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Risk Level</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Star
                        key={level}
                        className={`h-4 w-4 ${
                          level <= fund.risk_rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">{riskLabels[fund.risk_rating]}</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Fund Manager */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Fund Manager</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {fund.fund_manager || "Not available"}
              </td>
            ))}
          </tr>

          {/* Inception Date */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Inception Date</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {new Date(fund.inception_date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            ))}
          </tr>

          {/* Minimum SIP */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Min SIP Amount</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {fund.min_sip_amount ? `₹${fund.min_sip_amount}` : "Not available"}
              </td>
            ))}
          </tr>

          {/* Minimum Lumpsum */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">Min Lumpsum</td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {fund.min_lumpsum ? `₹${fund.min_lumpsum}` : "Not available"}
              </td>
            ))}
          </tr>

          {/* Exit Load */}
          <tr className="hover:bg-muted/50">
            <td className="py-3 pl-4 font-medium">
              <div className="flex items-center">
                Exit Load
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">
                        Fee charged when redeeming units before a specified period
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </td>
            {funds.map((fund) => (
              <td key={fund.id} className="p-3">
                {fund.exit_load || "Nil"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
