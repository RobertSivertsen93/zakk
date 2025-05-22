
import { useState } from 'react';
import { toast } from "@/lib/toast";
import { convertToTaksFormat } from "@/lib/utils";
import { InvoiceData } from "@/types/export";

// Mock data for export
const mockData: InvoiceData = {
  invoiceNumber: 'INV-2023-0042',
  invoiceDate: '2023-12-03',
  dueDate: '2023-12-15',
  sender: 'Acme Corporation',
  documentNumber: 'DOC-2023-0042',
  paymentMethod: 'EUR',
  notes: 'Payment due within 15 days',
  lineItems: []
};

export const useExport = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  const handleExport = () => {
    let dataToExport: InvoiceData = mockData;
    let mimeType = 'application/json';
    let fileExtension = 'json';
    let dataString = '';
    
    // Apply TAKS formatting if needed
    if (exportFormat === 'taks') {
      dataToExport = convertToTaksFormat(mockData);
      mimeType = 'text/plain';
      fileExtension = 'txt';
      
      // Generate TAKS format as text
      // This is a simplified example - actual TAKS formatting would need more specific implementation
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
    
    // Close dialog and show success toast
    setExportDialogOpen(false);
    toast.success(`Data exported successfully as ${exportFormat.toUpperCase()}`);
  };

  return {
    exportDialogOpen,
    setExportDialogOpen,
    exportFormat,
    setExportFormat,
    handleExport
  };
};
