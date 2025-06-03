
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { translations } from '@/utils/translations';
import { ArrowRight, TrendingUp, Users, Globe, Star } from 'lucide-react';

interface StatsSectionProps {
  language: 'ar' | 'en';
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const navigate = useNavigate();
  const t = translations[language];

  const stats = [
    { 
      number: "2M+", 
      label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers',
      subtext: language === 'ar' ? 'في أكثر من 40 دولة' : 'Across 40+ countries',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/services/personal')
    },
    { 
      number: "€50B+", 
      label: language === 'ar' ? 'قيمة المعاملات' : 'Transaction Volume',
      subtext: language === 'ar' ? 'سنوياً' : 'Annually',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: () => navigate('/dashboard')
    },
    { 
      number: "99.9%", 
      label: language === 'ar' ? 'وقت التشغيل' : 'Uptime',
      subtext: language === 'ar' ? 'متاح دائماً' : 'Always Available',
      icon: Globe,
      color: 'from-purple-500 to-pink-500',
      action: () => navigate('/support/technical')
    },
    { 
      number: "4.8", 
      label: language === 'ar' ? 'تقييم التطبيق' : 'App Rating',
      subtext: language === 'ar' ? 'من 5 نجوم' : 'Out of 5 stars',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      action: () => navigate('/demo')
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              {language === 'ar' ? 'الأرقام تتحدث عن نفسها' : 'Numbers That Speak Volumes'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'ثقة الملايين من العملاء حول العالم في منصتنا المصرفية الرقمية المتطورة'
                : 'Millions of customers worldwide trust our advanced digital banking platform'
              }
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  onClick={stat.action}
                >
                  <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/15 transform hover:scale-105 ${
                    hoveredStat === index ? 'ring-2 ring-white/30' : ''
                  }`}>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Number */}
                    <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-lg font-semibold text-gray-200 mb-2">
                      {stat.label}
                    </div>
                    
                    {/* Subtext */}
                    <div className="text-sm text-gray-400 mb-4">
                      {stat.subtext}
                    </div>

                    {/* Hover Action */}
                    {hoveredStat === index && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-center text-white text-sm gap-2">
                          <span>{language === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" 
                     style={{
                       backgroundImage: `
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                       `,
                       backgroundSize: '20px 20px'
                     }}>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  {language === 'ar' ? 'انضم إلى ثورة المصرفية الرقمية' : 'Join the Digital Banking Revolution'}
                </h3>
                <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                  {language === 'ar' 
                    ? 'كن جزءاً من مستقبل المصرفية مع أسرع نمو في القطاع'
                    : 'Be part of the future of banking with the fastest growing platform in the sector'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => navigate('/apply/personal')}
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-8 py-3 rounded-xl backdrop-blur-sm"
                  >
                    {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/demo')}
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl backdrop-blur-sm"
                  >
                    {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
