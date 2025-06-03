
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Star, Zap, Shield, Award, Target } from "lucide-react";

interface AnimatedStatsSectionProps {
  language: 'ar' | 'en';
}

const AnimatedStatsSection: React.FC<AnimatedStatsSectionProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { 
      icon: Users,
      number: 2000000, 
      suffix: '+',
      label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers',
      subtext: language === 'ar' ? 'في أكثر من 40 دولة' : 'Across 40+ countries',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    { 
      icon: TrendingUp,
      number: 50, 
      prefix: '€',
      suffix: 'B+',
      label: language === 'ar' ? 'قيمة المعاملات' : 'Transaction Volume',
      subtext: language === 'ar' ? 'سنوياً' : 'Annually',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    { 
      icon: Shield,
      number: 99.9, 
      suffix: '%',
      label: language === 'ar' ? 'وقت التشغيل' : 'Uptime',
      subtext: language === 'ar' ? 'متاح دائماً' : 'Always Available',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    { 
      icon: Star,
      number: 4.8, 
      suffix: '/5',
      label: language === 'ar' ? 'تقييم التطبيق' : 'App Rating',
      subtext: language === 'ar' ? 'من المستخدمين' : 'From Users',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }
          
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = current;
            return newCounters;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  const formatNumber = (num: number, index: number) => {
    const stat = stats[index];
    if (index === 0) return Math.floor(num).toLocaleString();
    if (index === 2) return num.toFixed(1);
    if (index === 3) return num.toFixed(1);
    return Math.floor(num);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header */}
          <div className="text-center mb-24">
            <Badge className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-700 border-blue-200 shadow-lg">
              <Target className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'إنجازاتنا المتميزة' : 'Our Outstanding Achievements'}
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'الأرقام تتحدث' : 'Numbers Speak'}
              </span>
              <br />
              <span className="text-gray-800">
                {language === 'ar' ? 'عن نفسها' : 'Volumes'}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'ثقة الملايين من العملاء حول العالم في منصتنا المصرفية الرقمية المتطورة والمبتكرة'
                : 'Millions of customers worldwide trust our advanced and innovative digital banking platform'
              }
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 bg-white/80 backdrop-blur-lg">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 p-10 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>

                    {/* Animated Number */}
                    <div className="mb-6">
                      <div className="text-5xl md:text-6xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.prefix && <span className="text-3xl">{stat.prefix}</span>}
                        {formatNumber(counters[index], index)}
                        {stat.suffix}
                      </div>
                      <div className="text-xl font-bold text-gray-800 mb-2">
                        {stat.label}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.subtext}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-2000 ease-out`}
                        style={{ 
                          width: isVisible ? '100%' : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Bottom CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[2rem] p-1 shadow-2xl max-w-5xl mx-auto">
              <div className="bg-white rounded-[1.8rem] p-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Award className="w-12 h-12 text-blue-600" />
                  <Zap className="w-10 h-10 text-purple-600" />
                  <Globe className="w-12 h-12 text-pink-600" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  {language === 'ar' ? 'انضم إلى ثورة المصرفية الرقمية' : 'Join the Digital Banking Revolution'}
                </h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {language === 'ar' 
                    ? 'كن جزءاً من مستقبل المصرفية مع أسرع منصة نمواً في القطاع المصرفي والتقني'
                    : 'Be part of the future of banking with the fastest growing platform in the banking and tech sector'
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
