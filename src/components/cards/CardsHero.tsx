
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CardsHeroProps {
  language: 'ar' | 'en';
}

const CardsHero: React.FC<CardsHeroProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقات مصرفية تناسب كل احتياجاتك",
      subtitle: "اكتشف مجموعتنا الحصرية من البطاقات المصرفية المصممة لتوفير تجربة مالية متطورة ومرنة",
      getCard: "احصل على بطاقتك",
      learnMore: "اعرف المزيد"
    },
    en: {
      title: "Cards that fit your every need",
      subtitle: "Discover our exclusive collection of banking cards designed to provide an advanced and flexible financial experience",
      getCard: "Get Your Card",
      learnMore: "Learn More"
    }
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
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

          {/* Card Visual */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative`}>
            <div className="relative transform rotate-12 hover:rotate-6 transition-transform duration-700">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden w-96 h-56">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full -translate-y-20 translate-x-20 blur-2xl"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-white font-bold text-xl italic tracking-wider">SYRIA VAULT</div>
                    <div className="text-white font-bold text-lg italic tracking-wider">VISA</div>
                  </div>

                  {/* Chip */}
                  <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-xl mb-8 shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-xl p-1">
                      <div className="w-full h-full border-2 border-yellow-400 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200"></div>
                    </div>
                  </div>

                  <div className="font-mono text-2xl tracking-wider mb-6">5432 **** **** 1234</div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                      <p className="font-semibold">AHMED HASSAN</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                      <p className="font-semibold">12/28</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Cards */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-8 rounded-3xl shadow-xl text-white w-96 h-56 opacity-70 -z-10"></div>
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 rounded-3xl shadow-lg text-white w-96 h-56 opacity-40 -z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsHero;
