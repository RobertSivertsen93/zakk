
import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { toast } from "@/lib/toast";

// Mock HS code database for validation
const hsCodeDatabase = [
  { code: '6117.80.80', description: 'Textile accessories', valid: true },
  { code: '6117.80.90', description: 'Other made up textile articles', valid: true },
  { code: '4908.90.00', description: 'Transfers (decalcomanias)', valid: true },
  { code: '4901.99.00', description: 'Printed books, brochures and similar', valid: true },
  { code: '9999.99.99', description: 'Not classified', valid: false },
];

// Common HS codes for quick selection
const commonHSCodes = [
  { code: '6117.80.80', description: 'Textile accessories' },
  { code: '4901.99.00', description: 'Printed books' },
  { code: '8471.30.00', description: 'Laptops/computers' },
  { code: '8517.12.00', description: 'Mobile phones' },
  { code: '9403.30.00', description: 'Wooden office furniture' },
];

interface HSCodeSearchProps {
  onSelectHSCode: (code: string) => void;
}

const HSCodeSearch: React.FC<HSCodeSearchProps> = ({ onSelectHSCode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof commonHSCodes>([]);

  useEffect(() => {
    if (isSearchOpen) {
      setSearchResults(commonHSCodes);
    }
  }, [isSearchOpen]);

  // Search for HS codes based on code or description
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(commonHSCodes);
      return;
    }
    
    // In a real app, this would call an API
    const q = query.toLowerCase();
    const results = hsCodeDatabase.filter(
      item => item.code.includes(q) || 
      item.description.toLowerCase().includes(q)
    );
    
    setSearchResults(results);
  };

  const handleSelectHSCode = (code: string, description: string) => {
    onSelectHSCode(code);
    setIsSearchOpen(false);
    toast.success(`HS code ${code} selected`);
  };

  return (
    <>
      <Button 
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(true)}
        className="ml-1"
        title="Search HS codes"
      >
        <Search className="h-4 w-4" />
      </Button>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>HS Code Search</DialogTitle>
          </DialogHeader>
          
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Search by code or description" 
              value={searchQuery}
              onValueChange={handleSearch}
            />
            <CommandList>
              <CommandGroup heading={searchQuery ? "Search results" : "Common HS codes"}>
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <CommandItem
                      key={item.code}
                      onSelect={() => handleSelectHSCode(item.code, item.description)}
                      className="flex justify-between"
                    >
                      <span className="font-mono">{item.code}</span>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>No results found</CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HSCodeSearch;
