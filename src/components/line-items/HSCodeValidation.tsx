
import React, { useState } from 'react';
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
  const handleSelectHSCode = (code: string) => {
    onChange(code);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter HS code"
            className="pr-8" // Make space for the validator icon
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {value && <HSCodeValidator value={value} />}
          </div>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HSCodeSearch onSelectHSCode={handleSelectHSCode} />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Search HS codes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {alternativeCodes && alternativeCodes.length > 0 && (
        <AlternativeHSCodes 
          alternativeCodes={alternativeCodes} 
          onSelectCode={handleSelectHSCode}
        />
      )}
    </div>
  );
};

export default HSCodeValidation;
