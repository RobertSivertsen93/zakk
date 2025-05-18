
import React, { useState, useEffect } from 'react';
import PdfUploadSection from './PdfUploadSection';
import ExtractDataSection from './ExtractDataSection';
import LineItemsSection from './LineItemsSection';
import ExportSection from './ExportSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, List, Upload, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const ExtractContent = () => {
  const [fileName, setFileName] = useState(sessionStorage.getItem('pdf-file-name') || '');
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem('pdf-url') || '');
  const [currentStep, setCurrentStep] = useState(pdfUrl ? 2 : 1);
  const [activeTab, setActiveTab] = useState<string>(pdfUrl ? "invoice" : "upload");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const { t } = useLanguage();

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
  
  // Track tab changes to update step and track completed sections
  useEffect(() => {
    if (activeTab === "invoice") {
      setCurrentStep(2);
    } else if (activeTab === "lineitems") {
      setCurrentStep(2);
      // Mark invoice section as completed if coming from invoice tab
      if (!completedSections.includes('invoice-details')) {
        setCompletedSections(prev => [...prev, 'invoice-details']);
      }
    } else if (activeTab === "export") {
      setCurrentStep(2);
      // Mark line items as completed if coming from line items tab
      if (!completedSections.includes('line-items')) {
        setCompletedSections(prev => [...prev, 'line-items']);
      }
    }
  }, [activeTab, completedSections]);
  
  // Mark current section as complete when moving to the next section
  const handleCompleteSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const isTabCompleted = (tabId: string) => {
    if (tabId === 'invoice') return completedSections.includes('invoice-details');
    if (tabId === 'lineitems') return completedSections.includes('line-items');
    if (tabId === 'export') return completedSections.includes('export-options');
    return false;
  };

  return (
    <div className="space-y-6">
      {currentStep === 1 ? (
        <PdfUploadSection onPdfSelected={handlePdfSelected} />
      ) : (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground mb-4"
            onClick={handleBackToUpload}
          >
            <Upload className="mr-1 h-4 w-4" />
            {t('backToUpload')}
          </Button>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full">
              <TabsTrigger value="invoice" className="flex items-center gap-2 relative py-3">
                <FileText className="h-4 w-4" />
                <span>{t('invoice')}</span>
                {isTabCompleted('invoice') && (
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Check className="h-3 w-3 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="lineitems" className="flex items-center gap-2 relative py-3">
                <List className="h-4 w-4" />
                <span>{t('lineItems')}</span>
                {isTabCompleted('lineitems') && (
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Check className="h-3 w-3 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2 relative py-3">
                <Download className="h-4 w-4" />
                <span>{t('export')}</span>
                {isTabCompleted('export') && (
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Check className="h-3 w-3 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoice">
              <ExtractDataSection 
                pdfUrl={pdfUrl} 
                fileName={fileName} 
                onBackToUpload={handleBackToUpload}
                onComplete={() => {
                  handleCompleteSection('invoice-details');
                  setActiveTab('lineitems');
                }}
              />
            </TabsContent>

            <TabsContent value="lineitems">
              <LineItemsSection 
                onComplete={() => {
                  handleCompleteSection('line-items');
                  setActiveTab('export');
                }} 
              />
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
