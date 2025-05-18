
import React, { useState } from 'react';
import { Search, X, AlertTriangle, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
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

interface HSCodeValidationProps {
  value: string;
  onChange: (value: string) => void;
  alternativeCodes?: string[];
}

const HSCodeValidation: React.FC<HSCodeValidationProps> = ({
  value,
  onChange,
  alternativeCodes = []
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof commonHSCodes>([]);

  // Validate the HS code against our mock database
  const validateHSCode = (code: string) => {
    const result = hsCodeDatabase.find(item => item.code === code);
    
    if (!result) {
      return { valid: false, message: 'Unknown HS code' };
    }
    
    return { 
      valid: result.valid, 
      message: result.valid ? 'Valid HS code' : 'This code may be incorrect',
      description: result.description
    };
  };

  const validation = validateHSCode(value);
  
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
    onChange(code);
    setIsSearchOpen(false);
    toast.success(`HS code ${code} selected`);
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter HS code"
          className="flex-grow"
        />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-1"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Search HS codes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {value && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-2 flex items-center">
                  {validation.valid ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{validation.message}</p>
                {validation.description && <p className="text-xs text-muted-foreground">{validation.description}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-1"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-sm">
              <div className="space-y-2 p-1">
                <p className="font-medium">HS Code Format</p>
                <p className="text-xs">Format: XX.XX.XX or XXXX.XX.XX</p>
                <p className="text-xs">HS codes are internationally standardized 6-digit codes. Countries may add additional digits for more specific classifications.</p>
                <p className="text-xs font-medium mt-2">Tariffs and Import Duties</p>
                <p className="text-xs">The correct HS code determines applicable taxes and duties on imports.</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {alternativeCodes && alternativeCodes.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {alternativeCodes.map(code => (
            <Button
              key={code}
              variant="outline"
              size="sm"
              className="text-xs h-6 bg-muted/40"
              onClick={() => onChange(code)}
            >
              {code}
            </Button>
          ))}
        </div>
      )}

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
    </div>
  );
};

export default HSCodeValidation;
