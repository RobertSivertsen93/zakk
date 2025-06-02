
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Ship, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShipmentStore } from '@/stores/useShipmentStore';
import InvoiceBatch from './InvoiceBatch';
import ShipmentSummary from './ShipmentSummary';
import ShipmentControls from './ShipmentControls';
import AddInvoiceDialog from './AddInvoiceDialog';

const ShipmentManager: React.FC = () => {
  const { t } = useLanguage();
  const { invoices } = useShipmentStore();
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel - Invoice Batch */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t('invoiceBatch')} ({invoices.length})
            </CardTitle>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {t('addInvoice')}
            </Button>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)] overflow-hidden">
            <InvoiceBatch />
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Summary & Controls */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              {t('shipmentSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentSummary />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('shipmentControls')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentControls />
          </CardContent>
        </Card>
      </div>

      <AddInvoiceDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default ShipmentManager;
