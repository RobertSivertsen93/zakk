
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, ArrowRight } from "lucide-react";

interface ExtractActionButtonsProps {
  onSaveChanges: () => void;
  onContinue?: () => void;
  showContinue?: boolean;
}

const ExtractActionButtons: React.FC<ExtractActionButtonsProps> = ({ 
  onSaveChanges,
  onContinue,
  showContinue = true
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button 
        variant="secondary" 
        className="gap-2"
        onClick={onSaveChanges}
      >
        <Save className="h-4 w-4" />
        Save Changes
      </Button>
      {showContinue && onContinue && (
        <Button 
          className="gap-2"
          onClick={onContinue}
        >
          Export <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ExtractActionButtons;
