
import React, { useState } from 'react';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";
import ExportTemplates from '@/components/export/ExportTemplates';
import HSCodeHistory from '@/components/line-items/HSCodeHistory';
import { ValidationSection } from '@/components/validation/SectionValidator';
import SectionValidator from '@/components/validation/SectionValidator';

const ExportSection: React.FC = () => {
  const [validationStatus, setValidationStatus] = useState<ValidationSection>({
    id: 'export',
    title: 'Export Validation',
    items: [
      {
        id: 'valid-hs-codes',
        label: 'All HS codes are valid',
        description: 'Each line item must have a properly formatted HS code',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'country-origin',
        label: 'Country of origin specified',
        description: 'Each line item must have a country of origin',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'complete-data',
        label: 'Complete item data',
        description: 'All line items have quantity, price and description',
        isRequired: true,
        status: 'pending'
      },
      {
        id: 'customs-ready',
        label: 'Ready for customs submission',
        description: 'Invoice data meets all requirements for customs submission',
        isRequired: false,
        status: 'pending'
      }
    ]
  });
  
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
  
  const handleExport = (format: string, templateId: string) => {
    toast.success(`Exporting in ${format.toUpperCase()} format using ${templateId} template`);
  };
  
  const handleValidate = () => {
    // Simulate validation process
    toast.info('Validating export data...');
    
    // Simulate validation process completing
    setTimeout(() => {
      // Update validation statuses
      const updatedSection = { ...validationStatus };
      
      // Check for valid HS codes
      const hasValidHSCodes = mockData.lineItems.every(
        item => item.productNumber && /^\d{4}\.\d{2}\.\d{2}$/.test(item.productNumber)
      );
      updatedSection.items[0].status = hasValidHSCodes ? 'valid' : 'invalid';
      
      // Check for country of origin
      const hasCountryOrigin = mockData.lineItems.every(
        item => item.countryOfOrigin && item.countryOfOrigin.trim() !== ''
      );
      updatedSection.items[1].status = hasCountryOrigin ? 'valid' : 'invalid';
      
      // Check for complete data
      const hasCompleteData = mockData.lineItems.every(
        item => item.quantity && item.unitPrice && item.description
      );
      updatedSection.items[2].status = hasCompleteData ? 'valid' : 'warning';
      
      // Check overall customs readiness
      const isCustomsReady = hasValidHSCodes && hasCountryOrigin && hasCompleteData;
      updatedSection.items[3].status = isCustomsReady ? 'valid' : 'warning';
      
      setValidationStatus(updatedSection);
      
      toast.success('Validation complete');
    }, 1500);
  };
  
  const handleUpdateStatus = (itemId: string, status: 'valid' | 'invalid' | 'warning' | 'pending') => {
    const updatedSection = { ...validationStatus };
    const itemIndex = updatedSection.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      updatedSection.items[itemIndex].status = status;
      setValidationStatus(updatedSection);
    }
  };
  
  const handleSelectHistoricalCode = (code: string, description: string) => {
    // In a real app, this would update a selected line item
    toast.success(`Selected historical HS code: ${code}`);
  };
  
  return (
    <Card className="glass-panel">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Export Options</h2>
          <div className="flex gap-2">
            <HSCodeHistory onSelectCode={handleSelectHistoricalCode} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Export the validated invoice data to the customs system or download it in your preferred format.
        </p>
        
        <SectionValidator
          section={validationStatus}
          onValidate={handleValidate}
          onUpdateStatus={handleUpdateStatus}
        />
        
        <div className="bg-muted/20 p-4 rounded-md flex gap-3 items-center mb-4">
          <div className="p-2 rounded-full bg-muted flex items-center justify-center">
            {validationStatus.items.every(item => item.status === 'valid' || (!item.isRequired && item.status === 'warning'))
              ? <Check className="h-5 w-5 text-green-500" />
              : <AlertTriangle className="h-5 w-5 text-yellow-500" />
            }
          </div>
          <div>
            <h3 className="font-medium">Export Readiness</h3>
            <p className="text-sm text-muted-foreground">
              {validationStatus.items.every(item => item.status === 'valid' || (!item.isRequired && item.status === 'warning'))
                ? 'Your data is ready to be exported for customs processing.'
                : 'Some issues need to be addressed before exporting.'}
            </p>
          </div>
        </div>
        
        <ExportTemplates 
          data={mockData}
          onExport={handleExport}
        />
      </CardContent>
    </Card>
  );
};

export default ExportSection;
