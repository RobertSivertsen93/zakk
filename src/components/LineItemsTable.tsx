import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { LineItem } from './line-items/types';
import LineItemRow from './line-items/LineItemRow';
import EditableLineItemRow from './line-items/EditableLineItemRow';
import TableHeader from './line-items/TableHeader';
import TablePagination from './line-items/TablePagination';

export type { LineItem };

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
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<LineItem | null>(null);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleDelete = (id: string) => {
    onDeleteItem(id);
    toast.success('Line item removed');
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
      const updatedItem = {
        ...editFormData,
        alternativeProductNumbers: items.find(i => i.id === editFormData.id)?.alternativeProductNumbers || []
      };
      onEditItem(updatedItem.id, updatedItem);
      setEditingItemId(null);
      setEditFormData(null);
    }
  };

  const handleFieldChange = (field: keyof LineItem, value: string) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value
      });
    }
  };
  
  return (
    <Card className="w-full glass-panel">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer border-b"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">
          Line Items ({items.length})
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
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse">
                  <TableHeader />
                  <tbody>
                    {visibleItems.map((item) => (
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
                        />
                      )
                    ))}
                  </tbody>
                </table>
              </div>
              
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={items.length}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default LineItemsTable;
