
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, CreditCard } from "lucide-react";

interface CardsShowcaseProps {
  language: 'ar' | 'en';
}

const CardsShowcase: React.FC<CardsShowcaseProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "اختر البطاقة المثالية لك",
      subtitle: "مجموعة متنوعة من البطاقات لتناسب جميع احتياجاتك المالية",
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      platinumDesc: "للعملاء المميزين الذين يسعون للرفاهية المطلقة",
      goldDesc: "توازن مثالي بين المزايا والقيمة",
      classicDesc: "بداية مثالية لرحلتك المصرفية",
      orderNow: "اطلب الآن"
    },
    en: {
      title: "Choose your perfect card",
      subtitle: "A diverse range of cards to suit all your financial needs",
      platinum: "Platinum Elite",
      gold: "Gold Prestige",
      classic: "Classic Smart",
      platinumDesc: "For distinguished customers seeking absolute luxury",
      goldDesc: "Perfect balance between benefits and value",
      classicDesc: "Perfect start to your banking journey",
      orderNow: "Order Now"
    }
  };

  const t = translations[language];

  const cards = [
    {
      name: t.platinum,
      description: t.platinumDesc,
      gradient: "from-gray-900 via-black to-gray-800",
      accentGradient: "from-purple-400 via-pink-400 to-purple-600",
      icon: Crown,
      tier: "PLATINUM ELITE",
      number: "5432 **** **** 1234",
      holder: "AHMED HASSAN",
      expiry: "12/28"
    },
    {
      name: t.gold,
      description: t.goldDesc,
      gradient: "from-amber-400 via-yellow-500 to-amber-600",
      accentGradient: "from-orange-300 via-yellow-400 to-amber-500",
      icon: Award,
      tier: "GOLD PRESTIGE",
      number: "4567 **** **** 8901",
      holder: "SARA AHMED",
      expiry: "08/27"
    },
    {
      name: t.classic,
      description: t.classicDesc,
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-indigo-500 to-purple-600",
      icon: Star,
      tier: "CLASSIC SMART",
      number: "6789 **** **** 2345",
      holder: "OMAR HASSAN",
      expiry: "03/29"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
            <CreditCard className="w-4 h-4 mr-2" />
            البطاقات المصرفية
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div key={index} className="group cursor-pointer">
                {/* Card Container */}
                <div className="relative">
                  {/* 3D Card */}
                  <div className={`bg-gradient-to-br ${card.gradient} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl group-hover:-translate-y-4`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accentGradient} rounded-full -translate-y-20 translate-x-20 blur-2xl`}></div>
                    </div>

                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-none backdrop-blur-sm text-xs">
                          {card.tier}
                        </Badge>
                      </div>
                      <div className="text-white font-bold text-lg italic tracking-wider">VISA</div>
                    </div>

                    {/* Chip */}
                    <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-xl mb-8 relative z-10 shadow-xl">
                      <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-xl p-1">
                        <div className="w-full h-full border-2 border-yellow-400 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200"></div>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="font-mono text-xl tracking-wider mb-8 relative z-10">
                      {card.number}
                    </div>

                    {/* Card Details */}
                    <div className="flex justify-between items-end relative z-10">
                      <div>
                        <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                        <p className="font-semibold">{card.holder}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                        <p className="font-semibold">{card.expiry}</p>
                      </div>
                    </div>

                    {/* Brand */}
                    <div className="absolute bottom-6 right-6 opacity-60">
                      <div className="text-xs tracking-widest font-light">SYRIA VAULT</div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg mt-6 transform transition-all duration-500 group-hover:shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.name}</h3>
                    <p className="text-gray-600 mb-6">{card.description}</p>
                    <button className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${card.accentGradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                      {t.orderNow}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardsShowcase;
