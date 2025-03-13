
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="grid grid-cols-2 w-full max-w-md">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full 
            ${currentStep === 1 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
            } 
            ${currentStep > 1 && 'bg-green-500 text-white'}
          `}>
            {currentStep > 1 ? '✓' : '1'}
          </div>
          <span className={`mt-2 text-sm font-medium ${currentStep === 1 ? 'text-primary' : currentStep > 1 ? 'text-green-500' : 'text-muted-foreground'}`}>
            Upload PDF
          </span>
        </div>
        
        {/* Connector */}
        <div className="flex items-center w-full">
          <div className={`w-full h-1 ${currentStep > 1 ? 'bg-green-500' : 'bg-muted'}`}></div>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full 
            ${currentStep === 2 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            2
          </div>
          <span className={`mt-2 text-sm font-medium ${currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            Review & Edit
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
