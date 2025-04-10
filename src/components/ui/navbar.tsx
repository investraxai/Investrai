
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Investra</span>
            <span className="ml-1 text-xs text-muted-foreground">BETA</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link to="/screener" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Screener
          </Link>
          <Link to="/compare" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Compare Funds
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden flex-1 md:flex md:justify-center md:px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form 
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                // Navigate to search results if needed
                setSearchQuery("");
              }}
            >
              <Input
                type="search"
                placeholder="Search funds..."
                className="w-full bg-muted pl-9 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 border-b bg-white p-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search funds..."
                  className="w-full bg-muted pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link
                to="/"
                className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/screener"
                className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Screener
              </Link>
              <Link
                to="/compare"
                className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare Funds
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
