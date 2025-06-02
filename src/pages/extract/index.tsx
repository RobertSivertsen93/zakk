import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useExport } from "@/hooks/useExport";
import InvoiceDataSection from "@/components/exportComponents/InvoiceDataSection";
import LineItemsSection from "@/components/exportComponents/LineItemsSection";
import BottomActionBar from "@/components/exportComponents/BottomActionBar";
import ExportDialog from "@/components/exportComponents/ExportDialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import router in vite react

const Extract = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(sessionStorage.getItem("pdf-file-name") || "");
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem("pdf-url") || "");
  const [activeTab, setActiveTab] = useState<string>("invoice");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const { 
    exportDialogOpen, 
    setExportDialogOpen, 
    handleExport,
    exportFormat,
    setExportFormat 
  } = useExport();
  const { t } = useLanguage();

  const handlePdfSelected = (file: File) => {
    try {
      // Create blob from file
      const blob = new Blob([file], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      
      setPdfUrl(blobUrl);
      setFileName(file.name);
      setActiveTab("invoice");
      
      sessionStorage.setItem("pdf-url", blobUrl);
      sessionStorage.setItem("pdf-file-name", file.name);
    } catch (error) {
      console.error('Error creating PDF blob:', error);
      toast.error('Error loading PDF file');
    }
  };

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      const url = sessionStorage.getItem("pdf-url");
      if (url?.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const handleCompleteSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const isTabCompleted = (tabId: string) => {
    return completedSections.includes(tabId === "invoice" ? "invoice-details" : "line-items");
  };

  const canExport = completedSections.includes("invoice-details") && 
                    completedSections.includes("line-items");

  // Add PDF file handling
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handlePdfSelected(file);
    }
  };

  // Show upload UI if no PDF
  if (!pdfUrl) {
    return (
      <Dashboard
        title="Upload Invoice"
        description="Upload a PDF invoice to begin extraction"
      >
        <div className="flex items-center justify-center h-[60vh]">
          <label className="flex flex-col items-center gap-4 cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="h-12 w-12 text-muted-foreground" />
            <span className="text-muted-foreground">Click to upload PDF</span>
          </label>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard
      title="Extract Invoice Data"
      description="Review, validate and export the extracted information from your invoice"
    >
      <div className="space-y-6 pb-20 h-full">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground mb-4 transition-all duration-300"
          onClick={() => navigate("/upload")}
        >
          <Upload className="mr-1 h-4 w-4" />
          {t("backToUpload")}
        </Button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative mb-6 w-full overflow-hidden rounded-lg border shadow-sm">
            <TabsTrigger value="invoice" className="flex-1 gap-2">
              <div className="flex items-center justify-center gap-2">
                <span>{t("invoice")}</span>
                {isTabCompleted("invoice") && (
                  <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </TabsTrigger>

            <TabsTrigger value="lineitems" className="flex-1 gap-2">
              <div className="flex items-center justify-center gap-2">
                <span>{t("lineItems")}</span>
                {isTabCompleted("lineitems") && (
                  <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoice" className="animate-fade-in">
            <InvoiceDataSection
              pdfUrl={pdfUrl}
              fileName={fileName}
              onComplete={() => {
                handleCompleteSection("invoice-details");
                setActiveTab("lineitems");
              }}
            />
          </TabsContent>

          <TabsContent value="lineitems" className="animate-fade-in">
            <LineItemsSection
              pdfUrl={pdfUrl}
              onComplete={() => handleCompleteSection("line-items")}
            />
          </TabsContent>
        </Tabs>

        <BottomActionBar
          canExport={canExport}
          onExportClick={() => setExportDialogOpen(true)}
          completedSections={completedSections}
        />

        <ExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          onExport={handleExport}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />
      </div>
    </Dashboard>
  );
};

export default Extract;
