
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getValidationMessage } from "@/lib/validation";
import { Flag, Info, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HSCodeValidation from "../line-items/HSCodeValidation";

export interface FieldHelpText {
  tooltip: string;
  regulations?: string;
  examples?: string[];
}

export interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'date' | 'number' | 'textarea' | 'country' | 'hscode';
  required?: boolean;
  helpText?: string | FieldHelpText;
  className?: string;
  alternativeCodes?: string[];
}

export const ValidatedFormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  helpText,
  className,
  alternativeCodes
}) => {
  // Determine if we have detailed help or just a string
  const hasDetailedHelp = helpText && typeof helpText !== 'string';
  
  // Get validation message if any
  const validationMessage = getValidationMessage(id, value);
  
  // Common props for input elements
  const inputProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: "w-full",
    "aria-invalid": validationMessage ? true : undefined,
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label 
            htmlFor={id}
            className="text-sm font-medium"
          >
            {label}
            {required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </Label>
          
          {helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-2">
                  {hasDetailedHelp ? (
                    <div className="space-y-2">
                      <p className="text-sm">{(helpText as FieldHelpText).tooltip}</p>
                      
                      {(helpText as FieldHelpText).examples && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold">Examples:</p>
                          <ul className="text-xs list-disc pl-4">
                            {(helpText as FieldHelpText).examples?.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {(helpText as FieldHelpText).regulations && (
                        <div className="border-t border-border mt-1 pt-1">
                          <p className="text-xs text-muted-foreground">{(helpText as FieldHelpText).regulations}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm">{helpText as string}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      {type === 'hscode' ? (
        <HSCodeValidation 
          value={value} 
          onChange={onChange} 
          alternativeCodes={alternativeCodes} 
        />
      ) : type === 'textarea' ? (
        <Textarea {...inputProps} />
      ) : type === 'country' ? (
        <div className="relative">
          <Input {...inputProps} />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Flag className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      ) : (
        <Input 
          {...inputProps} 
          type={type === 'number' ? 'text' : type} // Use text for better control, but apply number validation
          inputMode={type === 'number' ? 'decimal' : undefined}
        />
      )}
      
      {validationMessage && (
        <Alert variant="destructive" className="py-2 px-3">
          <div className="flex">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
            <AlertDescription className="text-xs">
              {validationMessage}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default ValidatedFormField;
