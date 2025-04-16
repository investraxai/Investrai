
import { FundData } from "@/lib/types";

interface CategoryRowProps {
  funds: FundData[];
}

export function CategoryRow({ funds }: CategoryRowProps) {
  return (
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
  );
}
