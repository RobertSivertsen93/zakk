
import React, { useState, useEffect } from 'react';
import PdfPreview from '@/components/PdfPreview';
import InvoiceDetails from '@/components/InvoiceDetails';
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ZoomIn, ZoomOut, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  
  // Keyboard shortcut handling for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+C: Mark as complete
      if (e.altKey && e.key === 'c' && onComplete) {
        e.preventDefault();
        onComplete();
        toast.success('Section marked as complete');
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
  
  // Language translations
  const translations = {
    en: {
      title: 'Invoice Information',
      preview: 'PDF Preview',
      complete: 'Continue',
      settings: 'Settings',
      accessibility: 'Accessibility Settings',
      adjustAppearance: 'Adjust the appearance to your preferences.',
      fontSize: 'Font Size',
      contrast: 'Contrast',
      language: 'Language',
      highContrastOn: 'High Contrast On',
      highContrastOff: 'High Contrast Off',
      noPreview: 'No PDF preview available',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      xlarge: 'X-Large',
    },
    fo: {
      title: 'Fakturuupplýsingar',
      preview: 'PDF Forskoðan',
      complete: 'Hald fram',
      settings: 'Stillingar',
      accessibility: 'Atgongd Stillingar',
      adjustAppearance: 'Broyt útsjóndina til tínar tørvar.',
      fontSize: 'Font Stødd',
      contrast: 'Kontrast',
      language: 'Mál',
      highContrastOn: 'Høgur Kontrast Á',
      highContrastOff: 'Høgur Kontrast Frá',
      noPreview: 'Eingin PDF forskoðan tøk',
      small: 'Lítil',
      medium: 'Miðal',
      large: 'Stór',
      xlarge: 'X-Stór',
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
          </div>
          
          {/* Accessibility settings in a popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                {t.settings}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{t.accessibility}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.adjustAppearance}
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label>{t.fontSize}</label>
                    <Select value={fontSize} onValueChange={setFontSize} aria-label="Change font size">
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder={t.fontSize} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">{t.small}</SelectItem>
                        <SelectItem value="medium">{t.medium}</SelectItem>
                        <SelectItem value="large">{t.large}</SelectItem>
                        <SelectItem value="x-large">{t.xlarge}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label>{t.contrast}</label>
                    <Button
                      className="col-span-2"
                      variant={highContrast ? "default" : "outline"}
                      onClick={() => setHighContrast(!highContrast)}
                    >
                      {highContrast ? t.highContrastOn : t.highContrastOff}
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label>{t.language}</label>
                    <Select value={language} onValueChange={setLanguage} aria-label="Change language">
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder={t.language} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fo">Føroyskt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
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
              {fileName ? `${t.preview}: ${fileName}` : t.preview}
            </h3>
            <div className="h-[300px] md:h-[600px]">
              {pdfUrl ? (
                <PdfPreview pdfUrl={pdfUrl} />
              ) : (
                <div 
                  className="h-full flex items-center justify-center border border-dashed rounded-lg bg-muted/20" 
                  role="region" 
                >
                  <p className="text-muted-foreground">{t.noPreview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDataSection;
