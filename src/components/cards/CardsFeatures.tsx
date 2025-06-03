
import React from 'react';
import { Shield, Globe, Zap, Award, CreditCard, Smartphone, Lock, Star, CheckCircle } from "lucide-react";

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
          icon: Shield,
          color: "from-green-500 to-emerald-600"
        },
        {
          title: "قبول عالمي",
          description: "استخدم بطاقتك في أكثر من 200 دولة حول العالم بدون قيود",
          icon: Globe,
          color: "from-blue-500 to-indigo-600"
        },
        {
          title: "مكافآت فورية",
          description: "احصل على مكافآت فورية مع كل عملية شراء تقوم بها",
          icon: Zap,
          color: "from-purple-500 to-pink-600"
        },
        {
          title: "برنامج الولاء",
          description: "استمتع بمزايا حصرية كلما استخدمت بطاقتك أكثر",
          icon: Award,
          color: "from-amber-500 to-orange-600"
        },
        {
          title: "بدون رسوم خفية",
          description: "شفافية كاملة في جميع الرسوم بدون مفاجآت",
          icon: CheckCircle,
          color: "from-teal-500 to-cyan-600"
        },
        {
          title: "تطبيق ذكي",
          description: "تحكم كامل في بطاقتك من خلال تطبيقنا المتطور",
          icon: Smartphone,
          color: "from-violet-500 to-purple-600"
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
          icon: Shield,
          color: "from-green-500 to-emerald-600"
        },
        {
          title: "Global Acceptance",
          description: "Use your card in over 200 countries worldwide without restrictions",
          icon: Globe,
          color: "from-blue-500 to-indigo-600"
        },
        {
          title: "Instant Rewards",
          description: "Get instant rewards with every purchase you make",
          icon: Zap,
          color: "from-purple-500 to-pink-600"
        },
        {
          title: "Loyalty Program",
          description: "Enjoy exclusive benefits the more you use your card",
          icon: Award,
          color: "from-amber-500 to-orange-600"
        },
        {
          title: "No Hidden Fees",
          description: "Complete transparency in all fees without surprises",
          icon: CheckCircle,
          color: "from-teal-500 to-cyan-600"
        },
        {
          title: "Smart App",
          description: "Complete control of your card through our advanced app",
          icon: Smartphone,
          color: "from-violet-500 to-purple-600"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transform transition-all duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  
                  {/* Decorative element */}
                  <div className="absolute top-4 right-4">
                    <Star className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional decorative elements */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsFeatures;
