
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Maximize, Minimize, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PdfPreviewProps = {
  pdfUrl: string;
};

const PdfPreview = ({ pdfUrl }: PdfPreviewProps) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <TooltipProvider>
      <div 
        className={cn(
          "pdf-preview relative rounded-xl overflow-hidden border border-border transition-all duration-300",
          isFullScreen ? "fixed inset-0 z-50 bg-background/95 rounded-none p-4" : "h-[600px]"
        )}
      >
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search in document</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>{isFullScreen ? "Exit fullscreen" : "View fullscreen"}</TooltipContent>
          </Tooltip>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          <Button 
            size="sm" 
            variant="secondary" 
            className="gap-1" 
            onClick={prevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button 
            size="sm" 
            variant="secondary" 
            className="gap-1" 
            onClick={nextPage}
            disabled={currentPage >= totalPages}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <iframe 
          src={`${pdfUrl}#toolbar=0&page=${currentPage}`}
          className="w-full h-full bg-white"
          title="PDF Preview"
          onLoad={() => {
            // In a real implementation, we would get the total pages from the PDF
            // For now we'll simulate having multiple pages
            setTotalPages(3);
          }}
        />
      </div>
    </TooltipProvider>
  );
};

export default PdfPreview;
