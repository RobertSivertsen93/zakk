
import React from 'react';
import { useShipmentStore } from '@/stores/useShipmentStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

const ShipmentSummary: React.FC = () => {
  const { t } = useLanguage();
  const { invoices, selectedInvoices, getApprovedInvoices, getProcessedInvoices } = useShipmentStore();

  const totalInvoices = invoices.length;
  const approvedInvoices = getApprovedInvoices();
  const processedInvoices = getProcessedInvoices();
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const rejectedInvoices = invoices.filter(inv => inv.status === 'rejected');
  const selectedCount = selectedInvoices.length;

  const totalValue = approvedInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const currencies = [...new Set(approvedInvoices.map(inv => inv.currency))];

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-secondary/20 rounded-lg">
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <div className="text-xs text-muted-foreground">{t('totalInvoices')}</div>
        </div>
        <div className="text-center p-3 bg-secondary/20 rounded-lg">
          <div className="text-2xl font-bold">{selectedCount}</div>
          <div className="text-xs text-muted-foreground">{t('selected')}</div>
        </div>
      </div>

      <Separator />

      {/* Processing Status */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Processing Status</h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Ready</span>
          </div>
          <Badge variant="secondary">{processedInvoices.length}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Processing</span>
          </div>
          <Badge variant="secondary">{totalInvoices - processedInvoices.length}</Badge>
        </div>
      </div>

      <Separator />

      {/* Status Breakdown */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">{t('statusBreakdown')}</h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">{t('approved')}</span>
          </div>
          <Badge variant="secondary">{approvedInvoices.length}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{t('pending')}</span>
          </div>
          <Badge variant="secondary">{pendingInvoices.length}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm">{t('rejected')}</span>
          </div>
          <Badge variant="secondary">{rejectedInvoices.length}</Badge>
        </div>
      </div>

      {approvedInvoices.length > 0 && (
        <>
          <Separator />
          
          {/* Value Summary */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t('approvedValue')}</h4>
            <div className="text-lg font-semibold">
              {totalValue.toLocaleString()} {currencies.join(', ')}
            </div>
            <div className="text-xs text-muted-foreground">
              {approvedInvoices.length} {t('invoicesReadyForExport')}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShipmentSummary;
