
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent } from 'lucide-react';
import { toast } from "@/lib/toast";

interface ValueAdjustmentsProps {
  adjustmentType: 'percentage' | 'fixed';
  adjustmentValue: string;
  adjustmentField: 'amount' | 'weight' | 'quantity';
  onAdjustmentTypeChange: (value: 'percentage' | 'fixed') => void;
  onAdjustmentValueChange: (value: string) => void;
  onAdjustmentFieldChange: (value: 'amount' | 'weight' | 'quantity') => void;
  onApplyAdjustment: () => void;
}

const ValueAdjustments: React.FC<ValueAdjustmentsProps> = ({
  adjustmentType,
  adjustmentValue,
  adjustmentField,
  onAdjustmentTypeChange,
  onAdjustmentValueChange,
  onAdjustmentFieldChange,
  onApplyAdjustment
}) => {
  // Input validation and sanitization
  const validateAndSanitizeValue = (input: string): string => {
    // Remove any non-numeric characters except decimal point and minus sign
    const sanitized = input.replace(/[^0-9.-]/g, '');
    
    // Ensure only one decimal point
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Limit total length
    return sanitized.substring(0, 15);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = validateAndSanitizeValue(e.target.value);
    onAdjustmentValueChange(sanitizedValue);
  };

  const handleAdjustment = () => {
    if (!adjustmentValue) {
      toast.error('Please enter an adjustment value');
      return;
    }

    const value = parseFloat(adjustmentValue);
    if (isNaN(value)) {
      toast.error('Please enter a valid number');
      return;
    }

    // Additional validation based on adjustment type
    if (adjustmentType === 'percentage') {
      if (value < -100 || value > 1000) {
        toast.error('Percentage adjustment must be between -100% and 1000%');
        return;
      }
    } else {
      // For fixed values, set reasonable limits
      if (Math.abs(value) > 1000000) {
        toast.error('Fixed adjustment value is too large');
        return;
      }
    }

    onApplyAdjustment();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <Percent className="h-4 w-4" />
        Value Adjustments
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Field to Adjust</Label>
          <Select value={adjustmentField} onValueChange={onAdjustmentFieldChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Adjustment Type</Label>
          <Select value={adjustmentType} onValueChange={onAdjustmentTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Value {adjustmentType === 'percentage' ? '(%)' : '(Fixed)'}
          </Label>
          <Input
            type="text"
            value={adjustmentValue}
            onChange={handleValueChange}
            placeholder={adjustmentType === 'percentage' ? "10" : "100"}
            maxLength={15}
          />
        </div>
      </div>
      
      <Button onClick={handleAdjustment} className="w-full md:w-auto">
        Apply Adjustment
      </Button>
    </div>
  );
};

export default ValueAdjustments;
