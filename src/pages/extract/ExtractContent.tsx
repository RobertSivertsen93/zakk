
import React, { useState, useEffect } from 'react';
import PdfUploadSection from './PdfUploadSection';
import ExtractDataSection from './ExtractDataSection';
import LineItemsSection from './LineItemsSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock data for export
const mockData = {
  invoiceNumber: 'INV-2023-0042',
  invoiceDate: '2023-12-03',
  dueDate: '2023-12-15',
  sender: 'Acme Corporation',
  documentNumber: 'DOC-2023-0042',
  paymentMethod: 'EUR',
  notes: 'Payment due within 15 days',
  lineItems: []
};

const ExtractContent = () => {
  const [fileName, setFileName] = useState(sessionStorage.getItem('pdf-file-name') || '');
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem('pdf-url') || '');
  const [currentStep, setCurrentStep] = useState(pdfUrl ? 2 : 1);
  const [activeTab, setActiveTab] = useState<string>(pdfUrl ? "invoice" : "upload");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
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
    return false;
  };

  const canExport = completedSections.includes('invoice-details') && 
                    completedSections.includes('line-items');

  const handleExport = () => {
    // Simple JSON export
    const dataString = JSON.stringify(mockData, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Close dialog and show success toast
    setExportDialogOpen(false);
    toast.success('Data exported successfully');
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
            className="text-muted-foreground hover:text-foreground mb-4 transition-all duration-300"
            onClick={handleBackToUpload}
          >
            <Upload className="mr-1 h-4 w-4" />
            {t('backToUpload')}
          </Button>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="relative mb-6 w-full overflow-hidden rounded-lg border shadow-sm">
              <TabsTrigger 
                value="invoice" 
                className="flex-1 gap-2"
              >
                <div className="flex items-center justify-center gap-2 relative">
                  <span>{t('invoice')}</span>
                  {isTabCompleted('invoice') && (
                    <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                  )}
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="lineitems" 
                className="flex-1 gap-2"
              >
                <div className="flex items-center justify-center gap-2 relative">
                  <span>{t('lineItems')}</span>
                  {isTabCompleted('lineitems') && (
                    <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                  )}
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoice" className="animate-fade-in">
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

            <TabsContent value="lineitems" className="animate-fade-in">
              <LineItemsSection 
                onComplete={() => {
                  handleCompleteSection('line-items');
                }} 
              />
            </TabsContent>
          </Tabs>
          
          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${completedSections.includes('invoice-details') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">Invoice Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${completedSections.includes('line-items') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">Line Items</span>
                </div>
              </div>
              <Button 
                onClick={() => setExportDialogOpen(true)} 
                disabled={!canExport}
                className={`gap-2 ${canExport ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300'} transition-all duration-300`}
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
          
          {/* Export Confirmation Dialog */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
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
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleExport} className="gap-2">
                  <Download className="h-4 w-4" />
                  Confirm Export
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ExtractContent;
