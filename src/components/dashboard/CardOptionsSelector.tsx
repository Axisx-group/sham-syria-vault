
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface CardOptionsSelectorProps {
  requestMastercard: boolean;
  requestVisa: boolean;
  onMastercardChange: (checked: boolean) => void;
  onVisaChange: (checked: boolean) => void;
  translations: {
    cardOptions: string;
    requestMastercard: string;
    requestVisa: string;
  };
}

const CardOptionsSelector: React.FC<CardOptionsSelectorProps> = ({
  requestMastercard,
  requestVisa,
  onMastercardChange,
  onVisaChange,
  translations
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{translations.cardOptions}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
          <Checkbox 
            id="mastercard" 
            checked={requestMastercard}
            onCheckedChange={(checked) => onMastercardChange(checked === true)}
          />
          <div className="flex items-center space-x-2 space-x-reverse">
            <CreditCard className="h-5 w-5 text-orange-600" />
            <Label htmlFor="mastercard" className="font-medium">{translations.requestMastercard}</Label>
          </div>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
          <Checkbox 
            id="visa" 
            checked={requestVisa}
            onCheckedChange={(checked) => onVisaChange(checked === true)}
          />
          <div className="flex items-center space-x-2 space-x-reverse">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <Label htmlFor="visa" className="font-medium">{translations.requestVisa}</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOptionsSelector;
