
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Shield, Zap, Globe, CreditCard, TrendingUp, Banknote, Users } from "lucide-react";

interface ModernFeaturesShowcaseProps {
  language: 'ar' | 'en';
}

const ModernFeaturesShowcase: React.FC<ModernFeaturesShowcaseProps> = ({ language }) => {
  const features = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق متطور' : 'Advanced App',
      description: language === 'ar' ? 'إدارة أموالك بسهولة من هاتفك' : 'Manage your money easily from your phone',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'أمان بنكي' : 'Bank-Grade Security',
      description: language === 'ar' ? 'حماية متقدمة بأعلى معايير الأمان' : 'Advanced protection with highest security standards',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'تحويلات فورية' : 'Instant Transfers',
      description: language === 'ar' ? 'معاملات سريعة على مدار الساعة' : 'Fast transactions 24/7',
      color: 'from-yellow-500 to-orange-400'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'عالمي' : 'Global Access',
      description: language === 'ar' ? 'استخدم أموالك في أي مكان بالعالم' : 'Use your money anywhere in the world',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'بطاقات ذكية' : 'Smart Cards',
      description: language === 'ar' ? 'بطاقات متطورة بتقنيات حديثة' : 'Advanced cards with modern technology',
      color: 'from-indigo-500 to-blue-400'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'الاستثمار' : 'Investment',
      description: language === 'ar' ? 'نمّي أموالك مع خيارات متنوعة' : 'Grow your money with diverse options',
      color: 'from-teal-500 to-cyan-400'
    },
    {
      icon: Banknote,
      title: language === 'ar' ? 'صرف العملات' : 'Currency Exchange',
      description: language === 'ar' ? 'أفضل أسعار الصرف في السوق' : 'Best exchange rates in the market',
      color: 'from-rose-500 to-pink-400'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'حسابات العائلة' : 'Family Accounts',
      description: language === 'ar' ? 'إدارة أموال العائلة بسهولة' : 'Manage family finances easily',
      color: 'from-violet-500 to-purple-400'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-semibold text-gray-600">
                {language === 'ar' ? 'الميزات المتقدمة' : 'Advanced Features'}
              </span>
            </div>
            
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'منصة شاملة تجمع جميع الخدمات المصرفية الحديثة في تطبيق واحد سهل الاستخدام'
                : 'Comprehensive platform that brings all modern banking services together in one easy-to-use app'
              }
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesShowcase;
