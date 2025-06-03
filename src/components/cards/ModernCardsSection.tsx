
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Globe, Zap, TrendingUp, Lock, Award, Star, Sparkles } from "lucide-react";
import BankCard from './BankCard';
import CardFeatures from './CardFeatures';

interface ModernCardsSectionProps {
  language: 'ar' | 'en';
}

const ModernCardsSection: React.FC<ModernCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتك المصرفية",
      subtitle: "اختر البطاقة التي تناسب أسلوب حياتك مع أحدث تقنيات الأمان والمزايا الحصرية",
      platinum: "بلاتينية إليت", 
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      features: {
        platinum: [
          "حد ائتماني بلا حدود", 
          "خدمة كونسيرج عالمية 24/7", 
          "استرداد نقدي حتى 5%", 
          "تأمين سفر شامل", 
          "دخول مجاني لصالات VIP", 
          "مدير حساب مخصص"
        ],
        gold: [
          "مكافآت مضاعفة على المشتريات", 
          "خدمة عملاء متميزة", 
          "حماية مشتريات 120 يوم", 
          "خصومات فنادق حصرية", 
          "استرداد نقدي فوري 2%", 
          "حماية من سرقة الهوية"
        ],
        classic: [
          "قبول عالمي في 210+ دولة", 
          "أمان NFC متطور", 
          "بدون رسوم سنوية", 
          "تطبيق ذكي متطور", 
          "دعم فني 24/7", 
          "إشعارات فورية"
        ]
      },
      security: "أمان متقدم",
      worldwide: "قبول عالمي", 
      rewards: "مكافآت ذكية",
      exclusive: "منتجات حصرية"
    },
    en: {
      title: "Your Banking Cards",
      subtitle: "Choose the card that fits your lifestyle with advanced security technology and exclusive benefits",
      platinum: "Platinum Elite",
      gold: "Gold Prestige", 
      classic: "Classic Smart",
      features: {
        platinum: [
          "Unlimited Credit Limit", 
          "24/7 Global Concierge", 
          "Up to 5% Cash Back", 
          "Comprehensive Travel Insurance", 
          "Free VIP Lounge Access", 
          "Dedicated Account Manager"
        ],
        gold: [
          "Double Rewards on Purchases", 
          "Premium Customer Service", 
          "120-Day Purchase Protection", 
          "Exclusive Hotel Discounts", 
          "Instant 2% Cash Back", 
          "Identity Theft Protection"
        ],
        classic: [
          "Global Acceptance 210+ Countries", 
          "Advanced NFC Security", 
          "No Annual Fee", 
          "Smart AI App", 
          "24/7 Technical Support", 
          "Instant Notifications"
        ]
      },
      security: "Advanced Security",
      worldwide: "Global Acceptance",
      rewards: "Smart Rewards", 
      exclusive: "Exclusive Products"
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
      gradient: "bg-gradient-to-br from-gray-900 via-slate-800 to-black",
      features: t.features.platinum,
      accentColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      type: 'gold' as const,
      name: t.gold,
      number: "4567 •••• •••• 8901",
      holder: "SOPHIA WILLIAMS",
      expiry: "08/27", 
      gradient: "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600",
      features: t.features.gold,
      accentColor: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      type: 'classic' as const,
      name: t.classic,
      number: "6789 •••• •••• 2345", 
      holder: "MICHAEL CHEN",
      expiry: "03/29",
      gradient: "bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700",
      features: t.features.classic,
      accentColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50/50 to-blue-50/30"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200/50 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.exclusive}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          {cards.map((card, index) => (
            <div key={index} className="space-y-8">
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

        {/* Bottom Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center group border border-gray-100/50">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">{t.security}</h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ar' ? 'حماية بتقنية البلوك تشين المتقدمة' : 'Advanced blockchain security protection'}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center group border border-gray-100/50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">{t.worldwide}</h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ar' ? 'مقبولة في أكثر من 210 دولة' : 'Accepted in over 210 countries'}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center group border border-gray-100/50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">{t.rewards}</h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ar' ? 'نظام مكافآت ذكي يتطور معك' : 'Smart rewards system that grows with you'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCardsSection;
