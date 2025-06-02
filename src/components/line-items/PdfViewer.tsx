
import React from 'react';
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PdfViewerProps {
  pdfUrl?: string;
  isVisible: boolean;
  onToggleVisibility: (visible: boolean) => void;
  showPdfText: string;
  hidePdfText: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  isVisible,
  onToggleVisibility,
  showPdfText,
  hidePdfText
}) => {
  if (!pdfUrl) return null;

  return (
    <Collapsible 
      open={isVisible} 
      onOpenChange={onToggleVisibility} 
      className="w-full"
    >
      <div className="flex justify-between items-center mb-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            {isVisible ? (
              <><Minimize2 className="h-4 w-4" /> {hidePdfText}</>
            ) : (
              <><Maximize2 className="h-4 w-4" /> {showPdfText}</>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="overflow-hidden transition-all">
        <div className="h-[500px] mb-4 border rounded-lg">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full"
            title="PDF Preview"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PdfViewer;
