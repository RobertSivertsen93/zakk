
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InvoiceData } from '@/stores/useShipmentStore';
import PdfPreview from '@/components/PdfPreview';

interface InvoiceApprovalInfoProps {
  invoice: InvoiceData;
  onComplete: () => void;
  isCompleted: boolean;
}

const InvoiceApprovalInfo: React.FC<InvoiceApprovalInfoProps> = ({
  invoice,
  onComplete,
  isCompleted
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: invoice.invoiceDate,
    customerName: invoice.customerName,
    currency: invoice.currency,
    totalAmount: invoice.totalAmount.toString()
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('invoiceInformation')}</h3>
              <p className="text-muted-foreground mb-6">Review and verify the invoice details below.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">{t('invoiceNumber')}</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">{t('invoiceDate')}</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => handleFieldChange('invoiceDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">{t('customerName')}</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleFieldChange('customerName', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">{t('currency')}</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleFieldChange('currency', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">{t('totalAmount')}</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleFieldChange('totalAmount', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={onComplete}
                disabled={isCompleted}
                className="gap-2"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {t('completed')}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {t('markAsReviewed')}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* PDF Preview Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{t('pdfPreview')}</h3>
              <p className="text-sm text-muted-foreground">Review the original invoice document</p>
            </div>
            <div className="h-[500px] border rounded-lg overflow-hidden bg-white shadow-sm">
              <PdfPreview pdfUrl={invoice.pdfUrl} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceApprovalInfo;
