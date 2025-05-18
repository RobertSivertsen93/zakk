
import React from 'react';
import { LineItem } from './types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import HSCodeValidation from './HSCodeValidation';

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
    <tr className="border-b hover:bg-muted/30">
      <td className="py-2 px-4">
        <HSCodeValidation
          value={editFormData.productNumber}
          onChange={(value) => onFieldChange('productNumber', value)}
          alternativeCodes={item.alternativeProductNumbers}
        />
      </td>
      <td className="py-2 px-4">
        <Input 
          value={editFormData.countryOfOrigin}
          onChange={(e) => onFieldChange('countryOfOrigin', e.target.value)}
          className="w-full"
        />
      </td>
      <td className="py-2 px-4">
        <Input 
          value={editFormData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          className="w-full"
        />
      </td>
      <td className="py-2 px-4 text-right">
        <Input 
          value={editFormData.quantity}
          onChange={(e) => onFieldChange('quantity', e.target.value)}
          className="w-full text-right"
          type="text"
        />
      </td>
      <td className="py-2 px-4 text-right">
        <Input 
          value={editFormData.unitPrice}
          onChange={(e) => onFieldChange('unitPrice', e.target.value)}
          className="w-full text-right"
          type="text"
        />
      </td>
      <td className="py-2 px-4 text-right">
        <Input 
          value={editFormData.amount}
          onChange={(e) => onFieldChange('amount', e.target.value)}
          className="w-full text-right"
          type="text"
        />
      </td>
      <td className="py-2 px-4 text-right">-</td>
      <td className="py-2 px-4 whitespace-nowrap">
        <div className="flex justify-end gap-1">
          <Button
            onClick={onSave}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            onClick={onCancel}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default EditableLineItemRow;
