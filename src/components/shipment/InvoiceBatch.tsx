
import React, { useState } from 'react';
import { useShipmentStore } from '@/stores/useShipmentStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BatchInvoiceCard from './BatchInvoiceCard';
import BatchProgressHeader from './BatchProgressHeader';
import EmptyStates from '../line-items/EmptyStates';

const InvoiceBatch: React.FC = () => {
  const { t } = useLanguage();
  const { invoices } = useShipmentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Batch Progress Header */}
      <BatchProgressHeader />

      {/* Search and Filters */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchInvoices')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => {
            const filters = ['all', 'pending', 'approved', 'rejected'] as const;
            const currentIndex = filters.indexOf(statusFilter);
            const nextIndex = (currentIndex + 1) % filters.length;
            setStatusFilter(filters[nextIndex]);
          }}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Status Filter Indicator */}
      {statusFilter !== 'all' && (
        <div className="mb-2 text-sm text-muted-foreground">
          {t('filterBy')}: {t(statusFilter)}
        </div>
      )}

      {/* Invoice List */}
      <ScrollArea className="flex-1">
        {filteredInvoices.length === 0 ? (
          <EmptyStates 
            hasItems={invoices.length > 0}
            hasFilteredItems={filteredInvoices.length > 0}
            searchQuery={searchQuery}
          />
        ) : (
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <BatchInvoiceCard 
                key={invoice.id} 
                invoice={invoice}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default InvoiceBatch;
