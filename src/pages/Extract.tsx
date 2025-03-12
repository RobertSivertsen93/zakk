import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, ArrowRight, Save, Plus, AlertTriangle, Upload, FileText, FileOutput } from "lucide-react";
import Dashboard from './Dashboard';
import { InvoiceFormFields } from '@/components/FormFields';
import LineItemsTable, { LineItem } from '@/components/LineItemsTable';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

const Extract = () => {
  const navigate = useNavigate();
  const fileName = sessionStorage.getItem('pdf-file-name') || 'invoice.pdf';
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // For demo purposes, we'll populate with sample data
  // In a real app, this would come from the PDF processing service
  const extractedData = React.useMemo(() => ({
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
  }), []);

  // Create sample line items for demonstration
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: 'PROD-001',
      countryOfOrigin: 'Denmark',
      quantity: '2',
      unitPrice: '450',
      amount: '900',
    },
    {
      id: '2',
      productNumber: 'PROD-002',
      countryOfOrigin: 'Sweden',
      quantity: '1',
      unitPrice: '300',
      amount: '300',
    }
  ]);
  
  const handleSaveChanges = () => {
    // In a real app, this would save the changes to the server
    // For demo, we'll just show a toast
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
        <div className="step-indicator">
          <div className="step-item">
            <div className="step-dot"></div>
            <span className="step-label">Upload PDF</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-dot step-dot-active"></div>
            <span className="step-label step-label-active">Data Management</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-dot"></div>
            <span className="step-label">Export</span>
          </div>
        </div>
        
        <Card className="glass-panel">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-medium border-b pb-2">Invoice Information</h3>
            <InvoiceFormFields initialData={extractedData} />
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-4">
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
          </CardContent>
        </Card>
        
        <div className="flex flex-wrap justify-between gap-4">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className="gap-2"
              onClick={handleSaveChanges}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button 
              className="gap-2"
              onClick={handleContinue}
            >
              Continue to Export <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Warning: You will lose all changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              Going back to the upload page will delete all the current data you've entered. 
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmBack}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, go back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dashboard>
  );
};

export default Extract;
