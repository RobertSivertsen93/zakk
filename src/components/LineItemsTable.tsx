
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import { LineItem } from './line-items/types';
import LineItemRow from './line-items/LineItemRow';
import EditableLineItemRow from './line-items/EditableLineItemRow';
import TableHeader from './line-items/TableHeader';

interface LineItemsTableProps {
  items: LineItem[];
  onEditItem: (id: string, updatedItem: LineItem) => void;
  onDeleteItem: (id: string) => void;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  onEditItem,
  onDeleteItem
}) => {
  const [expanded, setExpanded] = useState(true);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<LineItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter items based on search query
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.productNumber.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) || 
      item.countryOfOrigin.toLowerCase().includes(query)
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
  
  return (
    <Card className="w-full">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer border-b"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">
          Line Items
        </h3>
        <Button variant="ghost" size="icon">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {expanded && (
        <div className="p-4 w-full">
          {items.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No line items yet</div>
          ) : (
            <>
              {/* Simple search */}
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse">
                  <TableHeader hasSelection={false} />
                  <tbody>
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
                <div className="text-center py-4 text-muted-foreground">
                  No items match your search
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default LineItemsTable;
