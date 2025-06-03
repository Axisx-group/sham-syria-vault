
import React from 'react';
import { Shield, Globe, Zap, Award, CreditCard, Smartphone } from "lucide-react";

interface CardsFeaturesProps {
  language: 'ar' | 'en';
}

const CardsFeatures: React.FC<CardsFeaturesProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "مزايا لا تقاوم",
      subtitle: "اكتشف المزايا الحصرية التي تأتي مع بطاقاتنا",
      features: [
        {
          title: "أمان متطور",
          description: "حماية بتقنية التشفير الكمي وحماية من الاحتيال على مدار الساعة",
          icon: Shield
        },
        {
          title: "قبول عالمي",
          description: "استخدم بطاقتك في أكثر من 200 دولة حول العالم بدون قيود",
          icon: Globe
        },
        {
          title: "مكافآت فورية",
          description: "احصل على مكافآت فورية مع كل عملية شراء تقوم بها",
          icon: Zap
        },
        {
          title: "برنامج الولاء",
          description: "استمتع بمزايا حصرية كلما استخدمت بطاقتك أكثر",
          icon: Award
        },
        {
          title: "بدون رسوم خفية",
          description: "شفافية كاملة في جميع الرسوم بدون مفاجآت",
          icon: CreditCard
        },
        {
          title: "تطبيق ذكي",
          description: "تحكم كامل في بطاقتك من خلال تطبيقنا المتطور",
          icon: Smartphone
        }
      ]
    },
    en: {
      title: "Irresistible Benefits",
      subtitle: "Discover the exclusive benefits that come with our cards",
      features: [
        {
          title: "Advanced Security",
          description: "Protection with quantum encryption technology and 24/7 fraud protection",
          icon: Shield
        },
        {
          title: "Global Acceptance",
          description: "Use your card in over 200 countries worldwide without restrictions",
          icon: Globe
        },
        {
          title: "Instant Rewards",
          description: "Get instant rewards with every purchase you make",
          icon: Zap
        },
        {
          title: "Loyalty Program",
          description: "Enjoy exclusive benefits the more you use your card",
          icon: Award
        },
        {
          title: "No Hidden Fees",
          description: "Complete transparency in all fees without surprises",
          icon: CreditCard
        },
        {
          title: "Smart App",
          description: "Complete control of your card through our advanced app",
          icon: Smartphone
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transform transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardsFeatures;
