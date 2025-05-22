
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BottomActionBarProps {
  canExport: boolean;
  onExportClick: () => void;
  completedSections: string[];
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({ 
  canExport, 
  onExportClick,
  completedSections
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${completedSections.includes('invoice-details') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm">Invoice Details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${completedSections.includes('line-items') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm">Line Items</span>
          </div>
        </div>
        <Button 
          onClick={onExportClick} 
          disabled={!canExport}
          className={`gap-2 ${canExport ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300'} transition-all duration-300`}
        >
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default BottomActionBar;
