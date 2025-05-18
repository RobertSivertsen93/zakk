
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { LineItem } from './line-items/types';
import LineItemRow from './line-items/LineItemRow';
import EditableLineItemRow from './line-items/EditableLineItemRow';
import TableHeader from './line-items/TableHeader';
import TablePagination from './line-items/TablePagination';
import LineItemFilters, { FilterOptions, SavedFilter } from './line-items/LineItemFilters';
import BatchOperations from './line-items/BatchOperations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<LineItem | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBatchEditDialog, setShowBatchEditDialog] = useState(false);
  
  // Filter and search state
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    confidenceLevel: '',
    countryOfOrigin: '',
    sortBy: '',
    sortDirection: 'asc'
  });
  
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  // Get unique countries from items for filter dropdown
  const uniqueCountries = useMemo(() => {
    const countries = new Set<string>();
    items.forEach(item => {
      if (item.countryOfOrigin) {
        countries.add(item.countryOfOrigin);
      }
    });
    return Array.from(countries);
  }, [items]);
  
  // Apply filters and sorting to items
  const filteredItems = useMemo(() => {
    let result = [...items];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(item => 
        item.productNumber.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.countryOfOrigin.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply confidence filter
    if (filters.confidenceLevel) {
      switch (filters.confidenceLevel) {
        case 'high':
          result = result.filter(item => item.confidencePercentage >= 85);
          break;
        case 'medium':
          result = result.filter(item => item.confidencePercentage >= 60 && item.confidencePercentage < 85);
          break;
        case 'low':
          result = result.filter(item => item.confidencePercentage < 60);
          break;
      }
    }
    
    // Apply country filter
    if (filters.countryOfOrigin) {
      result = result.filter(item => item.countryOfOrigin === filters.countryOfOrigin);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof LineItem];
        const bValue = b[filters.sortBy as keyof LineItem];
        
        // Handle numeric vs string comparison
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return filters.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // For string values including those that might be numeric as strings
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        
        return filters.sortDirection === 'asc' 
          ? aStr.localeCompare(bStr) 
          : bStr.localeCompare(aStr);
      });
    }
    
    return result;
  }, [items, filters]);
  
  // Pagination calculation
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
  const visibleItems = filteredItems.slice(startIndex, endIndex);
  
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
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
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
  
  // Handle item selection
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
  
  const handleClearSelection = () => {
    setSelectedItems([]);
  };
  
  // Batch operations
  const handleBatchValidate = () => {
    toast.success(`Validating ${selectedItems.length} HS codes`);
    // Here you would implement the actual validation logic
  };
  
  const handleBatchEdit = () => {
    setShowBatchEditDialog(true);
  };
  
  const handleBatchExport = () => {
    toast.success(`Exporting ${selectedItems.length} items`);
    // Here you would implement the actual export logic
  };
  
  // Save filter
  const handleSaveFilter = (name: string) => {
    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name,
      filter: {...filters}
    };
    
    setSavedFilters([...savedFilters, newFilter]);
    toast.success(`Filter "${name}" saved`);
  };
  
  // Apply saved filter
  const handleApplySavedFilter = (filter: FilterOptions) => {
    setFilters(filter);
    toast.success('Saved filter applied');
  };
  
  const selectedLineItems = useMemo(() => {
    return items.filter(item => selectedItems.includes(item.id));
  }, [items, selectedItems]);
  
  return (
    <Card className="w-full glass-panel">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer border-b"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">
          Útlisnar HS kotur og vørulýsingar
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
              <div className="mb-4">
                <LineItemFilters
                  onFilterChange={setFilters}
                  savedFilters={savedFilters}
                  onSaveFilter={handleSaveFilter}
                  onApplySavedFilter={handleApplySavedFilter}
                  activeFilters={filters}
                  countries={uniqueCountries}
                />
              </div>
              
              <BatchOperations
                selectedItems={selectedLineItems}
                onBatchValidate={handleBatchValidate}
                onBatchEdit={handleBatchEdit}
                onBatchExport={handleBatchExport}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                totalItems={filteredItems.length}
              />
              
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse">
                  <TableHeader 
                    hasSelection={true}
                    isAllSelected={filteredItems.length > 0 && selectedItems.length === filteredItems.length}
                    onSelectAll={handleSelectAll}
                  />
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
                          isSelected={selectedItems.includes(item.id)}
                          onToggleSelect={handleToggleSelect}
                        />
                      )
                    ))}
                  </tbody>
                </table>
              </div>
              
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex + 1}
                endIndex={endIndex}
                totalItems={filteredItems.length}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
              
              {/* Batch Edit Dialog */}
              <Dialog open={showBatchEditDialog} onOpenChange={setShowBatchEditDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Batch Edit Items</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Edit properties for {selectedItems.length} selected items. This feature would allow updating multiple items at once.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      {/* This would be implementation-specific fields for batch editing */}
                      <p className="text-sm">Batch editing functionality would be implemented here based on specific requirements.</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowBatchEditDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      toast.success(`Updated ${selectedItems.length} items`);
                      setShowBatchEditDialog(false);
                    }}>
                      Update All
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default LineItemsTable;
