import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadIcon, FileText } from "lucide-react";
import Dashboard from './Dashboard';
import PdfDropzone from '@/components/PdfDropzone';
import { toast } from "@/lib/toast";
import {uploadPDF} from "@/lib/apiFunctions";
import { useMutation } from '@tanstack/react-query';
import { useLoadingStore } from '@/stores/useLoadingStore';

const Upload = () => {
  const {showLoader, hideLoader} = useLoadingStore();
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

    // make mutation for uploading PDF
  const uploadMutation = useMutation({
    mutationFn: uploadPDF,
    onSuccess: (data) => {
      if (data) {
      sessionStorage.setItem('pdf-data', JSON.stringify(data[0]));
      // toast.success('PDF uploaded successfully');
      hideLoader();
      navigate('/extract');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Upload failed');
      hideLoader();
    }
  });
  
  // Handle PDF file selection
  const handlePdfSelected = (file: File) => {
    // Create blob from file
    const blob:any = new Blob([file], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Store blob URL and file name
    sessionStorage.setItem('pdf-file-name', file.name);
    sessionStorage.setItem('pdf-url', blobUrl);
    sessionStorage.setItem('pdf-blob', blob); // Store blob for future use
    
    setPdfFile(file);
    showLoader();
    uploadMutation.mutate(file);
  };

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      const url = sessionStorage.getItem('pdf-url');
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  
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
