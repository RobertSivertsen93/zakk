
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
      productNumber: '6117.80.80',
      countryOfOrigin: 'Denmark',
      quantity: '2',
      unitPrice: '450',
      amount: '900',
      description: 'Buff, 230 gsm - size 25*...',
      confidencePercentage: 95,
      alternativeProductNumbers: ['6117.80.10', '6117.90.00']
    },
    {
      id: '2',
      productNumber: '9999.99.99',
      countryOfOrigin: 'Sweden',
      quantity: '1',
      unitPrice: '300',
      amount: '300',
      description: 'Opstart',
      confidencePercentage: 50,
      alternativeProductNumbers: ['9999.11.11', '9999.22.22']
    },
    {
      id: '3',
      productNumber: '4908.90.00',
      countryOfOrigin: 'Norway',
      quantity: '3',
      unitPrice: '200',
      amount: '600',
      description: 'Prøvetryk (voksen + barn)',
      confidencePercentage: 70,
      alternativeProductNumbers: ['4908.10.00']
    },
    {
      id: '4',
      productNumber: '4901.99.00',
      countryOfOrigin: 'Finland',
      quantity: '1',
      unitPrice: '250',
      amount: '250',
      description: 'Eksportdokumenter 3 cli-...',
      confidencePercentage: 80,
      alternativeProductNumbers: ['4901.91.00', '4901.10.00']
    }
  ]);
  
  const handleSaveChanges = () => {
    toast.success('Changes saved successfully');
  };
  
  const handleExport = (format: string) => {
    // In a real app, this would trigger the export process
    toast.success(`Exporting in ${format} format`);
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
      productNumber: `0000.00.00`,
      countryOfOrigin: '',
      quantity: '1',
      unitPrice: '0',
      amount: '0',
      description: 'New item description',
      confidencePercentage: 50,
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
                <h2 className="text-xl font-semibold">Faktura #1</h2>
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

            <section className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Export Options</h2>
              <ExportOptions 
                data={{...extractedData, ...lineItems.reduce((acc, item) => ({
                  ...acc,
                  [`product_${item.id}_number`]: item.productNumber,
                  [`product_${item.id}_description`]: item.description,
                  [`product_${item.id}_confidence`]: item.confidencePercentage,
                }), {})}}
                onExport={handleExport}
              />
            </section>

            <ExtractActionButtons 
              onSaveChanges={handleSaveChanges}
              showContinue={false}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Extract;
