import React, { useState, useEffect } from "react";
import PdfPreview from "@/components/PdfPreview";
import InvoiceDetails from "@/components/InvoiceDetails";
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

interface InvoiceDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onComplete?: () => void;
}

const InvoiceDataSection: React.FC<InvoiceDataSectionProps> = ({
  pdfUrl,
  fileName,
  onComplete,
}) => {
  const [extractedData, setExtractedData] = useState({
    invoiceNumber: "INV-2023-0042",
    invoiceDate: "2023-12-03",
    dueDate: "2023-12-15",
    sender: "Acme Corporation",
    documentNumber: "DOC-2023-0042",
    paymentMethod: "EUR",
    notes: "Payment due within 15 days",
  });

  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // Keyboard shortcut handling for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+C: Mark as complete
      if (e.altKey && e.key === "c" && onComplete) {
        e.preventDefault();
        onComplete();
        toast.success("Section marked as complete");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  const handleSaveInvoiceDetails = (updatedData: Record<string, string>) => {
    setExtractedData({
      invoiceNumber: updatedData.invoiceNumber || extractedData.invoiceNumber,
      invoiceDate: updatedData.invoiceDate || extractedData.invoiceDate,
      dueDate: updatedData.dueDate || extractedData.dueDate,
      sender: updatedData.sender || extractedData.sender,
      documentNumber:
        updatedData.documentNumber || extractedData.documentNumber,
      paymentMethod: updatedData.paymentMethod || extractedData.paymentMethod,
      notes: updatedData.notes || extractedData.notes,
    });
    toast.success("Invoice details updated successfully");
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Language translations
  const translations = {
    en: {
      title: "Invoice Information",
      preview: "PDF Preview",
      complete: "Continue",
      noPreview: "No PDF preview available",
    },
    fo: {
      title: "Fakturuupplýsingar",
      preview: "PDF Forskoðan",
      complete: "Hald fram",
      noPreview: "Eingin PDF forskoðan tøk",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <Card className="glass-panel">
      <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-semibold text-base">{t.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex flex-col">
            <InvoiceDetails
              extractedData={extractedData}
              onSaveChanges={handleSaveInvoiceDetails}
            />

            {onComplete && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleComplete}
                  className="gap-2"
                  aria-label={t.complete}
                >
                  <CheckCircle className="h-4 w-4" />
                  {t.complete}
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-base">
              {fileName ? `${t.preview}: ${fileName}` : t.preview}
            </h3>
            <div className={`${isMobile ? "h-[300px]" : "h-[500px]"} flex-1`}>
              {pdfUrl ? (
                <PdfPreview pdfUrl={pdfUrl} />
              ) : (
                <div
                  className="h-full flex items-center justify-center border border-dashed rounded-lg bg-muted/20"
                  role="region"
                >
                  <p className="text-muted-foreground">{t.noPreview}</p>
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
