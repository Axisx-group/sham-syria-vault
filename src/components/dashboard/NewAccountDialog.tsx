
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Euro, Banknote, PlusCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

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
      businessBenefits: "خدمات تجارية، حدود عالية",
      cardOptions: "خيارات البطاقات",
      requestMastercard: "طلب بطاقة ماستركارد",
      requestVisa: "طلب بطاقة فيزا",
      ibanGenerated: "رقم IBAN",
      accountDetails: "تفاصيل الحساب"
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
      businessBenefits: "Business services, high limits",
      cardOptions: "Card Options",
      requestMastercard: "Request Mastercard",
      requestVisa: "Request Visa Card",
      ibanGenerated: "IBAN Number",
      accountDetails: "Account Details"
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

  // Generate IBAN number
  const generateIBAN = () => {
    if (!selectedCurrencyData) return '';
    const bankCode = '0001'; // Bank Aljazira code
    const branchCode = '001';
    const accountNumber = Math.random().toString().substr(2, 12);
    const checkDigits = '00'; // Simplified for demo
    return `${selectedCurrencyData.countryCode}${checkDigits}${bankCode}${branchCode}${accountNumber}`;
  };

  const handleOpenAccount = () => {
    if (!selectedCurrency || !accountType) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const iban = generateIBAN();
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

          {/* Card Options */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">{t.cardOptions}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                <Checkbox 
                  id="mastercard" 
                  checked={requestMastercard}
                  onCheckedChange={setRequestMastercard}
                />
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <Label htmlFor="mastercard" className="font-medium">{t.requestMastercard}</Label>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                <Checkbox 
                  id="visa" 
                  checked={requestVisa}
                  onCheckedChange={setRequestVisa}
                />
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="visa" className="font-medium">{t.requestVisa}</Label>
                </div>
              </div>
            </div>
          </div>

          {/* IBAN Preview */}
          {selectedCurrencyData && (
            <div className="space-y-2">
              <Label className="text-base font-semibold">{t.ibanGenerated}</Label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm text-gray-700">{generateIBAN()}</p>
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
