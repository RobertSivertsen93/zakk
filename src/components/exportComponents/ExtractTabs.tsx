
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

import LineItemsSection from "./LineItemsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import ExtractDataSection from "./ExtractDataSection";

interface ExtractTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedSections: string[];
  pdfUrl: string;
  fileName: string;
  onBackToUpload: () => void;
  onCompleteSection: (sectionId: string) => void;
}

const ExtractTabs: React.FC<ExtractTabsProps> = ({
  activeTab,
  setActiveTab,
  completedSections,
  pdfUrl,
  fileName,
  onBackToUpload,
  onCompleteSection,
}) => {
  const { t } = useLanguage();

  const isTabCompleted = (tabId: string) => {
    if (tabId === "invoice")
      return completedSections.includes("invoice-details");
    if (tabId === "lineitems") return completedSections.includes("line-items");
    return false;
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="relative mb-6 w-full overflow-hidden rounded-lg border shadow-sm">
        <TabsTrigger value="invoice" className="flex-1 gap-2">
          <div className="flex items-center justify-center gap-2 relative">
            <span>{t("invoice")}</span>
            {isTabCompleted("invoice") && (
              <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
            )}
          </div>
        </TabsTrigger>

        <TabsTrigger value="lineitems" className="flex-1 gap-2">
          <div className="flex items-center justify-center gap-2 relative">
            <span>{t("lineItems")}</span>
            {isTabCompleted("lineitems") && (
              <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
            )}
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="invoice" className="animate-fade-in">
        <ExtractDataSection
          pdfUrl={pdfUrl}
          fileName={fileName}
          onBackToUpload={onBackToUpload}
          onComplete={() => {
            onCompleteSection("invoice-details");
            setActiveTab("lineitems");
          }}
        />
      </TabsContent>

      <TabsContent value="lineitems" className="animate-fade-in">
        <LineItemsSection
          pdfUrl={pdfUrl}
          onComplete={() => {
            onCompleteSection("line-items");
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ExtractTabs;
