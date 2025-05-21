
import React from 'react';
import { Check, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

// Mock HS code database for validation
export const hsCodeDatabase = [
  { code: '6117.80.80', description: 'Textile accessories', valid: true },
  { code: '6117.80.90', description: 'Other made up textile articles', valid: true },
  { code: '4908.90.00', description: 'Transfers (decalcomanias)', valid: true },
  { code: '4901.99.00', description: 'Printed books, brochures and similar', valid: true },
  { code: '8471.30.00', description: 'Laptop computers', valid: true },
  { code: '8523.49.25', description: 'Optical media for data storage', valid: true },
  { code: '9403.20.80', description: 'Metal furniture components', valid: true },
  { code: '9999.99.99', description: 'Not classified', valid: false },
  { code: '6117.80.85', description: 'Textile accessories - special type', valid: true },
  { code: '70071980', description: 'Safety glass', valid: true },
  { code: '84439990', description: 'Parts of printing machinery', valid: true },
];

export interface ValidationResult {
  valid: boolean;
  message: string;
  description?: string;
}

interface HSCodeValidatorProps {
  value: string;
}

export const validateHSCode = (code: string): ValidationResult => {
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

const HSCodeValidator: React.FC<HSCodeValidatorProps> = ({ value }) => {
  if (!value) return null;
  
  const validation = validateHSCode(value);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center cursor-help">
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
  );
};

export default HSCodeValidator;
