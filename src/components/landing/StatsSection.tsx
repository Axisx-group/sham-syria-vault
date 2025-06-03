
import React from 'react';
import { Users, TrendingUp, Globe, Star, Shield, Zap } from "lucide-react";
import { translations } from '@/utils/translations';

interface StatsSectionProps {
  language: 'ar' | 'en';
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  const t = translations[language];

  const stats = [
    { 
      icon: Users, 
      number: "100K+", 
      label: t.customers,
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: TrendingUp, 
      number: "50K+", 
      label: t.transactions,
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: Globe, 
      number: "35+", 
      label: t.countries,
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: Star, 
      number: "4.9", 
      label: t.rating,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            {language === 'ar' ? 'أرقامنا تتحدث' : 'Our Numbers Speak'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'إنجازات استثنائية تعكس ثقة عملائنا'
              : 'Exceptional achievements reflecting our customers\' trust'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group">
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-white/80 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{language === 'ar' ? 'أمان معتمد' : 'Certified Security'}</h3>
              <p className="text-gray-600 text-sm">{language === 'ar' ? 'حماية على مستوى البنوك العالمية' : 'World-class bank-level protection'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-white/80 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}</h3>
              <p className="text-gray-600 text-sm">{language === 'ar' ? 'معاملات فورية على مدار الساعة' : 'Instant transactions 24/7'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
