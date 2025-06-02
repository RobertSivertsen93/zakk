
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LineItem } from './types';

interface LineItemRowProps {
  item: LineItem;
  onEdit: (item: LineItem) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: () => void;
  hasSelection?: boolean;
}

const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelect,
  hasSelection = false
}) => {
  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceText = (percentage: number) => {
    if (percentage >= 85) return 'High';
    if (percentage >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}>
      {hasSelection && (
        <td className="py-3 px-4">
          <Checkbox 
            checked={isSelected} 
            onCheckedChange={onToggleSelect}
            aria-label={`Select ${item.description}`}
          />
        </td>
      )}
      
      <td className="py-3 px-4">
        <div className="font-mono text-sm">{item.productNumber}</div>
      </td>
      
      <td className="py-3 px-4">
        <span className="text-sm">{item.countryOfOrigin}</span>
      </td>
      
      <td className="py-3 px-4">
        <div className="max-w-[200px]">
          <p className="text-sm font-medium truncate" title={item.description}>
            {item.description}
          </p>
        </div>
      </td>
      
      <td className="py-3 px-4 text-right">
        <span className="text-sm">{item.weight}</span>
      </td>
      
      <td className="py-3 px-4 text-right">
        <span className="text-sm">{item.quantity}</span>
      </td>
      
      <td className="py-3 px-4 text-right">
        <span className="text-sm">${item.unitPrice}</span>
      </td>
      
      <td className="py-3 px-4 text-right">
        <span className="text-sm font-medium">${item.amount}</span>
      </td>
      
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-gray-600">
            {getConfidenceText(item.confidencePercentage)}
          </span>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getConfidenceColor(item.confidencePercentage)}`}></div>
            <span className="text-xs font-medium">{Math.round(item.confidencePercentage)}%</span>
          </div>
        </div>
      </td>
      
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default LineItemRow;
