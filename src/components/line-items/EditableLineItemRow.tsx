
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidatedFormField } from "../form/ValidatedFormField";
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
  // Function to determine confidence class
  const getConfidenceClass = (percentage: number) => {
    if (percentage >= 85) return "text-green-700 bg-green-100";
    if (percentage >= 60) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
  };

  return (
    <tr className="border-b bg-muted/10">
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-3 p-1">
          <ValidatedFormField
            id="productNumber"
            label="HS Code"
            value={editFormData?.productNumber || ''}
            onChange={(value) => onFieldChange('productNumber', value)}
            type="hscode"
            required={true}
            alternativeCodes={item.alternativeProductNumbers}
            helpText={{
              tooltip: "Harmonized System (HS) code for product classification",
              regulations: "Required for customs clearance. Must match international HS nomenclature.",
              examples: ["6117.80.80 - Textile accessories", "8471.30.00 - Laptops"]
            }}
          />
          
          <ValidatedFormField
            id="countryOfOrigin"
            label="Country of Origin"
            value={editFormData?.countryOfOrigin || ''}
            onChange={(value) => onFieldChange('countryOfOrigin', value)}
            type="country"
            required={true}
            helpText={{
              tooltip: "Country where the product was manufactured or produced",
              regulations: "Required for determining applicable tariffs and restrictions",
              examples: ["CN - China", "DE - Germany", "US - United States"]
            }}
          />
        </div>
      </td>
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-3 p-1">
          <ValidatedFormField
            id="description"
            label="Description"
            value={editFormData?.description || ''}
            onChange={(value) => onFieldChange('description', value)}
            type="textarea"
            required={true}
            helpText="Detailed description of the product for customs clearance"
          />
        </div>
      </td>
      <td className="p-2 text-sm" colSpan={2}>
        <div className="space-y-3 p-1">
          <ValidatedFormField
            id="quantity"
            label="Quantity"
            value={editFormData?.quantity || ''}
            onChange={(value) => onFieldChange('quantity', value)}
            type="number"
            required={true}
            helpText="Number of items being imported"
          />
          
          <ValidatedFormField
            id="unitPrice"
            label="Unit Price"
            value={editFormData?.unitPrice || ''}
            onChange={(value) => onFieldChange('unitPrice', value)}
            type="number"
            required={true}
            helpText="Price per unit in the stated currency"
          />
          
          <ValidatedFormField
            id="amount"
            label="Total Amount"
            value={editFormData?.amount || ''}
            onChange={(value) => onFieldChange('amount', value)}
            type="number"
            required={true}
            helpText="Total value of the line item"
          />
        </div>
      </td>
      <td className="p-2 text-right" colSpan={2}>
        <div className="space-y-3 p-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Confidence</Label>
            <div className="h-10 flex items-center">
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getConfidenceClass(editFormData?.confidencePercentage || 50)}`}>
                <span className={`w-2 h-2 rounded-full mr-1.5 ${getConfidenceClass(editFormData?.confidencePercentage || 50)}`}></span>
                {editFormData?.confidencePercentage || 50}%
              </div>
              <span className="ml-2 text-xs text-muted-foreground">System determined</span>
            </div>
          </div>

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
        </div>
      </td>
    </tr>
  );
};

export default EditableLineItemRow;
