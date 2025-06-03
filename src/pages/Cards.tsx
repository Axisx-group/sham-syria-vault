
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import CardsHero from '@/components/cards/CardsHero';
import CardsShowcase from '@/components/cards/CardsShowcase';
import CardsComparison from '@/components/cards/CardsComparison';
import CardsFeatures from '@/components/cards/CardsFeatures';
import CardsApplication from '@/components/cards/CardsApplication';

const Cards = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      <CardsHero language={language} />
      <CardsShowcase language={language} />
      <CardsComparison language={language} />
      <CardsFeatures language={language} />
      <CardsApplication language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Cards;
