
import React, { useState } from 'react';
import ModernHeroSection from '@/components/landing/ModernHeroSection';
import EnhancedStatsSection from '@/components/landing/EnhancedStatsSection';
import RealServicesSection from '@/components/landing/RealServicesSection';
import ModernFeaturesShowcase from '@/components/landing/ModernFeaturesShowcase';
import ModernCardsSection from '@/components/cards/ModernCardsSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
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
      
      <section id="hero" className="relative">
        <ModernHeroSection language={language} onLanguageChange={setLanguage} />
      </section>
      
      <section id="stats" className="stats-section">
        <EnhancedStatsSection language={language} />
      </section>
      
      <section id="services" className="light-section">
        <RealServicesSection language={language} />
      </section>
      
      <section id="features" className="light-section">
        <ModernFeaturesShowcase language={language} />
      </section>

      <section id="why-choose-us" className="light-section">
        <WhyChooseUsSection language={language} />
      </section>
      
      <section id="cards" className="dark-section">
        <ModernCardsSection language={language} />
      </section>
      
      <section id="testimonials" className="testimonials-section">
        <TestimonialsSection language={language} />
      </section>
      
      <section id="cta" className="cta-section">
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
