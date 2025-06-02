import React, { useState } from 'react';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertToTaksFormat } from "@/lib/utils";
import { InvoiceData } from "@/types/export";

const ExportSection: React.FC = () => {
  const [fileFormat, setFileFormat] = useState('json');
  
  const handleExport = (format: string) => {
    const sessionData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");
    
    // Prepare the invoice data from session storage
    const invoiceData: InvoiceData = {
      invoiceNumber: sessionData.invoiceNumber || '',
      invoiceDate: sessionData.invoiceDate || '',
      dueDate: sessionData.dueDate || '',
      sender: sessionData.sender || '',
      documentNumber: sessionData.documentNumber || '',
      paymentMethod: sessionData.currency || '',
      notes: sessionData.notes || '',
      lineItems: sessionData.items || []
    };

    let dataToExport = invoiceData;
    let mimeType = 'application/json';
    let fileExtension = 'json';
    let dataString = '';
    
    // Apply TAKS formatting if needed
    if (format === 'taks') {
      dataToExport = convertToTaksFormat(invoiceData);
      mimeType = 'text/plain';
      fileExtension = 'txt';
      dataString = generateTaksFormat(dataToExport); // You'll need to implement this function
    } else {
      // Standard JSON export
      dataString = JSON.stringify(dataToExport, null, 2);
    }
    
    // Create and trigger download
    const blob = new Blob([dataString], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data-${new Date().toISOString()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Export completed in ${format.toUpperCase()} format`);
  };

  return (
    <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Export Invoice</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Export the invoice data in your preferred format.
        </p>
        
        <div className="bg-secondary/30 p-4 rounded-md flex gap-4 items-center mb-6 border border-secondary/50 shadow-sm">
          <div className="p-3 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Ready to Export</h3>
            <p className="text-sm text-muted-foreground">
              Your data has been processed and is ready to be exported.
            </p>
          </div>
        </div>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select
              value={fileFormat}
              onValueChange={setFileFormat}
            >
              <SelectTrigger className="border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON (Standard)</SelectItem>
                <SelectItem value="taks">TAKS Format</SelectItem>
              </SelectContent>
            </Select>
            
            {fileFormat === 'taks' && (
              <div className="mt-2 p-2 rounded bg-blue-50 border border-blue-100 text-sm text-blue-800">
                <p className="font-medium">TAKS Format Conversion</p>
                <ul className="list-disc pl-4 mt-1 text-xs">
                  <li>HS codes will be exported without dots (e.g., "61178080")</li>
                  <li>Decimal values will use commas instead of periods (e.g., "1,020")</li>
                </ul>
              </div>
            )}
          </div>
          
          <Button 
            onClick={() => handleExport(fileFormat)}
            className="mt-8 w-full flex items-center justify-center gap-2 py-6 text-white bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-1px]"
            size="lg"
          >
            <Download className="h-5 w-5" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate TAKS format (implement according to your needs)
const generateTaksFormat = (data: InvoiceData): string => {
  // Implement TAKS format generation logic here
  // This is just a placeholder - implement according to your TAKS format requirements
  const lines = [
    "1;TOLL;00;" + new Date().toISOString() + ";314188",
    ...data.lineItems.map((item, index) => 
      `${index + 1};TOLL;50;${new Date().toISOString()};1;;${item.productNumber?.replace(/\./g, '')};${item.weight?.replace(".", ",")};${item.quantity};732;${item.amount?.replace(".", ",")};N`
    )
  ];
  return lines.join('\n');
};

export default ExportSection;
