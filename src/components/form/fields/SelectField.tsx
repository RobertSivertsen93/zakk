
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
}

export const SelectField = ({ 
  field, 
  onChange 
}: SelectFieldProps) => {
  return (
    <Select 
      value={field.value} 
      onValueChange={onChange}
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
