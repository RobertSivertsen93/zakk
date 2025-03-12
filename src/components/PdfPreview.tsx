
import React from 'react';
import { cn } from "@/lib/utils";
import { Maximize, Minimize, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PdfPreviewProps = {
  pdfUrl: string;
};

const PdfPreview = ({ pdfUrl }: PdfPreviewProps) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  return (
    <div 
      className={cn(
        "pdf-preview relative rounded-xl overflow-hidden border border-border transition-all duration-300",
        isFullScreen ? "fixed inset-0 z-50 bg-background/95 rounded-none p-4" : "h-[600px]"
      )}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isFullScreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          <Button size="sm" variant="secondary" className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm">
            Page 1 of 1
          </div>
          <Button size="sm" variant="secondary" className="gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <iframe 
        src={`${pdfUrl}#toolbar=0`}
        className="w-full h-full bg-white"
        title="PDF Preview"
      />
    </div>
  );
};

export default PdfPreview;
