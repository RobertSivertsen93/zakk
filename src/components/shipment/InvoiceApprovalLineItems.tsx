
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
      <LineItemsSection 
        pdfUrl={invoice.pdfUrl}
        onComplete={onComplete}
      />
    </div>
  );
};

export default InvoiceApprovalLineItems;
