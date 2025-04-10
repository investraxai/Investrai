
import { FundData } from "@/lib/types";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface FundCardProps {
  fund: FundData;
}

export function FundCard({ fund }: FundCardProps) {
  return (
    <Link to={`/fund/${fund.id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium line-clamp-2 text-left">
                {fund.scheme_name}
              </CardTitle>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-left">{fund.amc}</div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-left">
              <div className="text-muted-foreground text-xs">NAV</div>
              <div className="font-medium">₹{fund.nav.toFixed(2)}</div>
            </div>
            <div className="text-left">
              <div className="text-muted-foreground text-xs">Category</div>
              <div className="font-medium">{fund.sub_category}</div>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-1">
            {["1Y", "3Y", "5Y"].map((period) => (
              <div key={period} className="text-left">
                <div className="text-xs text-muted-foreground">{period}</div>
                <div className={`flex items-center ${fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0 ? "text-gain" : "text-loss"}`}>
                  {fund.returns[period as "1Y" | "3Y" | "5Y"] >= 0 ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  <span className="font-medium text-sm">
                    {fund.returns[period as "1Y" | "3Y" | "5Y"]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full items-center justify-between text-xs">
            <div className="text-muted-foreground">
              AUM: ₹{fund.aum >= 1000 ? (fund.aum / 1000).toFixed(2) + "K" : fund.aum} Cr
            </div>
            <div className="text-muted-foreground">
              Exp. Ratio: {fund.expense_ratio}%
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
