
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Info, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundSelector, FundSelectedBadge } from "@/components/fund-selector";
import { ComparisonTable } from "@/components/comparison-table";
import { ComparisonChart } from "@/components/comparison-chart";
import { FundData } from "@/lib/types";

// Import mock data (replace with actual API call in production)
import { mockFundData } from "@/lib/mock-data";

export default function CompareFunds() {
  const [selectedFunds, setSelectedFunds] = useState<FundData[]>([]);

  // Fetch funds data
  const { data: funds, isLoading, error } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      // In a real app, this would be an API call
      return mockFundData;
    },
  });

  const handleSelectFund = (fund: FundData) => {
    if (selectedFunds.length >= 4) {
      // Show a toast or alert that max 4 funds can be compared at once
      console.log("Maximum 4 funds can be compared at once");
      return;
    }
    
    // Check if fund is already selected
    if (selectedFunds.some((f) => f.id === fund.id)) {
      return;
    }
    
    setSelectedFunds([...selectedFunds, fund]);
  };

  const handleRemoveFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter((fund) => fund.id !== fundId));
  };

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Compare Mutual Funds</h1>
        <p className="text-muted-foreground">
          Compare key metrics and performance data for mutual funds side by side
        </p>
      </div>

      {/* Fund Selection Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Selected Funds</h2>
          {selectedFunds.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedFunds([])}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {selectedFunds.map((fund) => (
            <FundSelectedBadge
              key={fund.id}
              fund={fund}
              onRemove={() => handleRemoveFund(fund.id)}
            />
          ))}

          {selectedFunds.length < 4 && (
            <div className="flex items-center justify-center">
              {isLoading ? (
                <div className="text-center text-sm text-muted-foreground">Loading funds...</div>
              ) : (
                <FundSelector
                  funds={funds || []}
                  onSelect={handleSelectFund}
                  buttonLabel={
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <PlusCircle className="h-4 w-4" />
                      <span>Add Fund to Compare</span>
                    </div>
                  }
                />
              )}
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load funds. Please try again later.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {selectedFunds.length === 0 ? (
        <div className="mt-12 text-center">
          <div className="rounded-full bg-muted p-4 inline-flex">
            <Info className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No funds selected</h3>
          <p className="mt-2 text-muted-foreground">
            Select funds above to start comparing their performance and metrics
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Performance Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="mt-6">
              <ComparisonTable funds={selectedFunds} />
            </TabsContent>
            <TabsContent value="chart" className="mt-6">
              <ComparisonChart funds={selectedFunds} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
