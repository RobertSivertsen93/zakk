
import React from 'react';
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, ChevronDown, HelpCircle, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export type FormField = {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'date' | 'select' | 'number';
  options?: string[];
  required?: boolean;
  helpText?: string;
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

const FormFieldWrapper = ({ 
  field, 
  onFieldChange 
}: { 
  field: FormField; 
  onFieldChange: (id: string, value: string) => void;
}) => {
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

const renderFieldInput = (
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

const DatePicker = ({ 
  field, 
  onChange 
}: { 
  field: FormField; 
  onChange: (value: string) => void;
}) => {
  const [date, setDate] = React.useState<Date | undefined>(
    field.value ? new Date(field.value) : undefined
  );
  
  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
    } else {
      onChange('');
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

const SelectField = ({ 
  field, 
  onChange 
}: { 
  field: FormField; 
  onChange: (value: string) => void;
}) => {
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

// Main invoice form fields component for the PDF extraction app
export const InvoiceFormFields = ({ 
  initialData = {}, 
  showLineItems = true 
}: { 
  initialData?: Record<string, string>;
  showLineItems?: boolean; 
}) => {
  const [formData, setFormData] = React.useState<Record<string, FormField>>({
    invoiceNumber: {
      id: 'invoiceNumber',
      label: 'Fakturanummar',
      value: initialData.invoiceNumber || '',
      type: 'text',
      required: true,
      helpText: 'The unique identifier for this invoice'
    },
    invoiceDate: {
      id: 'invoiceDate',
      label: 'Fakturadagur',
      value: initialData.invoiceDate || '',
      type: 'date',
      required: true,
      helpText: 'Date when the invoice was issued'
    },
    dueDate: {
      id: 'dueDate',
      label: 'Útrokningardagur',
      value: initialData.dueDate || '',
      type: 'date',
      required: true,
      helpText: 'Date when payment is due'
    },
    sender: {
      id: 'sender',
      label: 'Avsendari',
      value: initialData.sender || '',
      type: 'text',
      required: true,
      helpText: 'The entity that issued the invoice'
    },
    documentNumber: {
      id: 'documentNumber',
      label: 'Skjalanummar',
      value: initialData.documentNumber || '',
      type: 'text',
      helpText: 'Reference document number'
    },
    paymentMethod: {
      id: 'paymentMethod',
      label: 'Gjaldoyra',
      value: initialData.paymentMethod || '',
      type: 'select',
      options: ['Vel gjaldoyra', 'EUR', 'USD', 'GBP', 'DKK', 'NOK', 'SEK'],
      helpText: 'Currency for this invoice'
    },
    notes: {
      id: 'notes',
      label: 'Viðmerking',
      value: initialData.notes || '',
      type: 'text',
      helpText: 'Additional notes or comments'
    },
    // Line item fields are included but will be filtered out if showLineItems is false
    productNumber: {
      id: 'productNumber',
      label: 'Vørunummar',
      value: initialData.productNumber || '',
      type: 'text',
      helpText: 'Product reference number'
    },
    countryOfOrigin: {
      id: 'countryOfOrigin',
      label: 'Upprunaland',
      value: initialData.countryOfOrigin || '',
      type: 'text',
      helpText: 'Country where the product originates'
    },
    quantity: {
      id: 'quantity',
      label: 'Tal á eindum',
      value: initialData.quantity || '',
      type: 'number',
      helpText: 'Number of units'
    },
    unitPrice: {
      id: 'unitPrice',
      label: 'Nettovekt',
      value: initialData.unitPrice || '',
      type: 'number',
      helpText: 'Net weight per unit'
    },
    amount: {
      id: 'amount',
      label: 'Upphædd',
      value: initialData.amount || '',
      type: 'number',
      helpText: 'Total amount'
    },
  });

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        value
      }
    }));
  };

  // Split fields into invoice info (first 7) and line items (rest)
  const invoiceInfoFields = Object.values(formData).slice(0, 7);
  const lineItemFields = Object.values(formData).slice(7);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <FormFields 
          fields={invoiceInfoFields} 
          onFieldChange={handleFieldChange}
        />
      </div>
      
      {showLineItems && (
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-medium border-b pb-2">Line Items</h3>
          <FormFields 
            fields={lineItemFields} 
            onFieldChange={handleFieldChange}
          />
        </div>
      )}
    </div>
  );
};

export default FormFields;
