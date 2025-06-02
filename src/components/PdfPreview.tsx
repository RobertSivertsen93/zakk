import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PdfPreviewProps = {
  pdfUrl: string;
};

const PdfPreview = ({ pdfUrl }: PdfPreviewProps) => {
  console.log('pdfUrl', pdfUrl)
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!pdfUrl?.startsWith('blob:')) {
      console.warn('Invalid PDF URL format, expected blob URL');
    }
    return () => {
      if (isFullScreen) {
        setIsFullScreen(false);
      }
    };
  }, [pdfUrl]);

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

  if (!pdfUrl) {
    return null;
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "pdf-preview relative rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 shadow-lg",
          isFullScreen
            ? "fixed inset-0 z-50 bg-background/95 rounded-none p-4 animate-fade-in"
            : "h-[600px]"
        )}
      >
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-white shadow-md backdrop-blur-sm hover:bg-gray-100 transition-colors"
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
                className="h-8 w-8 bg-white shadow-md backdrop-blur-sm hover:bg-gray-100 transition-colors"
                onClick={toggleFullScreen}
              >
                {isFullScreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFullScreen ? "Exit fullscreen" : "View fullscreen"}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-1 sm:gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="gap-1 bg-white shadow-md hover:bg-gray-100 transition-colors"
            onClick={prevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" /> Previous
          </Button>
          <div className="bg-white shadow-md backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 justify-center whitespace-nowrap">
            <span className="hidden sm:block">Page</span>
            {currentPage} of {totalPages}
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="gap-1 bg-white shadow-md hover:bg-gray-100 transition-colors"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
          >
            Next <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <object
          data={pdfUrl}
          type="application/pdf"
          className="w-full h-full bg-white"
        >
          <embed 
            src={pdfUrl} 
            type="application/pdf"
            className="w-full h-full"
          />
        </object>
      </div>
    </TooltipProvider>
  );
};

export default PdfPreview;
