
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineItem } from './types';
import { Save, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AddLineItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (item: Omit<LineItem, 'id' | 'confidencePercentage'>) => void;
  onCancel: () => void;
}

const AddLineItemDialog: React.FC<AddLineItemDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<LineItem, 'id' | 'confidencePercentage'>>({
    productNumber: '',
    countryOfOrigin: '',
    description: '',
    weight: '',
    quantity: '',
    unitPrice: '',
    amount: '',
  });

  const handleClose = () => {
    onCancel();
    onOpenChange(false);
    resetForm();
  };

  const handleSave = () => {
    onAdd(formData);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      productNumber: '',
      countryOfOrigin: '',
      description: '',
      weight: '',
      quantity: '',
      unitPrice: '',
      amount: '',
    });
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Calculate amount when quantity and unitPrice change
  React.useEffect(() => {
    if (formData.quantity && formData.unitPrice) {
      const quantity = parseFloat(formData.quantity);
      const unitPrice = parseFloat(formData.unitPrice);
      
      if (!isNaN(quantity) && !isNaN(unitPrice)) {
        const amount = (quantity * unitPrice).toString();
        handleFieldChange('amount', amount);
      }
    }
  }, [formData.quantity, formData.unitPrice]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
      else onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Line Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="productNumber" className="font-medium">HS/Commodity Code</Label>
            <div className="space-y-1">
              <Input 
                id="productNumber"
                value={formData.productNumber}
                onChange={(e) => handleFieldChange('productNumber', e.target.value)}
                className="w-full"
                placeholder="e.g. 6117.80.80"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="countryOfOrigin" className="font-medium">Country of Origin</Label>
            <Input 
              id="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={(e) => handleFieldChange('countryOfOrigin', e.target.value)}
              className="w-full"
              placeholder="e.g. CN, US, DE"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Input 
              id="description"
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full"
              placeholder="Item description"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight" className="font-medium">Weight</Label>
            <Input 
              id="weight"
              value={formData.weight}
              onChange={(e) => handleFieldChange('weight', e.target.value)}
              className="w-full"
              type="text"
              placeholder="e.g. 1.5"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-medium">Quantity</Label>
            <Input 
              id="quantity"
              value={formData.quantity}
              onChange={(e) => handleFieldChange('quantity', e.target.value)}
              className="w-full"
              type="text"
              placeholder="e.g. 10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unitPrice" className="font-medium">Unit Price</Label>
            <Input 
              id="unitPrice"
              value={formData.unitPrice}
              onChange={(e) => handleFieldChange('unitPrice', e.target.value)}
              className="w-full"
              type="text"
              placeholder="e.g. 25.50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="font-medium">Amount</Label>
            <Input 
              id="amount"
              value={formData.amount}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              className="w-full"
              type="text"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end gap-2 mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="gap-1"
            disabled={!formData.productNumber || !formData.description || !formData.quantity}
          >
            <Save className="h-4 w-4" />
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLineItemDialog;
