
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

interface CustomsModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  customsModeText: string;
  customsModeDescText: string;
}

const CustomsModeToggle: React.FC<CustomsModeToggleProps> = ({
  enabled,
  onToggle,
  customsModeText,
  customsModeDescText
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="customs-mode" className="text-sm">{customsModeText}</Label>
        <Switch
          id="customs-mode"
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>
      
      {enabled && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{customsModeDescText}</p>
        </div>
      )}
    </>
  );
};

export default CustomsModeToggle;
