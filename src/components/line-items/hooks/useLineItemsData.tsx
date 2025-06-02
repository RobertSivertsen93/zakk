
import { useState, useEffect } from 'react';
import { LineItem } from '@/components/line-items/types';
import { toast } from "@/lib/toast";

interface UseLineItemsDataProps {
  invoiceId?: string;
}

export const useLineItemsData = ({ invoiceId }: UseLineItemsDataProps = {}) => {
  const parsedPdfData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");

  // Transform PDF data items to LineItem structure
  const transformPdfItems = (pdfItems: any[]): LineItem[] => {
    return pdfItems?.map((item, index) => ({
      id: item.id?.toString() || `item-${index}`,
      productNumber: item.hsCode || item.hsCodeMatches?.[0]?.code || '',
      countryOfOrigin: item.countryOfOrigin || '',
      description: item.description || '',
      quantity: item.quantity?.toString() || '',
      unitPrice: item.unitPrice?.toString() || '',
      amount: item.totalPrice?.toString() || item.amount?.toString() || '',
      confidencePercentage: item.hsCodeMatches?.[0]?.confidenceScore * 100 || 85,
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
    weight: item.weight,
    hsCodeMatches: [{
      code: item.productNumber,
      confidenceScore: item.confidencePercentage / 100
    }]
  });

  // Initialize line items from either session storage or invoice data
  const getInitialLineItems = (): LineItem[] => {
    if (invoiceId) {
      // If we're in invoice approval mode, try to get data from shipment store
      try {
        const shipmentData = JSON.parse(localStorage.getItem('shipment-storage') || '{}');
        const invoices = shipmentData.state?.invoices || [];
        const invoice = invoices.find((inv: any) => inv.id === invoiceId);
        
        if (invoice && invoice.lineItems) {
          return invoice.lineItems.map((item: any, index: number) => ({
            id: `${invoiceId}-item-${index}`,
            productNumber: item.hsCode || '',
            countryOfOrigin: item.countryOfOrigin || '',
            description: item.description || '',
            quantity: item.quantity?.toString() || '0',
            unitPrice: item.unitPrice?.toString() || '0',
            amount: item.totalPrice?.toString() || '0',
            confidencePercentage: 85,
            weight: item.weight || ''
          }));
        }
      } catch (error) {
        console.error('Error loading invoice data:', error);
      }
    }
    
    // Fallback to session storage data
    return transformPdfItems(parsedPdfData.lineItems || []);
  };

  const [lineItems, setLineItems] = useState<LineItem[]>(getInitialLineItems);
  const [selectedItems, setSelectedItems] = useState<LineItem[]>([]);

  // Effect to update lineItems when PDF data changes (but not for invoice approval)
  useEffect(() => {
    if (!invoiceId && parsedPdfData.lineItems) {
      setLineItems(transformPdfItems(parsedPdfData.lineItems));
    }
  }, [invoiceId, parsedPdfData.lineItems]);
  
  const updateSessionStorage = (items: LineItem[]) => {
    if (!invoiceId) {
      // Only update session storage if we're not in invoice approval mode
      const apiFormattedItems = items.map(transformToApiFormat);
      const pdfData = JSON.parse(sessionStorage.getItem("pdf-data") || "{}");
      sessionStorage.setItem("pdf-data", JSON.stringify({
        ...pdfData,
        lineItems: apiFormattedItems
      }));
    }
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
    const newId = `${invoiceId || 'new'}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newItem: LineItem = {
      ...newItemData,
      id: newId,
      confidencePercentage: 85,
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

  return {
    lineItems,
    selectedItems,
    setSelectedItems,
    handleEditItem,
    handleDeleteItem,
    handleAddItem,
    handleBulkUpdate
  };
};
