
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineItem } from './types';

interface LineItemRowProps {
  item: LineItem;
  onEdit: (item: LineItem) => void;
  onDelete: (id: string) => void;
}

const LineItemRow: React.FC<LineItemRowProps> = ({
  item,
  onEdit,
  onDelete
}) => {
  // Example alternative suggestions
  const alternatives = item.alternativeProductNumbers || [];
  const hasAlternatives = alternatives.length > 0;
  
  // Determine confidence color based on percentage
  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    if (percentage >= 50) return "bg-red-500";
    return "bg-gray-500";
  };
  
  return (
    <tr className="border-b hover:bg-muted/20">
      <td className="p-2 text-sm">
        <div className="flex items-center gap-2">
          {item.productNumber}
          {/* Removed the copy and info buttons to match the design */}
        </div>
      </td>
      <td className="p-2 text-sm">{item.description}</td>
      <td className="p-2 text-right">
        <span className={`px-3 py-1 rounded-md text-white ${getConfidenceColor(item.confidencePercentage)}`}>
          {item.confidencePercentage}%
        </span>
      </td>
      <td className="p-2 text-right">
        <div className="flex justify-end space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default LineItemRow;
