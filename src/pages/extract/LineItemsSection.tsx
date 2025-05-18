
import React, { useState } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "@/lib/toast";
import ExtractActionButtons from '@/components/ExtractActionButtons';
import HSCodeHistory from '@/components/line-items/HSCodeHistory';
import SectionValidator, { ValidationSection } from '@/components/validation/SectionValidator';

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
  
  const [validationStatus, setValidationStatus] = useState<ValidationSection>({
    id: 'line-items',
    title: 'Line Items Validation',
    items: [
      {
        id: 'hs-codes',
        label: 'Valid HS codes',
        description: 'All items must have correctly formatted HS codes',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'country-origins',
        label: 'Country of origin specified',
        description: 'Each item must have a valid country of origin',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'quantities',
        label: 'Quantities and prices',
        description: 'All items must have valid quantities and unit prices',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'high-confidence',
        label: 'High confidence items',
        description: 'Items with confidence levels below 70% may need review',
        isRequired: false,
        status: 'pending'
      }
    ]
  });

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

  const handleSaveChanges = () => {
    toast.success('All changes have been saved');
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  const handleSelectHistoricalCode = (code: string, description: string) => {
    toast.success(`Selected HS code from history: ${code}`);
    // In a real app, this would populate a new line item or update a selected one
  };
  
  const handleValidate = () => {
    // Simulate validation process
    toast.info('Validating line items...');
    
    // Simulate validation process completing after a short delay
    setTimeout(() => {
      // Update validation statuses
      const updatedSection = { ...validationStatus };
      
      // Check for valid HS codes
      const hasValidHSCodes = items.every(
        item => item.productNumber && /^\d{4}\.\d{2}\.\d{2}$/.test(item.productNumber)
      );
      updatedSection.items[0].status = hasValidHSCodes ? 'valid' : 'invalid';
      
      // Check for country of origin
      const hasCountryOrigin = items.every(
        item => item.countryOfOrigin && item.countryOfOrigin.trim() !== ''
      );
      updatedSection.items[1].status = hasCountryOrigin ? 'valid' : 'invalid';
      
      // Check for quantities and prices
      const hasQuantities = items.every(
        item => item.quantity && item.unitPrice
      );
      updatedSection.items[2].status = hasQuantities ? 'valid' : 'warning';
      
      // Check confidence levels
      const lowConfidenceItems = items.filter(item => item.confidencePercentage < 70);
      updatedSection.items[3].status = lowConfidenceItems.length === 0 ? 'valid' : 'warning';
      
      setValidationStatus(updatedSection);
      toast.success('Validation complete');
    }, 1500);
  };
  
  const handleUpdateStatus = (itemId: string, status: 'valid' | 'invalid' | 'warning' | 'pending') => {
    const updatedSection = { ...validationStatus };
    const itemIndex = updatedSection.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      updatedSection.items[itemIndex].status = status;
      setValidationStatus(updatedSection);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Line Items</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Review and edit the line items extracted from the invoice. 
                Use the search and filters to quickly find specific items.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <HSCodeHistory 
                onSelectCode={handleSelectHistoricalCode}
              />
              <Button onClick={handleAddItem} className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
          
          <SectionValidator
            section={validationStatus}
            onValidate={handleValidate}
            onUpdateStatus={handleUpdateStatus}
          />
          
          <LineItemsTable 
            items={items} 
            onEditItem={handleEditItem} 
            onDeleteItem={handleDeleteItem} 
          />

          <div className="mt-6">
            <ExtractActionButtons 
              onSaveChanges={handleSaveChanges}
              onContinue={handleContinue}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemsSection;
