
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/stores/useShipmentStore';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';

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
  
  // Transform invoice line items to LineItem format
  const transformToLineItems = (items: any[]): LineItem[] => {
    return items.map((item, index) => ({
      id: `${invoice.id}-item-${index}`,
      productNumber: item.hsCode || '',
      countryOfOrigin: item.countryOfOrigin || '',
      description: item.description || '',
      quantity: item.quantity?.toString() || '0',
      unitPrice: item.unitPrice?.toString() || '0',
      amount: item.totalPrice?.toString() || '0',
      confidencePercentage: 85,
      weight: item.weight || ''
    }));
  };

  const [lineItems, setLineItems] = useState<LineItem[]>(() => 
    transformToLineItems(invoice.lineItems || [])
  );

  const handleEditItem = (id: string, updatedItem: LineItem) => {
    setLineItems(prev => prev.map(item => 
      item.id === id ? updatedItem : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setLineItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (newItemData: Omit<LineItem, 'id' | 'confidencePercentage'>) => {
    const newId = `${invoice.id}-item-${Date.now()}`;
    const newItem: LineItem = {
      ...newItemData,
      id: newId,
      confidencePercentage: 85,
    };
    setLineItems(prev => [...prev, newItem]);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{t('lineItems')} ({lineItems.length})</h3>
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
            t('markAsReviewed')
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <LineItemsTable
          items={lineItems}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          onAddItem={handleAddItem}
        />
      </div>
    </div>
  );
};

export default InvoiceApprovalLineItems;
