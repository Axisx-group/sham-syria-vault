
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateIBAN } from "@/utils/ibanGenerator";
import { AccountCategory } from "@/types/account";

export const useAccountDialog = (language: 'ar' | 'en') => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'category' | 'details'>('category');
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);
  const { toast } = useToast();

  const handleCategorySelect = (category: AccountCategory) => {
    setSelectedCategory(category);
    setCurrentStep('details');
  };

  const handleBack = () => {
    setCurrentStep('category');
  };

  const resetForm = () => {
    setCurrentStep('category');
    setSelectedCategory(null);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleOpenAccount = () => {
    const t = {
      chooseAccountFirst: language === 'ar' ? 'يرجى اختيار نوع الحساب أولاً' : 'Please choose account type first',
      accountCreated: language === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!',
      defaultCurrency: language === 'ar' ? 'الليرة السورية' : 'Syrian Pound'
    };

    if (!selectedCategory) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: t.chooseAccountFirst,
        variant: 'destructive'
      });
      return;
    }

    const iban = generateIBAN('SY');

    toast({
      title: t.accountCreated,
      description: `${selectedCategory.name} - ${t.defaultCurrency}\nIBAN: ${iban}`,
    });

    setIsOpen(false);
    resetForm();
  };

  return {
    isOpen,
    setIsOpen,
    currentStep,
    selectedCategory,
    handleCategorySelect,
    handleBack,
    handleDialogClose,
    handleOpenAccount
  };
};
