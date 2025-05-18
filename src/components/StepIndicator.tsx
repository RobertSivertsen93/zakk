
import React from 'react';
import { Check, FileText, List, Download, Upload } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  currentStep: number;
  completedSections?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep,
  completedSections = []
}) => {
  const steps = [
    { id: 'upload', label: 'Upload PDF', icon: Upload },
    { id: 'invoice', label: 'Invoice Details', icon: FileText },
    { id: 'lineitems', label: 'Line Items', icon: List },
    { id: 'export', label: 'Export', icon: Download },
  ];

  const currentStepIndex = currentStep - 1;
  const progressPercentage = ((currentStepIndex) / (steps.length - 1)) * 100;
  
  // Calculate overall completion percentage based on completed sections
  const calculateOverallProgress = () => {
    if (completedSections.length === 0) return progressPercentage;
    
    // Each section contributes to overall completion
    const totalSections = ['invoice-details', 'line-items', 'export-options'];
    const completionPercentage = (completedSections.length / totalSections.length) * 100;
    
    return Math.max(progressPercentage, completionPercentage);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">{Math.round(calculateOverallProgress())}%</span>
      </div>
      
      <Progress value={calculateOverallProgress()} className="h-2 mb-6" />
      
      <div className="grid grid-cols-4 w-full gap-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full 
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {isCompleted ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
              </div>
              <span className={`mt-2 text-xs font-medium text-center ${
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
