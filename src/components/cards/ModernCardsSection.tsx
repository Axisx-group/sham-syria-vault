
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Globe, Zap, TrendingUp, Lock, Award, Star, Sparkles, CreditCard, Cpu, Radio, Wifi } from "lucide-react";
import BankCard from './BankCard';
import CardFeatures from './CardFeatures';

interface ModernCardsSectionProps {
  language: 'ar' | 'en';
}

const ModernCardsSection: React.FC<ModernCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقات مصرفية تقنية متقدمة",
      subtitle: "تقنيات الذكاء الاصطناعي والحماية الكمية في خدمة تجربتك المصرفية المستقبلية",
      platinum: "بلاتينية كوانتم", 
      gold: "ذهبية بايوتك",
      classic: "كلاسيكية AI",
      features: {
        platinum: [
          "تشفير كمي متقدم مع حماية البيانات الكوانتية", 
          "ذكاء اصطناعي مخصص لتحليل العادات المالية", 
          "مساعد رقمي ثلاثي الأبعاد متاح 24/7", 
          "تقنية البايومتريك المتطورة للمصادقة", 
          "شبكة VIP عالمية مع تقنيات الواقع المعزز", 
          "روبوت مصرفي شخصي للخدمات المتقدمة"
        ],
        gold: [
          "تقنية البلوك تشين للمعاملات الآمنة", 
          "تحليل ذكي للنفقات مع التنبؤ المالي", 
          "مصادقة بصمة العين والوجه المتقدمة", 
          "محفظة رقمية متعددة العملات الافتراضية", 
          "نظام إنذار ذكي ضد الاحتيال والسرقة", 
          "تطبيق الواقع المعزز لإدارة الأموال"
        ],
        classic: [
          "تقنية NFC متطورة مع حماية التردد اللاسلكي", 
          "ذكاء اصطناعي لتحسين النفقات اليومية", 
          "حماية سيبرانية متقدمة ضد الهجمات", 
          "تطبيق ذكي بواجهة تفاعلية ثلاثية الأبعاد", 
          "دعم متعدد اللغات بتقنية معالجة النصوص", 
          "إشعارات ذكية مخصصة حسب السلوك المالي"
        ]
      },
      security: "أمان كمي",
      worldwide: "عالمي تقني", 
      rewards: "مكافآت ذكية",
      exclusive: "تقنيات حصرية"
    },
    en: {
      title: "Advanced Tech Banking Cards",
      subtitle: "AI technologies and quantum protection serving your future banking experience",
      platinum: "Platinum Quantum",
      gold: "Gold Biotech", 
      classic: "Classic AI",
      features: {
        platinum: [
          "Advanced Quantum Encryption with Quantum Data Protection", 
          "Dedicated AI for Financial Habits Analysis", 
          "3D Digital Assistant Available 24/7", 
          "Advanced Biometric Technology for Authentication", 
          "Global VIP Network with Augmented Reality Technology", 
          "Personal Banking Robot for Advanced Services"
        ],
        gold: [
          "Blockchain Technology for Secure Transactions", 
          "Smart Expense Analysis with Financial Prediction", 
          "Advanced Eye and Face Biometric Authentication", 
          "Multi-Currency Digital Wallet for Virtual Currencies", 
          "Smart Alert System Against Fraud and Theft", 
          "Augmented Reality App for Money Management"
        ],
        classic: [
          "Advanced NFC Technology with Wireless Frequency Protection", 
          "AI for Daily Expense Optimization", 
          "Advanced Cybersecurity Against Attacks", 
          "Smart App with 3D Interactive Interface", 
          "Multi-Language Support with Text Processing Technology", 
          "Smart Notifications Customized by Financial Behavior"
        ]
      },
      security: "Quantum Security",
      worldwide: "Global Tech",
      rewards: "Smart Rewards", 
      exclusive: "Exclusive Tech"
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
      gradient: "bg-gradient-to-br from-gray-900 via-purple-900 to-black",
      features: t.features.platinum,
      accentColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      type: 'gold' as const,
      name: t.gold,
      number: "4567 •••• •••• 8901",
      holder: "SOPHIA WILLIAMS",
      expiry: "08/27", 
      gradient: "bg-gradient-to-br from-amber-600 via-yellow-500 to-orange-600",
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
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(180deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
        <div className="absolute top-32 left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <Cpu className="w-8 h-8 text-cyan-400/30" />
        </div>
        <div className="absolute top-40 right-40 animate-float" style={{ animationDelay: '0.5s' }}>
          <Radio className="w-6 h-6 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float" style={{ animationDelay: '1s' }}>
          <Wifi className="w-7 h-7 text-blue-400/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-cyan-300 border-cyan-400/30 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.exclusive}
          </Badge>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
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
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-cyan-400/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-cyan-300 mb-4">{t.security}</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'ar' ? 'حماية بتقنية الكوانتم والذكاء الاصطناعي' : 'Quantum and AI-powered protection'}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-purple-400/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-purple-300 mb-4">{t.worldwide}</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'ar' ? 'شبكة عالمية بتقنيات الواقع المعزز' : 'Global network with AR technology'}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-pink-400/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-bold text-2xl text-pink-300 mb-4">{t.rewards}</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'ar' ? 'نظام مكافآت ذكي يتعلم من سلوكك' : 'Smart rewards that learn from your behavior'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCardsSection;
