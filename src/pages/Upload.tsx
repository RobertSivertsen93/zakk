
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, UploadIcon, FileText, FileOutput } from "lucide-react";
import Dashboard from './Dashboard';
import PdfDropzone from '@/components/PdfDropzone';
import PdfPreview from '@/components/PdfPreview';
import { toast } from "@/lib/toast";

const Upload = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = React.useState<string>('');
  
  // Handle PDF file selection
  const handlePdfSelected = (file: File) => {
    setPdfFile(file);
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    
    // Store the file in sessionStorage (for demo purposes)
    sessionStorage.setItem('pdf-file-name', file.name);
    
    // In a real app, we would process the file here
    // For demo, we'll simulate processing
    simulateProcessing();
  };
  
  // Simulate PDF processing
  const simulateProcessing = () => {
    // In a real app, this would be an API call to process the PDF
    // For now, we'll just set a timeout to simulate processing
    toast.info('Processing PDF...', {
      duration: 2000,
    });
    
    setTimeout(() => {
      toast.success('PDF processed successfully');
    }, 2000);
  };
  
  // Navigate to extraction page
  const handleContinue = () => {
    if (pdfFile) {
      navigate('/extract');
    } else {
      toast.error('Please upload a PDF first');
    }
  };
  
  return (
    <Dashboard 
      title="Upload Invoice"
      description="Upload a PDF invoice to extract data"
    >
      <div className="space-y-8">
        <div className="step-indicator">
          <div className="step-item">
            <div className="step-dot step-dot-active">1</div>
            <span className="step-label step-label-active">Upload PDF</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-dot">2</div>
            <span className="step-label">Data Management</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-dot">3</div>
            <span className="step-label">Export</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PdfDropzone onPdfSelected={handlePdfSelected} />
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleContinue}
                disabled={!pdfFile}
              >
                Continue to Extraction <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {pdfUrl && (
            <div>
              <PdfPreview pdfUrl={pdfUrl} />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Upload;
