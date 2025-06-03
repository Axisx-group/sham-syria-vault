
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SwiftTransferAlertProps {
  language: 'ar' | 'en';
}

const SwiftTransferAlert: React.FC<SwiftTransferAlertProps> = ({ language }) => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {language === 'ar' 
          ? 'التحويلات الدولية تخضع للقوانين المحلية والدولية. قد تستغرق 1-3 أيام عمل.'
          : 'International transfers are subject to local and international regulations. Processing may take 1-3 business days.'
        }
      </AlertDescription>
    </Alert>
  );
};

export default SwiftTransferAlert;
