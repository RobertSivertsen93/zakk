
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from '../FormFields';

interface SelectFieldProps {
  field: FormField;
  onChange: (value: string) => void;
  disabled?: boolean; // Added disabled prop
}

export const SelectField = ({ 
  field, 
  onChange,
  disabled = false
}: SelectFieldProps) => {
  return (
    <Select 
      value={field.value} 
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${field.label}`} />
      </SelectTrigger>
      <SelectContent>
        {field.options?.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
