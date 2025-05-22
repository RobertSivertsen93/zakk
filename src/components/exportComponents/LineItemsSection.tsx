
import React, { useState } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, Maximize2, Minimize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PdfPreview from "@/components/PdfPreview";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LineItemsSectionProps {
  onComplete?: () => void;
  pdfUrl?: string;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({ onComplete, pdfUrl }) => {
  const { language } = useLanguage();
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  
  // Mock data for line items with country codes instead of full names
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      productNumber: '6117.80.80',
      countryOfOrigin: 'CN',
      description: 'Buff, 230 gsm - size 25*...',
      confidencePercentage: 95,
      quantity: '1000',
      unitPrice: '2.50',
      amount: '2500',
      alternativeProductNumbers: ['6117.80.90', '6117.80.85']
    },
    {
      id: '2',
      productNumber: '9999.99.99',
      countryOfOrigin: 'DK',
      description: 'Opstart',
      confidencePercentage: 50,
      quantity: '1',
      unitPrice: '150',
      amount: '150'
    },
    {
      id: '3',
      productNumber: '4908.90.00',
      countryOfOrigin: 'SE',
      description: 'Prøvetryk (voksen + barn)',
      confidencePercentage: 70,
      quantity: '5',
      unitPrice: '75',
      amount: '375'
    },
    {
      id: '4',
      productNumber: '4901.99.00',
      countryOfOrigin: 'DE',
      description: 'Eksportdokumenter 3 cli-...',
      confidencePercentage: 80,
      quantity: '10',
      unitPrice: '45',
      amount: '450'
    },
    {
      id: '5',
      productNumber: '8471.30.00',
      countryOfOrigin: 'US',
      description: 'Laptop computers, 15-inch',
      confidencePercentage: 90,
      quantity: '5',
      unitPrice: '800',
      amount: '4000'
    },
    {
      id: '6',
      productNumber: '8523.49.25',
      countryOfOrigin: 'JP',
      description: 'Optical media for data storage',
      confidencePercentage: 85,
      quantity: '100',
      unitPrice: '3',
      amount: '300'
    },
    {
      id: '7',
      productNumber: '9403.20.80',
      countryOfOrigin: 'IT',
      description: 'Metal furniture components',
      confidencePercentage: 65,
      quantity: '50',
      unitPrice: '12',
      amount: '600'
    }
  ]);

  const handleEditItem = (id: string, updatedItem: LineItem) => {
    setItems(items.map(item => item.id === id ? updatedItem : item));
    toast.success('Line item updated successfully');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Line item removed');
  };

  const handleApprove = () => {
    if (onComplete) {
      onComplete();
      toast.success('Line items approved successfully');
    }
  };

  // Translation content
  const translations = {
    en: {
      title: 'Line Items',
      description: 'Review and edit the line items extracted from the invoice.',
      approve: 'Approve Line Items',
      showPdf: 'Show PDF',
      hidePdf: 'Hide PDF',
    },
    fo: {
      title: 'Linjuvørur',
      description: 'Endurskoða og rætta linjuvørurnar, sum eru útdrignar úr fakturanum.',
      approve: 'Góðkenn Linjuvørur',
      showPdf: 'Vís PDF',
      hidePdf: 'Fjal PDF',
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="space-y-6">
      {pdfUrl && (
        <Collapsible
          open={isPdfVisible}
          onOpenChange={setIsPdfVisible}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">PDF Preview</h2>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                {isPdfVisible ? (
                  <><Minimize2 className="h-4 w-4" /> {t.hidePdf}</>
                ) : (
                  <><Maximize2 className="h-4 w-4" /> {t.showPdf}</>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="overflow-hidden transition-all">
            <div className="h-[500px] mb-4">
              <PdfPreview pdfUrl={pdfUrl} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{t.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t.description}
              </p>
            </div>
          </div>
          
          <LineItemsTable 
            items={items} 
            onEditItem={handleEditItem} 
            onDeleteItem={handleDeleteItem} 
          />

          {onComplete && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleApprove}
                className="gap-2"
                aria-label={t.approve}
              >
                <CheckCircle className="h-4 w-4" />
                {t.approve}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemsSection;
