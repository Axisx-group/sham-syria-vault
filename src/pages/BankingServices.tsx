
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";
import BankingServices from "@/components/banking/BankingServices";

const BankingServicesPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const translations = {
    ar: {
      backToHome: "العودة للرئيسية",
      bankingServices: "الخدمات المصرفية الشاملة",
      subtitle: "جميع الخدمات المصرفية التي تحتاجها في مكان واحد"
    },
    en: {
      backToHome: "Back to Home",
      bankingServices: "Comprehensive Banking Services",
      subtitle: "All the banking services you need in one place"
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToHome}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.bankingServices}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Banking Services Component */}
        <div className="max-w-7xl mx-auto">
          <BankingServices language={language} />
        </div>
      </div>
    </div>
  );
};

export default BankingServicesPage;
