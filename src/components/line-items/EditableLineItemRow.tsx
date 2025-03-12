
import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { LineItem } from './types';

interface EditableLineItemRowProps {
  item: LineItem;
  editFormData: LineItem;
  onFieldChange: (field: keyof LineItem, value: string) => void;
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
  const [showAlternatives, setShowAlternatives] = useState(false);
  const alternatives = item.alternativeProductNumbers || [];
  const hasAlternatives = alternatives.length > 0;

  const handleSelectAlternative = (alternative: string) => {
    onFieldChange('productNumber', alternative);
    setShowAlternatives(false);
  };

  return (
    <tr className="border-b bg-muted/10">
      <td className="p-2 text-sm">
        <div className="space-y-1">
          <div className="flex items-center">
            <Input 
              value={editFormData?.productNumber || ''} 
              onChange={(e) => onFieldChange('productNumber', e.target.value)} 
              className="h-8 text-sm"
            />
            {hasAlternatives && (
              <Popover open={showAlternatives} onOpenChange={setShowAlternatives}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 ml-1"
                  >
                    {showAlternatives ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Alternative suggestions:</p>
                    {alternatives.map((alt, index) => (
                      <div 
                        key={index} 
                        className="p-1.5 text-xs rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectAlternative(alt)}
                      >
                        {alt}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
          {hasAlternatives && (
            <div className="text-xs text-muted-foreground pl-1">
              {alternatives.length} alternatives available
            </div>
          )}
        </div>
      </td>
      <td className="p-2 text-sm">
        <Input 
          value={editFormData?.countryOfOrigin || ''} 
          onChange={(e) => onFieldChange('countryOfOrigin', e.target.value)} 
          className="h-8 text-sm"
        />
      </td>
      <td className="p-2 text-sm">
        <Input 
          value={editFormData?.quantity || ''} 
          onChange={(e) => onFieldChange('quantity', e.target.value)} 
          className="h-8 text-sm w-16"
          type="number"
          min="0"
        />
      </td>
      <td className="p-2 text-sm text-right">
        <Input 
          value={editFormData?.unitPrice || ''} 
          onChange={(e) => onFieldChange('unitPrice', e.target.value)} 
          className="h-8 text-sm text-right w-24 ml-auto"
          type="number"
          min="0"
        />
      </td>
      <td className="p-2 text-sm text-right">
        <Input 
          value={editFormData?.amount || ''} 
          onChange={(e) => onFieldChange('amount', e.target.value)} 
          className="h-8 text-sm text-right w-24 ml-auto"
          type="number"
          min="0"
        />
      </td>
      <td className="p-2 text-right">
        <div className="flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default EditableLineItemRow;
