
import { useState, useEffect } from "react";
import { FundCard } from "@/components/fund-card";
import { mockFunds, filterFunds, getAllAMCs } from "@/lib/mock-data";
import { FundData, FundCategory, FundFilters } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X, ArrowRight, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScreenCard } from "@/components/screen-card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

const Screener = () => {
  const [filteredFunds, setFilteredFunds] = useState<FundData[]>(mockFunds);
  const [amcs, setAMCs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FundFilters>({});
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();
  
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

  const popularScreens = [
    {
      id: "tax-savers",
      title: "Tax Savers",
      icon: "🟩",
      description: "Funds that help you save tax and build wealth at the same time.",
      criteria: ["Equity Linked Savings Scheme (ELSS)", "Alpha"],
      users: "362K+",
      filters: { category: "Equity", subCategory: "ELSS" }
    },
    {
      id: "long-term-compounders",
      title: "Long Term Compounders",
      icon: "🔴",
      description: "Funds with a long history of outperformance & a large cap bias",
      criteria: ["CAGR 5Y", "Time since inception"],
      users: "566K+",
      filters: { minReturn5Y: 12 }
    },
    {
      id: "bolder-bets",
      title: "Bolder Bets",
      icon: "🟦",
      description: "Funds with bold multicap strategies giving better returns than their peers.",
      criteria: ["3Y Average Rolling Return", "Return vs Sub-Category"],
      users: "91K+",
      filters: { category: "Equity", minReturn3Y: 15 }
    }
  ];

  const equityScreens = [
    {
      id: "efficient-equity",
      title: "Efficient Equity Picks",
      icon: "📊",
      description: "Funds with low expense ratios & healthy risk adjusted returns",
      criteria: ["Alpha", "Sharpe Ratio"],
      users: "239K+",
      filters: { category: "Equity", maxExpenseRatio: 1.0 }
    },
    {
      id: "value-picks",
      title: "Value Picks",
      icon: "💰",
      description: "Funds available at a better valuation than their category average & peers.",
      criteria: ["PE Ratio", "Sortino Ratio"],
      users: "287K+",
      filters: { category: "Equity", subCategory: "Value" }
    },
    {
      id: "consistent-performers",
      title: "Consistent Out-performers",
      icon: "🏆",
      description: "Funds with long term outperformance & low volatility",
      criteria: ["Return vs Sub-Category", "5Y", "Volatility"],
      users: "84.6K+",
      filters: { minReturn5Y: 10, minReturn3Y: 12, minReturn1Y: 15 }
    }
  ];
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Fund Screener</h1>
        <p className="text-muted-foreground">
          Filter and find the perfect mutual funds based on your investment criteria.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative w-full">
          <div 
            className="relative flex items-center rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text"
            onClick={() => setCommandOpen(true)}  
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <span className="text-muted-foreground">Search funds or use filters...</span>
          </div>
          
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Search funds by name, AMC, or category..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Recent Searches">
                {mockFunds.slice(0, 5).map(fund => (
                  <CommandItem 
                    key={fund.id} 
                    onSelect={() => {
                      navigate(`/fund/${fund.id}`);
                      setCommandOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span>{fund.scheme_name}</span>
                      <span className="text-xs text-muted-foreground">{fund.amc} • {fund.category}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Categories">
                {categories.map(category => (
                  <CommandItem 
                    key={category}
                    onSelect={() => {
                      updateFilter("category", category);
                      setCommandOpen(false);
                      applyFilters();
                    }}
                  >
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
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
                    value={filters.category || "all_categories"}
                    onValueChange={(value) => 
                      updateFilter("category", value === "all_categories" ? undefined : value as FundCategory)
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_categories">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="amc">AMC</Label>
                  <Select
                    value={filters.amc || "all_amcs"}
                    onValueChange={(value) => 
                      updateFilter("amc", value === "all_amcs" ? undefined : value)
                    }
                  >
                    <SelectTrigger id="amc">
                      <SelectValue placeholder="All AMCs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_amcs">All AMCs</SelectItem>
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
                    value={filters.aumCategory || "all_aum_categories"}
                    onValueChange={(value) => 
                      updateFilter("aumCategory", value === "all_aum_categories" ? undefined : value)
                    }
                  >
                    <SelectTrigger id="aumCategory">
                      <SelectValue placeholder="All AUM Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_aum_categories">All AUM Categories</SelectItem>
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
                  <Button onClick={() => {
                    applyFilters();
                    document.getElementById("fund-results")?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    Apply Filters
                  </Button>
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

      {/* Popular Screens Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Popular Screens</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularScreens.map(screen => (
            <ScreenCard 
              key={screen.id}
              title={screen.title}
              icon={screen.icon}
              description={screen.description}
              criteria={screen.criteria}
              usersCount={screen.users}
              onClick={() => {
                setFilters(screen.filters);
                applyFilters();
                document.getElementById("fund-results")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>

      {/* Equity Focused Screens Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Equity Focused Screens</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equityScreens.map(screen => (
            <ScreenCard 
              key={screen.id}
              title={screen.title}
              icon={screen.icon}
              description={screen.description}
              criteria={screen.criteria}
              usersCount={screen.users}
              onClick={() => {
                setFilters(screen.filters);
                applyFilters();
                document.getElementById("fund-results")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Fund Results Section */}
      <div id="fund-results" className="mb-4 text-sm text-muted-foreground">
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
  );
};

export default Screener;
