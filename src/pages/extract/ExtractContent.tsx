
import React, { useState } from 'react';
import PdfUploadSection from './PdfUploadSection';
import ExtractDataSection from './ExtractDataSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, List, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExtractContent = () => {
  const [fileName, setFileName] = useState(sessionStorage.getItem('pdf-file-name') || '');
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem('pdf-url') || '');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(pdfUrl ? 2 : 1);
  const [activeTab, setActiveTab] = useState<string>(pdfUrl ? "invoice" : "upload");

  const handlePdfSelected = (file: File) => {
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
    setCurrentStep(2);
    setActiveTab("invoice");
    
    sessionStorage.setItem('pdf-url', url);
    sessionStorage.setItem('pdf-file-name', file.name);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
    setActiveTab("upload");
  };

  return (
    <div className="space-y-8">
      {currentStep === 1 ? (
        <PdfUploadSection onPdfSelected={handlePdfSelected} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="-ml-2 text-muted-foreground hover:text-foreground"
              onClick={handleBackToUpload}
            >
              <Upload className="mr-1 h-4 w-4" />
              Back to Upload
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
              <TabsTrigger value="invoice" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Invoice Details</span>
              </TabsTrigger>
              <TabsTrigger value="lineitems" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span>Line Items</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoice">
              <ExtractDataSection 
                pdfUrl={pdfUrl} 
                fileName={fileName} 
                onBackToUpload={handleBackToUpload} 
              />
            </TabsContent>

            <TabsContent value="lineitems">
              <LineItemsSection />
            </TabsContent>

            <TabsContent value="export">
              <ExportSection />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ExtractContent;
