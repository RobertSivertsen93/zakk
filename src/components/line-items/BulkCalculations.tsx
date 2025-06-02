
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Percent, AlertTriangle } from 'lucide-react';
import { LineItem } from './types';
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CurrencyConverter from './CurrencyConverter';

interface BulkCalculationsProps {
  selectedItems: LineItem[];
  onUpdateItems: (updatedItems: LineItem[]) => void;
}

const BulkCalculations: React.FC<BulkCalculationsProps> = ({ selectedItems, onUpdateItems }) => {
  const [adjustmentType, setAdjustmentType] = useState<'percentage' | 'fixed'>('percentage');
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [adjustmentField, setAdjustmentField] = useState<'amount' | 'weight' | 'quantity'>('amount');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<string>('');
  const [pendingConversionData, setPendingConversionData] = useState<{
    rate: number;
    fromCurrency: string;
    toCurrency: string;
  } | null>(null);

  if (selectedItems.length === 0) {
    return null;
  }

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

    setPendingOperation('adjustment');
    setShowConfirmDialog(true);
  };

  const handleCurrencyConversion = (rate: number, fromCurrency: string, toCurrency: string) => {
    setPendingConversionData({ rate, fromCurrency, toCurrency });
    setPendingOperation('conversion');
    setShowConfirmDialog(true);
  };

  const executeOperation = () => {
    const updatedItems = selectedItems.map(item => {
      if (pendingOperation === 'adjustment') {
        const value = parseFloat(adjustmentValue);
        const currentValue = parseFloat(item[adjustmentField]) || 0;
        
        let newValue: number;
        if (adjustmentType === 'percentage') {
          newValue = currentValue * (1 + value / 100);
        } else {
          newValue = currentValue + value;
        }

        return {
          ...item,
          [adjustmentField]: newValue.toFixed(2).toString()
        };
      } else if (pendingOperation === 'conversion' && pendingConversionData) {
        const { rate } = pendingConversionData;
        const currentAmount = parseFloat(item.amount) || 0;
        const newAmount = currentAmount * rate;

        return {
          ...item,
          amount: newAmount.toFixed(2).toString()
        };
      }
      return item;
    });

    onUpdateItems(updatedItems);
    setShowConfirmDialog(false);
    setPendingConversionData(null);
    
    if (pendingOperation === 'adjustment') {
      toast.success(`Bulk adjustment applied to ${selectedItems.length} items`);
    } else if (pendingOperation === 'conversion' && pendingConversionData) {
      toast.success(`Currency converted from ${pendingConversionData.fromCurrency} to ${pendingConversionData.toCurrency} for ${selectedItems.length} items`);
    }
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Value Adjustments */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5" />
            Bulk Calculations ({selectedItems.length} items selected)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Value Adjustments
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Field to Adjust</Label>
                <Select value={adjustmentField} onValueChange={(value: any) => setAdjustmentField(value)}>
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
                <Select value={adjustmentType} onValueChange={(value: any) => setAdjustmentType(value)}>
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
                  onChange={(e) => setAdjustmentValue(e.target.value)}
                  placeholder={adjustmentType === 'percentage' ? "10" : "100"}
                />
              </div>
            </div>
            
            <Button onClick={handleAdjustment} className="w-full md:w-auto">
              Apply Adjustment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Currency Conversion */}
      <CurrencyConverter
        onConvert={handleCurrencyConversion}
        selectedItemsCount={selectedItems.length}
      />

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Confirm Bulk Operation
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>
              This operation will modify {selectedItems.length} selected items. 
              {pendingOperation === 'adjustment' && (
                <span className="block mt-2">
                  Applying {adjustmentType === 'percentage' ? `${adjustmentValue}%` : adjustmentValue} 
                  {adjustmentType === 'percentage' ? ' percentage change' : ' fixed adjustment'} to {adjustmentField}.
                </span>
              )}
              {pendingOperation === 'conversion' && pendingConversionData && (
                <span className="block mt-2">
                  Converting amounts from {pendingConversionData.fromCurrency} to {pendingConversionData.toCurrency} 
                  using rate: {pendingConversionData.rate.toFixed(4)}
                </span>
              )}
            </p>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button onClick={executeOperation}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkCalculations;
