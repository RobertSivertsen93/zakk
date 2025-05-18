
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineItem } from './types';

interface EditableLineItemRowProps {
  item: LineItem;
  editFormData: LineItem;
  onFieldChange: (field: keyof LineItem, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditableLineItemRow: React.FC<EditableLineItemRowProps> = ({
  item,
  editFormData,
  onFieldChange,
  onSave,
  onCancel
}) => {
  return (
    <tr className="border-b bg-muted/10">
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-3 p-1">
          <div className="space-y-1">
            <Label htmlFor="productNumber" className="text-xs font-medium">HS Code</Label>
            <Input
              id="productNumber"
              value={editFormData?.productNumber || ''}
              onChange={(e) => onFieldChange('productNumber', e.target.value)}
              placeholder="e.g. 6117.80.80"
              className="h-9"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="countryOfOrigin" className="text-xs font-medium">Country of Origin</Label>
            <Input
              id="countryOfOrigin"
              value={editFormData?.countryOfOrigin || ''}
              onChange={(e) => onFieldChange('countryOfOrigin', e.target.value)}
              placeholder="e.g. China"
              className="h-9"
            />
          </div>
        </div>
      </td>
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-1 p-1">
          <Label htmlFor="description" className="text-xs font-medium">Description</Label>
          <Input
            id="description"
            value={editFormData?.description || ''}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Product description"
            className="h-auto py-2"
          />
        </div>
      </td>
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-3 p-1">
          <div className="space-y-1">
            <Label htmlFor="quantity" className="text-xs font-medium">Quantity</Label>
            <Input
              id="quantity"
              value={editFormData?.quantity || ''}
              onChange={(e) => onFieldChange('quantity', e.target.value)}
              type="number"
              className="h-9"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="unitPrice" className="text-xs font-medium">Unit Price</Label>
            <Input
              id="unitPrice"
              value={editFormData?.unitPrice || ''}
              onChange={(e) => onFieldChange('unitPrice', e.target.value)}
              type="number"
              className="h-9"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="amount" className="text-xs font-medium">Total Amount</Label>
            <Input
              id="amount"
              value={editFormData?.amount || ''}
              onChange={(e) => onFieldChange('amount', e.target.value)}
              type="number"
              className="h-9"
            />
          </div>
        </div>
      </td>
      <td className="p-2 text-right" colSpan={2}>
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            Save
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default EditableLineItemRow;
