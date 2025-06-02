
import React from 'react';
import { LineItem } from './types';
import LineItemsTable from '@/components/LineItemsTable';
import TotalsSummary from './TotalsSummary';
import BulkCalculations from './BulkCalculations';

interface LineItemsControlsProps {
  lineItems: LineItem[];
  selectedItems: LineItem[];
  onSelectionChange: (items: LineItem[]) => void;
  enableCustomsMode: boolean;
  onEditItem: (id: string, updatedItem: LineItem) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (newItemData: Omit<LineItem, 'id' | 'confidencePercentage'>) => void;
  onBulkUpdate: (updatedItems: LineItem[]) => void;
}

const LineItemsControls: React.FC<LineItemsControlsProps> = ({
  lineItems,
  selectedItems,
  onSelectionChange,
  enableCustomsMode,
  onEditItem,
  onDeleteItem,
  onAddItem,
  onBulkUpdate
}) => {
  return (
    <>
      {/* Totals Summary */}
      <TotalsSummary 
        items={lineItems}
        selectedItems={selectedItems}
        showSelectedOnly={enableCustomsMode && selectedItems.length > 0}
      />

      {/* Bulk Calculations - only show in customs mode with selections */}
      {enableCustomsMode && selectedItems.length > 0 && (
        <BulkCalculations
          selectedItems={selectedItems}
          onUpdateItems={onBulkUpdate}
        />
      )}
      
      <LineItemsTable 
        items={lineItems} 
        onEditItem={onEditItem} 
        onDeleteItem={onDeleteItem}
        onAddItem={onAddItem}
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
        enableSelection={enableCustomsMode}
      />
    </>
  );
};

export default LineItemsControls;
