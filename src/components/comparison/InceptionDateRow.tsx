
import { FundData } from "@/lib/types";

interface InceptionDateRowProps {
  funds: FundData[];
}

export function InceptionDateRow({ funds }: InceptionDateRowProps) {
  return (
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
  );
}
