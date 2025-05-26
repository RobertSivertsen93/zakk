import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: () => void;
  exportFormat: string;
  setExportFormat: (format: string) => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ 
  open, 
  onOpenChange, 
  onExport,
  exportFormat,
  setExportFormat 
}) => {
  const handleExport = () => {
    onExport();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Export</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>You are about to export invoice data. By proceeding, you confirm that you've reviewed all data and approve its accuracy.</p>
          
          <div className="mt-4 p-3 bg-secondary/30 rounded-md border border-secondary/50">
            <p className="text-sm font-medium">The export will include:</p>
            <ul className="list-disc pl-5 mt-1 text-sm">
              <li>Invoice details (dates, numbers, payment info)</li>
              <li>All line items with product codes and values</li>
              <li>Country of origin information</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <label className="text-sm font-medium block mb-2">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON (Standard)</SelectItem>
                <SelectItem value="taks">TAKS Format</SelectItem>
              </SelectContent>
            </Select>
            
            {exportFormat === 'taks' && (
              <div className="mt-2 p-2 rounded bg-blue-50 border border-blue-100 text-sm text-blue-800">
                <p className="font-medium">TAKS Format Conversion</p>
                <ul className="list-disc pl-4 mt-1 text-xs">
                  <li>HS codes will be exported without dots (e.g., "61178080")</li>
                  <li>Decimal values will use commas instead of periods (e.g., "1,020")</li>
                  <li>Data will be formatted according to TAKS requirements</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Confirm Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
