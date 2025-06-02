
import React from 'react';
import { History, UploadCloud, Download, AlertCircle, PieChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface BatchOperationsDropdownProps {
  selectedCount: number;
  onBatchValidate: () => void;
  onBatchEdit: () => void;
  onBatchExport: () => void;
  onShowStats: () => void;
}

const BatchOperationsDropdown: React.FC<BatchOperationsDropdownProps> = ({
  selectedCount,
  onBatchValidate,
  onBatchEdit,
  onBatchExport,
  onShowStats
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-8">Batch Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Batch Operations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onBatchValidate} className="gap-2">
          <AlertCircle className="h-4 w-4" /> Validate HS Codes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onBatchEdit} className="gap-2">
          <History className="h-4 w-4" /> Edit Selected Items
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          toast.success(`Applying historical data to ${selectedCount} items`);
        }} className="gap-2">
          <History className="h-4 w-4" /> Apply Historical Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          toast.success(`Uploading ${selectedCount} items to customs system`);
        }} className="gap-2">
          <UploadCloud className="h-4 w-4" /> Upload to Customs System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onBatchExport} className="gap-2">
          <Download className="h-4 w-4" /> Export Selected Items
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onShowStats} className="gap-2">
          <PieChart className="h-4 w-4" /> View Statistics
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BatchOperationsDropdown;
