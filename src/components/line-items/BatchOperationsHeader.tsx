
import React from 'react';
import { CheckSquare, SquareX, PieChart, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

interface BatchOperationsHeaderProps {
  selectedCount: number;
  totalItems: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onShowStats: () => void;
  onValidateHS: () => void;
}

const BatchOperationsHeader: React.FC<BatchOperationsHeaderProps> = ({
  selectedCount,
  totalItems,
  onSelectAll,
  onClearSelection,
  onShowStats,
  onValidateHS
}) => {
  const handleValidateHS = () => {
    onValidateHS();
    toast.success(`Validating HS codes for ${selectedCount} items`);
    
    // Example toast that would appear after the validation process finishes
    setTimeout(() => {
      const validCount = Math.floor(selectedCount * 0.8); // 80% valid for demo
      if (validCount < selectedCount) {
        toast.warning(`${selectedCount - validCount} items need attention`);
      } else {
        toast.success('All selected items validated successfully');
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-between bg-muted/20 p-2 rounded-md mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
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
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 hidden md:flex"
          onClick={onShowStats}
        >
          <PieChart className="h-4 w-4" />
          <span>Stats</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 hidden md:flex"
          onClick={handleValidateHS}
        >
          <AlertCircle className="h-4 w-4" />
          <span>Validate HS</span>
        </Button>
      </div>
    </div>
  );
};

export default BatchOperationsHeader;
