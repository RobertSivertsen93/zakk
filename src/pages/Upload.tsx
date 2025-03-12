
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadIcon, FileText } from "lucide-react";
import Dashboard from './Dashboard';
import PdfDropzone from '@/components/PdfDropzone';
import { toast } from "@/lib/toast";
import StepIndicator from '@/components/StepIndicator';

const Upload = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  
  // Handle PDF file selection
  const handlePdfSelected = (file: File) => {
    setPdfFile(file);
    
    // Store the file in sessionStorage (for demo purposes)
    sessionStorage.setItem('pdf-file-name', file.name);
    const url = URL.createObjectURL(file);
    sessionStorage.setItem('pdf-url', url);
    
    // Simulate processing
    simulateProcessing();
  };
  
  // Simulate PDF processing and then navigate to extraction
  const simulateProcessing = () => {
    toast.info('Processing PDF...', {
      duration: 2000,
    });
    
    // After processing, navigate to extraction page
    setTimeout(() => {
      toast.success('PDF processed successfully');
      navigate('/extract');
    }, 2000);
  };
  
  return (
    <Dashboard 
      title="Upload Invoice"
      description="Upload a PDF invoice to extract data"
    >
      <div className="space-y-8">
        <StepIndicator currentStep={1} />
        
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            <PdfDropzone onPdfSelected={handlePdfSelected} />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Upload;
