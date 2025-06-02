
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Euro, Banknote, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateIBAN } from "@/utils/ibanGenerator";
import AccountTypeSelector from "./AccountTypeSelector";
import CurrencySelector from "./CurrencySelector";
import CardOptionsSelector from "./CardOptionsSelector";

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [accountType, setAccountType] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [requestMastercard, setRequestMastercard] = useState(false);
  const [requestVisa, setRequestVisa] = useState(false);
  const { toast } = useToast();

  const translations = {
    ar: {
      openNewAccount: "فتح حساب جديد",
      accountType: "نوع الحساب",
      currency: "العملة",
      initialDeposit: "الإيداع الأولي",
      minimumDeposit: "الحد الأدنى للإيداع",
      currentAccount: "حساب جاري",
      savingsAccount: "حساب توفير",
      businessAccount: "حساب تجاري",
      cancel: "إلغاء",
      openAccount: "فتح الحساب",
      accountCreated: "تم إنشاء الحساب بنجاح",
      optional: "اختياري",
      currentBenefits: "تحويلات فورية، رسوم منخفضة",
      savingsBenefits: "فوائد عالية، استثمار آمن",
      businessBenefits: "خدمات تجارية، حدود عالية",
      cardOptions: "خيارات البطاقات",
      requestMastercard: "طلب بطاقة ماستركارد",
      requestVisa: "طلب بطاقة فيزا",
      ibanGenerated: "رقم IBAN"
    },
    en: {
      openNewAccount: "Open New Account",
      accountType: "Account Type",
      currency: "Currency",
      initialDeposit: "Initial Deposit",
      minimumDeposit: "Minimum Deposit",
      currentAccount: "Current Account",
      savingsAccount: "Savings Account",
      businessAccount: "Business Account",
      cancel: "Cancel",
      openAccount: "Open Account",
      accountCreated: "Account created successfully",
      optional: "Optional",
      currentBenefits: "Instant transfers, low fees",
      savingsBenefits: "High interest, secure investment",
      businessBenefits: "Business services, high limits",
      cardOptions: "Card Options",
      requestMastercard: "Request Mastercard",
      requestVisa: "Request Visa Card",
      ibanGenerated: "IBAN Number"
    }
  };

  const t = translations[language];

  const currencies = [
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

  const accountTypes = [
    {
      type: 'current',
      name: t.currentAccount,
      benefits: t.currentBenefits
    },
    {
      type: 'savings',
      name: t.savingsAccount,
      benefits: t.savingsBenefits
    },
    {
      type: 'business',
      name: t.businessAccount,
      benefits: t.businessBenefits
    }
  ];

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  const handleOpenAccount = () => {
    if (!selectedCurrency || !accountType) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const iban = generateIBAN(selectedCurrencyData?.countryCode || 'SY');
    const cards = [];
    if (requestMastercard) cards.push('Mastercard');
    if (requestVisa) cards.push('Visa');

    toast({
      title: t.accountCreated,
      description: `${accountTypes.find(a => a.type === accountType)?.name} - ${selectedCurrencyData?.name}\nIBAN: ${iban}${cards.length > 0 ? `\n${language === 'ar' ? 'البطاقات المطلوبة' : 'Requested Cards'}: ${cards.join(', ')}` : ''}`,
    });

    setIsOpen(false);
    setSelectedCurrency('');
    setAccountType('');
    setInitialDeposit('');
    setRequestMastercard(false);
    setRequestVisa(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          {t.openNewAccount}
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl">{t.openNewAccount}</DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'اختر نوع الحساب والعملة والبطاقات التي تريد فتح الحساب بها'
              : 'Choose the account type, currency, and cards for your new account'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Account Type Selection */}
          <AccountTypeSelector
            accountTypes={accountTypes}
            selectedType={accountType}
            onTypeSelect={setAccountType}
            title={t.accountType}
          />

          {/* Currency Selection */}
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            onCurrencySelect={setSelectedCurrency}
            title={t.currency}
            minimumDepositText={t.minimumDeposit}
          />

          {/* Card Options */}
          <CardOptionsSelector
            requestMastercard={requestMastercard}
            requestVisa={requestVisa}
            onMastercardChange={setRequestMastercard}
            onVisaChange={setRequestVisa}
            translations={{
              cardOptions: t.cardOptions,
              requestMastercard: t.requestMastercard,
              requestVisa: t.requestVisa
            }}
          />

          {/* IBAN Preview */}
          {selectedCurrencyData && (
            <div className="space-y-2">
              <Label className="text-base font-semibold">{t.ibanGenerated}</Label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm text-gray-700">{generateIBAN(selectedCurrencyData.countryCode)}</p>
              </div>
            </div>
          )}

          {/* Initial Deposit */}
          {selectedCurrencyData && (
            <div className="space-y-2">
              <Label htmlFor="initialDeposit">
                {t.initialDeposit} ({t.optional})
              </Label>
              <div className="relative">
                <Input
                  id="initialDeposit"
                  type="number"
                  placeholder={`${selectedCurrencyData.minDeposit} ${selectedCurrency}`}
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="pl-12"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <selectedCurrencyData.icon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {t.minimumDeposit}: {selectedCurrencyData.minDeposit.toLocaleString()} {selectedCurrency}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t.cancel}
          </Button>
          <Button onClick={handleOpenAccount}>
            {t.openAccount}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
