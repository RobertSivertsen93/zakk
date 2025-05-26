import { useState } from 'react';
import { toast } from "@/lib/toast";
import { convertToTaksFormat } from "@/lib/utils";
import { InvoiceData } from "@/types/export";

export const useExport = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  const generateTaksFormat = (data: any): string => {
    console.log("taks123456789", data);
    const now = new Date();
    const pad = (n: number, z = 2) => ('00' + n).slice(-z);
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
  
    const totalAmount = data.lineItems?.reduce((sum: number, item: any) =>
      sum + (parseFloat(item.amount || item.totalPrice) || 0), 0) || 0;
  
    const invoiceDate = data.invoiceDate ?
      new Date(data.invoiceDate).toLocaleDateString('de-DE').replace(/\./g, '.') :
      new Date().toLocaleDateString('de-DE').replace(/\./g, '.');
  
    const output: string[] = [];
  
    // Header - 00
    output.push(`1;TOLL;00;${timestamp};${Math.floor(totalAmount)}`);
  
    // Summary - 10
    output.push(`1;TOLL;10;${timestamp};1;${Math.floor(totalAmount)};FAS;524;0,0000;17,000`);
  
    // Line Items
    (data.lineItems || []).forEach((item: any, index: number) => {
      const lineNo = index + 1;
  
      // Get the best HS code
      const hsCode =
        item.hsCode?.toString() ||
        item.hsCodeMatches?.[0]?.code?.toString() ||
        '83024100';
  
      const quantity = (parseFloat(item.quantity) || 0).toFixed(3).replace('.', ',');
      const paddedQuantity = quantity.padStart(26, ' ');
      const amount = (parseFloat(item.amount || item.totalPrice) || 0).toFixed(2).replace('.', ',');
      const invoiceNumber = `NSK${(data.invoiceNumber || '').toString().padStart(6, '0')}`;
      const netWeight = '1,020';
      const customsCode = '20';
      const tariff = '720';
      const dutyFlag = item.dutyFree ? 'J' : 'N';
  
      // Line 20 - Customer Reference
      output.push(`${lineNo};TOLL;20;${timestamp};1;03440541`);
  
      // Line 40 - Shipment/Invoice Info
      output.push(`${lineNo};TOLL;40;${timestamp};1;409044${lineNo};${invoiceDate};${invoiceNumber};${data.sender || 'Despec Denmark'};;${data.currency || 'DKK'};`);
  
      // Line 50 - Product Details
      output.push(`${lineNo};TOLL;50;${timestamp};1;;${hsCode};${paddedQuantity};${netWeight};${customsCode};${tariff};${amount};${dutyFlag}`);
    });
  
    // Footer - 99
    output.push(`1;TOLL;99;${timestamp};${totalAmount.toFixed(2).replace('.', ',')}`);
  
    return output.join('\n');
  };
  
  

  const handleExport = async () => {
    try {
      const sessionData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");
      
      let dataString = '';
      let mimeType = 'application/json';
      let fileExtension = 'json';
      const timestamp = new Date().toISOString().split('T')[0];

      if (exportFormat === 'taks') {
        dataString = generateTaksFormat(sessionData);
        mimeType = 'text/plain';
        fileExtension = 'txt';
      } else {
        // Clean and format JSON data
        const jsonData = {
          ...sessionData,
          lineItems: sessionData.lineItems?.map((item: any) => ({
            ...item,
            productNumber: item.productNumber || item.hsCode,
            amount: parseFloat(item.amount || item.totalPrice) || 0,
            quantity: parseFloat(item.quantity) || 0,
            unitPrice: parseFloat(item.unitPrice) || 0
          }))
        };
        dataString = JSON.stringify(jsonData, null, 2);
      }

      // Create and trigger download
      const blob = new Blob([dataString], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const fileName = `invoice-${sessionData.invoiceNumber || 'export'}-${timestamp}.${fileExtension}`;
      
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportDialogOpen(false);
      toast.success(`Data exported successfully as ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Failed to export data");
    }
  };

  return {
    exportDialogOpen,
    setExportDialogOpen,
    exportFormat,
    setExportFormat,
    handleExport
  };
};
