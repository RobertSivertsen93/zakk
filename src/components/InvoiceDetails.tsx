
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceFormFields } from '@/components/FormFields';

interface InvoiceDetailsProps {
  extractedData: Record<string, string>;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ extractedData }) => {
  return (
    <Card className="glass-panel">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b pb-2">Invoice Information</h3>
        <InvoiceFormFields initialData={extractedData} />
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
