
import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNum}
            </div>
            {stepNum < totalSteps && (
              <div className={`w-16 h-1 ${
                currentStep > stepNum ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
