
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormField } from './FormFields';
import { renderFieldInput } from './fieldRenderers';

interface FormFieldWrapperProps {
  field: FormField;
  onFieldChange: (id: string, value: string) => void;
}

export const FormFieldWrapper = ({ 
  field, 
  onFieldChange 
}: FormFieldWrapperProps) => {
  const handleChange = (value: string) => {
    onFieldChange(field.id, value);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label 
            htmlFor={field.id}
            className="text-sm font-medium"
          >
            {field.label}
          </Label>
          {field.required && (
            <span className="text-destructive text-sm">*</span>
          )}
          {field.helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs p-2">
                  {field.helpText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {field.value && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => handleChange('')}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      
      {renderFieldInput(field, handleChange)}
    </div>
  );
};
