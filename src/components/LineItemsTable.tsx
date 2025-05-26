
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineItem } from './line-items/types';
import LineItemRow from './line-items/LineItemRow';
import EditableLineItemRow from './line-items/EditableLineItemRow';
import TableHeader from './line-items/TableHeader';
import AddLineItemDialog from './line-items/AddLineItemDialog';
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language } = useLanguage();
  
  // Filter items based on search query, now including weight
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
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-secondary/10 rounded-md">
            No line items yet
          </div>
        ) : (
          <>
            {/* Search, filter and add button */}
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
              <table className="w-full border-collapse">
                <TableHeader hasSelection={false} />
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
                        isSelected={false}
                        onToggleSelect={() => {}}
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
