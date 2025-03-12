
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceFormFields } from '@/components/FormFields';

interface InvoiceDetailsProps {
  extractedData: Record<string, string>;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ extractedData }) => {
  return (
    <Card className="glass-panel">
      <CardContent className="p-6">
        <InvoiceFormFields initialData={extractedData} showLineItems={false} />
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
