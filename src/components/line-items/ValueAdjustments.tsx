
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
            type="number"
            step="0.01"
            value={adjustmentValue}
            onChange={(e) => onAdjustmentValueChange(e.target.value)}
            placeholder={adjustmentType === 'percentage' ? "10" : "100"}
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
