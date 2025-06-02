
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineItem } from './types';
import { Save, X, Info } from "lucide-react";
import HSCodeValidation from './HSCodeValidation';
import { Label } from "@/components/ui/label";
import AlternativeHSCodes from './AlternativeHSCodes';
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LineItemEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: LineItem;
  editFormData: LineItem;
  onFieldChange: (field: keyof LineItem, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const LineItemEditDialog: React.FC<LineItemEditDialogProps> = ({
  open,
  onOpenChange,
  item,
  editFormData,
  onFieldChange,
  onSave,
  onCancel
}) => {
  const handleClose = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleSave = () => {
    onSave();
    onOpenChange(false);
  };

  // Process alternative codes with confidence data if available
  const processedAlternatives = item.alternativeProductNumbers ? 
    item.alternativeProductNumbers.map((code, index) => {
      // Add mock confidence levels for demonstration
      // In a real app, these would come from the backend
      const confidenceLevels = [75, 65];
      return {
        code,
        confidence: confidenceLevels[index] || 60
      };
    }) : [];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
      else onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Line Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="productNumber" className="font-medium">HS/Commodity Code</Label>
            <div className="space-y-1">
              <Input 
                id="productNumber"
                value={editFormData.productNumber}
                onChange={(e) => onFieldChange('productNumber', e.target.value)}
                className="w-full"
                placeholder="e.g. 6117.80.80"
              />
              
              {/* Show alternatives with confidence indicators */}
              {processedAlternatives.length > 0 && (
                <AlternativeHSCodes 
                  alternativeCodes={processedAlternatives}
                  onSelectCode={(code) => onFieldChange('productNumber', code)}
                />
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="countryOfOrigin" className="font-medium">Country of Origin</Label>
            <Input 
              id="countryOfOrigin"
              value={editFormData.countryOfOrigin}
              onChange={(e) => onFieldChange('countryOfOrigin', e.target.value)}
              className="w-full"
              placeholder="e.g. CN, US, DE"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Input 
              id="description"
              value={editFormData.description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight" className="font-medium">Weight</Label>
            <Input 
              id="weight"
              value={editFormData.weight || ''}
              onChange={(e) => onFieldChange('weight', e.target.value)}
              className="w-full"
              type="text"
              placeholder="e.g. 1.5"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-medium">Quantity</Label>
            <Input 
              id="quantity"
              value={editFormData.quantity}
              onChange={(e) => onFieldChange('quantity', e.target.value)}
              className="w-full"
              type="text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unitPrice" className="font-medium">Unit Price</Label>
            <Input 
              id="unitPrice"
              value={editFormData.unitPrice}
              onChange={(e) => onFieldChange('unitPrice', e.target.value)}
              className="w-full"
              type="text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="font-medium">Amount</Label>
            <Input 
              id="amount"
              value={editFormData.amount}
              onChange={(e) => onFieldChange('amount', e.target.value)}
              className="w-full"
              type="text"
            />
          </div>

          {editFormData.confidencePercentage !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="confidence" className="font-medium flex items-center">
                  Confidence
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="ml-1 cursor-help">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">System-calculated confidence score for the HS code classification</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="text-sm font-medium">{editFormData.confidencePercentage}%</span>
              </div>
              <Progress 
                value={editFormData.confidencePercentage} 
                className="h-2.5"
                indicatorClassName={`${
                  editFormData.confidencePercentage >= 80 ? 'bg-green-500' : 
                  editFormData.confidencePercentage >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
              />
            </div>
          )}
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
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LineItemEditDialog;
