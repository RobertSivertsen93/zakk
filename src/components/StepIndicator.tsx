
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="step-indicator">
      <div className="step-item">
        <div className={`step-dot ${currentStep === 1 ? 'step-dot-active' : currentStep > 1 ? 'step-dot-completed' : ''}`}>1</div>
        <span className={`step-label ${currentStep === 1 ? 'step-label-active' : currentStep > 1 ? 'step-label-completed' : ''}`}>Upload PDF</span>
      </div>
      <div className={`step-line ${currentStep > 1 ? 'step-line-active' : ''}`}></div>
      <div className="step-item">
        <div className={`step-dot ${currentStep === 2 ? 'step-dot-active' : ''}`}>2</div>
        <span className={`step-label ${currentStep === 2 ? 'step-label-active' : ''}`}>Extract & Export</span>
      </div>
    </div>
  );
};

export default StepIndicator;
