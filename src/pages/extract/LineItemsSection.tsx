
import React, { useState } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/lib/toast";

interface LineItemsSectionProps {
  onComplete?: () => void;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({ onComplete }) => {
  // Mock data for line items with country codes instead of full names
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: '6117.80.80',
      countryOfOrigin: 'CN',
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
      countryOfOrigin: 'DK',
      description: 'Opstart',
      confidencePercentage: 50,
      quantity: '1',
      unitPrice: '150',
      amount: '150'
    },
    {
      id: '3',
      productNumber: '4908.90.00',
      countryOfOrigin: 'SE',
      description: 'Prøvetryk (voksen + barn)',
      confidencePercentage: 70,
      quantity: '5',
      unitPrice: '75',
      amount: '375'
    },
    {
      id: '4',
      productNumber: '4901.99.00',
      countryOfOrigin: 'DE',
      description: 'Eksportdokumenter 3 cli-...',
      confidencePercentage: 80,
      quantity: '10',
      unitPrice: '45',
      amount: '450'
    },
    {
      id: '5',
      productNumber: '8471.30.00',
      countryOfOrigin: 'US',
      description: 'Laptop computers, 15-inch',
      confidencePercentage: 90,
      quantity: '5',
      unitPrice: '800',
      amount: '4000'
    },
    {
      id: '6',
      productNumber: '8523.49.25',
      countryOfOrigin: 'JP',
      description: 'Optical media for data storage',
      confidencePercentage: 85,
      quantity: '100',
      unitPrice: '3',
      amount: '300'
    },
    {
      id: '7',
      productNumber: '9403.20.80',
      countryOfOrigin: 'IT',
      description: 'Metal furniture components',
      confidencePercentage: 65,
      quantity: '50',
      unitPrice: '12',
      amount: '600'
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
      <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Line Items</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Review and edit the line items extracted from the invoice.
              </p>
            </div>
          </div>
          
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
