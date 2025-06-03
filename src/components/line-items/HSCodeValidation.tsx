
import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
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
  // Input sanitization for HS codes
  const sanitizeHSCode = (input: string): string => {
    // Remove any non-alphanumeric characters except dots and spaces
    const sanitized = input.replace(/[^a-zA-Z0-9.\s]/g, '');
    // Limit length to prevent excessive input
    return sanitized.substring(0, 20);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeHSCode(e.target.value);
    onChange(sanitizedValue);
  };

  const handleSelectHSCode = (code: string) => {
    const sanitizedCode = sanitizeHSCode(code);
    onChange(sanitizedCode);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Enter HS code"
          className="pr-8" // Make space for the validator icon
          maxLength={20} // HTML validation as backup
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          {value && <HSCodeValidator value={value} />}
        </div>
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
