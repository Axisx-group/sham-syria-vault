
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import EnhancedHeroSection from '@/components/landing/EnhancedHeroSection';
import AnimatedStatsSection from '@/components/landing/AnimatedStatsSection';
import AdvancedServicesSection from '@/components/landing/AdvancedServicesSection';
import ModernFeaturesShowcase from '@/components/landing/ModernFeaturesShowcase';
import ModernCardsSection from '@/components/cards/ModernCardsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import SectionNavigation from '@/components/navigation/SectionNavigation';
import QuickActionsFab from '@/components/navigation/QuickActionsFab';
import NotificationBanner from '@/components/notifications/NotificationBanner';

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <NotificationBanner language={language} />
      <Header language={language} onLanguageChange={setLanguage} />
      
      <section id="hero">
        <EnhancedHeroSection language={language} />
      </section>
      
      <section id="stats">
        <AnimatedStatsSection language={language} />
      </section>
      
      <section id="services">
        <AdvancedServicesSection language={language} />
      </section>
      
      <section id="features">
        <ModernFeaturesShowcase language={language} />
      </section>
      
      <section id="cards">
        <ModernCardsSection language={language} />
      </section>
      
      <section id="testimonials">
        <TestimonialsSection language={language} />
      </section>
      
      <section id="cta">
        <CTASection language={language} />
      </section>
      
      <Footer language={language} />
      
      {/* Navigation Components */}
      <SectionNavigation language={language} />
      <QuickActionsFab language={language} />
    </div>
  );
};

export default Index;
