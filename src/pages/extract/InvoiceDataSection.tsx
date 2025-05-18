
import React, { useState } from 'react';
import PdfPreview from '@/components/PdfPreview';
import InvoiceDetails from '@/components/InvoiceDetails';
import { toast } from "@/lib/toast";

interface InvoiceDataSectionProps {
  pdfUrl: string;
  fileName: string;
}

const InvoiceDataSection: React.FC<InvoiceDataSectionProps> = ({ pdfUrl, fileName }) => {
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
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Invoice Information</h2>
        <InvoiceDetails 
          extractedData={extractedData} 
          onSaveChanges={handleSaveInvoiceDetails}
          defaultReadOnly={true}
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">PDF Preview {fileName && `: ${fileName}`}</h2>
        <div className="h-[400px]">
          {pdfUrl ? (
            <PdfPreview pdfUrl={pdfUrl} />
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
              <p className="text-muted-foreground">No PDF preview available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvoiceDataSection;
