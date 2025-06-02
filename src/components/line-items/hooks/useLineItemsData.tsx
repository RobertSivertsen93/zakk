
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

  const [selectedItems, setSelectedItems] = useState<LineItem[]>([]);

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
