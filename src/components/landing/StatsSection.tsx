
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
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: TrendingUp, 
      number: "85K+", 
      label: t.transactions,
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Globe, 
      number: "40+", 
      label: t.countries,
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: Star, 
      number: "4.9", 
      label: t.rating,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'أرقامنا تتحدث' : 'Our Numbers Speak'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'إنجازات استثنائية تعكس ثقة عملائنا وتميز خدماتنا'
                : 'Exceptional achievements reflecting our customers\' trust and service excellence'
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
                  className="text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Number */}
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-600 font-medium">{stat.label}</div>
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
