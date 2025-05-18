
import React from 'react';
import InvoiceDataSection from './InvoiceDataSection';

interface ExtractDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onBackToUpload: () => void;
  onComplete?: () => void;
}

const ExtractDataSection: React.FC<ExtractDataSectionProps> = ({ 
  pdfUrl, 
  fileName,
  onComplete
}) => {
  return (
    <div className="space-y-10">
      <InvoiceDataSection pdfUrl={pdfUrl} fileName={fileName} onComplete={onComplete} />
    </div>
  );
};

export default ExtractDataSection;
