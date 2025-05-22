
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/lib/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertToTaksFormat } from "@/lib/utils";

type ExportOptionsProps = {
  data: Record<string, any>;
  onExport: (format: string) => void;
};

const ExportOptions = ({ data, onExport }: ExportOptionsProps) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [fileFormat, setFileFormat] = useState('json');
  
  const handleExport = () => {
    // Process based on selected export format
    onExport(fileFormat);
    
    // Create the appropriate data
    let dataToExport = data;
    let mimeType = 'application/json';
    let fileExtension = 'json';
    let dataString = '';
    
    // Apply TAKS formatting if needed
    if (fileFormat === 'taks') {
      dataToExport = convertToTaksFormat(data);
      mimeType = 'text/plain';
      fileExtension = 'txt';
      
      // Generate TAKS format as text
      dataString = Object.entries(dataToExport)
        .map(([key, value]) => `${key};${value}`)
        .join('\n');
    } else {
      // Standard JSON export
      dataString = JSON.stringify(dataToExport, null, 2);
    }
    
    // Create blob and download
    const blob = new Blob([dataString], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`File exported successfully as ${fileFormat.toUpperCase()}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Export Format</label>
        <Select value={fileFormat} onValueChange={setFileFormat}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON (Standard)</SelectItem>
            <SelectItem value="taks">TAKS Format</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-center my-6">
        <Button 
          size="lg" 
          className="gap-2 w-full"
          onClick={handleExport}
        >
          <Download className="h-5 w-5" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;
