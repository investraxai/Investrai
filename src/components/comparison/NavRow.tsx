
import { FundData } from "@/lib/types";

interface NavRowProps {
  funds: FundData[];
}

export function NavRow({ funds }: NavRowProps) {
  return (
    <tr className="hover:bg-muted/50">
      <td className="py-3 pl-4 font-medium">NAV</td>
      {funds.map((fund) => (
        <td key={fund.id} className="p-3">
          ₹{fund.nav.toFixed(2)}
        </td>
      ))}
    </tr>
  );
}
