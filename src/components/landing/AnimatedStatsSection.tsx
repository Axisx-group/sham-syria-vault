
import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Globe, Star, Crown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedStatsSectionProps {
  language: 'ar' | 'en';
}

const AnimatedStatsSection: React.FC<AnimatedStatsSectionProps> = ({ language }) => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    customers: 0,
    volume: 0,
    uptime: 0,
    rating: 0
  });

  const stats = [
    {
      icon: Users,
      number: "2,000,000",
      label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers',
      subtext: language === 'ar' ? 'في أكثر من 40 دولة' : 'Across 40+ countries',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      number: "€50B+",
      label: language === 'ar' ? 'قيمة المعاملات' : 'Transaction Volume',
      subtext: language === 'ar' ? 'سنوياً' : 'Annually',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Globe,
      number: "99.9%",
      label: language === 'ar' ? 'وقت التشغيل' : 'Uptime',
      subtext: language === 'ar' ? 'متاح دائماً' : 'Always Available',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Star,
      number: "4.8/5",
      label: language === 'ar' ? 'تقييم التطبيق' : 'App Rating',
      subtext: language === 'ar' ? 'من المستخدمين' : 'From Users',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedNumbers({
        customers: 2000000,
        volume: 50,
        uptime: 99.9,
        rating: 4.8
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header with Crown */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Crown className="w-12 h-12 text-yellow-500" />
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                {language === 'ar' ? 'الأرقام تتحدث عن نفسها' : 'Numbers Speak for Themselves'}
              </h2>
              <Crown className="w-12 h-12 text-yellow-500" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'ثقة الملايين من العملاء حول العالم في منصتنا المصرفية الرقمية المتطورة'
                : 'Millions of customers worldwide trust our advanced digital banking platform'
              }
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white overflow-hidden"
                >
                  <CardContent className="p-8 relative">
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>

                      {/* Number */}
                      <div className="text-5xl font-black text-gray-900 mb-4 group-hover:scale-105 transition-transform">
                        {stat.number}
                      </div>
                      
                      {/* Label */}
                      <div className="text-xl font-bold text-gray-800 mb-2">
                        {stat.label}
                      </div>
                      
                      {/* Subtext */}
                      <div className="text-sm text-gray-600">
                        {stat.subtext}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom section with premium styling */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-3xl font-bold">
                    {language === 'ar' ? 'انضم إلى ثورة المصرفية الرقمية' : 'Join the Digital Banking Revolution'}
                  </h3>
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  {language === 'ar' 
                    ? 'كن جزءاً من مستقبل المصرفية مع أسرع نمو في القطاع'
                    : 'Be part of the future of banking with the fastest growing platform'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;
