
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Euro, Banknote, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [accountType, setAccountType] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
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
      selectCurrency: "اختر العملة",
      selectAccountType: "اختر نوع الحساب",
      cancel: "إلغاء",
      openAccount: "فتح الحساب",
      accountCreated: "تم إنشاء الحساب بنجاح",
      pleaseSelect: "يرجى اختيار",
      optional: "اختياري",
      benefits: "المزايا",
      currentBenefits: "تحويلات فورية، رسوم منخفضة",
      savingsBenefits: "فوائد عالية، استثمار آمن",
      businessBenefits: "خدمات تجارية، حدود عالية"
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
      selectCurrency: "Select Currency",
      selectAccountType: "Select Account Type",
      cancel: "Cancel",
      openAccount: "Open Account",
      accountCreated: "Account created successfully",
      pleaseSelect: "Please select",
      optional: "Optional",
      benefits: "Benefits",
      currentBenefits: "Instant transfers, low fees",
      savingsBenefits: "High interest, secure investment",
      businessBenefits: "Business services, high limits"
    }
  };

  const t = translations[language];

  const currencies = [
    { 
      code: 'SYP', 
      name: language === 'ar' ? 'الليرة السورية' : 'Syrian Pound', 
      icon: Banknote,
      minDeposit: 50000
    },
    { 
      code: 'USD', 
      name: language === 'ar' ? 'الدولار الأمريكي' : 'US Dollar', 
      icon: DollarSign,
      minDeposit: 100
    },
    { 
      code: 'EUR', 
      name: language === 'ar' ? 'اليورو' : 'Euro', 
      icon: Euro,
      minDeposit: 100
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

    toast({
      title: t.accountCreated,
      description: `${accountTypes.find(a => a.type === accountType)?.name} - ${selectedCurrencyData?.name}`,
    });

    setIsOpen(false);
    setSelectedCurrency('');
    setAccountType('');
    setInitialDeposit('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          {t.openNewAccount}
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-2xl ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl">{t.openNewAccount}</DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'اختر نوع الحساب والعملة التي تريد فتح الحساب بها'
              : 'Choose the account type and currency for your new account'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Account Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.accountType}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {accountTypes.map((type) => (
                <Card 
                  key={type.type}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    accountType === type.type 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : ''
                  }`}
                  onClick={() => setAccountType(type.type)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-1">{type.name}</h4>
                    <p className="text-xs text-gray-600">{type.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Currency Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.currency}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currencies.map((currency) => {
                const Icon = currency.icon;
                return (
                  <Card 
                    key={currency.code}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCurrency === currency.code 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : ''
                    }`}
                    onClick={() => setSelectedCurrency(currency.code)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">{currency.code}</h4>
                      <p className="text-xs text-gray-600">{currency.name}</p>
                      <p className="text-xs text-green-600 mt-1">
                        {t.minimumDeposit}: {currency.minDeposit.toLocaleString()} {currency.code}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

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
