
import React from 'react';
import ExportOptions from '@/components/ExportOptions';
import ExtractActionButtons from '@/components/ExtractActionButtons';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="glass-panel">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Export Options</h2>
        <p className="text-sm text-muted-foreground">
          Export the validated invoice data to the customs system or download it in your preferred format.
        </p>
        
        <ExportOptions 
          data={mockData}
          onExport={handleExport}
        />
        
        <div className="pt-4">
          <ExtractActionButtons 
            onSaveChanges={handleSaveChanges}
            showContinue={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportSection;
