
import React from 'react';
import { DollarSign, Euro, Banknote } from "lucide-react";
import SelectedAccountSummary from "./SelectedAccountSummary";
import CurrencySelector from "./CurrencySelector";
import CardOptionsSelector from "./CardOptionsSelector";
import IbanPreview from "./IbanPreview";

interface AccountCategory {
  id: string;
  type: 'personal' | 'business';
  name: string;
  description: string;
  benefits: string[];
  minDeposit: number;
  currency: string;
  color: string;
  bgColor: string;
  popular?: boolean;
}

interface Currency {
  code: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  minDeposit: number;
  countryCode: string;
}

interface AccountDetailsFormProps {
  language: 'ar' | 'en';
  selectedCategory: AccountCategory;
  selectedCurrency: string;
  onCurrencySelect: (currency: string) => void;
  requestMastercard: boolean;
  requestVisa: boolean;
  onMastercardChange: (checked: boolean) => void;
  onVisaChange: (checked: boolean) => void;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  language,
  selectedCategory,
  selectedCurrency,
  onCurrencySelect,
  requestMastercard,
  requestVisa,
  onMastercardChange,
  onVisaChange
}) => {
  const translations = {
    ar: {
      selectedAccount: "الحساب المختار",
      currency: "العملة",
      minimumDeposit: "الحد الأدنى للإيداع",
      cardOptions: "خيارات البطاقات (اختياري)",
      requestMastercard: "طلب بطاقة ماستركارد",
      requestVisa: "طلب بطاقة فيزا",
      ibanGenerated: "رقم الحساب المصرفي الدولي (IBAN)"
    },
    en: {
      selectedAccount: "Selected Account",
      currency: "Currency",
      minimumDeposit: "Minimum Deposit",
      cardOptions: "Card Options (Optional)",
      requestMastercard: "Request Mastercard",
      requestVisa: "Request Visa Card",
      ibanGenerated: "Generated IBAN"
    }
  };

  const t = translations[language];

  const currencies: Currency[] = [
    { 
      code: 'SYP', 
      name: language === 'ar' ? 'الليرة السورية' : 'Syrian Pound', 
      icon: Banknote,
      minDeposit: 50000,
      countryCode: 'SY'
    },
    { 
      code: 'USD', 
      name: language === 'ar' ? 'الدولار الأمريكي' : 'US Dollar', 
      icon: DollarSign,
      minDeposit: 100,
      countryCode: 'SY'
    },
    { 
      code: 'EUR', 
      name: language === 'ar' ? 'اليورو' : 'Euro', 
      icon: Euro,
      minDeposit: 100,
      countryCode: 'SY'
    }
  ];

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className="space-y-6">
      {/* Selected Account Summary */}
      <SelectedAccountSummary 
        selectedAccount={selectedCategory}
        title={t.selectedAccount}
      />

      {/* Currency Selection */}
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onCurrencySelect={onCurrencySelect}
        title={t.currency}
        minimumDepositText={t.minimumDeposit}
      />

      {/* Card Options */}
      <CardOptionsSelector
        requestMastercard={requestMastercard}
        requestVisa={requestVisa}
        onMastercardChange={onMastercardChange}
        onVisaChange={onVisaChange}
        translations={{
          cardOptions: t.cardOptions,
          requestMastercard: t.requestMastercard,
          requestVisa: t.requestVisa
        }}
      />

      {/* IBAN Preview */}
      {selectedCurrencyData && (
        <IbanPreview 
          countryCode={selectedCurrencyData.countryCode}
          title={t.ibanGenerated}
        />
      )}
    </div>
  );
};

export default AccountDetailsForm;
