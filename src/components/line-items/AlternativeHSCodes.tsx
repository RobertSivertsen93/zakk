
import React from 'react';
import { Button } from "@/components/ui/button";

interface AlternativeHSCodesProps {
  alternativeCodes?: string[];
  onSelectCode: (code: string) => void;
}

const AlternativeHSCodes: React.FC<AlternativeHSCodesProps> = ({
  alternativeCodes = [],
  onSelectCode
}) => {
  if (!alternativeCodes || alternativeCodes.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      <span className="text-xs text-muted-foreground py-1">Alternatives:</span>
      {alternativeCodes.map(code => (
        <Button
          key={code}
          variant="outline"
          size="sm"
          className="text-xs h-6 bg-muted/40"
          onClick={() => onSelectCode(code)}
        >
          {code}
        </Button>
      ))}
    </div>
  );
};

export default AlternativeHSCodes;
