
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  completedSections?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep,
  completedSections = []
}) => {
  const steps = [
    { id: 'upload', label: 'Upload' },
    { id: 'invoice', label: 'Invoice' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 w-full gap-2">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1 || 
                             (step.id === 'invoice' && completedSections.includes('invoice-details')) ||
                             (step.id === 'export' && completedSections.includes('line-items'));
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center w-full py-2 rounded-md
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                <span className="font-medium">
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
