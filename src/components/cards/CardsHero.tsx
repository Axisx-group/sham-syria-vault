
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, CreditCard } from "lucide-react";

interface CardsHeroProps {
  language: 'ar' | 'en';
}

const CardsHero: React.FC<CardsHeroProps> = ({ language }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const translations = {
    ar: {
      title: "بطاقات مصرفية تناسب كل احتياجاتك",
      subtitle: "اكتشف مجموعتنا الحصرية من البطاقات المصرفية المصممة لتوفير تجربة مالية متطورة ومرنة",
      getCard: "احصل على بطاقتك",
      learnMore: "اعرف المزيد",
      premiumDesign: "تصميم متميز",
      securePayments: "مدفوعات آمنة",
      globalAcceptance: "قبول عالمي"
    },
    en: {
      title: "Cards that fit your every need", 
      subtitle: "Discover our exclusive collection of banking cards designed to provide an advanced and flexible financial experience",
      getCard: "Get Your Card",
      learnMore: "Learn More",
      premiumDesign: "Premium Design",
      securePayments: "Secure Payments", 
      globalAcceptance: "Global Acceptance"
    }
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  const heroCards = [
    {
      gradient: "from-gray-900 via-black to-gray-800",
      accentGradient: "from-purple-400 via-pink-400 to-purple-600",
      number: "5432 **** **** 1234",
      holder: "AHMED HASSAN",
      tier: "PLATINUM ELITE"
    },
    {
      gradient: "from-amber-400 via-yellow-500 to-amber-600", 
      accentGradient: "from-orange-300 via-yellow-400 to-amber-500",
      number: "4567 **** **** 8901",
      holder: "SARA AHMED", 
      tier: "GOLD PRESTIGE"
    },
    {
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-indigo-500 to-purple-600", 
      number: "6789 **** **** 2345",
      holder: "OMAR HASSAN",
      tier: "CLASSIC SMART"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % heroCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CreditCard className="absolute top-20 left-20 w-8 h-8 text-white/20 animate-float" />
        <Sparkles className="absolute top-40 right-32 w-6 h-6 text-purple-300/30 animate-float delay-1000" />
        <CreditCard className="absolute bottom-32 left-1/4 w-10 h-10 text-blue-300/20 animate-float delay-2000" />
        <Sparkles className="absolute bottom-20 right-20 w-8 h-8 text-pink-300/30 animate-float delay-3000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-white text-sm font-medium">{t.premiumDesign}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <CreditCard className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-white text-sm font-medium">{t.securePayments}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <ArrowRight className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-white text-sm font-medium">{t.globalAcceptance}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {t.getCard}
                {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl backdrop-blur-sm"
              >
                {t.learnMore}
              </Button>
            </div>
          </div>

          {/* Animated Cards Stack */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative`}>
            <div className="relative w-96 h-64 mx-auto">
              {heroCards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentCard 
                      ? 'rotate-0 scale-100 z-30' 
                      : index === (currentCard + 1) % heroCards.length
                      ? 'rotate-6 scale-95 z-20 translate-x-4 translate-y-4'
                      : 'rotate-12 scale-90 z-10 translate-x-8 translate-y-8'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${card.gradient} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden w-full h-full`}>
                    {/* Holographic Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.accentGradient} rounded-full -translate-y-16 translate-x-16 blur-2xl`}></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="text-white font-bold text-lg italic tracking-wider">SYRIA VAULT</div>
                        <div className="text-white font-bold text-lg italic tracking-wider">VISA</div>
                      </div>

                      <div className="space-y-4">
                        {/* Chip */}
                        <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-lg shadow-lg"></div>
                        
                        <div className="font-mono text-lg tracking-wider">{card.number}</div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs opacity-75">CARD HOLDER</p>
                            <p className="font-semibold text-sm">{card.holder}</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-75">EXPIRES</p>
                            <p className="font-semibold text-sm">12/28</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {heroCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCard ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsHero;
