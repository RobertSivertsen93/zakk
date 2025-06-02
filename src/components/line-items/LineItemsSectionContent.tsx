
import React from 'react';
import { LineItem } from '@/components/line-items/types';
import LineItemsControls from '@/components/line-items/LineItemsControls';

interface LineItemsSectionContentProps {
  lineItems: LineItem[];
  selectedItems: LineItem[];
  onSelectionChange: (items: LineItem[]) => void;
  enableCustomsMode: boolean;
  onEditItem: (id: string, updatedItem: LineItem) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (newItemData: Omit<LineItem, 'id' | 'confidencePercentage'>) => void;
  onBulkUpdate: (updatedItems: LineItem[]) => void;
}

const LineItemsSectionContent: React.FC<LineItemsSectionContentProps> = ({
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
    <LineItemsControls
      lineItems={lineItems}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      enableCustomsMode={enableCustomsMode}
      onEditItem={onEditItem}
      onDeleteItem={onDeleteItem}
      onAddItem={onAddItem}
      onBulkUpdate={onBulkUpdate}
    />
  );
};

export default LineItemsSectionContent;
