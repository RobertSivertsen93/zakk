
import React, { useState } from 'react';
import { LineItem } from './types';
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import LineItemEditDialog from './LineItemEditDialog';

interface EditableLineItemRowProps {
  item: LineItem;
  editFormData: LineItem;
  onFieldChange: (field: keyof LineItem, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditableLineItemRow: React.FC<EditableLineItemRowProps> = ({
  item,
  editFormData,
  onFieldChange,
  onSave,
  onCancel
}) => {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <>
      <tr className="border-b bg-primary/5">
        <td colSpan={8} className="py-4 px-6 text-center">
          <div className="flex justify-center items-center gap-2 text-muted-foreground">
            <span>Editing item...</span>
            <div className="flex gap-1">
              <Button
                onClick={onSave}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                onClick={onCancel}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </td>
      </tr>

      <LineItemEditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
        editFormData={editFormData}
        onFieldChange={onFieldChange}
        onSave={onSave}
        onCancel={onCancel}
      />
    </>
  );
};

export default EditableLineItemRow;
