
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ModernFeaturesShowcase from '@/components/landing/ModernFeaturesShowcase';
import BankCardsSection from '@/components/landing/BankCardsSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <BankCardsSection language={language} />
      <ModernFeaturesShowcase language={language} />
      <StatsSection language={language} />
      <WhyChooseUsSection language={language} />
      <FeaturesSection language={language} />
      <ServicesSection language={language} />
      <TestimonialsSection language={language} />
      <CTASection language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Index;
