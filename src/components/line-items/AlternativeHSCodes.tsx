
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AlternativeCode {
  code: string;
  confidence?: number;
}

interface AlternativeHSCodesProps {
  alternativeCodes?: (string | AlternativeCode)[];
  onSelectCode: (code: string) => void;
}

const AlternativeHSCodes: React.FC<AlternativeHSCodesProps> = ({
  alternativeCodes = [],
  onSelectCode
}) => {
  if (!alternativeCodes || alternativeCodes.length === 0) return null;
  
  // Process alternatives to support both string array and object array formats
  const processedCodes = alternativeCodes.map(code => {
    if (typeof code === 'string') {
      return { code, confidence: undefined };
    }
    return code;
  });

  // Function to determine confidence indicator color
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "bg-gray-400"; // No confidence data
    if (confidence >= 85) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-3 p-3 border rounded-md bg-muted/20">
      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Alternative HS Codes</h4>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {processedCodes.map(item => (
            <Tooltip key={item.code}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-background hover:bg-muted/40 flex items-center gap-1.5"
                  onClick={() => onSelectCode(item.code)}
                >
                  {item.confidence !== undefined && (
                    <span className={`w-2 h-2 rounded-full ${getConfidenceColor(item.confidence)}`}></span>
                  )}
                  <span className="font-mono">{item.code}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {item.confidence ? `${item.confidence}% confidence` : 'Click to select this code'}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Click on an alternative code to select it</p>
    </div>
  );
};

export default AlternativeHSCodes;
