
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Zap, Globe, Star, Award, Crown } from "lucide-react";

interface BankCardsSectionProps {
  language: 'ar' | 'en';
}

const BankCardsSection: React.FC<BankCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتنا المصرفية الحصرية",
      subtitle: "اختر البطاقة التي تناسب أسلوب حياتك الفاخر",
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      features: {
        platinum: ["حد ائتماني غير محدود", "خدمات كونسيرج عالمية", "استرداد نقدي 5%", "تأمين سفر شامل", "صالات مطارات VIP"],
        gold: ["مكافآت مضاعفة 3x", "خدمة عملاء مخصصة", "حماية مشتريات متقدمة", "عروض فنادق حصرية", "استرداد نقدي 2%"],
        classic: ["استخدام عالمي", "أمان بتقنية NFC", "رسوم سنوية مجانية", "تطبيق ذكي متطور", "دعم فني 24/7"]
      },
      secure: "حماية متقدمة",
      worldwide: "قبول عالمي",
      rewards: "مكافآت استثنائية",
      exclusive: "حصري",
      premium: "بريميوم"
    },
    en: {
      title: "Exclusive Banking Cards",
      subtitle: "Choose the card that matches your luxury lifestyle",
      platinum: "Platinum Elite",
      gold: "Gold Prestige", 
      classic: "Classic Smart",
      features: {
        platinum: ["Unlimited Credit Limit", "Global Concierge Services", "5% Cash Back", "Comprehensive Travel Insurance", "VIP Airport Lounges"],
        gold: ["3x Rewards Points", "Dedicated Customer Service", "Advanced Purchase Protection", "Exclusive Hotel Offers", "2% Cash Back"],
        classic: ["Global Acceptance", "NFC Security Technology", "No Annual Fee", "Smart Mobile App", "24/7 Support"]
      },
      secure: "Advanced Security",
      worldwide: "Global Acceptance",
      rewards: "Exceptional Rewards",
      exclusive: "Exclusive",
      premium: "Premium"
    }
  };

  const t = translations[language];

  const cards = [
    {
      type: t.platinum,
      gradient: "from-gray-900 via-black to-gray-800",
      accentGradient: "from-purple-400 via-pink-400 to-purple-600",
      brand: "visa",
      features: t.features.platinum,
      number: "5432 **** **** 1234",
      name: "JAMES ANDERSON",
      expiry: "12/28",
      tier: "PLATINUM ELITE",
      icon: Crown,
      shimmer: true
    },
    {
      type: t.gold,
      gradient: "from-amber-400 via-yellow-500 to-amber-600",
      accentGradient: "from-orange-300 via-yellow-400 to-amber-500",
      brand: "mastercard",
      features: t.features.gold,
      number: "4567 **** **** 8901",
      name: "SOPHIA WILLIAMS",
      expiry: "08/27",
      tier: "GOLD PRESTIGE",
      icon: Award,
      shimmer: false
    },
    {
      type: t.classic,
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-indigo-500 to-purple-600",
      brand: "visa",
      features: t.features.classic,
      number: "6789 **** **** 2345",
      name: "MICHAEL CHEN",
      expiry: "03/29",
      tier: "CLASSIC SMART",
      icon: Star,
      shimmer: false
    }
  ];

  const VisaLogo = () => (
    <div className="text-white font-bold text-xl italic tracking-wider drop-shadow-lg">
      VISA
    </div>
  );

  const MastercardLogo = () => (
    <div className="flex items-center drop-shadow-lg">
      <div className="w-7 h-7 bg-red-500 rounded-full"></div>
      <div className="w-7 h-7 bg-yellow-400 rounded-full -ml-3"></div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200 hover:scale-105 transition-transform">
            <Crown className="w-4 h-4 mr-2" />
            {t.exclusive}
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div key={index} className="group cursor-pointer">
                {/* Card Visual */}
                <div className={`bg-gradient-to-br ${card.gradient} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-3xl mb-8 ${card.shimmer ? 'animate-pulse' : ''}`}>
                  {/* Shimmer effect for platinum */}
                  {card.shimmer && (
                    <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -rotate-12 animate-pulse"></div>
                  )}

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accentGradient} rounded-full -translate-y-20 translate-x-20 blur-2xl`}></div>
                    <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${card.accentGradient} rounded-full translate-y-16 -translate-x-16 blur-xl`}></div>
                  </div>

                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-none backdrop-blur-sm">
                        {card.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {card.brand === 'visa' ? <VisaLogo /> : <MastercardLogo />}
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-xl mb-8 relative z-10 shadow-xl transform hover:scale-110 transition-transform">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-xl p-1">
                      <div className="w-full h-full border-2 border-yellow-400 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200"></div>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="font-mono text-2xl tracking-wider mb-8 relative z-10 font-light">
                    {card.number}
                  </div>

                  {/* Card Details */}
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <p className="text-xs opacity-75 mb-2 tracking-widest">CARD HOLDER</p>
                      <p className="font-semibold text-lg tracking-wide">{card.name}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 mb-2 tracking-widest">EXPIRES</p>
                      <p className="font-semibold text-lg">{card.expiry}</p>
                    </div>
                  </div>

                  {/* Contactless Symbol */}
                  <div className="absolute top-8 left-8">
                    <div className="w-8 h-8 opacity-60">
                      <div className="absolute w-8 h-8 border-2 border-white rounded-full opacity-40"></div>
                      <div className="absolute w-6 h-6 border-2 border-white rounded-full opacity-60 top-1 left-1"></div>
                      <div className="absolute w-4 h-4 border-2 border-white rounded-full opacity-80 top-2 left-2"></div>
                      <div className="absolute w-2 h-2 border-2 border-white rounded-full top-3 left-3"></div>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute bottom-6 right-6">
                    <div className="text-xs opacity-60 tracking-widest font-light">
                      SYRIA VAULT
                    </div>
                  </div>
                </div>

                {/* Card Features */}
                <Card className="transform transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl text-gray-900">{card.type}</h3>
                      <Badge className={`bg-gradient-to-r ${card.accentGradient} text-white border-none`}>
                        {t.premium}
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                          <div className={`w-3 h-3 bg-gradient-to-r ${card.accentGradient} rounded-full mr-4 shadow-lg`}></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Enhanced Features Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center group cursor-pointer p-6 rounded-2xl hover:bg-white/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.secure}</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">حماية متقدمة بتقنية التشفير الكمي</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-pointer p-6 rounded-2xl hover:bg-white/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.worldwide}</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">مقبولة في أكثر من 200 دولة حول العالم</p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-pointer p-6 rounded-2xl hover:bg-white/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.rewards}</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">مكافآت وعروض حصرية لا تقاوم</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankCardsSection;
