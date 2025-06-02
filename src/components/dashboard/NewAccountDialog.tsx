
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign, Euro, Banknote, PlusCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateIBAN } from "@/utils/ibanGenerator";
import AccountCategorySelector from "./AccountCategorySelector";
import CurrencySelector from "./CurrencySelector";
import CardOptionsSelector from "./CardOptionsSelector";
import SelectedAccountSummary from "./SelectedAccountSummary";
import IbanPreview from "./IbanPreview";
import { getAccountDialogTranslations } from "@/utils/accountDialogTranslations";

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

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'category' | 'details'>('category');
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [requestMastercard, setRequestMastercard] = useState(false);
  const [requestVisa, setRequestVisa] = useState(false);
  const { toast } = useToast();

  const t = getAccountDialogTranslations(language);

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

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  const handleCategorySelect = (category: AccountCategory) => {
    setSelectedCategory(category);
    setCurrentStep('details');
  };

  const handleBack = () => {
    setCurrentStep('category');
  };

  const handleOpenAccount = () => {
    if (!selectedCategory) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: t.chooseAccountFirst,
        variant: 'destructive'
      });
      return;
    }

    if (!selectedCurrency) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى اختيار العملة' : 'Please select a currency',
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
      description: `${selectedCategory.name} - ${selectedCurrencyData?.name}\nIBAN: ${iban}${cards.length > 0 ? `\n${language === 'ar' ? 'البطاقات المطلوبة' : 'Requested Cards'}: ${cards.join(', ')}` : ''}`,
    });

    // Reset form
    setIsOpen(false);
    setCurrentStep('category');
    setSelectedCategory(null);
    setSelectedCurrency('');
    setRequestMastercard(false);
    setRequestVisa(false);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setCurrentStep('category');
    setSelectedCategory(null);
    setSelectedCurrency('');
    setRequestMastercard(false);
    setRequestVisa(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          {t.openNewAccount}
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-6xl max-h-[90vh] overflow-y-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            {currentStep === 'details' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-1 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {currentStep === 'category' ? t.chooseAccountType : t.accountDetails}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 'category' 
              ? (language === 'ar' 
                  ? 'اختر نوع الحساب الذي يناسب احتياجاتك المالية'
                  : 'Choose the account type that suits your financial needs'
                )
              : (language === 'ar' 
                  ? 'أكمل تفاصيل حسابك الجديد'
                  : 'Complete your new account details'
                )
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep === 'category' ? (
            <AccountCategorySelector 
              onCategorySelect={handleCategorySelect}
              language={language}
            />
          ) : (
            <div className="space-y-6">
              {/* Selected Account Summary */}
              {selectedCategory && (
                <SelectedAccountSummary 
                  selectedAccount={selectedCategory}
                  title={t.selectedAccount}
                />
              )}

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
                <IbanPreview 
                  countryCode={selectedCurrencyData.countryCode}
                  title={t.ibanGenerated}
                />
              )}
            </div>
          )}
        </div>

        {currentStep === 'details' && (
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              {t.cancel}
            </Button>
            <Button onClick={handleOpenAccount} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-800">
              {t.openAccount}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
