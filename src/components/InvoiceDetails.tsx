
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Edit } from "lucide-react";
import { toast } from "@/lib/toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [receiptOfOrigin, setReceiptOfOrigin] = useState<boolean>(
    extractedData.receiptOfOrigin === 'true' || false
  );
  const { t } = useLanguage();

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      receiptOfOrigin: receiptOfOrigin.toString()
    };
    
    if (onSaveChanges) {
      onSaveChanges(updatedData);
    } else {
      // Default save behavior if no callback provided
      toast.success("Invoice details updated");
    }
    setIsEditing(false);
  };

  return (
    <Card className="shadow-md border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6 pb-2 border-b">
          <h3 className="text-lg font-medium text-gray-800">Invoice Information</h3>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-1 transition-all duration-300 ${isEditing ? 'bg-primary hover:bg-primary/90 shadow-sm' : 'hover:bg-secondary/60'}`}
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
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber" className="text-sm font-medium text-gray-700">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="invoiceDate" className="text-sm font-medium text-gray-700">Invoice Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => handleFieldChange('invoiceDate', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleFieldChange('dueDate', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sender" className="text-sm font-medium text-gray-700">Sender</Label>
            <Input
              id="sender"
              value={formData.sender}
              onChange={(e) => handleFieldChange('sender', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="documentNumber" className="text-sm font-medium text-gray-700">Document Number</Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => handleFieldChange('documentNumber', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">Currency</Label>
            <Input
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => handleFieldChange('paymentMethod', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatNumber" className="text-sm font-medium text-gray-700">{t('vatNumber')}</Label>
            <Input
              id="vatNumber"
              value={formData.vatNumber || ''}
              onChange={(e) => handleFieldChange('vatNumber', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goodsNumber" className="text-sm font-medium text-gray-700">{t('goodsNumber')}</Label>
            <Input
              id="goodsNumber"
              value={formData.goodsNumber || ''}
              onChange={(e) => handleFieldChange('goodsNumber', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"}
            />
          </div>
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-gray-50/50">
              <Checkbox
                id="receiptOfOrigin"
                checked={receiptOfOrigin}
                onCheckedChange={(checked) => setReceiptOfOrigin(!!checked)}
                disabled={!isEditing}
                className={`h-5 w-5 ${!isEditing ? "opacity-50" : ""} data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600`}
              />
              <Label 
                htmlFor="receiptOfOrigin" 
                className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
              >
                {t('receiptOfOrigin')}
              </Label>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted border-gray-200 min-h-[80px]" : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/30 min-h-[80px] transition-all"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
