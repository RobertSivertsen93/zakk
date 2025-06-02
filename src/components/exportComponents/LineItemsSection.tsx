
import React, { useState } from 'react';
import PdfViewer from '@/components/line-items/PdfViewer';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLineItemsData } from '@/components/line-items/hooks/useLineItemsData';
import LineItemsSectionHeader from '@/components/line-items/LineItemsSectionHeader';
import LineItemsSectionContent from '@/components/line-items/LineItemsSectionContent';
import LineItemsSectionActions from '@/components/line-items/LineItemsSectionActions';

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
  const [enableCustomsMode, setEnableCustomsMode] = useState(false);

  const {
    lineItems,
    selectedItems,
    setSelectedItems,
    handleEditItem,
    handleDeleteItem,
    handleAddItem,
    handleBulkUpdate
  } = useLineItemsData();

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
      <PdfViewer
        pdfUrl={pdfUrl}
        isVisible={isPdfVisible}
        onToggleVisibility={setIsPdfVisible}
        showPdfText={t.showPdf}
        hidePdfText={t.hidePdf}
      />

      <Card className="glass-panel shadow-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-6">
          <LineItemsSectionHeader
            title={t.title}
            description={t.description}
            enableCustomsMode={enableCustomsMode}
            onToggleCustomsMode={setEnableCustomsMode}
            customsModeText={t.customsMode}
            customsModeDescText={t.customsModeDesc}
          />
          
          <LineItemsSectionContent
            lineItems={lineItems}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            enableCustomsMode={enableCustomsMode}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
            onBulkUpdate={handleBulkUpdate}
          />

          <LineItemsSectionActions
            onComplete={onComplete}
            approveText={t.approve}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LineItemsSection;
