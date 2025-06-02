
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from 'lucide-react';

interface BulkOperationConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedItemsCount: number;
  operationType: 'adjustment' | 'conversion' | '';
  adjustmentData?: {
    type: 'percentage' | 'fixed';
    value: string;
    field: 'amount' | 'weight' | 'quantity';
  };
  conversionData?: {
    rate: number;
    fromCurrency: string;
    toCurrency: string;
  };
}

const BulkOperationConfirmDialog: React.FC<BulkOperationConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedItemsCount,
  operationType,
  adjustmentData,
  conversionData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Confirm Bulk Operation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p>
            This operation will modify {selectedItemsCount} selected items. 
            {operationType === 'adjustment' && adjustmentData && (
              <span className="block mt-2">
                Applying {adjustmentData.type === 'percentage' ? `${adjustmentData.value}%` : adjustmentData.value} 
                {adjustmentData.type === 'percentage' ? ' percentage change' : ' fixed adjustment'} to {adjustmentData.field}.
              </span>
            )}
            {operationType === 'conversion' && conversionData && (
              <span className="block mt-2">
                Converting amounts from {conversionData.fromCurrency} to {conversionData.toCurrency} 
                using rate: {conversionData.rate.toFixed(4)}
              </span>
            )}
          </p>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkOperationConfirmDialog;
