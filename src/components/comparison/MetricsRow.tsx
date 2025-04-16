
import { FundData } from "@/lib/types";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricsRowProps {
  label: string;
  metric: "1Y" | "3Y" | "5Y";
  funds: FundData[];
}

export function MetricsRow({ label, metric, funds }: MetricsRowProps) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="py-3 pl-4 font-medium">{label}</td>
      {funds.map((fund) => (
        <td key={fund.id} className="p-3">
          <span className={fund.returns[metric] >= 0 ? "gain-text" : "loss-text"}>
            {fund.returns[metric] >= 0 ? "+" : ""}
            {fund.returns[metric].toFixed(2)}%
            {fund.returns[metric] >= 0 ? (
              <ArrowUp className="ml-1 inline h-4 w-4" />
            ) : (
              <ArrowDown className="ml-1 inline h-4 w-4" />
            )}
          </span>
        </td>
      ))}
    </tr>
  );
}
