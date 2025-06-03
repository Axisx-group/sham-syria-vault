
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CreditCard, Shield, Zap, Globe, TrendingUp } from "lucide-react";

interface ModernFeaturesShowcaseProps {
  language: 'ar' | 'en';
}

const ModernFeaturesShowcase: React.FC<ModernFeaturesShowcaseProps> = ({ language }) => {
  const features = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق ذكي متطور' : 'Smart Advanced App',
      description: language === 'ar' ? 'إدارة كاملة لحساباتك من أي مكان' : 'Complete account management from anywhere',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'بطاقات متطورة' : 'Advanced Cards',
      description: language === 'ar' ? 'بطاقات ذكية بتقنيات الدفع الحديثة' : 'Smart cards with modern payment technology',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'أمان عالي المستوى' : 'Bank-Grade Security',
      description: language === 'ar' ? 'حماية متقدمة لأموالك وبياناتك' : 'Advanced protection for your money and data',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'معاملات فورية' : 'Lightning Fast',
      description: language === 'ar' ? 'تحويلات فورية على مدار الساعة' : 'Instant transfers 24/7',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'وصول عالمي' : 'Global Access',
      description: language === 'ar' ? 'استخدم خدماتنا في أي مكان بالعالم' : 'Use our services anywhere in the world',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'استثمار ذكي' : 'Smart Investment',
      description: language === 'ar' ? 'نمّي أموالك مع خيارات الاستثمار المتنوعة' : 'Grow your money with diverse investment options',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-3 bg-blue-50 text-blue-700 border-blue-200">
              {language === 'ar' ? 'ميزات متقدمة' : 'Advanced Features'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'تجربة مصرفية استثنائية' : 'Exceptional Banking Experience'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف عالماً جديداً من الخدمات المصرفية الرقمية المتطورة والآمنة'
                : 'Discover a new world of advanced and secure digital banking services'
              }
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:scale-105 transition-all duration-300 border-0 shadow-lg hover:shadow-xl"
                >
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
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
