
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import InvoiceFormFields from '@/components/InvoiceFormFields';
import { Button } from "@/components/ui/button";
import { Save, Edit } from "lucide-react";
import { toast } from "@/lib/toast";

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
        <div className="flex justify-between items-center mb-4">
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
        
        <InvoiceFormFields 
          initialData={formData} 
          showLineItems={false} 
          isReadOnly={!isEditing}
          onFieldChange={handleFieldChange}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
