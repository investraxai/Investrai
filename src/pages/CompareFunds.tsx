
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { FundData } from "@/lib/types";
import { fetchFunds } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComparisonTable } from "@/components/comparison-table";

const CompareFunds = () => {
  const [fundIds, setFundIds] = useState<string[]>([]);
  const [funds, setFunds] = useState<FundData[]>([]);
  const [newFundId, setNewFundId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComparedFunds = async () => {
      try {
        if (fundIds.length > 0) {
          const fundsData = await fetchFunds({ fundIds: fundIds.join(",") });
          setFunds(fundsData);
        } else {
          setFunds([]);
        }
      } catch (err) {
        setError("Failed to fetch funds for comparison.");
        console.error(err);
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
    } else {
      setError("Please enter a Fund ID.");
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
        {funds.length === 0 ? (
          <Alert variant="default">
            <AlertDescription>
              Add fund IDs to compare. You can find the Fund ID on the fund details page.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <Input
            type="text"
            placeholder="Enter Fund ID"
            value={newFundId}
            onChange={(e) => setNewFundId(e.target.value)}
          />
          <Button onClick={addFundId}>Add Fund</Button>
          {funds.length > 0 && (
            <Button variant="destructive" onClick={clearAllFunds}>
              Clear All
            </Button>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {funds.length > 0 && (
          <div className="overflow-x-auto">
            <ComparisonTable funds={funds} />
          </div>
        )}

        {funds.length > 0 && (
          <div className="mt-6">
            <p>
              <strong>Disclaimer:</strong> The comparison is based on the data
              available and for informational purposes only.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompareFunds;
