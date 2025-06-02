
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShipmentStore, InvoiceData } from '@/stores/useShipmentStore';
import InvoiceApprovalInfo from './InvoiceApprovalInfo';
import InvoiceApprovalLineItems from './InvoiceApprovalLineItems';

interface InvoiceApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceData | null;
}

const InvoiceApprovalDialog: React.FC<InvoiceApprovalDialogProps> = ({
  open,
  onOpenChange,
  invoice
}) => {
  const { t } = useLanguage();
  const { updateInvoiceStatus } = useShipmentStore();
  const [activeTab, setActiveTab] = useState('info');
  const [infoCompleted, setInfoCompleted] = useState(false);
  const [lineItemsCompleted, setLineItemsCompleted] = useState(false);

  if (!invoice) return null;

  const canApprove = infoCompleted && lineItemsCompleted;

  const handleApprove = () => {
    updateInvoiceStatus(invoice.id, 'approved');
    onOpenChange(false);
    // Reset completion states for next use
    setInfoCompleted(false);
    setLineItemsCompleted(false);
    setActiveTab('info');
  };

  const handleReject = () => {
    updateInvoiceStatus(invoice.id, 'rejected');
    onOpenChange(false);
    // Reset completion states for next use
    setInfoCompleted(false);
    setLineItemsCompleted(false);
    setActiveTab('info');
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset states when closing without action
    setInfoCompleted(false);
    setLineItemsCompleted(false);
    setActiveTab('info');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{t('approveInvoice')}: {invoice.invoiceNumber}</span>
            <Badge 
              className={`${
                invoice.status === 'approved' ? 'bg-green-100 text-green-800' :
                invoice.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}
            >
              {t(invoice.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info" className="flex items-center gap-2">
              {infoCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
              {t('invoiceInformation')}
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              {lineItemsCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
              {t('lineItems')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="flex-1 mt-4">
            <InvoiceApprovalInfo 
              invoice={invoice}
              onComplete={() => setInfoCompleted(true)}
              isCompleted={infoCompleted}
            />
          </TabsContent>

          <TabsContent value="items" className="flex-1 mt-4">
            <InvoiceApprovalLineItems 
              invoice={invoice}
              onComplete={() => setLineItemsCompleted(true)}
              isCompleted={lineItemsCompleted}
            />
          </TabsContent>
        </Tabs>

        {/* Action buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            {t('cancel')}
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              onClick={handleReject}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              {t('reject')}
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={!canApprove}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {t('approve')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceApprovalDialog;
