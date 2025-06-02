
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineItem } from './types';
import { Save, X } from "lucide-react";

interface BulkEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItems: LineItem[];
  onBulkUpdate: (updates: Partial<LineItem>) => void;
}

const BulkEditDialog: React.FC<BulkEditDialogProps> = ({
  open,
  onOpenChange,
  selectedItems,
  onBulkUpdate
}) => {
  const [updates, setUpdates] = useState<Partial<LineItem>>({});

  const handleFieldChange = (field: keyof LineItem, value: string) => {
    setUpdates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onBulkUpdate(updates);
    setUpdates({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setUpdates({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Bulk Edit {selectedItems.length} Items
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="countryOfOrigin">Country of Origin</Label>
            <Input
              id="countryOfOrigin"
              value={updates.countryOfOrigin || ''}
              onChange={(e) => handleFieldChange('countryOfOrigin', e.target.value)}
              placeholder="Leave empty to keep current values"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatNumber">VAT Number</Label>
            <Input
              id="vatNumber"
              value={updates.vatNumber || ''}
              onChange={(e) => handleFieldChange('vatNumber', e.target.value)}
              placeholder="Leave empty to keep current values"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goodsNumber">Goods Number</Label>
            <Input
              id="goodsNumber"
              value={updates.goodsNumber || ''}
              onChange={(e) => handleFieldChange('goodsNumber', e.target.value)}
              placeholder="Leave empty to keep current values"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              value={updates.weight || ''}
              onChange={(e) => handleFieldChange('weight', e.target.value)}
              placeholder="Leave empty to keep current values"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEditDialog;
