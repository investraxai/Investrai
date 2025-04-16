
import { FundData } from "@/lib/types";
import { MetricsRow } from "./comparison/MetricsRow";
import { TooltipLabel } from "./comparison/TooltipLabel";
import { RiskRating } from "./comparison/RiskRating";

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

          <MetricsRow label="1Y Return" metric="1Y" funds={funds} />
          <MetricsRow label="3Y Return" metric="3Y" funds={funds} />
          <MetricsRow label="5Y Return" metric="5Y" funds={funds} />

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
              <TooltipLabel 
                label="Expense Ratio"
                tooltip="The percentage of assets deducted each year for expenses"
              />
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
              <TooltipLabel 
                label="AUM"
                tooltip="Assets Under Management in crores"
              />
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
                <RiskRating rating={fund.risk_rating} />
              </td>
            ))}
          </tr>

          {/* Remaining rows */}
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
              <TooltipLabel 
                label="Exit Load"
                tooltip="Fee charged when redeeming units before a specified period"
              />
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
