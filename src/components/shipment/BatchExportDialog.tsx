
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/stores/useShipmentStore';
import { Download, FileText } from 'lucide-react';
import { toast } from '@/lib/toast';

interface BatchExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoices: InvoiceData[];
  shipmentName: string;
}

const BatchExportDialog: React.FC<BatchExportDialogProps> = ({
  open,
  onOpenChange,
  invoices,
  shipmentName
}) => {
  const { t } = useLanguage();
  const [exportFormat, setExportFormat] = useState('taks');
  const [customFileName, setCustomFileName] = useState('');

  const generateFileName = () => {
    const name = customFileName || shipmentName || 'shipment';
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `${name}-${timestamp}`;
  };

  const generateTaksFormat = (invoices: InvoiceData[]): string => {
    const lines: string[] = [];
    const timestamp = new Date().toISOString();
    
    // Header line
    lines.push(`1;TOLL;00;${timestamp};314188`);
    
    // Process each invoice
    invoices.forEach((invoice, invoiceIndex) => {
      // Invoice header (type 40)
      lines.push(
        `${invoiceIndex + 1};TOLL;40;${timestamp};1;${invoice.invoiceNumber};${invoice.invoiceDate};${invoice.invoiceNumber};${invoice.customerName};;${invoice.currency};`
      );
      
      // Line items (type 50)
      invoice.lineItems.forEach((item, itemIndex) => {
        const weight = typeof item.weight === 'string' ? item.weight.replace('.', ',') : '0,000';
        const quantity = typeof item.quantity === 'string' ? item.quantity : item.quantity?.toString() || '0';
        const amount = typeof item.amount === 'string' ? item.amount.replace('.', ',') : item.amount?.toString().replace('.', ',') || '0,00';
        const productNumber = item.productNumber?.replace(/\./g, '') || '';
        
        lines.push(
          `${itemIndex + 1};TOLL;50;${timestamp};1;;${productNumber};${weight};${quantity};053;${amount};J`
        );
      });
    });
    
    // Total line (type 99)
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    lines.push(`1;TOLL;99;${timestamp};${totalAmount.toString().replace('.', ',')}`);
    
    return lines.join('\n');
  };

  const handleExport = () => {
    if (invoices.length === 0) {
      toast.error(t('noApprovedInvoices'));
      return;
    }

    let content = '';
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    if (exportFormat === 'taks') {
      content = generateTaksFormat(invoices);
    } else {
      // JSON format
      content = JSON.stringify(invoices, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
    }

    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generateFileName()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(t('exportCompleted'), {
      description: `${invoices.length} ${t('invoicesExported')}`
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {t('exportShipment')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{t('exportSummary')}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {invoices.length} {t('approvedInvoicesWillBeExported')}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-format">{t('exportFormat')}</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="taks">TAKS Format</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-name">{t('fileName')} ({t('optional')})</Label>
            <Input
              id="file-name"
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              placeholder={generateFileName()}
            />
          </div>

          {exportFormat === 'taks' && (
            <div className="p-2 rounded bg-blue-50 border border-blue-100 text-sm text-blue-800">
              <p className="font-medium">{t('taksFormatNote')}</p>
              <ul className="list-disc pl-4 mt-1 text-xs">
                <li>{t('hsCodesWithoutDots')}</li>
                <li>{t('decimalCommas')}</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleExport} disabled={invoices.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchExportDialog;
