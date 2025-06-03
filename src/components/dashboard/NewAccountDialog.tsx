
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { useAccountDialog } from "@/hooks/useAccountDialog";
import { getAccountDialogTranslations } from "@/utils/accountDialogTranslations";
import AccountCategorySelector from "./AccountCategorySelector";
import BasicAccountForm from "./BasicAccountForm";

interface NewAccountDialogProps {
  language: 'ar' | 'en';
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ language }) => {
  const {
    isOpen,
    setIsOpen,
    currentStep,
    selectedCategory,
    handleCategorySelect,
    handleBack,
    handleDialogClose,
    handleOpenAccount
  } = useAccountDialog(language);

  const t = getAccountDialogTranslations(language);

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
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
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
                  ? 'الحساب الأساسي بالليرة السورية - يمكنك إضافة عملات أخرى لاحقاً'
                  : 'Basic account in Syrian Pounds - you can add other currencies later'
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
            <BasicAccountForm
              language={language}
              selectedCategory={selectedCategory}
            />
          ) : null}
        </div>

        {currentStep === 'details' && (
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              {t.cancel}
            </Button>
            <Button 
              onClick={handleOpenAccount} 
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
