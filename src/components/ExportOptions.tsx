
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/lib/toast";

type ExportOptionsProps = {
  data: Record<string, any>;
  onExport: (format: string) => void;
};

const ExportOptions = ({ data, onExport }: ExportOptionsProps) => {
  const handleExport = () => {
    // Default to JSON export
    const format = 'json';
    onExport(format);
    
    // Create data string
    const dataString = JSON.stringify(data, null, 2);
    
    // Create blob and download
    const blob = new Blob([dataString], { 
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File exported successfully');
  };
  
  return (
    <div className="flex justify-center my-6">
      <Button 
        size="lg" 
        className="gap-2"
        onClick={handleExport}
      >
        <Download className="h-5 w-5" />
        Export Data
      </Button>
    </div>
  );
};

export default ExportOptions;
