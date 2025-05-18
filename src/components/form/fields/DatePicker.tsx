
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormField } from '../FormFields';

interface DatePickerProps {
  field: FormField;
  onChange: (value: string) => void;
  disabled?: boolean; // Added disabled prop
}

export const DatePicker = ({ 
  field, 
  onChange,
  disabled = false
}: DatePickerProps) => {
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
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
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
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};
