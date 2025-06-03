
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PdfUploadSection from "./PdfUploadSection";
import { useExport } from "@/hooks/useExport";
import ExtractTabs from "./ExtractTabs";
import BottomActionBar from "./BottomActionBar";
import ExportDialog from "./ExportDialog";
import { secureStorage } from "@/lib/secureStorage";

const ExtractContent = () => {
  // Use secure storage instead of direct sessionStorage access
  const [fileName, setFileName] = useState(
    secureStorage.getItem("pdf-file-name") || ""
  );
  const [pdfUrl, setPdfUrl] = useState(secureStorage.getItem("pdf-url") || "");
  const [currentStep, setCurrentStep] = useState(2);
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
    // Validate file before processing
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }
    
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
    setCurrentStep(2);
    setActiveTab("invoice");

    // Store in secure storage with expiration (4 hours)
    secureStorage.setItem("pdf-url", url, 240);
    secureStorage.setItem("pdf-file-name", file.name, 240);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
    setActiveTab("upload");
  };

  // Track tab changes to update step and track completed sections
  useEffect(() => {
    if (activeTab === "invoice") {
      setCurrentStep(2);
    } else if (activeTab === "lineitems") {
      setCurrentStep(2);
      // Mark invoice section as completed if coming from invoice tab
      if (!completedSections.includes("invoice-details")) {
        setCompletedSections((prev) => [...prev, "invoice-details"]);
      }
    }
  }, [activeTab, completedSections]);

  // Mark current section as complete when moving to the next section
  const handleCompleteSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections((prev) => [...prev, sectionId]);
    }
  };

  const canExport =
    completedSections.includes("invoice-details") &&
    completedSections.includes("line-items");

  return (
    <div className="space-y-6 pb-20 h-full">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground mb-4 transition-all duration-300"
        onClick={handleBackToUpload}
      >
        <Upload className="mr-1 h-4 w-4" />
        {t("backToUpload")}
      </Button>

      <ExtractTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedSections={completedSections}
        pdfUrl={pdfUrl}
        fileName={fileName}
        onBackToUpload={handleBackToUpload}
        onCompleteSection={handleCompleteSection}
      />

      {/* Bottom Action Bar */}
      <BottomActionBar
        canExport={canExport}
        onExportClick={() => setExportDialogOpen(true)}
        completedSections={completedSections}
      />

      {/* Export Confirmation Dialog */}
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={handleExport}
        exportFormat={exportFormat}
        setExportFormat={setExportFormat}
      />
    </div>
  );
};

export default ExtractContent;
