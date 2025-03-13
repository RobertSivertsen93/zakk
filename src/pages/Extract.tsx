
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dashboard from './Dashboard';
import PdfPreview from '@/components/PdfPreview';
import PdfDropzone from '@/components/PdfDropzone';
import LineItemsTable, { LineItem } from '@/components/LineItemsTable';
import { toast } from "@/lib/toast";
import ConfirmNavigationDialog from '@/components/ConfirmNavigationDialog';
import InvoiceDetails from '@/components/InvoiceDetails';
import ExtractActionButtons from '@/components/ExtractActionButtons';
import ExportOptions from '@/components/ExportOptions';

const Extract = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(sessionStorage.getItem('pdf-file-name') || '');
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem('pdf-url') || '');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(pdfUrl ? 2 : 1);
  
  const extractedData = React.useMemo(() => ({
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
  }), []);

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: 'PROD-001',
      countryOfOrigin: 'Denmark',
      quantity: '2',
      unitPrice: '450',
      amount: '900',
      alternativeProductNumbers: ['PRD-001', 'P001', 'PRODUCT-001'] // Example alternatives
    },
    {
      id: '2',
      productNumber: 'PROD-002',
      countryOfOrigin: 'Sweden',
      quantity: '1',
      unitPrice: '300',
      amount: '300',
      alternativeProductNumbers: ['PRD-002', 'P002'] // Example alternatives
    }
  ]);
  
  const handleSaveChanges = () => {
    toast.success('Changes saved successfully');
  };
  
  const handleContinue = () => {
    navigate('/handling');
  };

  const handleEditItem = (id: string, updatedItem: LineItem) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? updatedItem : item
    ));
    toast.success('Line item updated');
  };

  const handleDeleteItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };
  
  const handleAddItem = () => {
    const newId = (lineItems.length + 1).toString();
    const newItem: LineItem = {
      id: newId,
      productNumber: `PROD-${newId.padStart(3, '0')}`,
      countryOfOrigin: '',
      quantity: '1',
      unitPrice: '0',
      amount: '0',
      alternativeProductNumbers: []
    };
    
    setLineItems([...lineItems, newItem]);
    toast.success('New line item added');
  };

  const handlePdfSelected = (file: File) => {
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
    setCurrentStep(2);
    
    sessionStorage.setItem('pdf-url', url);
    sessionStorage.setItem('pdf-file-name', file.name);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
  };
  
  return (
    <Dashboard 
      title="Extract Data"
      description="Upload a PDF and review the extracted information"
    >
      <div className="space-y-8">
        {currentStep === 1 && (
          <section className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Upload Invoice PDF</h2>
            <PdfDropzone onPdfSelected={handlePdfSelected} />
          </section>
        )}

        {currentStep === 2 && (
          <div className="space-y-10">
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                onClick={handleBackToUpload}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Upload
              </Button>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Invoice Information</h2>
                <InvoiceDetails extractedData={extractedData} />
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

            <section className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold">Line Items</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleAddItem}
                >
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
              </div>
              
              <LineItemsTable 
                items={lineItems} 
                onEditItem={handleEditItem} 
                onDeleteItem={handleDeleteItem} 
              />
            </section>

            <ExtractActionButtons 
              onSaveChanges={handleSaveChanges}
              onContinue={handleContinue}
              showContinue={true}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Extract;
