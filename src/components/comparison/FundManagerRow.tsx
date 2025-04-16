
import { FundData } from "@/lib/types";

interface FundManagerRowProps {
  funds: FundData[];
}

export function FundManagerRow({ funds }: FundManagerRowProps) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="py-3 pl-4 font-medium">Fund Manager</td>
      {funds.map((fund) => (
        <td key={fund.id} className="p-3">
          {fund.fund_manager || "Not available"}
        </td>
      ))}
    </tr>
  );
}
