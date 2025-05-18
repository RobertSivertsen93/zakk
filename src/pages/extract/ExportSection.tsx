
import React from 'react';
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

const ExportSection: React.FC = () => {
  // Mock data that would come from actual application state
  const mockData = {
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
    lineItems: [
      {
        id: '1',
        productNumber: '6117.80.80',
        countryOfOrigin: 'China',
        description: 'Buff, 230 gsm - size 25*...',
        quantity: '1000',
        unitPrice: '2.50',
        amount: '2500',
        confidencePercentage: 95,
      },
      {
        id: '2',
        productNumber: '9999.99.99',
        countryOfOrigin: 'Denmark',
        description: 'Opstart',
        quantity: '1',
        unitPrice: '150',
        amount: '150',
        confidencePercentage: 50,
      }
    ]
  };
  
  const handleExport = (format: string) => {
    toast.success(`Exporting in ${format.toUpperCase()} format`);
    
    // Create data string for JSON format
    if (format === 'json') {
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
    } else {
      // Handle other formats (CSV, XML, etc.)
      toast.info(`${format.toUpperCase()} export would be implemented here`);
    }
  };
  
  const [exportFormat, setExportFormat] = React.useState('json');
  
  return (
    <Card className="glass-panel">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Export Invoice</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Export the invoice data in your preferred format.
        </p>
        
        <div className="bg-muted/20 p-4 rounded-md flex gap-3 items-center mb-4">
          <div className="p-2 rounded-full bg-muted flex items-center justify-center">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium">Ready to Export</h3>
            <p className="text-sm text-muted-foreground">
              Your data is ready to be exported.
            </p>
          </div>
        </div>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select
              value={exportFormat}
              onValueChange={setExportFormat}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={() => handleExport(exportFormat)}
            className="mt-4 w-full flex items-center justify-center gap-2"
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

export default ExportSection;
