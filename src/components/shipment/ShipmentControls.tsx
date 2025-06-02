
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShipmentStore } from '@/stores/useShipmentStore';
import { Download, Trash2, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BatchExportDialog from './BatchExportDialog';

const ShipmentControls: React.FC = () => {
  const { t } = useLanguage();
  const { 
    shipmentName, 
    setShipmentName, 
    invoices,
    selectedInvoices,
    selectAllInvoices,
    clearSelection,
    clearShipment,
    getApprovedInvoices
  } = useShipmentStore();
  
  const [showExportDialog, setShowExportDialog] = useState(false);

  const approvedInvoices = getApprovedInvoices();
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const rejectedInvoices = invoices.filter(inv => inv.status === 'rejected');
  
  const canExport = approvedInvoices.length > 0;
  const allSelected = selectedInvoices.length === invoices.length && invoices.length > 0;
  const hasUnapprovedInvoices = pendingInvoices.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllInvoices();
    }
  };

  return (
    <div className="space-y-4">
      {/* Shipment Name */}
      <div className="space-y-2">
        <Label htmlFor="shipment-name">{t('shipmentName')}</Label>
        <Input
          id="shipment-name"
          value={shipmentName}
          onChange={(e) => setShipmentName(e.target.value)}
          placeholder={t('enterShipmentName')}
        />
      </div>

      {/* Approval Status Summary */}
      <div className="space-y-2">
        <Label>{t('approvalStatus')}</Label>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded border">
            <div className="text-lg font-semibold text-green-600">{approvedInvoices.length}</div>
            <div className="text-xs text-muted-foreground">{t('approved')}</div>
          </div>
          <div className="text-center p-2 rounded border">
            <div className="text-lg font-semibold text-yellow-600">{pendingInvoices.length}</div>
            <div className="text-xs text-muted-foreground">{t('pending')}</div>
          </div>
          <div className="text-center p-2 rounded border">
            <div className="text-lg font-semibold text-red-600">{rejectedInvoices.length}</div>
            <div className="text-xs text-muted-foreground">{t('rejected')}</div>
          </div>
        </div>
      </div>

      {/* Warning for unapproved invoices */}
      {hasUnapprovedInvoices && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            {t('pendingInvoicesWarning')}
          </span>
        </div>
      )}

      {/* Batch Operations */}
      <div className="space-y-2">
        <Label>{t('batchOperations')}</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={handleSelectAll}
            disabled={invoices.length === 0}
          >
            {allSelected ? (
              <Square className="h-4 w-4 mr-2" />
            ) : (
              <CheckSquare className="h-4 w-4 mr-2" />
            )}
            {allSelected ? t('deselectAll') : t('selectAll')}
          </Button>
        </div>
      </div>

      {/* Export Controls */}
      <div className="space-y-2">
        <Button
          className="w-full"
          onClick={() => setShowExportDialog(true)}
          disabled={!canExport}
        >
          <Download className="h-4 w-4 mr-2" />
          {t('exportApproved')} ({approvedInvoices.length})
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={clearShipment}
          disabled={invoices.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {t('clearShipment')}
        </Button>
      </div>

      <BatchExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        invoices={approvedInvoices}
        shipmentName={shipmentName}
      />
    </div>
  );
};

export default ShipmentControls;
