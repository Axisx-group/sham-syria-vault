
import React from 'react';
import { translations } from '@/utils/translations';

interface StatsSectionProps {
  language: 'ar' | 'en';
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  const t = translations[language];

  const stats = [
    { 
      number: "2M+", 
      label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers',
      subtext: language === 'ar' ? 'في أكثر من 40 دولة' : 'Across 40+ countries'
    },
    { 
      number: "€50B+", 
      label: language === 'ar' ? 'قيمة المعاملات' : 'Transaction Volume',
      subtext: language === 'ar' ? 'سنوياً' : 'Annually'
    },
    { 
      number: "99.9%", 
      label: language === 'ar' ? 'وقت التشغيل' : 'Uptime',
      subtext: language === 'ar' ? 'متاح دائماً' : 'Always Available'
    },
    { 
      number: "4.8", 
      label: language === 'ar' ? 'تقييم التطبيق' : 'App Rating',
      subtext: language === 'ar' ? 'من 5 نجوم' : 'Out of 5 stars'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === 'ar' ? 'الأرقام تتحدث عن نفسها' : 'Numbers That Speak Volumes'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'ثقة الملايين من العملاء حول العالم في منصتنا المصرفية الرقمية المتطورة'
                : 'Millions of customers worldwide trust our advanced digital banking platform'
              }
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="text-5xl font-black text-gray-900 mb-4 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'انضم إلى ثورة المصرفية الرقمية' : 'Join the Digital Banking Revolution'}
              </h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'كن جزءاً من مستقبل المصرفية مع أسرع نمو في القطاع'
                  : 'Be part of the future of banking with the fastest growing platform in the sector'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
