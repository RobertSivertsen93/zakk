
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
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

  // Search for HS codes based on code or description
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(commonHSCodes);
      return;
    }
    
    // In a real app, this would call an API
    const query = searchQuery.toLowerCase();
    const results = hsCodeDatabase.filter(
      item => item.code.includes(query) || 
      item.description.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  };

  const handleSelectHSCode = (code: string) => {
    onSelectHSCode(code);
    setIsSearchOpen(false);
    toast.success(`HS code ${code} selected`);
  };

  return (
    <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <PopoverTrigger className="hidden">Search</PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="font-medium">HS Code Search</div>
          <div className="flex space-x-2">
            <Input 
              placeholder="Search by code or description" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="border-t pt-2">
            <div className="text-sm font-medium mb-2">
              {searchQuery ? 'Search results' : 'Common HS codes'}
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {(searchResults.length > 0 ? searchResults : commonHSCodes).map(item => (
                <div 
                  key={item.code}
                  className="flex justify-between p-2 hover:bg-muted rounded-sm cursor-pointer"
                  onClick={() => handleSelectHSCode(item.code)}
                >
                  <span className="font-mono">{item.code}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HSCodeSearch;
