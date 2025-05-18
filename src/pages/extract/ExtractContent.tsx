
import React, { useState } from 'react';
import PdfUploadSection from './PdfUploadSection';
import ExtractDataSection from './ExtractDataSection';
import StepIndicator from '@/components/StepIndicator';

const ExtractContent = () => {
  const [fileName, setFileName] = useState(sessionStorage.getItem('pdf-file-name') || '');
  const [pdfUrl, setPdfUrl] = useState(sessionStorage.getItem('pdf-url') || '');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(pdfUrl ? 2 : 1);

  const handlePdfSelected = (file: File) => {
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
    setCurrentStep(2);
    
    sessionStorage.setItem('pdf-url', url);
    sessionStorage.setItem('pdf-file-name', file.name);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={currentStep} />
      
      {currentStep === 1 && (
        <PdfUploadSection onPdfSelected={handlePdfSelected} />
      )}

      {currentStep === 2 && (
        <ExtractDataSection 
          pdfUrl={pdfUrl} 
          fileName={fileName} 
          onBackToUpload={handleBackToUpload} 
        />
      )}
    </div>
  );
};

export default ExtractContent;
