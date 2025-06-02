
import React from 'react';
import { cn } from "@/lib/utils";
import { FormFieldWrapper } from './FormFieldWrapper';
import { renderFieldInput } from './fieldRenderers';

export type FormField = {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'date' | 'select' | 'number';
  options?: string[];
  required?: boolean;
  helpText?: string;
  readOnly?: boolean;
};

type FormFieldsProps = {
  fields: FormField[];
  onFieldChange: (id: string, value: string) => void;
  className?: string;
};

export const FormFields = ({ fields, onFieldChange, className }: FormFieldsProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {fields.map((field) => (
        <FormFieldWrapper 
          key={field.id} 
          field={field} 
          onFieldChange={onFieldChange} 
        />
      ))}
    </div>
  );
};

export default FormFields;
