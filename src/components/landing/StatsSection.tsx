
import React from 'react';
import { Users, TrendingUp, Globe, Star } from "lucide-react";
import { translations } from '@/utils/translations';

interface StatsSectionProps {
  language: 'ar' | 'en';
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  const t = translations[language];

  const stats = [
    { 
      icon: Users, 
      number: "150K+", 
      label: t.customers,
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: TrendingUp, 
      number: "85K+", 
      label: t.transactions,
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: Globe, 
      number: "40+", 
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
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
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
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
