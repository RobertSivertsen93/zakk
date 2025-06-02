
import React from 'react';
import { LineItem } from './types';
import LineItemRow from './LineItemRow';
import EditableLineItemRow from './EditableLineItemRow';
import TableHeader from './TableHeader';

interface TableContentProps {
  filteredItems: LineItem[];
  editingItemId: string | null;
  editFormData: LineItem | null;
  selectedItems: LineItem[];
  enableSelection: boolean;
  isAllSelected: boolean;
  onEdit: (item: LineItem) => void;
  onDelete: (id: string) => void;
  onToggleSelect: (item: LineItem) => void;
  onSelectAll: () => void;
  onFieldChange: (field: keyof LineItem, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TableContent: React.FC<TableContentProps> = ({
  filteredItems,
  editingItemId,
  editFormData,
  selectedItems,
  enableSelection,
  isAllSelected,
  onEdit,
  onDelete,
  onToggleSelect,
  onSelectAll,
  onFieldChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="overflow-x-auto w-full rounded-md border border-gray-100 shadow-sm">
      <table className="w-full border-collapse">
        <TableHeader 
          hasSelection={enableSelection}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
        />
        <tbody className="divide-y divide-gray-100">
          {filteredItems.map((item) => (
            editingItemId === item.id ? (
              <EditableLineItemRow
                key={item.id}
                item={item}
                editFormData={editFormData!}
                onFieldChange={onFieldChange}
                onSave={onSave}
                onCancel={onCancel}
              />
            ) : (
              <LineItemRow
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                isSelected={selectedItems.some(selected => selected.id === item.id)}
                onToggleSelect={() => onToggleSelect(item)}
                hasSelection={enableSelection}
              />
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
