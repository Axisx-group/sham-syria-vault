
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Globe, Zap, TrendingUp, Lock, Award, Star, Sparkles, CreditCard } from "lucide-react";
import BankCard from './BankCard';
import CardFeatures from './CardFeatures';

interface ModernCardsSectionProps {
  language: 'ar' | 'en';
}

const ModernCardsSection: React.FC<ModernCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتك المصرفية المتطورة",
      subtitle: "اختر البطاقة المثالية مع أحدث تقنيات الحماية والمزايا الحصرية التي تناسب نمط حياتك",
      platinum: "بلاتينية إليت", 
      gold: "ذهبية برستيج",
      classic: "كلاسيكية سمارت",
      features: {
        platinum: [
          "حد ائتماني بلا حدود مع تأمين شامل", 
          "خدمة كونسيرج عالمية متاحة 24/7", 
          "استرداد نقدي يصل إلى 8% على جميع المشتريات", 
          "تأمين سفر دولي شامل مع تغطية طبية", 
          "دخول مجاني لأكثر من 1000 صالة VIP عالمياً", 
          "مدير حساب شخصي مخصص ومساعد رقمي"
        ],
        gold: [
          "مكافآت مضاعفة 4x على المشتريات اليومية", 
          "خدمة عملاء متميزة مع أولوية الخدمة", 
          "حماية مشتريات شاملة لمدة 180 يوم", 
          "خصومات حصرية في الفنادق والمطاعم العالمية", 
          "استرداد نقدي فوري بنسبة 3% بدون حدود", 
          "حماية متطورة من سرقة الهوية والاحتيال"
        ],
        classic: [
          "قبول عالمي في أكثر من 210 دولة ومنطقة", 
          "تقنية NFC متقدمة مع حماية الدفع اللاتلامسي", 
          "بدون رسوم سنوية أو رسوم خفية مدى الحياة", 
          "تطبيق ذكي بالذكاء الاصطناعي لإدارة المصاريف", 
          "دعم فني متخصص متاح 24/7 بعدة لغات", 
          "إشعارات فورية وتحكم كامل في الأمان"
        ]
      },
      security: "حماية متقدمة",
      worldwide: "قبول عالمي", 
      rewards: "مكافآت ذكية",
      exclusive: "منتجات حصرية"
    },
    en: {
      title: "Your Advanced Banking Cards",
      subtitle: "Choose the perfect card with the latest security technology and exclusive benefits that match your lifestyle",
      platinum: "Platinum Elite",
      gold: "Gold Prestige", 
      classic: "Classic Smart",
      features: {
        platinum: [
          "Unlimited Credit Limit with Comprehensive Insurance", 
          "24/7 Global Concierge Service Available", 
          "Up to 8% Cash Back on All Purchases", 
          "Comprehensive International Travel Insurance with Medical Coverage", 
          "Free Access to Over 1000 VIP Lounges Worldwide", 
          "Dedicated Personal Account Manager and Digital Assistant"
        ],
        gold: [
          "4x Double Rewards on Daily Purchases", 
          "Premium Customer Service with Priority Support", 
          "Comprehensive Purchase Protection for 180 Days", 
          "Exclusive Discounts at Global Hotels and Restaurants", 
          "Instant 3% Cash Back with No Limits", 
          "Advanced Identity Theft and Fraud Protection"
        ],
        classic: [
          "Global Acceptance in Over 210 Countries and Regions", 
          "Advanced NFC Technology with Contactless Payment Security", 
          "No Annual Fees or Hidden Charges for Life", 
          "AI-Powered Smart App for Expense Management", 
          "Specialized 24/7 Technical Support in Multiple Languages", 
          "Instant Notifications and Complete Security Control"
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
      gradient: "bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900",
      features: t.features.platinum,
      accentColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      type: 'gold' as const,
      name: t.gold,
      number: "4567 •••• •••• 8901",
      holder: "SOPHIA WILLIAMS",
      expiry: "08/27", 
      gradient: "bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-600",
      features: t.features.gold,
      accentColor: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      type: 'classic' as const,
      name: t.classic,
      number: "6789 •••• •••• 2345", 
      holder: "MICHAEL CHEN",
      expiry: "03/29",
      gradient: "bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700",
      features: t.features.classic,
      accentColor: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/40"></div>
        <div className="absolute top-32 left-32 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/10 to-blue-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200/50 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.exclusive}
          </Badge>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Cards Showcase with enhanced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto mb-24">
          {cards.map((card, index) => (
            <div key={index} className="space-y-10">
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

        {/* Enhanced Bottom Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-gray-100/50 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.security}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {language === 'ar' ? 'حماية بتقنية البلوك تشين المتقدمة مع تشفير عسكري' : 'Advanced blockchain security with military-grade encryption'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-gray-100/50 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.worldwide}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {language === 'ar' ? 'مقبولة في أكثر من 210 دولة مع دعم عملات متعددة' : 'Accepted in over 210 countries with multi-currency support'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-gray-100/50 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-4">{t.rewards}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {language === 'ar' ? 'نظام مكافآت ذكي بالذكاء الاصطناعي يتطور مع عاداتك' : 'AI-powered smart rewards system that evolves with your habits'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCardsSection;
