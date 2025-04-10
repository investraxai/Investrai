
import { useState } from "react";
import { X } from "lucide-react";
import { FundData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FundSelectorProps {
  funds: FundData[];
  onSelect: (fund: FundData) => void;
  buttonLabel: string;
}

export function FundSelector({ funds, onSelect, buttonLabel }: FundSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {buttonLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search funds..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No funds found.</CommandEmpty>
            <CommandGroup>
              {funds.map((fund) => (
                <CommandItem
                  key={fund.id}
                  onSelect={() => {
                    onSelect(fund);
                    setOpen(false);
                    setSearchValue("");
                  }}
                >
                  <div className="flex flex-col">
                    <span>{fund.scheme_name}</span>
                    <span className="text-xs text-muted-foreground">{fund.amc}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function FundSelectedBadge({ fund, onRemove }: { fund: FundData; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background p-2 text-sm">
      <span className="mr-1 font-medium">{fund.scheme_name}</span>
      <button onClick={onRemove} className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
