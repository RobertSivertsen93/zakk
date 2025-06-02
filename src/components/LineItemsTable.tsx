
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineItem } from './line-items/types';
import AddLineItemDialog from './line-items/AddLineItemDialog';
import BatchOperations from './line-items/BatchOperations';
import SearchAndFilters from './line-items/SearchAndFilters';
import TableContent from './line-items/TableContent';
import EmptyStates from './line-items/EmptyStates';
import { useLanguage } from "@/contexts/LanguageContext";

interface LineItemsTableProps {
  items: LineItem[];
  onEditItem: (id: string, updatedItem: LineItem) => void;
  onDeleteItem: (id: string) => void;
  onAddItem?: (item: Omit<LineItem, 'id' | 'confidencePercentage'>) => void;
  selectedItems?: LineItem[];
  onSelectionChange?: (selectedItems: LineItem[]) => void;
  enableSelection?: boolean;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  onEditItem,
  onDeleteItem,
  onAddItem,
  selectedItems = [],
  onSelectionChange,
  enableSelection = false
}) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<LineItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { language } = useLanguage();
  
  // Filter items based on search query
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.productNumber.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) || 
      item.countryOfOrigin.toLowerCase().includes(query) ||
      (item.weight && item.weight.toLowerCase().includes(query))
    );
  });

  const handleDelete = (id: string) => {
    onDeleteItem(id);
  };

  const startEdit = (item: LineItem) => {
    setEditingItemId(item.id);
    setEditFormData({...item});
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditFormData(null);
  };

  const saveEdit = () => {
    if (editFormData) {
      onEditItem(editFormData.id, editFormData);
      setEditingItemId(null);
      setEditFormData(null);
    }
  };

  const handleFieldChange = (field: keyof LineItem, value: string | number) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value
      });
    }
  };

  // Selection handlers
  const handleToggleSelect = (item: LineItem) => {
    if (!enableSelection || !onSelectionChange) return;
    
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    if (isSelected) {
      onSelectionChange(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  const handleSelectAll = () => {
    if (!enableSelection || !onSelectionChange) return;
    onSelectionChange(filteredItems);
  };

  const handleClearSelection = () => {
    if (!enableSelection || !onSelectionChange) return;
    onSelectionChange([]);
  };

  const isAllSelected = enableSelection && filteredItems.length > 0 && 
    filteredItems.every(item => selectedItems.some(selected => selected.id === item.id));
  
  const translations = {
    en: {
      addLineItem: "Add Line Item",
      searchItems: "Search items...",
    },
    fo: {
      addLineItem: "Legg Afturat Linjuvøru",
      searchItems: "Leita eftir vørum...",
    }
  };
  
  const t = translations[language as keyof typeof translations] || translations.en;
  
  return (
    <Card className="w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="p-4 w-full">
        <EmptyStates 
          hasItems={items.length > 0}
          hasFilteredItems={filteredItems.length > 0}
          searchQuery={searchQuery}
        />

        {items.length > 0 && (
          <>
            {/* Batch Operations - only show when items are selected */}
            {enableSelection && selectedItems.length > 0 && (
              <BatchOperations
                selectedItems={selectedItems}
                onBatchValidate={() => {}}
                onBatchEdit={() => {}}
                onBatchExport={() => {}}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                totalItems={filteredItems.length}
              />
            )}

            {/* Search, filter and add button */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddItem={onAddItem ? () => setAddDialogOpen(true) : undefined}
              addLineItemText={t.addLineItem}
            />
            
            <TableContent
              filteredItems={filteredItems}
              editingItemId={editingItemId}
              editFormData={editFormData}
              selectedItems={selectedItems}
              enableSelection={enableSelection}
              isAllSelected={isAllSelected}
              onEdit={startEdit}
              onDelete={handleDelete}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onFieldChange={handleFieldChange}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
            
            <EmptyStates 
              hasItems={true}
              hasFilteredItems={filteredItems.length > 0}
              searchQuery={searchQuery}
            />
          </>
        )}
      </div>
      
      {/* Add Line Item Dialog */}
      {onAddItem && (
        <AddLineItemDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAdd={onAddItem}
          onCancel={() => setAddDialogOpen(false)}
        />
      )}
    </Card>
  );
};

export default LineItemsTable;
