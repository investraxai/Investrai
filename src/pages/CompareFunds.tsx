
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { FundData } from "@/lib/types";
import { fetchFunds } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ComparisonTable } from "@/components/comparison-table";
import { ComparisonChart } from "@/components/comparison-chart";
import { toast } from "@/components/ui/use-toast";
import { FundSelector, FundSelectedBadge } from "@/components/fund-selector";

const CompareFunds = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundData[]>([]);
  const [allFunds, setAllFunds] = useState<FundData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAllFunds = async () => {
      try {
        setIsLoading(true);
        const fundsData = await fetchFunds();
        setAllFunds(fundsData);
      } catch (err) {
        console.error("Error loading funds:", err);
        toast({
          title: "Error",
          description: "Failed to load funds. Using mock data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAllFunds();
  }, []);

  const handleAddFund = (fund: FundData) => {
    if (!selectedFunds.find(f => f.id === fund.id)) {
      if (selectedFunds.length >= 5) {
        toast({
          title: "Maximum funds reached",
          description: "You can compare up to 5 funds at a time",
          variant: "destructive",
        });
        return;
      }
      setSelectedFunds([...selectedFunds, fund]);
    } else {
      toast({
        title: "Fund already added",
        description: "This fund is already in the comparison",
        variant: "destructive",
      });
    }
  };

  const removeFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(fund => fund.id !== fundId));
  };

  const clearAllFunds = () => {
    setSelectedFunds([]);
  };

  return (
    <Layout>
      <div className="container space-y-8 px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Compare Funds</h1>
        <p className="text-muted-foreground mb-6">
          Compare multiple funds side by side to make informed investment decisions
        </p>

        {selectedFunds.length === 0 && !isLoading ? (
          <Alert variant="default">
            <AlertDescription>
              Start typing a fund name to compare funds. You can compare up to 5 funds at a time.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <FundSelector
                funds={allFunds.filter(fund => !selectedFunds.find(f => f.id === fund.id))}
                onSelect={handleAddFund}
                buttonLabel={
                  <span className="flex items-center">
                    <span className="opacity-50">Search funds...</span>
                  </span>
                }
              />
            </div>
            {selectedFunds.length > 0 && (
              <Button variant="destructive" onClick={clearAllFunds} className="whitespace-nowrap">
                Clear All
              </Button>
            )}
          </div>

          {selectedFunds.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFunds.map((fund) => (
                <FundSelectedBadge
                  key={fund.id}
                  fund={fund}
                  onRemove={() => removeFund(fund.id)}
                />
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading funds...</p>
          </div>
        ) : selectedFunds.length > 0 ? (
          <div className="space-y-8">
            <ComparisonChart funds={selectedFunds} />
            <div className="overflow-x-auto">
              <ComparisonTable funds={selectedFunds} />
            </div>
          </div>
        ) : null}

        {selectedFunds.length > 0 && (
          <div className="mt-6 rounded-md bg-muted p-4">
            <p className="text-sm">
              <strong>Disclaimer:</strong> The comparison is based on the data
              available and for informational purposes only. Past performance is not indicative of future results.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompareFunds;
