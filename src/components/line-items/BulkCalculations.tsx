
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineItem } from './types';
import { toast } from "@/lib/toast";
import BulkCalculationsHeader from './BulkCalculationsHeader';
import ValueAdjustments from './ValueAdjustments';
import CurrencyConverter from './CurrencyConverter';
import BulkOperationConfirmDialog from './BulkOperationConfirmDialog';

interface BulkCalculationsProps {
  selectedItems: LineItem[];
  onUpdateItems: (updatedItems: LineItem[]) => void;
}

const BulkCalculations: React.FC<BulkCalculationsProps> = ({ selectedItems, onUpdateItems }) => {
  const [adjustmentType, setAdjustmentType] = useState<'percentage' | 'fixed'>('percentage');
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [adjustmentField, setAdjustmentField] = useState<'amount' | 'weight' | 'quantity'>('amount');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<'adjustment' | 'conversion' | ''>('');
  const [pendingConversionData, setPendingConversionData] = useState<{
    rate: number;
    fromCurrency: string;
    toCurrency: string;
  } | null>(null);

  if (selectedItems.length === 0) {
    return null;
  }

  const handleAdjustment = () => {
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
        <BulkCalculationsHeader selectedItemsCount={selectedItems.length} />
        <CardContent className="space-y-6">
          <ValueAdjustments
            adjustmentType={adjustmentType}
            adjustmentValue={adjustmentValue}
            adjustmentField={adjustmentField}
            onAdjustmentTypeChange={setAdjustmentType}
            onAdjustmentValueChange={setAdjustmentValue}
            onAdjustmentFieldChange={setAdjustmentField}
            onApplyAdjustment={handleAdjustment}
          />
        </CardContent>
      </Card>

      {/* Currency Conversion */}
      <CurrencyConverter
        onConvert={handleCurrencyConversion}
        selectedItemsCount={selectedItems.length}
      />

      {/* Confirmation Dialog */}
      <BulkOperationConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={executeOperation}
        selectedItemsCount={selectedItems.length}
        operationType={pendingOperation}
        adjustmentData={{
          type: adjustmentType,
          value: adjustmentValue,
          field: adjustmentField
        }}
        conversionData={pendingConversionData}
      />
    </div>
  );
};

export default BulkCalculations;
