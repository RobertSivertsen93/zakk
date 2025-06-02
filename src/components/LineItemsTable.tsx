
import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineItem } from './line-items/types';
import LineItemRow from './line-items/LineItemRow';
import EditableLineItemRow from './line-items/EditableLineItemRow';
import TableHeader from './line-items/TableHeader';
import AddLineItemDialog from './line-items/AddLineItemDialog';
import BulkEditDialog from './line-items/BulkEditDialog';
import LineItemsSummary from './line-items/LineItemsSummary';
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/lib/toast";

interface LineItemsTableProps {
  items: LineItem[];
  onEditItem: (id: string, updatedItem: LineItem) => void;
  onDeleteItem: (id: string) => void;
  onAddItem?: (item: Omit<LineItem, 'id' | 'confidencePercentage'>) => void;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  onEditItem,
  onDeleteItem,
  onAddItem
}) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<LineItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkEditDialogOpen, setBulkEditDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { language } = useLanguage();
  
  // Filter items based on search query
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.productNumber.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) || 
      item.countryOfOrigin.toLowerCase().includes(query) ||
      (item.weight && item.weight.toLowerCase().includes(query)) ||
      (item.vatNumber && item.vatNumber.toLowerCase().includes(query)) ||
      (item.goodsNumber && item.goodsNumber.toLowerCase().includes(query))
    );
  });

  const handleDelete = (id: string) => {
    onDeleteItem(id);
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
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

  const handleToggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleBulkUpdate = (updates: Partial<LineItem>) => {
    selectedItems.forEach(id => {
      const item = items.find(item => item.id === id);
      if (item) {
        const updatedItem = { ...item };
        Object.keys(updates).forEach(key => {
          const field = key as keyof LineItem;
          if (updates[field] !== undefined && updates[field] !== '') {
            (updatedItem as any)[field] = updates[field];
          }
        });
        onEditItem(id, updatedItem);
      }
    });
    setSelectedItems([]);
    toast.success(`Updated ${selectedItems.length} items successfully`);
  };
  
  const translations = {
    en: {
      addLineItem: "Add Line Item",
      searchItems: "Search items...",
      bulkEdit: "Bulk Edit",
    },
    fo: {
      addLineItem: "Legg Afturat Linjuvøru",
      searchItems: "Leita eftir vørum...",
      bulkEdit: "Bulk Rætta",
    }
  };
  
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const hasSelection = true;
  const isAllSelected = selectedItems.length === filteredItems.length && filteredItems.length > 0;
  
  return (
    <Card className="w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="p-4 w-full">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-secondary/10 rounded-md">
            No line items yet
          </div>
        ) : (
          <>
            {/* Search, filter and action buttons */}
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchItems}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="border border-gray-200 hover:bg-secondary/50 transition-all duration-200"
              >
                <Filter className="h-4 w-4" />
              </Button>
              {selectedItems.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setBulkEditDialogOpen(true)}
                  className="gap-1"
                >
                  <Edit2 className="h-4 w-4" />
                  {t.bulkEdit} ({selectedItems.length})
                </Button>
              )}
              {onAddItem && (
                <Button 
                  onClick={() => setAddDialogOpen(true)}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  {t.addLineItem}
                </Button>
              )}
            </div>
            
            <div className="overflow-x-auto w-full rounded-md border border-gray-100 shadow-sm">
              <table className="w-full border-collapse min-w-[1200px]">
                <TableHeader 
                  hasSelection={hasSelection}
                  isAllSelected={isAllSelected}
                  onSelectAll={handleSelectAll}
                />
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => (
                    editingItemId === item.id ? (
                      <EditableLineItemRow
                        key={item.id}
                        item={item}
                        editFormData={editFormData!}
                        onFieldChange={handleFieldChange}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                      />
                    ) : (
                      <LineItemRow
                        key={item.id}
                        item={item}
                        onEdit={startEdit}
                        onDelete={handleDelete}
                        isSelected={selectedItems.includes(item.id)}
                        onToggleSelect={handleToggleSelect}
                        hasSelection={hasSelection}
                      />
                    )
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredItems.length === 0 && searchQuery && (
              <div className="text-center py-6 text-muted-foreground bg-secondary/10 rounded-md mt-4">
                No items match your search
              </div>
            )}

            {/* Summary Section */}
            <LineItemsSummary items={filteredItems} />
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

      {/* Bulk Edit Dialog */}
      <BulkEditDialog
        open={bulkEditDialogOpen}
        onOpenChange={setBulkEditDialogOpen}
        selectedItems={items.filter(item => selectedItems.includes(item.id))}
        onBulkUpdate={handleBulkUpdate}
      />
    </Card>
  );
};

export default LineItemsTable;
