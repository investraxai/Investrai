
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { FundCard } from "@/components/fund-card";
import { mockFunds, filterFunds, getAllAMCs } from "@/lib/mock-data";
import { FundData, FundCategory, FundFilters } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Screener = () => {
  const [filteredFunds, setFilteredFunds] = useState<FundData[]>(mockFunds);
  const [amcs, setAMCs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FundFilters>({});
  
  useEffect(() => {
    // Get all AMCs for the filter dropdown
    setAMCs(getAllAMCs());
    
    // Apply initial filtering if any
    applyFilters();
  }, []);
  
  const applyFilters = () => {
    // Include search query in filters
    const updatedFilters = { ...filters, searchQuery };
    setFilteredFunds(filterFunds(updatedFilters));
  };
  
  const resetFilters = () => {
    setFilters({});
    setSearchQuery("");
    setFilteredFunds(mockFunds);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const updateFilter = (key: keyof FundFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const categories: FundCategory[] = [
    "Equity",
    "Debt",
    "Hybrid",
    "Solution Oriented",
    "Other",
  ];
  
  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Fund Screener</h1>
          <p className="text-muted-foreground">
            Filter and find the perfect mutual funds based on your investment criteria.
          </p>
        </div>
        
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by fund name or AMC..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Filter Funds</SheetTitle>
                  <SheetDescription>
                    Apply criteria to narrow down your search.
                  </SheetDescription>
                </SheetHeader>
                <div className="my-6 grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={filters.category || ""}
                      onValueChange={(value) => 
                        updateFilter("category", value ? value as FundCategory : undefined)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="amc">AMC</Label>
                    <Select
                      value={filters.amc || ""}
                      onValueChange={(value) => 
                        updateFilter("amc", value || undefined)
                      }
                    >
                      <SelectTrigger id="amc">
                        <SelectValue placeholder="All AMCs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All AMCs</SelectItem>
                        {amcs.map((amc) => (
                          <SelectItem key={amc} value={amc}>{amc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>1 Year Return (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minReturn1Y || ""}
                        onChange={(e) => 
                          updateFilter("minReturn1Y", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxReturn1Y || ""}
                        onChange={(e) => 
                          updateFilter("maxReturn1Y", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Expense Ratio (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Min"
                        value={filters.minExpenseRatio || ""}
                        onChange={(e) => 
                          updateFilter("minExpenseRatio", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Max"
                        value={filters.maxExpenseRatio || ""}
                        onChange={(e) => 
                          updateFilter("maxExpenseRatio", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>AUM Size (₹ Cr)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minAUM || ""}
                        onChange={(e) => 
                          updateFilter("minAUM", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxAUM || ""}
                        onChange={(e) => 
                          updateFilter("maxAUM", e.target.value ? Number(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="aumCategory">AUM Category</Label>
                    <Select
                      value={filters.aumCategory || ""}
                      onValueChange={(value) => 
                        updateFilter("aumCategory", value || undefined)
                      }
                    >
                      <SelectTrigger id="aumCategory">
                        <SelectValue placeholder="All AUM Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All AUM Categories</SelectItem>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Mid">Mid</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {Object.keys(filters).length > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredFunds.length} funds
        </div>
        
        {filteredFunds.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFunds.slice(0, 30).map(fund => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        ) : (
          <Card className="my-8">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No funds found</h3>
              <p className="mb-6 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Screener;
