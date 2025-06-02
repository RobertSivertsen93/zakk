
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useShipmentStore } from '@/stores/useShipmentStore';
import { CheckCircle, Clock } from 'lucide-react';

const BatchProgressHeader: React.FC = () => {
  const { invoices, getProcessedInvoices } = useShipmentStore();
  
  const totalInvoices = invoices.length;
  const processedInvoices = getProcessedInvoices();
  const processedCount = processedInvoices.length;
  const progressPercentage = totalInvoices > 0 ? (processedCount / totalInvoices) * 100 : 0;

  if (totalInvoices === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-secondary/20 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {progressPercentage === 100 ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-500" />
          )}
          <span className="text-sm font-medium">
            Batch Progress: {processedCount} of {totalInvoices} invoices processed
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2"
        indicatorClassName={progressPercentage === 100 ? "bg-green-500" : "bg-primary"}
      />
    </div>
  );
};

export default BatchProgressHeader;
