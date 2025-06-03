
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, CreditCard, Shield, Zap, Globe, TrendingUp } from "lucide-react";

interface InteractiveFeaturesProps {
  language: 'ar' | 'en';
}

const InteractiveFeatures: React.FC<InteractiveFeaturesProps> = ({ language }) => {
  const features = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق ذكي' : 'Smart App',
      description: language === 'ar' ? 'إدارة حساباتك من هاتفك بسهولة' : 'Manage your accounts easily from your phone',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'بطاقات متطورة' : 'Advanced Cards',
      description: language === 'ar' ? 'بطاقات ذكية بتقنيات الدفع الحديثة' : 'Smart cards with modern payment technology',
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'أمان عالي' : 'High Security',
      description: language === 'ar' ? 'حماية متقدمة لأموالك وبياناتك' : 'Advanced protection for your money and data',
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'معاملات سريعة' : 'Fast Transactions',
      description: language === 'ar' ? 'تحويلات فورية على مدار الساعة' : 'Instant transfers 24/7',
      gradient: 'from-yellow-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'عالمي' : 'Global',
      description: language === 'ar' ? 'استخدم خدماتنا في أي مكان بالعالم' : 'Use our services anywhere in the world',
      gradient: 'from-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'استثمار ذكي' : 'Smart Investment',
      description: language === 'ar' ? 'نمّي أموالك مع خيارات الاستثمار المتنوعة' : 'Grow your money with diverse investment options',
      gradient: 'from-teal-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            {language === 'ar' ? 'ميزات تفاعلية متقدمة' : 'Advanced Interactive Features'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف عالماً جديداً من الخدمات المصرفية الرقمية'
              : 'Discover a new world of digital banking services'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-white/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
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
    </section>
  );
};

export default InteractiveFeatures;
