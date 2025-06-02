
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useShipmentStore } from "@/stores/useShipmentStore";
import InvoiceApprovalInfo from "@/components/shipment/InvoiceApprovalInfo";
import InvoiceApprovalLineItems from "@/components/shipment/InvoiceApprovalLineItems";
import { toast } from "sonner";

const InvoiceApproval: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get('id');
  const { invoices, updateInvoiceStatus } = useShipmentStore();
  
  const [activeTab, setActiveTab] = useState<string>("info");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const invoice = invoices.find(inv => inv.id === invoiceId);

  useEffect(() => {
    if (!invoice) {
      toast.error("Invoice not found");
      navigate("/shipment");
    }
  }, [invoice, navigate]);

  if (!invoice) {
    return null;
  }

  const handleCompleteSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const isTabCompleted = (tabId: string) => {
    return completedSections.includes(tabId === "info" ? "invoice-info" : "line-items");
  };

  const handleApprove = () => {
    updateInvoiceStatus(invoice.id, 'approved');
    toast.success("Invoice approved successfully");
    navigate("/shipment");
  };

  const handleReject = () => {
    updateInvoiceStatus(invoice.id, 'rejected');
    toast.error("Invoice rejected");
    navigate("/shipment");
  };

  const canApprove = completedSections.includes("invoice-info") && 
                    completedSections.includes("line-items");

  return (
    <Dashboard
      title={`${t('reviewAndApprove')}: ${invoice.invoiceNumber}`}
      description={t('reviewInvoiceDescription')}
    >
      <div className="space-y-6 pb-20 h-full">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground mb-4 transition-all duration-300"
          onClick={() => navigate("/shipment")}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t('backToShipment')}
        </Button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative mb-6 w-full overflow-hidden rounded-lg border shadow-sm">
            <TabsTrigger value="info" className="flex-1 gap-2">
              <div className="flex items-center justify-center gap-2">
                <span>{t("invoiceInfo")}</span>
                {isTabCompleted("info") && (
                  <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </TabsTrigger>

            <TabsTrigger value="lineitems" className="flex-1 gap-2">
              <div className="flex items-center justify-center gap-2">
                <span>{t("lineItems")}</span>
                {isTabCompleted("lineitems") && (
                  <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="animate-fade-in">
            <InvoiceApprovalInfo
              invoice={invoice}
              onComplete={() => {
                handleCompleteSection("invoice-info");
                setActiveTab("lineitems");
              }}
              isCompleted={isTabCompleted("info")}
            />
          </TabsContent>

          <TabsContent value="lineitems" className="animate-fade-in">
            <InvoiceApprovalLineItems
              invoice={invoice}
              onComplete={() => handleCompleteSection("line-items")}
              isCompleted={isTabCompleted("lineitems")}
            />
          </TabsContent>
        </Tabs>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {completedSections.length}/2 {t('sectionsCompleted')}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReject}
                >
                  {t('reject')}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={!canApprove}
                >
                  {t('approve')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default InvoiceApproval;
