
import React, { useState } from 'react';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LineItemsTable, { LineItem } from '@/components/LineItemsTable';
import { toast } from "@/lib/toast";
import ConfirmNavigationDialog from "@/components/ConfirmNavigationDialog";

const LineItemsSection: React.FC = () => {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: '6117.80.80',
      countryOfOrigin: 'Denmark',
      quantity: '2',
      unitPrice: '450',
      amount: '900',
      description: 'Buff, 230 gsm - size 25*...',
      confidencePercentage: 95,
      alternativeProductNumbers: ['6117.80.10', '6117.90.00']
    },
    {
      id: '2',
      productNumber: '9999.99.99',
      countryOfOrigin: 'Sweden',
      quantity: '1',
      unitPrice: '300',
      amount: '300',
      description: 'Opstart',
      confidencePercentage: 50,
      alternativeProductNumbers: ['9999.11.11', '9999.22.22']
    },
    {
      id: '3',
      productNumber: '4908.90.00',
      countryOfOrigin: 'Norway',
      quantity: '3',
      unitPrice: '200',
      amount: '600',
      description: 'Prøvetryk (voksen + barn)',
      confidencePercentage: 70,
      alternativeProductNumbers: ['4908.10.00']
    },
    {
      id: '4',
      productNumber: '4901.99.00',
      countryOfOrigin: 'Finland',
      quantity: '1',
      unitPrice: '250',
      amount: '250',
      description: 'Eksportdokumenter 3 cli-...',
      confidencePercentage: 80,
      alternativeProductNumbers: ['4901.91.00', '4901.10.00']
    }
  ]);
  
  // State for the delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  
  const handleEditItem = (id: string, updatedItem: LineItem) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? updatedItem : item
    ));
    toast.success('Line item updated');
  };

  const initiateDelete = (id: string) => {
    setItemToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDeleteId) {
      setLineItems(lineItems.filter(item => item.id !== itemToDeleteId));
      toast.success('Line item deleted');
      setItemToDeleteId(null);
    }
    setDeleteDialogOpen(false);
  };
  
  const handleAddItem = () => {
    const newId = (lineItems.length + 1).toString();
    const newItem: LineItem = {
      id: newId,
      productNumber: `0000.00.00`,
      countryOfOrigin: '',
      quantity: '1',
      unitPrice: '0',
      amount: '0',
      description: 'New item description',
      confidencePercentage: 50,
      alternativeProductNumbers: []
    };
    
    setLineItems([...lineItems, newItem]);
    toast.success('New line item added');
  };
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">Faktura #1</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={handleAddItem}
        >
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>
      
      <LineItemsTable 
        items={lineItems} 
        onEditItem={handleEditItem} 
        onDeleteItem={initiateDelete} 
      />
      
      {/* Confirmation Dialog */}
      <ConfirmNavigationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Line Item"
        description="Are you sure you want to delete this line item? This action cannot be undone."
        confirmLabel="Delete"
      />
    </section>
  );
};

export default LineItemsSection;
