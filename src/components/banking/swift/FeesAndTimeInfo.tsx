
import React from 'react';
import { CreditCard, AlertCircle } from "lucide-react";

interface FeesAndTimeInfoProps {
  translations: any;
}

const FeesAndTimeInfo: React.FC<FeesAndTimeInfoProps> = ({ translations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium">{translations.fees}: {translations.swiftFee}</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <span className="text-sm font-medium">{translations.processingTime}: {translations.processingTimeText}</span>
      </div>
    </div>
  );
};

export default FeesAndTimeInfo;
