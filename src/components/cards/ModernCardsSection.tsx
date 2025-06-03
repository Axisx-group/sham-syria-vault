
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Globe, Zap, TrendingUp, Lock, Award } from "lucide-react";
import BankCard from './BankCard';
import CardFeatures from './CardFeatures';

interface ModernCardsSectionProps {
  language: 'ar' | 'en';
}

const ModernCardsSection: React.FC<ModernCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتنا المصرفية",
      subtitle: "تجربة مصرفية استثنائية مع أحدث التقنيات وأقصى درجات الأمان",
      platinum: "بلاتينية إليت", 
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      features: {
        platinum: ["حد ائتماني غير محدود", "خدمات كونسيرج عالمية 24/7", "استرداد نقدي يصل إلى 5%", "تأمين سفر شامل للعائلة", "دخول مجاني لصالات المطارات VIP", "مدير حساب شخصي مخصص"],
        gold: ["مكافآت مضاعفة 3x على جميع المشتريات", "خدمة عملاء مخصصة على مدار الساعة", "حماية مشتريات متقدمة لمدة 120 يوم", "عروض فنادق حصرية بخصم 40%", "استرداد نقدي 2% فوري", "تأمين ضد سرقة الهوية"],
        classic: ["استخدام عالمي في 210+ دولة", "أمان بتقنية NFC المتطورة", "بدون رسوم سنوية مدى الحياة", "تطبيق ذكي بتقنية AI", "دعم فني متخصص 24/7", "إشعارات فورية للمعاملات"]
      },
      security: "أمان متقدم",
      worldwide: "قبول عالمي", 
      rewards: "مكافآت استثنائية",
      exclusive: "حصري",
      premium: "بريميوم",
      securityDesc: "حماية بتقنية البلوك تشين والذكاء الاصطناعي",
      worldwideDesc: "مقبولة في أكثر من 210 دولة حول العالم",
      rewardsDesc: "برنامج مكافآت ذكي يتطور مع احتياجاتك"
    },
    en: {
      title: "Our Banking Cards",
      subtitle: "Exceptional banking experience with cutting-edge technology and maximum security",
      platinum: "Platinum Elite",
      gold: "Gold Prestige", 
      classic: "Classic Smart",
      features: {
        platinum: ["Unlimited Credit Limit", "24/7 Global Concierge Services", "Up to 5% Cash Back", "Comprehensive Family Travel Insurance", "Free VIP Airport Lounge Access", "Dedicated Personal Account Manager"],
        gold: ["3x Rewards on All Purchases", "24/7 Dedicated Customer Service", "120-Day Advanced Purchase Protection", "Exclusive Hotel Offers 40% Off", "Instant 2% Cash Back", "Identity Theft Protection"],
        classic: ["Global Acceptance in 210+ Countries", "Advanced NFC Security Technology", "No Annual Fee for Life", "AI-Powered Smart App", "24/7 Specialized Support", "Instant Transaction Notifications"]
      },
      security: "Advanced Security",
      worldwide: "Global Acceptance",
      rewards: "Exceptional Rewards", 
      exclusive: "Exclusive",
      premium: "Premium",
      securityDesc: "Protection with Blockchain and AI technology",
      worldwideDesc: "Accepted in over 210 countries worldwide",
      rewardsDesc: "Smart rewards program that evolves with your needs"
    }
  };

  const t = translations[language];

  const cards = [
    {
      type: 'platinum' as const,
      name: t.platinum,
      number: "5432 •••• •••• 1234",
      holder: "JAMES ANDERSON", 
      expiry: "12/28",
      gradient: "bg-gradient-to-br from-slate-900 via-slate-800 to-black",
      features: t.features.platinum,
      accentColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      type: 'gold' as const,
      name: t.gold,
      number: "4567 •••• •••• 8901",
      holder: "SOPHIA WILLIAMS",
      expiry: "08/27", 
      gradient: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500",
      features: t.features.gold,
      accentColor: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      type: 'classic' as const,
      name: t.classic,
      number: "6789 •••• •••• 2345", 
      holder: "MICHAEL CHEN",
      expiry: "03/29",
      gradient: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700",
      features: t.features.classic,
      accentColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-purple-100/40"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-24">
          <Badge variant="secondary" className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200/50 hover:scale-105 transition-transform shadow-lg">
            <Crown className="w-5 h-5 mr-3" />
            {t.exclusive}
          </Badge>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Cards Grid with Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto mb-32">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col items-center space-y-10 group">
              <div className="transform transition-all duration-700 hover:scale-105">
                <BankCard
                  type={card.type}
                  name={card.name}
                  number={card.number}
                  holder={card.holder}
                  expiry={card.expiry}
                  gradient={card.gradient}
                  language={language}
                />
              </div>
              <div className="w-full transform transition-all duration-500 group-hover:-translate-y-2">
                <CardFeatures
                  title={card.name}
                  features={card.features}
                  accentColor={card.accentColor}
                  language={language}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
              <Lock className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.security}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t.securityDesc}</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
              <Globe className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.worldwide}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t.worldwideDesc}</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.rewards}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t.rewardsDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCardsSection;
