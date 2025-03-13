
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import Dashboard from './Dashboard';
import ExportOptions from '@/components/ExportOptions';

const Handling = () => {
  const navigate = useNavigate();
  const fileName = sessionStorage.getItem('pdf-file-name') || 'invoice.pdf';
  
  // For demo purposes, we'll use sample data
  // In a real app, this would come from the previous step
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
  
  const handleExport = (format: string) => {
    // In a real app, this would trigger the export process
    console.log(`Exporting in ${format} format`);
  };
  
  const handleProcessAnother = () => {
    // Clear session storage
    sessionStorage.removeItem('pdf-file-name');
    // Navigate to upload page
    navigate('/upload');
  };
  
  return (
    <Dashboard 
      title={`Export Data: ${fileName}`}
      description="Choose format and export the extracted data"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap justify-between gap-4">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/extract')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Extraction
          </Button>
        </div>
        
        <ExportOptions 
          data={extractedData}
          onExport={handleExport}
        />
        
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={handleProcessAnother}
          >
            <FilePlus2 className="h-4 w-4" />
            Process Another PDF
          </Button>
        </div>
      </div>
    </Dashboard>
  );
};

export default Handling;
