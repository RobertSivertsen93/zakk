
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Form Section */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 space-y-4">
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

            <div className="pt-4">
              <Button 
                onClick={onComplete}
                disabled={isCompleted}
                className="w-full gap-2"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {t('completed')}
                  </>
                ) : (
                  t('markAsReviewed')
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PDF Preview Section */}
      <div className="space-y-4">
        <Card className="h-full">
          <CardContent className="p-6 h-full">
            <div className="space-y-4 h-full">
              <h3 className="font-medium">{t('pdfPreview')}</h3>
              <div className="h-[400px] border rounded-lg overflow-hidden">
                <PdfPreview pdfUrl={invoice.pdfUrl} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceApprovalInfo;
