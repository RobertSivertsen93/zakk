
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import HSCodeSearch from './HSCodeSearch';
import HSCodeValidator from './HSCodeValidator';
import AlternativeHSCodes from './AlternativeHSCodes';

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
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleSelectHSCode = (code: string) => {
    onChange(code);
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
                onClick={handleOpenSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Search HS codes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {value && <HSCodeValidator value={value} />}
        
        <HSCodeSearch 
          onSelectHSCode={handleSelectHSCode} 
        />
      </div>

      <AlternativeHSCodes 
        alternativeCodes={alternativeCodes} 
        onSelectCode={handleSelectHSCode}
      />
    </div>
  );
};

export default HSCodeValidation;
