
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BeneficiaryFormProps {
  beneficiaryName: string;
  setBeneficiaryName: (value: string) => void;
  beneficiaryAccount: string;
  setBeneficiaryAccount: (value: string) => void;
  beneficiaryAddress: string;
  setBeneficiaryAddress: (value: string) => void;
  translations: any;
  language: 'ar' | 'en';
}

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({
  beneficiaryName,
  setBeneficiaryName,
  beneficiaryAccount,
  setBeneficiaryAccount,
  beneficiaryAddress,
  setBeneficiaryAddress,
  translations,
  language
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{translations.beneficiaryInfo}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.beneficiaryName} *</Label>
          <Input
            value={beneficiaryName}
            onChange={(e) => setBeneficiaryName(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل اسم المستفيد' : 'Enter beneficiary name'}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">{translations.beneficiaryAccount} *</Label>
          <Input
            value={beneficiaryAccount}
            onChange={(e) => setBeneficiaryAccount(e.target.value)}
            placeholder={language === 'ar' ? 'أدخل رقم الحساب' : 'Enter account number'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">{translations.beneficiaryAddress}</Label>
        <Input
          value={beneficiaryAddress}
          onChange={(e) => setBeneficiaryAddress(e.target.value)}
          placeholder={language === 'ar' ? 'أدخل عنوان المستفيد' : 'Enter beneficiary address'}
        />
      </div>
    </div>
  );
};

export default BeneficiaryForm;
