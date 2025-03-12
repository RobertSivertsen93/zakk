
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
  return (
    <tr className="border-b hover:bg-muted/20">
      <td className="p-2 text-sm">{item.productNumber}</td>
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
