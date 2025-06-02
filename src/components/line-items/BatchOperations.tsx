
import React, { useState } from 'react';
import { CheckSquare, SquareX, History, UploadCloud, Download, AlertCircle, PieChart } from 'lucide-react';
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
import { LineItem } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

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
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  if (selectedItems.length === 0) {
    return null;
  }
  
  // Calculate confidence stats for selected items
  const getConfidenceStats = () => {
    if (selectedItems.length === 0) return { average: 0, high: 0, medium: 0, low: 0 };
    
    const totalConfidence = selectedItems.reduce((sum, item) => sum + item.confidencePercentage, 0);
    const average = totalConfidence / selectedItems.length;
    
    const high = selectedItems.filter(item => item.confidencePercentage >= 85).length;
    const medium = selectedItems.filter(item => item.confidencePercentage >= 60 && item.confidencePercentage < 85).length;
    const low = selectedItems.filter(item => item.confidencePercentage < 60).length;
    
    return {
      average,
      high,
      medium,
      low
    };
  };
  
  const stats = getConfidenceStats();
  
  const handleShowStats = () => {
    setShowStatsModal(true);
  };
  
  const handleValidateHS = () => {
    onBatchValidate();
    toast.success(`Validating HS codes for ${selectedItems.length} items`);
    
    // Example toast that would appear after the validation process finishes
    setTimeout(() => {
      const validCount = Math.floor(selectedItems.length * 0.8); // 80% valid for demo
      if (validCount < selectedItems.length) {
        toast.warning(`${selectedItems.length - validCount} items need attention`);
      } else {
        toast.success('All selected items validated successfully');
      }
    }, 1500);
  };
  
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
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 hidden md:flex"
          onClick={handleShowStats}
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
              toast.success(`Applying historical data to ${selectedItems.length} items`);
            }} className="gap-2">
              <History className="h-4 w-4" /> Apply Historical Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast.success(`Uploading ${selectedItems.length} items to customs system`);
            }} className="gap-2">
              <UploadCloud className="h-4 w-4" /> Upload to Customs System
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onBatchExport} className="gap-2">
              <Download className="h-4 w-4" /> Export Selected Items
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShowStats} className="gap-2">
              <PieChart className="h-4 w-4" /> View Statistics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Statistics Dialog */}
      <Dialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selection Statistics</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-medium mb-2">Confidence Levels</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Confidence</span>
                    <span className="text-sm font-medium">{Math.round(stats.average)}%</span>
                  </div>
                  <Progress value={stats.average} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">High</span>
                      <span className="text-sm font-medium text-green-600">{stats.high}</span>
                    </div>
                    <Progress value={(stats.high / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-green-500" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Medium</span>
                      <span className="text-sm font-medium text-yellow-600">{stats.medium}</span>
                    </div>
                    <Progress value={(stats.medium / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-yellow-500" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Low</span>
                      <span className="text-sm font-medium text-red-600">{stats.low}</span>
                    </div>
                    <Progress value={(stats.low / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Countries of Origin</h3>
              <div className="text-sm">
                {/* Group by country and count */}
                {Object.entries(
                  selectedItems.reduce((acc: Record<string, number>, item) => {
                    const country = item.countryOfOrigin || 'Unknown';
                    acc[country] = (acc[country] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([country, count]) => (
                  <div key={country} className="flex justify-between mb-1">
                    <span>{country}</span>
                    <span>{count} item{count !== 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchOperations;
