
import React from 'react';
import PdfDropzone from '@/components/PdfDropzone';

interface PdfUploadSectionProps {
  onPdfSelected: (file: File) => void;
}

const PdfUploadSection: React.FC<PdfUploadSectionProps> = ({ onPdfSelected }) => {
  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">Upload Invoice PDF</h2>
      <PdfDropzone onPdfSelected={onPdfSelected} />
    </section>
  );
};

export default PdfUploadSection;
