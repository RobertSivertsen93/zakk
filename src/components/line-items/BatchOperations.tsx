
import React from 'react';
import { CheckSquare, SquareX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LineItem } from './types';

interface BatchOperationsProps {
  selectedItems: LineItem[];
  onBatchValidate: () => void;
  onBatchEdit: () => void;
  onBatchExport: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  totalItems: number;
}

const BatchOperations: React.FC<BatchOperationsProps> = ({
  selectedItems,
  onBatchValidate,
  onBatchEdit,
  onBatchExport,
  onSelectAll,
  onClearSelection,
  totalItems
}) => {
  if (selectedItems.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between bg-muted/20 p-2 rounded-md mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
        </span>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs flex gap-1 items-center"
            onClick={onSelectAll}
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Select All ({totalItems})</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs flex gap-1 items-center"
            onClick={onClearSelection}
          >
            <SquareX className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-8">Batch Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Batch Operations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onBatchValidate}>
              Validate HS Codes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onBatchEdit}>
              Edit Selected Items
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onBatchExport}>
              Export Selected Items
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BatchOperations;
