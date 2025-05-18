
import React, { useState } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/lib/toast";

const LineItemsSection: React.FC = () => {
  // Mock data for line items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: '6117.80.80',
      countryOfOrigin: 'China',
      description: 'Buff, 230 gsm - size 25*...',
      confidencePercentage: 95,
      quantity: '1000',
      unitPrice: '2.50',
      amount: '2500',
      alternativeProductNumbers: ['6117.80.90', '6117.80.85']
    },
    {
      id: '2',
      productNumber: '9999.99.99',
      countryOfOrigin: 'Denmark',
      description: 'Opstart',
      confidencePercentage: 50,
      quantity: '1',
      unitPrice: '150',
      amount: '150'
    },
    {
      id: '3',
      productNumber: '4908.90.00',
      countryOfOrigin: 'Sweden',
      description: 'Prøvetryk (voksen + barn)',
      confidencePercentage: 70,
      quantity: '5',
      unitPrice: '75',
      amount: '375'
    },
    {
      id: '4',
      productNumber: '4901.99.00',
      countryOfOrigin: 'Germany',
      description: 'Eksportdokumenter 3 cli-...',
      confidencePercentage: 80,
      quantity: '10',
      unitPrice: '45',
      amount: '450'
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
