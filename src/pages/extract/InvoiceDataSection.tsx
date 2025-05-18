
import React, { useState, useEffect } from 'react';
import PdfPreview from '@/components/PdfPreview';
import InvoiceDetails from '@/components/InvoiceDetails';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, Keyboard } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceDataSectionProps {
  pdfUrl: string;
  fileName: string;
  onComplete?: () => void;
}

const InvoiceDataSection: React.FC<InvoiceDataSectionProps> = ({ pdfUrl, fileName, onComplete }) => {
  const [extractedData, setExtractedData] = useState({
    invoiceNumber: 'INV-2023-0042',
    invoiceDate: '2023-12-03',
    dueDate: '2023-12-15',
    sender: 'Acme Corporation',
    documentNumber: 'DOC-2023-0042',
    paymentMethod: 'EUR',
    notes: 'Payment due within 15 days',
  });
  
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState('en');
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+C: Mark as complete
      if (e.altKey && e.key === 'c' && onComplete) {
        e.preventDefault();
        onComplete();
        toast.success('Section marked as complete (Alt+C)');
      }
      
      // Alt+S: Save changes
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        // Trigger save action
        toast.success('Changes saved (Alt+S)');
      }
      
      // Alt+Z: Toggle zoom/full screen on PDF
      if (e.altKey && e.key === 'z') {
        e.preventDefault();
        // Toggle PDF zoom
        toast.info('PDF zoom toggled (Alt+Z)');
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);
  
  const handleSaveInvoiceDetails = (updatedData: Record<string, string>) => {
    setExtractedData({
      invoiceNumber: updatedData.invoiceNumber || extractedData.invoiceNumber,
      invoiceDate: updatedData.invoiceDate || extractedData.invoiceDate,
      dueDate: updatedData.dueDate || extractedData.dueDate,
      sender: updatedData.sender || extractedData.sender,
      documentNumber: updatedData.documentNumber || extractedData.documentNumber,
      paymentMethod: updatedData.paymentMethod || extractedData.paymentMethod,
      notes: updatedData.notes || extractedData.notes,
    });
    toast.success('Invoice details updated successfully');
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  // Language translations (simplified example)
  const translations = {
    en: {
      title: 'Invoice Information',
      description: 'Verify the extracted invoice information and make corrections if necessary.',
      subtext: 'The system has automatically detected and filled in these fields from the PDF.',
      document: 'Document',
      preview: 'PDF Preview',
      noPreview: 'No PDF preview available',
      complete: 'Mark Section Complete',
      fontSize: 'Font Size',
      contrast: 'High Contrast',
      language: 'Language'
    },
    es: {
      title: 'Información de la Factura',
      description: 'Verifique la información extraída de la factura y realice correcciones si es necesario.',
      subtext: 'El sistema ha detectado automáticamente y completado estos campos desde el PDF.',
      document: 'Documento',
      preview: 'Vista previa del PDF',
      noPreview: 'Vista previa del PDF no disponible',
      complete: 'Marcar Sección Completa',
      fontSize: 'Tamaño de Fuente',
      contrast: 'Alto Contraste',
      language: 'Idioma'
    }
  };
  
  const t = translations[language as keyof typeof translations];
  
  // Font size classes
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    'x-large': 'text-xl'
  };
  
  // High contrast classes
  const contrastClass = highContrast ? 'high-contrast' : '';
  
  return (
    <Card className={`glass-panel ${contrastClass}`}>
      <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className={`font-semibold ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}`}>
              {t.title}
            </h2>
            <p className={`text-muted-foreground ${fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
              {t.description}
              <br className="md:hidden" /> {t.subtext}
            </p>
          </div>
          
          {/* Accessibility controls */}
          <div className="flex flex-wrap gap-2 self-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select 
                    value={fontSize} 
                    onValueChange={setFontSize} 
                    aria-label="Change font size"
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Font Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="x-large">X-Large</SelectItem>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust font size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={highContrast ? "default" : "outline"}
                    size="icon"
                    onClick={() => setHighContrast(!highContrast)}
                    aria-pressed={highContrast}
                    aria-label="Toggle high contrast mode"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle high contrast</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select 
                    value={language} 
                    onValueChange={setLanguage} 
                    aria-label="Change language"
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change language</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Show keyboard shortcuts help on non-mobile */}
        {!isMobile && (
          <div className="bg-muted/30 px-4 py-2 rounded-md text-sm flex items-center" role="region" aria-label="Keyboard shortcuts">
            <Keyboard className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Keyboard shortcuts: 
              <kbd className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">Alt+C</kbd> Complete, 
              <kbd className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">Alt+S</kbd> Save, 
              <kbd className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">Alt+Z</kbd> Zoom PDF
            </span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className={`${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}`}>
            <InvoiceDetails 
              extractedData={extractedData} 
              onSaveChanges={handleSaveInvoiceDetails}
            />
            
            {onComplete && (
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleComplete}
                  className="gap-2"
                  aria-label={t.complete}
                >
                  <CheckCircle className="h-4 w-4" />
                  {t.complete}
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className={`font-medium ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}`}>
              {fileName ? `${t.document}: ${fileName}` : t.preview}
            </h3>
            <div className="h-[300px] md:h-[600px]">
              {pdfUrl ? (
                <PdfPreview pdfUrl={pdfUrl} />
              ) : (
                <div 
                  className="h-full flex items-center justify-center border border-dashed rounded-lg bg-muted/20" 
                  role="region" 
                  aria-label={t.noPreview}
                >
                  <p className="text-muted-foreground">{t.noPreview}</p>
                </div>
              )}
            </div>
            
            {/* Mobile navigation controls */}
            {isMobile && pdfUrl && (
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" className="w-1/2 mr-1">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button variant="outline" size="sm" className="w-1/2 ml-1">
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDataSection;
