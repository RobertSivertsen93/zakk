
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
        <th className="py-3 px-4 text-right font-medium">
          <div className="flex items-center justify-end">
            <span>Confidence</span>
            <div className="ml-1 flex gap-1 items-center">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>
        </th>
        <th className="py-3 px-4 text-right font-medium">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
