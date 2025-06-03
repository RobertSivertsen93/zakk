
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineItem } from './types';
import { toast } from "@/lib/toast";
import BulkCalculationsHeader from './BulkCalculationsHeader';
import ValueAdjustments from './ValueAdjustments';
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

  if (selectedItems.length === 0) {
    return null;
  }

  const handleAdjustment = () => {
    setShowConfirmDialog(true);
  };

  const executeOperation = () => {
    const updatedItems = selectedItems.map(item => {
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
    });

    onUpdateItems(updatedItems);
    setShowConfirmDialog(false);
    
    toast.success(`Bulk adjustment applied to ${selectedItems.length} items`);
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

      {/* Confirmation Dialog */}
      <BulkOperationConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={executeOperation}
        selectedItemsCount={selectedItems.length}
        operationType="adjustment"
        adjustmentData={{
          type: adjustmentType,
          value: adjustmentValue,
          field: adjustmentField
        }}
      />
    </div>
  );
};

export default BulkCalculations;
