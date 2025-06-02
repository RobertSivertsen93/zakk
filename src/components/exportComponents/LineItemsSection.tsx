
import React, { useState, useEffect } from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsTable from '@/components/LineItemsTable';
import TotalsSummary from '@/components/line-items/TotalsSummary';
import BulkCalculations from '@/components/line-items/BulkCalculations';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, Maximize2, Minimize2, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LineItemsSectionProps {
  onComplete?: () => void;
  pdfUrl?: string;
}

const LineItemsSection: React.FC<LineItemsSectionProps> = ({
  onComplete,
  pdfUrl
}) => {
  const { language } = useLanguage();
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<LineItem[]>([]);
  const [enableCustomsMode, setEnableCustomsMode] = useState(false);
  const parsedPdfData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");

  // Transform PDF data items to LineItem structure
  const transformPdfItems = (pdfItems: any[]): LineItem[] => {
    return pdfItems?.map(item => ({
      id: item.id?.toString() || '',
      productNumber: item.hsCodeMatches?.[0]?.code || '',
      countryOfOrigin: item.countryOfOrigin || '',
      description: item.description || '',
      quantity: item.quantity?.toString() || '',
      unitPrice: item.unitPrice?.toString() || '',
      amount: item.totalPrice?.toString() || item.amount?.toString() || '',
      confidencePercentage: item.hsCodeMatches?.[0]?.confidenceScore * 100 || 60,
      weight: item.weight || '',
    })) || [];
  };

  const transformToApiFormat = (item: LineItem) => ({
    id: item.id,
    hsCode: item.productNumber,
    description: item.description,
    quantity: parseFloat(item.quantity) || 0,
    unitPrice: parseFloat(item.unitPrice) || 0,
    totalPrice: parseFloat(item.amount) || 0,
    countryOfOrigin: item.countryOfOrigin,
    hsCodeMatches: [{
      code: item.productNumber,
      confidenceScore: item.confidencePercentage / 100
    }]
  });

  const [lineItems, setLineItems] = useState<LineItem[]>(() => 
    transformPdfItems(parsedPdfData.lineItems || [])
  );

  // Effect to update lineItems when PDF data changes
  useEffect(() => {
    if (parsedPdfData.lineItems) {
      setLineItems(transformPdfItems(parsedPdfData.lineItems));
    }
  }, [parsedPdfData.lineItems]);
  
  const updateSessionStorage = (items: LineItem[]) => {
    const apiFormattedItems = items.map(transformToApiFormat);
    const pdfData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");
    sessionStorage.setItem("pdf-data", JSON.stringify({
      ...pdfData,
      lineItems: apiFormattedItems
    }));
  };

  const handleEditItem = (id: string, updatedItem: LineItem) => {
    const newItems = lineItems.map(item => item.id === id ? updatedItem : item);
    setLineItems(newItems);
    updateSessionStorage(newItems);
    toast.success('Line item updated successfully');
  };
  
  const handleDeleteItem = (id: string) => {
    const newItems = lineItems.filter(item => item.id !== id);
    setLineItems(newItems);
    updateSessionStorage(newItems);
    
    // Remove from selection if it was selected
    setSelectedItems(prev => prev.filter(item => item.id !== id));
    
    toast.success('Line item removed');
  };
  
  const handleAddItem = (newItemData: Omit<LineItem, 'id' | 'confidencePercentage'>) => {
    const newId = `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newItem: LineItem = {
      ...newItemData,
      id: newId,
      confidencePercentage: 60,
    };
    
    const newItems = [...lineItems, newItem];
    setLineItems(newItems);
    updateSessionStorage(newItems);
    toast.success('New line item added');
  };

  const handleBulkUpdate = (updatedItems: LineItem[]) => {
    // Update the main items array with the modified selected items
    const newItems = lineItems.map(item => {
      const updatedItem = updatedItems.find(updated => updated.id === item.id);
      return updatedItem || item;
    });
    
    setLineItems(newItems);
    updateSessionStorage(newItems);
    
    // Update the selected items array to reflect changes
    setSelectedItems(updatedItems);
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
      customsMode: 'Customs Mode',
      customsModeDesc: 'Enable advanced features for customs processing'
    },
    fo: {
      title: 'Linjuvørur',
      description: 'Endurskoða og rætta linjuvørurnar, sum eru útdrignar úr fakturanum.',
      approve: 'Góðkenn Linjuvørur',
      showPdf: 'Vís PDF',
      hidePdf: 'Fjal PDF',
      customsMode: 'Tollviðgerð',
      customsModeDesc: 'Ger virkin framkomnu funktsiónir fyri tollviðgerð'
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
            <div className="h-[500px] mb-4 border rounded-lg">
              <iframe 
                src={pdfUrl} 
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{t.title}</h2>
              <p className="text-muted-foreground mt-1">{t.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="customs-mode" className="text-sm">{t.customsMode}</Label>
              <Switch
                id="customs-mode"
                checked={enableCustomsMode}
                onCheckedChange={setEnableCustomsMode}
              />
            </div>
          </div>

          {enableCustomsMode && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">{t.customsModeDesc}</p>
            </div>
          )}
          
          {/* Totals Summary */}
          <TotalsSummary 
            items={lineItems}
            selectedItems={selectedItems}
            showSelectedOnly={enableCustomsMode && selectedItems.length > 0}
          />

          {/* Bulk Calculations - only show in customs mode with selections */}
          {enableCustomsMode && selectedItems.length > 0 && (
            <BulkCalculations
              selectedItems={selectedItems}
              onUpdateItems={handleBulkUpdate}
            />
          )}
          
          <LineItemsTable 
            items={lineItems} 
            onEditItem={handleEditItem} 
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            enableSelection={enableCustomsMode}
          />

          {onComplete && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleApprove} className="gap-2" aria-label={t.approve}>
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
