
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface ExtractActionButtonsProps {
  onBackClick: () => void;
  onSaveChanges: () => void;
  onContinue?: () => void;
  showContinue?: boolean;
}

const ExtractActionButtons: React.FC<ExtractActionButtonsProps> = ({ 
  onBackClick, 
  onSaveChanges,
  onContinue,
  showContinue = true
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={onBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Upload
      </Button>
      
      <div className="flex gap-2">
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
            Continue to Export <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExtractActionButtons;
