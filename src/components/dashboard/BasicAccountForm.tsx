
import React from 'react';
import { Banknote } from "lucide-react";
import SelectedAccountSummary from "./SelectedAccountSummary";
import IbanPreview from "./IbanPreview";
import { AccountCategory } from "@/types/account";

interface BasicAccountFormProps {
  language: 'ar' | 'en';
  selectedCategory: AccountCategory;
}

const BasicAccountForm: React.FC<BasicAccountFormProps> = ({
  language,
  selectedCategory
}) => {
  const translations = {
    ar: {
      selectedAccount: "الحساب المختار",
      defaultCurrency: "العملة الافتراضية",
      syrianPound: "الليرة السورية",
      minimumDeposit: "الحد الأدنى للإيداع",
      ibanGenerated: "رقم الحساب المصرفي الدولي (IBAN)",
      note: "ملاحظة: يمكنك إضافة عملات أخرى وطلب بطاقات إضافية بعد فتح الحساب"
    },
    en: {
      selectedAccount: "Selected Account",
      defaultCurrency: "Default Currency",
      syrianPound: "Syrian Pound",
      minimumDeposit: "Minimum Deposit",
      ibanGenerated: "Generated IBAN",
      note: "Note: You can add other currencies and request additional cards after opening the account"
    }
  };

  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Selected Account Summary */}
      <SelectedAccountSummary 
        selectedAccount={selectedCategory}
        title={t.selectedAccount}
      />

      {/* Default Currency Information */}
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Banknote className="h-8 w-8 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-900">{t.defaultCurrency}</h4>
              <p className="text-blue-700">{t.syrianPound}</p>
            </div>
          </div>
          <p className="text-sm text-blue-600">
            {t.minimumDeposit}: 50,000 SYP
          </p>
        </div>
      </div>

      {/* IBAN Preview */}
      <IbanPreview 
        countryCode="SY"
        title={t.ibanGenerated}
      />

      {/* Note about additional services */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          💡 {t.note}
        </p>
      </div>
    </div>
  );
};

export default BasicAccountForm;
