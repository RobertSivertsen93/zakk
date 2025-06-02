
import React, { useState } from 'react';
import { LineItem } from './types';
import BatchOperationsHeader from './BatchOperationsHeader';
import BatchOperationsDropdown from './BatchOperationsDropdown';
import ConfidenceStatsModal from './ConfidenceStatsModal';

interface BatchOperationsProps {
  selectedItems: LineItem[];
  onBatchValidate: () => void;
  onBatchEdit: () => void;
  onBatchExport: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  totalItems: number;
}

const BatchOperations: React.FC<BatchOperationsProps> = ({
  selectedItems,
  onBatchValidate,
  onBatchEdit,
  onBatchExport,
  onSelectAll,
  onClearSelection,
  totalItems
}) => {
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  if (selectedItems.length === 0) {
    return null;
  }
  
  const handleShowStats = () => {
    setShowStatsModal(true);
  };
  
  return (
    <>
      <BatchOperationsHeader
        selectedCount={selectedItems.length}
        totalItems={totalItems}
        onSelectAll={onSelectAll}
        onClearSelection={onClearSelection}
        onShowStats={handleShowStats}
        onValidateHS={onBatchValidate}
      />
      
      <div className="flex justify-end">
        <BatchOperationsDropdown
          selectedCount={selectedItems.length}
          onBatchValidate={onBatchValidate}
          onBatchEdit={onBatchEdit}
          onBatchExport={onBatchExport}
          onShowStats={handleShowStats}
        />
      </div>
      
      <ConfidenceStatsModal
        open={showStatsModal}
        onOpenChange={setShowStatsModal}
        selectedItems={selectedItems}
      />
    </>
  );
};

export default BatchOperations;
