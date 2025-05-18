
import React from 'react';
import ExportOptions from '@/components/ExportOptions';
import ExtractActionButtons from '@/components/ExtractActionButtons';
import { toast } from "@/lib/toast";

const ExportSection: React.FC = () => {
  const mockData = {
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
    product_1_number: '6117.80.80',
    product_1_description: 'Buff, 230 gsm - size 25*...',
    product_1_confidence: 95,
    product_2_number: '9999.99.99',
    product_2_description: 'Opstart',
    product_2_confidence: 50,
    product_3_number: '4908.90.00',
    product_3_description: 'Prøvetryk (voksen + barn)',
    product_3_confidence: 70,
    product_4_number: '4901.99.00',
    product_4_description: 'Eksportdokumenter 3 cli-...',
    product_4_confidence: 80,
  };
  
  const handleExport = (format: string) => {
    toast.success(`Exporting in ${format} format`);
  };
  
  const handleSaveChanges = () => {
    toast.success('Changes saved successfully');
  };
  
  return (
    <>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Export Options</h2>
        <ExportOptions 
          data={mockData}
          onExport={handleExport}
        />
      </section>
      
      <ExtractActionButtons 
        onSaveChanges={handleSaveChanges}
        showContinue={false}
      />
    </>
  );
};

export default ExportSection;
