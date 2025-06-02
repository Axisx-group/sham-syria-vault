
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateIBAN } from "@/utils/ibanGenerator";

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
  minDeposit: number;
  countryCode: string;
}

export const useAccountDialog = (language: 'ar' | 'en') => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'category' | 'details'>('category');
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [requestMastercard, setRequestMastercard] = useState(false);
  const [requestVisa, setRequestVisa] = useState(false);
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
    setSelectedCurrency('');
    setRequestMastercard(false);
    setRequestVisa(false);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleOpenAccount = (currencies: Currency[]) => {
    const t = {
      chooseAccountFirst: language === 'ar' ? 'يرجى اختيار نوع الحساب أولاً' : 'Please choose account type first',
      accountCreated: language === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!'
    };

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

    const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
    const iban = generateIBAN(selectedCurrencyData?.countryCode || 'SY');
    const cards = [];
    if (requestMastercard) cards.push('Mastercard');
    if (requestVisa) cards.push('Visa');

    toast({
      title: t.accountCreated,
      description: `${selectedCategory.name} - ${selectedCurrencyData?.name}\nIBAN: ${iban}${cards.length > 0 ? `\n${language === 'ar' ? 'البطاقات المطلوبة' : 'Requested Cards'}: ${cards.join(', ')}` : ''}`,
    });

    setIsOpen(false);
    resetForm();
  };

  return {
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
  };
};
