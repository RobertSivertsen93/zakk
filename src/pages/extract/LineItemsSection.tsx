import React, { useState } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle } from "lucide-react";
import { toast } from "@/lib/toast";
import ExtractActionButtons from '@/components/ExtractActionButtons';

interface LineItemsSectionProps {
  onComplete?: () => void;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({ onComplete }) => {
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
    },
    {
      id: '5',
      productNumber: '8471.30.00',
      countryOfOrigin: 'United States',
      description: 'Laptop computers, 15-inch',
      confidencePercentage: 90,
      quantity: '5',
      unitPrice: '800',
      amount: '4000'
    },
    {
      id: '6',
      productNumber: '8523.49.25',
      countryOfOrigin: 'Japan',
      description: 'Optical media for data storage',
      confidencePercentage: 85,
      quantity: '100',
      unitPrice: '3',
      amount: '300'
    },
    {
      id: '7',
      productNumber: '9403.20.80',
      countryOfOrigin: 'Italy',
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

  const handleAddItem = () => {
    const newItem: LineItem = {
      id: `new-${Date.now()}`,
      productNumber: '',
      countryOfOrigin: '',
      description: '',
      confidencePercentage: 50,
      quantity: '',
      unitPrice: '',
      amount: ''
    };
    
    setItems([...items, newItem]);
    toast.success('New line item added');
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Line Items</h2>
              <p className="text-sm text-muted-foreground">
                Review and edit the line items extracted from the invoice.
              </p>
            </div>
            <Button onClick={handleAddItem} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Item
            </Button>
          </div>
          
          <LineItemsTable 
            items={items} 
            onEditItem={handleEditItem} 
            onDeleteItem={handleDeleteItem} 
          />

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleContinue}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemsSection;
