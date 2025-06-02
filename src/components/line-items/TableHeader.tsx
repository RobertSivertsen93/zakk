
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
    <thead>
      <tr className="border-b border-gray-200">
        {hasSelection && (
          <th className="py-4 px-4 text-left">
            <Checkbox 
              checked={isAllSelected} 
              onCheckedChange={onSelectAll}
              aria-label="Select all"
            />
          </th>
        )}
        <th className="py-4 px-4 text-left font-medium text-gray-700">
          <div className="flex flex-col">
            <span>HS</span>
            <span>Code</span>
          </div>
        </th>
        <th className="py-4 px-4 text-left font-medium text-gray-700">Origin</th>
        <th className="py-4 px-4 text-left font-medium text-gray-700">Description</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">Weight</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">Qty</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">
          <div className="flex flex-col items-end">
            <span>Unit</span>
            <span>Price</span>
          </div>
        </th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">Amount</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">VAT No.</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">Goods No.</th>
        <th className="py-4 px-4 text-right font-medium text-gray-700">
          <div className="flex items-center justify-end">
            <span>Confidence</span>
            <div className="ml-1 flex gap-1 items-center">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </div>
        </th>
        <th className="py-4 px-4 text-center font-medium text-gray-700">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
