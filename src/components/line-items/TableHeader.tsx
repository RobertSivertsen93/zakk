
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps {
  hasSelection?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  hasSelection = false, 
  isAllSelected = false, 
  onSelectAll 
}) => {
  return (
    <thead className="bg-muted/30 text-sm">
      <tr>
        {hasSelection && (
          <th className="py-3 px-2 text-left font-medium">
            <Checkbox 
              checked={isAllSelected} 
              onCheckedChange={onSelectAll}
              aria-label="Select all"
            />
          </th>
        )}
        <th className="py-3 px-4 text-left font-medium">HS Code</th>
        <th className="py-3 px-4 text-left font-medium">Origin</th>
        <th className="py-3 px-4 text-left font-medium">Description</th>
        <th className="py-3 px-4 text-right font-medium">Qty</th>
        <th className="py-3 px-4 text-right font-medium">Unit Price</th>
        <th className="py-3 px-4 text-right font-medium">Amount</th>
        <th className="py-3 px-4 text-right font-medium">Confidence</th>
        <th className="py-3 px-4 text-right font-medium">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
