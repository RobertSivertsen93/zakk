
import React from 'react';
import InvoiceDataSection from './InvoiceDataSection';

interface ExtractDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onBackToUpload: () => void;
}

const ExtractDataSection: React.FC<ExtractDataSectionProps> = ({ 
  pdfUrl, 
  fileName
}) => {
  return (
    <div className="space-y-10">
      <InvoiceDataSection pdfUrl={pdfUrl} fileName={fileName} />
    </div>
  );
};

export default ExtractDataSection;
