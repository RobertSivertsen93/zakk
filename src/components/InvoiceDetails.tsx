
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Edit } from "lucide-react";
import { toast } from "@/lib/toast";
import { ValidatedFormField } from './form/ValidatedFormField';

interface InvoiceDetailsProps {
  extractedData: Record<string, string>;
  onSaveChanges?: (updatedData: Record<string, string>) => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ 
  extractedData,
  onSaveChanges
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(extractedData);

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    if (onSaveChanges) {
      onSaveChanges(formData);
    } else {
      // Default save behavior if no callback provided
      toast.success("Invoice details updated");
    }
    setIsEditing(false);
  };

  return (
    <Card className="glass-panel">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Invoice Information</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-1"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedFormField
            id="invoiceNumber"
            label="Fakturanummar"
            value={formData.invoiceNumber}
            onChange={(value) => handleFieldChange('invoiceNumber', value)}
            required={true}
            helpText={{
              tooltip: "The unique identifier for this invoice",
              examples: ["INV-2023-0042", "FB-12345"]
            }}
          />
          
          <ValidatedFormField
            id="invoiceDate"
            label="Fakturadagur"
            value={formData.invoiceDate}
            onChange={(value) => handleFieldChange('invoiceDate', value)}
            type="date"
            required={true}
            helpText={{
              tooltip: "Date when the invoice was issued",
              regulations: "Format: YYYY-MM-DD"
            }}
          />
          
          <ValidatedFormField
            id="dueDate"
            label="Útrokningardagur"
            value={formData.dueDate}
            onChange={(value) => handleFieldChange('dueDate', value)}
            type="date"
            required={true}
            helpText="Date when payment is due"
          />
          
          <ValidatedFormField
            id="sender"
            label="Avsendari"
            value={formData.sender}
            onChange={(value) => handleFieldChange('sender', value)}
            required={true}
            helpText="The entity that issued the invoice"
          />
          
          <ValidatedFormField
            id="documentNumber"
            label="Skjalanummar"
            value={formData.documentNumber}
            onChange={(value) => handleFieldChange('documentNumber', value)}
            helpText="Reference document number"
          />
          
          <ValidatedFormField
            id="paymentMethod"
            label="Gjaldoyra"
            value={formData.paymentMethod}
            onChange={(value) => handleFieldChange('paymentMethod', value)}
            helpText={{
              tooltip: "Currency for this invoice",
              examples: ["EUR", "USD", "DKK"]
            }}
          />
          
          <ValidatedFormField
            id="notes"
            label="Viðmerking"
            value={formData.notes}
            onChange={(value) => handleFieldChange('notes', value)}
            type="textarea"
            className="md:col-span-2"
            helpText="Additional notes or comments about this invoice"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
