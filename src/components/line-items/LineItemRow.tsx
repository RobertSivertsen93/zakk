
import React from 'react';
import { Edit, Trash, Info } from 'lucide-react';
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
  
  return (
    <tr className="border-b hover:bg-muted/20">
      <td className="p-2 text-sm">
        <div className="flex items-center gap-1">
          {item.productNumber}
          {hasAlternatives && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-500">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-2">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Alternative suggestions:</p>
                    <ul className="text-xs space-y-1">
                      {alternatives.map((alt, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span>{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </td>
      <td className="p-2 text-sm">{item.countryOfOrigin}</td>
      <td className="p-2 text-sm">{item.quantity}</td>
      <td className="p-2 text-sm text-right">{item.unitPrice}</td>
      <td className="p-2 text-sm text-right">{item.amount}</td>
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
