import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { FundData } from "@/lib/types";
import { fetchFunds } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComparisonTable } from "@/components/comparison-table";
import { toast } from "@/components/ui/use-toast";

const CompareFunds = () => {
  const [fundIds, setFundIds] = useState<string[]>([]);
  const [funds, setFunds] = useState<FundData[]>([]);
  const [newFundId, setNewFundId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComparedFunds = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (fundIds.length > 0) {
          console.log("Fetching funds with IDs:", fundIds.join(","));
          const fundsData = await fetchFunds({ fundIds: fundIds.join(",") });
          console.log("Fetched funds:", fundsData);
          setFunds(fundsData);
          
          if (fundsData.length < fundIds.length) {
            toast({
              title: "Some funds not found",
              description: "Not all fund IDs were found in the database.",
              variant: "destructive",
            });
          }
        } else {
          setFunds([]);
        }
      } catch (err) {
        setError("Failed to fetch funds for comparison.");
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch funds for comparison. Using mock data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparedFunds();
  }, [fundIds]);

  const addFundId = () => {
    if (newFundId && !fundIds.includes(newFundId)) {
      setFundIds([...fundIds, newFundId]);
      setNewFundId("");
      setError(null);
    } else if (fundIds.includes(newFundId)) {
      setError("Fund ID already added.");
      toast({
        title: "Duplicate Fund",
        description: "This fund ID has already been added to the comparison.",
        variant: "destructive",
      });
    } else {
      setError("Please enter a Fund ID.");
      toast({
        title: "Invalid Input",
        description: "Please enter a valid Fund ID.",
        variant: "destructive",
      });
    }
  };

  const removeFundId = (id: string) => {
    setFundIds(fundIds.filter((fundId) => fundId !== id));
    setError(null);
  };
  
  const clearAllFunds = () => {
    setFundIds([]);
    setFunds([]);
  };

  return (
    <Layout>
      <div className="container space-y-8 px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Compare Funds</h1>
        <p className="text-muted-foreground mb-6">
          Compare multiple funds side by side to make informed investment decisions
        </p>

        {funds.length === 0 && !isLoading ? (
          <Alert variant="default">
            <AlertDescription>
              Add fund IDs to compare. You can find the Fund ID on the fund details page.<br />
              <strong>Try these sample IDs:</strong> HDFC001, ICICI001, SBI001, AXIS001
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <Input
            type="text"
            placeholder="Enter Fund ID (e.g., HDFC001)"
            value={newFundId}
            onChange={(e) => setNewFundId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addFundId()}
          />
          <Button onClick={addFundId}>Add Fund</Button>
          {funds.length > 0 && (
            <Button variant="destructive" onClick={clearAllFunds}>
              Clear All
            </Button>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {isLoading ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading funds...</p>
          </div>
        ) : funds.length > 0 ? (
          <div className="overflow-x-auto">
            <ComparisonTable funds={funds} />
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Active Funds:</strong> {fundIds.join(", ")}
              </p>
            </div>
          </div>
        ) : null}

        {funds.length > 0 && (
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
