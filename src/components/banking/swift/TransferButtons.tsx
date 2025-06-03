
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TransferButtonsProps {
  isProcessing: boolean;
  onTransfer: () => void;
  translations: any;
  language: 'ar' | 'en';
}

const TransferButtons: React.FC<TransferButtonsProps> = ({
  isProcessing,
  onTransfer,
  translations,
  language
}) => {
  return (
    <div className="flex gap-4">
      <Button 
        onClick={onTransfer}
        disabled={isProcessing}
        className="flex-1"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            {translations.transfer}
          </div>
        )}
      </Button>
      
      <Button variant="outline" className="flex-1">
        {translations.cancel}
      </Button>
    </div>
  );
};

export default TransferButtons;
