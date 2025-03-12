import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";

export type LineItem = {
  id: string;
  productNumber: string;
  countryOfOrigin: string;
  quantity: string;
  unitPrice: string;
  amount: string;
};

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
      onEditItem(editFormData.id, editFormData);
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
    <Card className="w-full">
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
        <CardContent className="pt-4">
          {items.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No line items yet</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-2 text-sm font-medium">Product #</th>
                      <th className="text-left p-2 text-sm font-medium">Origin</th>
                      <th className="text-left p-2 text-sm font-medium">Qty</th>
                      <th className="text-right p-2 text-sm font-medium">Net Weight</th>
                      <th className="text-right p-2 text-sm font-medium">Amount</th>
                      <th className="text-right p-2 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.map((item) => (
                      editingItemId === item.id ? (
                        <tr key={item.id} className="border-b bg-muted/10">
                          <td className="p-2 text-sm">
                            <Input 
                              value={editFormData?.productNumber || ''} 
                              onChange={(e) => handleFieldChange('productNumber', e.target.value)} 
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="p-2 text-sm">
                            <Input 
                              value={editFormData?.countryOfOrigin || ''} 
                              onChange={(e) => handleFieldChange('countryOfOrigin', e.target.value)} 
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="p-2 text-sm">
                            <Input 
                              value={editFormData?.quantity || ''} 
                              onChange={(e) => handleFieldChange('quantity', e.target.value)} 
                              className="h-8 text-sm w-16"
                              type="number"
                              min="0"
                            />
                          </td>
                          <td className="p-2 text-sm text-right">
                            <Input 
                              value={editFormData?.unitPrice || ''} 
                              onChange={(e) => handleFieldChange('unitPrice', e.target.value)} 
                              className="h-8 text-sm text-right w-24 ml-auto"
                              type="number"
                              min="0"
                            />
                          </td>
                          <td className="p-2 text-sm text-right">
                            <Input 
                              value={editFormData?.amount || ''} 
                              onChange={(e) => handleFieldChange('amount', e.target.value)} 
                              className="h-8 text-sm text-right w-24 ml-auto"
                              type="number"
                              min="0"
                            />
                          </td>
                          <td className="p-2 text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={saveEdit}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={cancelEdit}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id} className="border-b hover:bg-muted/20">
                          <td className="p-2 text-sm">{item.productNumber}</td>
                          <td className="p-2 text-sm">{item.countryOfOrigin}</td>
                          <td className="p-2 text-sm">{item.quantity}</td>
                          <td className="p-2 text-sm text-right">{item.unitPrice}</td>
                          <td className="p-2 text-sm text-right">{item.amount}</td>
                          <td className="p-2 text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEdit(item);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.id);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, items.length)} of {items.length} items
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="flex items-center text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default LineItemsTable;
