
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, Eye, FileText, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useShipmentStore, InvoiceData } from '@/stores/useShipmentStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BatchInvoiceCardProps {
  invoice: InvoiceData;
}

const BatchInvoiceCard: React.FC<BatchInvoiceCardProps> = ({ invoice }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { 
    selectedInvoices, 
    toggleInvoiceSelection, 
    removeInvoice 
  } = useShipmentStore();

  const isSelected = selectedInvoices.includes(invoice.id);

  const getStatusColor = (status: InvoiceData['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open dialog if clicking on checkbox or dropdown
    if ((e.target as HTMLElement).closest('[data-no-dialog]')) {
      return;
    }
    navigate(`/invoice-approval?id=${invoice.id}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleInvoiceSelection(invoice.id);
  };

  const handleReviewClick = () => {
    navigate(`/invoice-approval?id=${invoice.id}`);
  };

  return (
    <Card 
      className={`transition-all hover:shadow-md cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div data-no-dialog onClick={handleCheckboxClick}>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleInvoiceSelection(invoice.id)}
              className="mt-1"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-semibold text-sm truncate">
                    {invoice.invoiceNumber}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {invoice.customerName}
                  </p>
                </div>
                {/* Processing Status Indicator */}
                <div className="flex items-center gap-1">
                  {invoice.isProcessed ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <Clock className="h-3 w-3 text-yellow-500" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {invoice.isProcessed ? 'Ready' : 'Processing'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                  {t(invoice.status)}
                </Badge>
                
                <div data-no-dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-white border shadow-lg z-50"
                    >
                      <DropdownMenuItem onClick={handleReviewClick} className="cursor-pointer">
                        <Eye className="h-4 w-4 mr-2" />
                        {t('reviewAndApprove')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => window.open(invoice.pdfUrl, '_blank')} 
                        className="cursor-pointer"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {t('viewPdf')}
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={() => removeInvoice(invoice.id)}
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('remove')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>{t('date')}: {new Date(invoice.invoiceDate).toLocaleDateString()}</div>
              <div>{t('amount')}: {invoice.totalAmount} {invoice.currency}</div>
              <div className="col-span-2 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span className="truncate">{invoice.fileName}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchInvoiceCard;
