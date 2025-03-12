
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dashboard from './Dashboard';
import PdfPreview from '@/components/PdfPreview';
import LineItemsTable, { LineItem } from '@/components/LineItemsTable';
import { toast } from "@/lib/toast";
import StepIndicator from '@/components/StepIndicator';
import ConfirmNavigationDialog from '@/components/ConfirmNavigationDialog';
import InvoiceDetails from '@/components/InvoiceDetails';
import ExtractActionButtons from '@/components/ExtractActionButtons';
import ExportOptions from '@/components/ExportOptions';

const Extract = () => {
  const navigate = useNavigate();
  const fileName = sessionStorage.getItem('pdf-file-name') || 'invoice.pdf';
  const pdfUrl = sessionStorage.getItem('pdf-url') || '';
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
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
    navigate('/export');
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

  const handleBackClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmBack = () => {
    navigate('/upload');
  };
  
  return (
    <Dashboard 
      title={`Extract Data: ${fileName}`}
      description="Review and edit the extracted information"
    >
      <div className="space-y-8">
        <StepIndicator currentStep={2} />
        
        {/* New layout - PDF preview on top for mobile, side by side on larger screens */}
        <div className="block lg:hidden mb-6">
          {pdfUrl && (
            <div className="h-[400px] mb-6">
              <PdfPreview pdfUrl={pdfUrl} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Invoice Details - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <InvoiceDetails extractedData={extractedData} />
              
              <div className="mt-6">
                <ExportOptions 
                  data={{
                    ...extractedData,
                    lineItems
                  }}
                  onExport={() => {}}
                />
              </div>
            </div>
            
            {/* PDF Preview for desktop - 2/3 width on desktop */}
            <div className="hidden lg:block lg:col-span-2 h-[500px]">
              {pdfUrl && <PdfPreview pdfUrl={pdfUrl} />}
            </div>
          </div>
          
          {/* Line Items - Full width */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Line Items</h3>
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
          </div>
        </div>
        
        <ExtractActionButtons 
          onBackClick={handleBackClick}
          onSaveChanges={handleSaveChanges}
          showContinue={false}
        />
      </div>

      <ConfirmNavigationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmBack}
        title="Warning: You will lose all changes"
        description="Going back to the upload page will delete all the current data you've entered. Are you sure you want to continue?"
      />
    </Dashboard>
  );
};

export default Extract;
