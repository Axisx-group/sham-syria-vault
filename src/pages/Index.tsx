
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import ModernFeaturesShowcase from '@/components/landing/ModernFeaturesShowcase';
import BankCardsSection from '@/components/landing/BankCardsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <StatsSection language={language} />
      <ModernFeaturesShowcase language={language} />
      <BankCardsSection language={language} />
      <TestimonialsSection language={language} />
      <CTASection language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Index;
