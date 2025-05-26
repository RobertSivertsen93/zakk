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
import { InvoiceData } from "@/types/export";

type ExportOptionsProps = {
  data: InvoiceData;
  onExport: (format: string) => void;
};

const ExportOptions = ({ data, onExport }: ExportOptionsProps) => {
  const [fileFormat, setFileFormat] = useState('json');

  const generateTaksFormat = (data: InvoiceData): string => {
    console.log("data123456789", data);
    const now = new Date();
    const pad = (n: number, z = 2) => ('00' + n).slice(-z);
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
  
    const lines: string[] = [];
  
    const totalAmount = data.lineItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  
    const invoiceNumber = data.invoiceNumber || '000000';
    const customerNumber = data.customerNumber || '03440541';
    const invoiceDate = data.invoiceDate || '05.02.2025';
    const reference = data.reference || 'NSK3282697';
  
    // === Header Lines ===
    lines.push(`1;TOLL;00;${timestamp};${invoiceNumber}`);
    lines.push(`1;TOLL;10;${timestamp};1;${invoiceNumber};FAS;524;0,0000;17,000`);
  
    // === Body Lines ===
    data.lineItems?.forEach((item, index) => {
      const seq = index + 1;
      const hsCode = item.hsCode || '83024100';
      const quantity = (item.quantity || 0).toFixed(3).replace('.', ',');
      const amount = (item.amount || 0).toFixed(2).replace('.', ',');
      const netWeight = item.netWeight?.toFixed(3).replace('.', ',') || '1,020';
      const customsCode = item.customsCode || '20';
      const tariff = item.tariff?.toString() || '720';
      const dutyFreeFlag = item.dutyFree ? 'J' : 'N';
      const description = (item.description || '').padStart(26, ' ');
  
      // 20 - Customer
      lines.push(`${seq};TOLL;20;${timestamp};1;${customerNumber}`);
  
      // 40 - Invoice Info
      lines.push(`${seq};TOLL;40;${timestamp};1;${invoiceNumber};${invoiceDate};${reference};Despec Denmark;;DKK;`);
  
      // 50 - Line Item with all required fields
      lines.push(`${seq};TOLL;50;${timestamp};1;;${hsCode};${description}${quantity};${netWeight};${customsCode};${tariff};${amount};${dutyFreeFlag}`);
    });
  
    // === Footer ===
    const finalTotal = totalAmount.toFixed(2).replace('.', ',');
    lines.push(`1;TOLL;99;${timestamp};${finalTotal}`);
  
    return lines.join('\n');
  };
  
  
  


  const handleExport = () => {
    // Process based on selected export format
    onExport(fileFormat);

    // Create the appropriate data
    let dataToExport: InvoiceData = data;
    let mimeType = 'application/json';
    let fileExtension = 'json';
    let dataString = '';

    // Apply TAKS formatting if needed
    if (fileFormat === 'taks') {
      alert("taks");
      dataString = generateTaksFormat(dataToExport);
      mimeType = 'text/plain';
      fileExtension = 'txt';
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
