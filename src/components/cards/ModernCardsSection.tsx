
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Globe, Zap } from "lucide-react";
import BankCard from './BankCard';
import CardFeatures from './CardFeatures';

interface ModernCardsSectionProps {
  language: 'ar' | 'en';
}

const ModernCardsSection: React.FC<ModernCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتنا المصرفية",
      subtitle: "اختر البطاقة التي تناسب احتياجاتك",
      platinum: "بلاتينية إليت", 
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      features: {
        platinum: ["حد ائتماني غير محدود", "خدمات كونسيرج عالمية", "استرداد نقدي 5%", "تأمين سفر شامل", "صالات مطارات VIP"],
        gold: ["مكافآت مضاعفة 3x", "خدمة عملاء مخصصة", "حماية مشتريات متقدمة", "عروض فنادق حصرية", "استرداد نقدي 2%"],
        classic: ["استخدام عالمي", "أمان بتقنية NFC", "رسوم سنوية مجانية", "تطبيق ذكي متطور", "دعم فني 24/7"]
      },
      security: "حماية متقدمة",
      worldwide: "قبول عالمي", 
      rewards: "مكافآت استثنائية",
      exclusive: "حصري"
    },
    en: {
      title: "Our Banking Cards",
      subtitle: "Choose the card that fits your needs",
      platinum: "Platinum Elite",
      gold: "Gold Prestige", 
      classic: "Classic Smart",
      features: {
        platinum: ["Unlimited Credit Limit", "Global Concierge Services", "5% Cash Back", "Comprehensive Travel Insurance", "VIP Airport Lounges"],
        gold: ["3x Rewards Points", "Dedicated Customer Service", "Advanced Purchase Protection", "Exclusive Hotel Offers", "2% Cash Back"],
        classic: ["Global Acceptance", "NFC Security Technology", "No Annual Fee", "Smart Mobile App", "24/7 Support"]
      },
      security: "Advanced Security",
      worldwide: "Global Acceptance",
      rewards: "Exceptional Rewards", 
      exclusive: "Exclusive"
    }
  };

  const t = translations[language];

  const cards = [
    {
      type: 'platinum' as const,
      name: t.platinum,
      number: "5432 **** **** 1234",
      holder: "JAMES ANDERSON", 
      expiry: "12/28",
      gradient: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
      features: t.features.platinum,
      accentColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      type: 'gold' as const,
      name: t.gold,
      number: "4567 **** **** 8901",
      holder: "SOPHIA WILLIAMS",
      expiry: "08/27", 
      gradient: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
      features: t.features.gold,
      accentColor: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      type: 'classic' as const,
      name: t.classic,
      number: "6789 **** **** 2345", 
      holder: "MICHAEL CHEN",
      expiry: "03/29",
      gradient: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700",
      features: t.features.classic,
      accentColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
            <Crown className="w-4 h-4 mr-2" />
            {t.exclusive}
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-20">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col items-center space-y-8">
              <BankCard
                type={card.type}
                name={card.name}
                number={card.number}
                holder={card.holder}
                expiry={card.expiry}
                gradient={card.gradient}
                language={language}
              />
              <CardFeatures
                title={card.name}
                features={card.features}
                accentColor={card.accentColor}
                language={language}
              />
            </div>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.security}</h3>
            <p className="text-sm text-gray-600">حماية متقدمة بتقنية التشفير الكمي</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.worldwide}</h3>
            <p className="text-sm text-gray-600">مقبولة في أكثر من 200 دولة حول العالم</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{t.rewards}</h3>
            <p className="text-sm text-gray-600">مكافآت وعروض حصرية لا تقاوم</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCardsSection;
