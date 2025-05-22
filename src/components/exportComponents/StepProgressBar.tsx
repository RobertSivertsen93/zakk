
import React from 'react';

interface StepProgressBarProps {
  completedSections: string[];
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ completedSections }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${completedSections.includes('invoice-details') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <span className="text-sm">Invoice Details</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${completedSections.includes('line-items') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <span className="text-sm">Line Items</span>
      </div>
    </div>
  );
};

export default StepProgressBar;
