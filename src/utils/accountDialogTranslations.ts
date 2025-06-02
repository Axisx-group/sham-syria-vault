
export const getAccountDialogTranslations = (language: 'ar' | 'en') => {
  return {
    ar: {
      openNewAccount: "فتح حساب جديد",
      chooseAccountType: "اختر نوع الحساب",
      accountDetails: "تفاصيل الحساب",
      currency: "العملة",
      initialDeposit: "الإيداع الأولي",
      minimumDeposit: "الحد الأدنى للإيداع",
      cancel: "إلغاء",
      back: "رجوع",
      next: "التالي",
      openAccount: "فتح الحساب",
      accountCreated: "تم إنشاء الحساب بنجاح",
      optional: "اختياري",
      cardOptions: "خيارات البطاقات",
      requestMastercard: "طلب بطاقة ماستركارد",
      requestVisa: "طلب بطاقة فيزا",
      ibanGenerated: "رقم IBAN",
      selectedAccount: "الحساب المختار",
      accountType: "نوع الحساب",
      chooseAccountFirst: "يرجى اختيار نوع الحساب أولاً"
    },
    en: {
      openNewAccount: "Open New Account",
      chooseAccountType: "Choose Account Type",
      accountDetails: "Account Details",
      currency: "Currency",
      initialDeposit: "Initial Deposit",
      minimumDeposit: "Minimum Deposit",
      cancel: "Cancel",
      back: "Back",
      next: "Next",
      openAccount: "Open Account",
      accountCreated: "Account created successfully",
      optional: "Optional",
      cardOptions: "Card Options",
      requestMastercard: "Request Mastercard",
      requestVisa: "Request Visa Card",
      ibanGenerated: "IBAN Number",
      selectedAccount: "Selected Account",
      accountType: "Account Type",
      chooseAccountFirst: "Please choose an account type first"
    }
  }[language];
};
