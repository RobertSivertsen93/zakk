
import React from 'react';
import { Check, FileText, List, Download, Upload } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  completedSections?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep,
  completedSections = []
}) => {
  const steps = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'invoice', label: 'Invoice', icon: FileText },
    { id: 'lineitems', label: 'Items', icon: List },
    { id: 'export', label: 'Export', icon: Download },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 w-full gap-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1 || 
                             (step.id === 'invoice' && completedSections.includes('invoice-details')) ||
                             (step.id === 'lineitems' && completedSections.includes('line-items'));
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full 
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
              </div>
              <span className={`mt-1 text-xs font-medium ${
                isActive 
                  ? 'text-primary' 
                  : isCompleted
                    ? 'text-green-500' 
                    : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
