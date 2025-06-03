
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BankInfoFormProps {
  swiftCode: string;
  setSwiftCode: (value: string) => void;
  bankName: string;
  setBankName: (value: string) => void;
  bankAddress: string;
  setBankAddress: (value: string) => void;
  translations: any;
  language: 'ar' | 'en';
}

const BankInfoForm: React.FC<BankInfoFormProps> = ({
  swiftCode,
  setSwiftCode,
  bankName,
  setBankName,
  bankAddress,
  setBankAddress,
  translations,
  language
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{translations.bankInfo}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.swiftCode} *</Label>
          <Input
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
            placeholder="ABCDUS33XXX"
            maxLength={11}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.bankName}</Label>
          <Input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل اسم البنك' : 'Enter bank name'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">{translations.bankAddress}</Label>
        <Input
          value={bankAddress}
          onChange={(e) => setBankAddress(e.target.value)}
          placeholder={language === 'ar' ? 'أدخل عنوان البنك' : 'Enter bank address'}
        />
      </div>
    </div>
  );
};

export default BankInfoForm;
