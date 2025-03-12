import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import Dashboard from './Dashboard';
import { InvoiceFormFields } from '@/components/FormFields';
import { toast } from "@/lib/toast";

const Extract = () => {
  const navigate = useNavigate();
  const fileName = sessionStorage.getItem('pdf-file-name') || 'invoice.pdf';
  
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
    productNumber: 'PROD-001',
    countryOfOrigin: 'Denmark',
    quantity: '2',
    unitPrice: '450',
    amount: '900',
  }), []);
  
  const handleSaveChanges = () => {
    // In a real app, this would save the changes to the server
    // For demo, we'll just show a toast
    toast.success('Changes saved successfully');
  };
  
  const handleContinue = () => {
    navigate('/export');
  };
  
  return (
    <Dashboard 
      title={`Extract Data: ${fileName}`}
      description="Review and edit the extracted information"
    >
      <div className="space-y-8">
        <div className="step-indicator">
          <div className="step-dot"></div>
          <div className="step-line"></div>
          <div className="step-dot step-dot-active"></div>
          <div className="step-line"></div>
          <div className="step-dot"></div>
        </div>
        
        <InvoiceFormFields initialData={extractedData} />
        
        <div className="flex flex-wrap justify-between gap-4">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/upload')}
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
    </Dashboard>
  );
};

export default Extract;
