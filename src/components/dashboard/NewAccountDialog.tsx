
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, DollarSign, Euro, Banknote } from "lucide-react";
import { useAccountDialog } from "@/hooks/useAccountDialog";
import { getAccountDialogTranslations } from "@/utils/accountDialogTranslations";
import AccountCategorySelector from "./AccountCategorySelector";
import AccountDetailsForm from "./AccountDetailsForm";
import { Currency } from "@/types/account";

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const {
    isOpen,
    setIsOpen,
    currentStep,
    selectedCategory,
    selectedCurrency,
    setSelectedCurrency,
    requestMastercard,
    setRequestMastercard,
    requestVisa,
    setRequestVisa,
    handleCategorySelect,
    handleBack,
    handleDialogClose,
    handleOpenAccount
  } = useAccountDialog(language);

  const t = getAccountDialogTranslations(language);

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) handleDialogClose();
    }}>
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
          ) : selectedCategory ? (
            <AccountDetailsForm
              language={language}
              selectedCategory={selectedCategory}
              selectedCurrency={selectedCurrency}
              onCurrencySelect={setSelectedCurrency}
              requestMastercard={requestMastercard}
              requestVisa={requestVisa}
              onMastercardChange={setRequestMastercard}
              onVisaChange={setRequestVisa}
            />
          ) : null}
        </div>

        {currentStep === 'details' && (
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              {t.cancel}
            </Button>
            <Button 
              onClick={() => handleOpenAccount(currencies)} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-800"
            >
              {t.openAccount}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
