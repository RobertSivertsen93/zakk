
import React from 'react';
import { FormFields, FormField } from './form/FormFields';

interface InvoiceFormFieldsProps {
  initialData?: Record<string, string>;
  showLineItems?: boolean;
}

export const InvoiceFormFields = ({ 
  initialData = {}, 
  showLineItems = true 
}: InvoiceFormFieldsProps) => {
  const [formData, setFormData] = React.useState<Record<string, FormField>>({
    invoiceNumber: {
      id: 'invoiceNumber',
      label: 'Fakturanummar',
      value: initialData.invoiceNumber || '',
      type: 'text',
      required: true,
      helpText: 'The unique identifier for this invoice'
    },
    invoiceDate: {
      id: 'invoiceDate',
      label: 'Fakturadagur',
      value: initialData.invoiceDate || '',
      type: 'date',
      required: true,
      helpText: 'Date when the invoice was issued'
    },
    dueDate: {
      id: 'dueDate',
      label: 'Útrokningardagur',
      value: initialData.dueDate || '',
      type: 'date',
      required: true,
      helpText: 'Date when payment is due'
    },
    sender: {
      id: 'sender',
      label: 'Avsendari',
      value: initialData.sender || '',
      type: 'text',
      required: true,
      helpText: 'The entity that issued the invoice'
    },
    documentNumber: {
      id: 'documentNumber',
      label: 'Skjalanummar',
      value: initialData.documentNumber || '',
      type: 'text',
      helpText: 'Reference document number'
    },
    paymentMethod: {
      id: 'paymentMethod',
      label: 'Gjaldoyra',
      value: initialData.paymentMethod || '',
      type: 'select',
      options: ['Vel gjaldoyra', 'EUR', 'USD', 'GBP', 'DKK', 'NOK', 'SEK'],
      helpText: 'Currency for this invoice'
    },
    notes: {
      id: 'notes',
      label: 'Viðmerking',
      value: initialData.notes || '',
      type: 'text',
      helpText: 'Additional notes or comments'
    },
    // Line item fields are included but will be filtered out if showLineItems is false
    productNumber: {
      id: 'productNumber',
      label: 'Vørunummar',
      value: initialData.productNumber || '',
      type: 'text',
      helpText: 'Product reference number'
    },
    countryOfOrigin: {
      id: 'countryOfOrigin',
      label: 'Upprunaland',
      value: initialData.countryOfOrigin || '',
      type: 'text',
      helpText: 'Country where the product originates'
    },
    quantity: {
      id: 'quantity',
      label: 'Tal á eindum',
      value: initialData.quantity || '',
      type: 'number',
      helpText: 'Number of units'
    },
    unitPrice: {
      id: 'unitPrice',
      label: 'Nettovekt',
      value: initialData.unitPrice || '',
      type: 'number',
      helpText: 'Net weight per unit'
    },
    amount: {
      id: 'amount',
      label: 'Upphædd',
      value: initialData.amount || '',
      type: 'number',
      helpText: 'Total amount'
    },
  });

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        value
      }
    }));
  };

  // Split fields into invoice info (first 7) and line items (rest)
  const invoiceInfoFields = Object.values(formData).slice(0, 7);
  const lineItemFields = Object.values(formData).slice(7);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <FormFields 
          fields={invoiceInfoFields} 
          onFieldChange={handleFieldChange}
        />
      </div>
      
      {showLineItems && (
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-medium border-b pb-2">Line Items</h3>
          <FormFields 
            fields={lineItemFields} 
            onFieldChange={handleFieldChange}
          />
        </div>
      )}
    </div>
  );
};

export default InvoiceFormFields;
