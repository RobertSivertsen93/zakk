
import { useState } from 'react';
import { toast } from "@/lib/toast";

// Mock data for export
const mockData = {
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

  const handleExport = () => {
    // Simple JSON export
    const dataString = JSON.stringify(mockData, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Close dialog and show success toast
    setExportDialogOpen(false);
    toast.success('Data exported successfully');
  };

  return {
    exportDialogOpen,
    setExportDialogOpen,
    handleExport
  };
};
