
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/stores/useShipmentStore';
import { LineItem } from '@/components/line-items/types';
import LineItemsSection from '@/components/exportComponents/LineItemsSection';

interface InvoiceApprovalLineItemsProps {
  invoice: InvoiceData;
  onComplete: () => void;
  isCompleted: boolean;
}

const InvoiceApprovalLineItems: React.FC<InvoiceApprovalLineItemsProps> = ({
  invoice,
  onComplete,
  isCompleted
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{t('lineItems')}</h3>
          <p className="text-muted-foreground mt-1">Review and edit the line items from the invoice</p>
        </div>
        <Button 
          onClick={onComplete}
          disabled={isCompleted}
          className="gap-2"
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4" />
              {t('completed')}
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              {t('markAsReviewed')}
            </>
          )}
        </Button>
      </div>

      <LineItemsSection 
        pdfUrl={invoice.pdfUrl}
        onComplete={() => {
          // Don't auto-complete here, let the button handle it
        }}
      />
    </div>
  );
};

export default InvoiceApprovalLineItems;
