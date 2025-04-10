import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Check, Filter, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { FundCard } from "@/components/fund-card";
import { ScreenCard } from "@/components/screen-card";
import { FundCategory, FundFilters } from "@/lib/types";
import { filterFunds, getAllAMCs } from "@/lib/mock-data";

export default function Screener() {
  // State for filters
  const [filters, setFilters] = useState<FundFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch funds data
  const { data: funds, isLoading, error } = useQuery({
    queryKey: ["funds", filters],
    queryFn: async () => {
      // Filter the mock data with the current filters
      return filterFunds({ ...filters, searchQuery });
    },
  });

  // Fetch AMCs for filter dropdown
  const { data: amcs } = useQuery({
    queryKey: ["amcs"],
    queryFn: async () => {
      return getAllAMCs();
    },
  });

  // Handler to apply filters
  const applyFilters = (newFilters: FundFilters) => {
    setFilters({ ...filters, ...newFilters });
    setIsFiltersOpen(false);
  };

  // Handler to clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  // Check if any filters are applied
  const hasFilters = Object.keys(filters).length > 0 || searchQuery;

  // Predefined screens for quick selection
  const popularScreens = [
    {
      title: "Top Performing Equity",
      description: "Equity funds with over 15% 1Y returns",
      filters: {
        category: "Equity" as FundCategory,
        minReturn1Y: 15,
      },
      icon: "📈",
      criteria: ["Equity", "1Y Returns > 15%", "All AMCs"],
      usersCount: "3.2K"
    },
    {
      title: "Low Cost Debt Funds",
      description: "Debt funds with expense ratio under 0.5%",
      filters: {
        category: "Debt" as FundCategory,
        maxExpenseRatio: 0.5,
      },
      icon: "💰",
      criteria: ["Debt", "Expense Ratio < 0.5%", "All AMCs"],
      usersCount: "1.5K"
    },
    {
      title: "Large Cap Funds",
      description: "Equity large cap funds for stable growth",
      filters: {
        category: "Equity" as FundCategory,
        subCategory: "Large Cap",
      },
      icon: "🏢",
      criteria: ["Equity", "Large Cap", "All AMCs"],
      usersCount: "4.7K"
    },
    {
      title: "Long-term Performers",
      description: "Funds with 5Y returns above 12%",
      filters: {
        minReturn5Y: 12,
      },
      icon: "🌟",
      criteria: ["5Y Returns > 12%", "All Categories", "All AMCs"],
      usersCount: "2.8K"
    },
  ];
  
  const equityScreens = [
    {
      title: "Multi Cap Funds",
      description: "Diversified across market caps",
      filters: {
        category: "Equity" as FundCategory,
        subCategory: "Multi Cap",
      },
      icon: "🔄",
      criteria: ["Equity", "Multi Cap", "All AMCs"],
      usersCount: "1.9K"
    },
    {
      title: "Small Cap High Growth",
      description: "Small cap funds with high growth potential",
      filters: {
        category: "Equity" as FundCategory,
        subCategory: "Small Cap",
      },
      icon: "🚀",
      criteria: ["Equity", "Small Cap", "All AMCs"],
      usersCount: "2.1K"
    },
    {
      title: "ELSS Tax Savers",
      description: "Tax-saving equity funds under Sec 80C",
      filters: {
        category: "Equity" as FundCategory,
        subCategory: "ELSS",
      },
      icon: "🧾",
      criteria: ["Equity", "ELSS", "Tax Saving", "Sec 80C"],
      usersCount: "3.8K"
    },
    {
      title: "3Y Strong Performers",
      description: "Equity funds with 3Y returns over 12%",
      filters: {
        category: "Equity" as FundCategory,
        minReturn3Y: 12,
      },
      icon: "📊",
      criteria: ["Equity", "3Y Returns > 12%", "All AMCs"],
      usersCount: "2.3K"
    },
  ];

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Fund Screener</h1>
        <p className="text-muted-foreground">
          Find and filter mutual funds based on your investment criteria
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 flex flex-wrap gap-3">
        {/* Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search Funds</DialogTitle>
              <DialogDescription>
                Search by fund name or AMC
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  placeholder="Enter fund name or AMC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                type="submit"
                onClick={() => {
                  setFilters({ ...filters, searchQuery });
                  setIsSearchOpen(false);
                }}
              >
                Search
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Filter Sheet */}
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {hasFilters && (
                <Badge variant="secondary" className="ml-2">
                  {Object.keys(filters).length + (searchQuery ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Funds</SheetTitle>
              <SheetDescription>
                Narrow down funds based on your criteria
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Fund Category</h3>
                <Select 
                  onValueChange={(value) => 
                    applyFilters({ category: value as FundCategory })
                  }
                  value={filters.category || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_categories">All Categories</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Debt">Debt</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Solution Oriented">Solution Oriented</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {filters.category && (
                  <div className="pt-2">
                    <Button variant="ghost" size="sm" onClick={() => 
                      setFilters({ ...filters, category: undefined })
                    }>
                      Clear Category
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Asset Management Company</h3>
                <Select 
                  onValueChange={(value) => 
                    applyFilters({ amc: value === "all_amcs" ? undefined : value })
                  }
                  value={filters.amc || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select AMC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_amcs">All AMCs</SelectItem>
                    {amcs?.map((amc) => (
                      <SelectItem key={amc} value={amc}>
                        {amc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {filters.amc && (
                  <div className="pt-2">
                    <Button variant="ghost" size="sm" onClick={() => 
                      setFilters({ ...filters, amc: undefined })
                    }>
                      Clear AMC
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">1Y Returns</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[filters.minReturn1Y || 0]}
                    min={-20}
                    max={50}
                    step={1}
                    onValueChange={(values) => {
                      if (values[0] <= -20) {
                        setFilters({ ...filters, minReturn1Y: undefined });
                      } else {
                        setFilters({ ...filters, minReturn1Y: values[0] });
                      }
                    }}
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div>Min: {filters.minReturn1Y !== undefined ? `${filters.minReturn1Y}%` : "Any"}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({ ...filters, minReturn1Y: undefined })}
                      disabled={filters.minReturn1Y === undefined}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">3Y Returns</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[filters.minReturn3Y || 0]}
                    min={-10}
                    max={30}
                    step={1}
                    onValueChange={(values) => {
                      if (values[0] <= -10) {
                        setFilters({ ...filters, minReturn3Y: undefined });
                      } else {
                        setFilters({ ...filters, minReturn3Y: values[0] });
                      }
                    }}
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div>Min: {filters.minReturn3Y !== undefined ? `${filters.minReturn3Y}%` : "Any"}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({ ...filters, minReturn3Y: undefined })}
                      disabled={filters.minReturn3Y === undefined}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Expense Ratio</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[filters.maxExpenseRatio || 2.5]}
                    min={0.1}
                    max={2.5}
                    step={0.1}
                    onValueChange={(values) => {
                      if (values[0] >= 2.5) {
                        setFilters({ ...filters, maxExpenseRatio: undefined });
                      } else {
                        setFilters({ ...filters, maxExpenseRatio: values[0] });
                      }
                    }}
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div>Max: {filters.maxExpenseRatio !== undefined ? `${filters.maxExpenseRatio}%` : "Any"}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({ ...filters, maxExpenseRatio: undefined })}
                      disabled={filters.maxExpenseRatio === undefined}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Clear filters button */}
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="ml-auto">
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Quick Access Predefined Screens */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Screens</h2>
          <Button variant="link" size="sm" className="flex items-center">
            See All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {popularScreens.map((screen, index) => (
            <ScreenCard
              key={index}
              title={screen.title}
              description={screen.description}
              icon={screen.icon}
              criteria={screen.criteria}
              usersCount={screen.usersCount}
              onClick={() => setFilters(screen.filters)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Equity Focused Screens</h2>
          <Button variant="link" size="sm" className="flex items-center">
            See All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {equityScreens.map((screen, index) => (
            <ScreenCard
              key={index}
              title={screen.title}
              description={screen.description}
              icon={screen.icon}
              criteria={screen.criteria}
              usersCount={screen.usersCount}
              onClick={() => setFilters(screen.filters)}
            />
          ))}
        </div>
      </div>

      {/* Fund Results */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Fund Results</h2>
          {funds && (
            <span className="text-sm text-muted-foreground">
              {funds.length} funds found
            </span>
          )}
        </div>

        {/* Show error message if there's an error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load funds. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Show loading state if loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading funds...</p>
          </div>
        )}

        {/* Show funds grid */}
        {funds && funds.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {funds.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        )}

        {/* Show no results message */}
        {funds && funds.length === 0 && (
          <div className="text-center py-8 border rounded-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No funds found</h3>
            <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-sm mx-auto">
              Try adjusting your filters or search query to see more results.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
