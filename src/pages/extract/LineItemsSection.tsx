
import React, { useState } from 'react';
import { LineItem } from '@/components/LineItemsTable';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/lib/toast";

const LineItemsSection: React.FC = () => {
  // Mock data for line items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      hsCode: '6117.80.80',
      description: 'Buff, 230 gsm - size 25*...',
      confidence: 95,
      quantity: 1000,
      unitPrice: 2.50,
      totalPrice: 2500
    },
    {
      id: '2',
      hsCode: '9999.99.99',
      description: 'Opstart',
      confidence: 50,
      quantity: 1,
      unitPrice: 150,
      totalPrice: 150
    },
    {
      id: '3',
      hsCode: '4908.90.00',
      description: 'Prøvetryk (voksen + barn)',
      confidence: 70,
      quantity: 5,
      unitPrice: 75,
      totalPrice: 375
    },
    {
      id: '4',
      hsCode: '4901.99.00',
      description: 'Eksportdokumenter 3 cli-...',
      confidence: 80,
      quantity: 10,
      unitPrice: 45,
      totalPrice: 450
    }
  ]);

  const handleEditItem = (id: string, updatedItem: LineItem) => {
    setItems(items.map(item => item.id === id ? updatedItem : item));
    toast.success('Line item updated successfully');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Line item removed');
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Line Items</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Review and edit the line items extracted from the invoice. 
            Pay attention to the confidence score which indicates the reliability of the HS code extraction.
          </p>
          
          <LineItemsTable 
            items={items} 
            onEditItem={handleEditItem} 
            onDeleteItem={handleDeleteItem} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemsSection;
