
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/stores/useShipmentStore';
import PdfPreview from '@/components/PdfPreview';
import InvoiceDetails from '@/components/InvoiceDetails';
import { toast } from "@/lib/toast";

interface InvoiceApprovalInfoProps {
  invoice: InvoiceData;
  onComplete: () => void;
  isCompleted: boolean;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  } catch {
    return "";
  }
};

const InvoiceApprovalInfo: React.FC<InvoiceApprovalInfoProps> = ({
  invoice,
  onComplete,
  isCompleted
}) => {
  const { t } = useLanguage();
  
  // Transform invoice data to match InvoiceDetails expected format
  const extractedData = {
    invoiceNumber: invoice.invoiceNumber || "",
    invoiceDate: formatDate(invoice.invoiceDate),
    dueDate: "", // Not available in invoice data, set empty
    sender: invoice.customerName || "",
    documentNumber: "", // Not available in invoice data, set empty
    paymentMethod: invoice.currency || "",
    notes: "", // Not available in invoice data, set empty
    vatNumber: "", // Not available in invoice data, set empty
    goodsNumber: "", // Not available in invoice data, set empty
    receiptOfOrigin: "false", // Default to false for approval flow
  };

  const handleSaveInvoiceDetails = (updatedData: Record<string, string>) => {
    // Here you could update the invoice data if needed
    toast.success("Invoice details updated successfully");
  };

  return (
    <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-semibold text-base">Invoice Data</h2>
            <p className="text-muted-foreground mt-1">Review and verify the invoice details below.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex flex-col">
            <InvoiceDetails
              extractedData={extractedData}
              onSaveChanges={handleSaveInvoiceDetails}
            />

            <div className="mt-6 flex justify-end">
              <Button
                onClick={onComplete}
                disabled={isCompleted}
                className="gap-2"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {t('completed')}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-base">PDF Preview</h3>
            <div className="h-[500px] flex-1">
              {invoice.pdfUrl ? (
                <PdfPreview pdfUrl={invoice.pdfUrl} />
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

export default InvoiceApprovalInfo;
