
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onOpenChange, onExport }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Export</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>You are about to export all invoice data in JSON format. By proceeding, you confirm that you've reviewed all data and approve its accuracy.</p>
          
          <div className="mt-4 p-3 bg-secondary/30 rounded-md border border-secondary/50">
            <p className="text-sm font-medium">The export will include:</p>
            <ul className="list-disc pl-5 mt-1 text-sm">
              <li>Invoice details (dates, numbers, payment info)</li>
              <li>All line items with product codes and values</li>
              <li>Country of origin information</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onExport} className="gap-2">
            <Download className="h-4 w-4" />
            Confirm Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
