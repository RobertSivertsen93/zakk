
import React, { useState } from 'react';
import PdfPreview from '@/components/PdfPreview';
import InvoiceDetails from '@/components/InvoiceDetails';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface InvoiceDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onComplete?: () => void;
}

const InvoiceDataSection: React.FC<InvoiceDataSectionProps> = ({ pdfUrl, fileName, onComplete }) => {
  const [extractedData, setExtractedData] = useState({
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
  });
  
  const handleSaveInvoiceDetails = (updatedData: Record<string, string>) => {
    setExtractedData({
      invoiceNumber: updatedData.invoiceNumber || extractedData.invoiceNumber,
      invoiceDate: updatedData.invoiceDate || extractedData.invoiceDate,
      dueDate: updatedData.dueDate || extractedData.dueDate,
      sender: updatedData.sender || extractedData.sender,
      documentNumber: updatedData.documentNumber || extractedData.documentNumber,
      paymentMethod: updatedData.paymentMethod || extractedData.paymentMethod,
      notes: updatedData.notes || extractedData.notes,
    });
    toast.success('Invoice details updated successfully');
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <Card className="glass-panel">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Invoice Information</h2>
        <p className="text-sm text-muted-foreground">
          Verify the extracted invoice information and make corrections if necessary.
          The system has automatically detected and filled in these fields from the PDF.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <InvoiceDetails 
              extractedData={extractedData} 
              onSaveChanges={handleSaveInvoiceDetails}
            />
            
            {onComplete && (
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleComplete}
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark Section Complete
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{fileName ? `Document: ${fileName}` : 'PDF Preview'}</h3>
            <div className="h-[600px]">
              {pdfUrl ? (
                <PdfPreview pdfUrl={pdfUrl} />
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">No PDF preview available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDataSection;
