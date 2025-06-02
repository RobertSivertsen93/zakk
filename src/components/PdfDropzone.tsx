
import React from 'react';
import { cn } from "@/lib/utils";
import { Upload, File, FileText, AlertCircle } from "lucide-react";
import { toast } from "@/lib/toast";

type PdfDropzoneProps = {
  onPdfSelected: (file: File) => void;
};

const PdfDropzone = ({ onPdfSelected }: PdfDropzoneProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  
  const processFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    setSelectedFile(file);
    onPdfSelected(file);
    
    // Success notification
    toast.success('PDF uploaded successfully', {
      description: file.name,
    });
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept=".pdf" 
        onChange={handleFileInputChange}
      />
      
      <div
        className={cn(
          "pdf-dropzone min-h-[300px] transition-all duration-300 border-dashed border-2 rounded-xl p-8 text-center bg-secondary/50 hover:bg-secondary/80 cursor-pointer flex flex-col items-center justify-center shadow-sm hover:shadow-md",
          isDragging && "border-primary bg-primary/10 scale-[1.02]",
          selectedFile && "border-green-500 bg-green-50/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        onClick={triggerFileInput}
      >
        {selectedFile ? (
          <div className="animate-fade-in flex flex-col items-center">
            <FileText className="h-16 w-16 text-green-500 mb-4 animate-pulse-subtle" />
            <p className="font-medium text-lg mb-1">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <button 
              className="mt-4 text-sm text-primary underline focus:outline-none hover:text-primary/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Choose another file
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-primary mb-4 animate-pulse-subtle" />
            <h3 className="text-lg font-medium mb-2">Drag & Drop PDF Here</h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse files
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-md mx-auto">
              <div className="flex items-center text-xs text-muted-foreground bg-background/80 py-1 px-3 rounded-full">
                <File className="h-3 w-3 mr-1" /> PDF files only
              </div>
              <div className="flex items-center text-xs text-muted-foreground bg-background/80 py-1 px-3 rounded-full">
                <AlertCircle className="h-3 w-3 mr-1" /> Max 10MB
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PdfDropzone;
