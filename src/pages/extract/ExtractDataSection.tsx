
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InvoiceDataSection from './InvoiceDataSection';
import LineItemsSection from './LineItemsSection';
import ExportSection from './ExportSection';

interface ExtractDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onBackToUpload: () => void;
}

const ExtractDataSection: React.FC<ExtractDataSectionProps> = ({ 
  pdfUrl, 
  fileName, 
  onBackToUpload 
}) => {
  return (
    <div className="space-y-10">
      <div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={onBackToUpload}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Upload
        </Button>
      </div>
      
      <InvoiceDataSection pdfUrl={pdfUrl} fileName={fileName} />
      <LineItemsSection />
      <ExportSection />
    </div>
  );
};

export default ExtractDataSection;
