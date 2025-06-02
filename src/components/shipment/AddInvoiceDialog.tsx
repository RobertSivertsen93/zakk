
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShipmentStore } from '@/stores/useShipmentStore';
import PdfDropzone from '@/components/PdfDropzone';
import { toast } from '@/lib/toast';

interface AddInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddInvoiceDialog: React.FC<AddInvoiceDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { t } = useLanguage();
  const { addInvoice } = useShipmentStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePdfSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleAddInvoice = () => {
    if (!selectedFile) return;

    // Create a basic invoice entry from the PDF file
    // In a real app, this would trigger OCR/extraction
    const pdfUrl = URL.createObjectURL(selectedFile);
    
    const newInvoice = {
      fileName: selectedFile.name,
      pdfUrl,
      invoiceNumber: `INV-${Date.now()}`, // Placeholder
      invoiceDate: new Date().toISOString().split('T')[0],
      customerName: 'Unknown Customer', // Placeholder
      currency: 'DKK', // Default
      totalAmount: 0, // Placeholder
      lineItems: [],
      status: 'pending' as const,
      extractedData: {},
      isProcessed: false // Add the missing isProcessed property
    };

    addInvoice(newInvoice);
    
    toast.success(t('invoiceAdded'), {
      description: selectedFile.name
    });

    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('addInvoiceToBatch')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <PdfDropzone onPdfSelected={handlePdfSelected} />
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              {t('cancel')}
            </Button>
            <Button 
              onClick={handleAddInvoice} 
              disabled={!selectedFile}
              className="flex-1"
            >
              {t('addToBatch')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceDialog;
