
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormField } from './FormFields';
import { DatePicker } from './fields/DatePicker';
import { SelectField } from './fields/SelectField';

export const renderFieldInput = (
  field: FormField, 
  onChange: (value: string) => void
) => {
  switch (field.type) {
    case 'date':
      return <DatePicker field={field} onChange={onChange} />;
    case 'select':
      return <SelectField field={field} onChange={onChange} />;
    case 'number':
      return (
        <Input
          id={field.id}
          type="number"
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      );
    case 'text':
    default:
      return (
        <Input
          id={field.id}
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      );
  }
};
