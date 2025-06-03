
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CreditCard, Shield, Zap, Globe, TrendingUp, Users, Award } from "lucide-react";

interface ModernFeaturesShowcaseProps {
  language: 'ar' | 'en';
}

const ModernFeaturesShowcase: React.FC<ModernFeaturesShowcaseProps> = ({ language }) => {
  const features = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق ذكي متطور' : 'Smart Advanced App',
      description: language === 'ar' ? 'إدارة كاملة لحساباتك من أي مكان' : 'Complete account management from anywhere',
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
      title: language === 'ar' ? 'أمان عالي المستوى' : 'Bank-Grade Security',
      description: language === 'ar' ? 'حماية متقدمة لأموالك وبياناتك' : 'Advanced protection for your money and data',
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'معاملات فورية' : 'Lightning Fast',
      description: language === 'ar' ? 'تحويلات فورية على مدار الساعة' : 'Instant transfers 24/7',
      gradient: 'from-yellow-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'وصول عالمي' : 'Global Access',
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
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/50 to-cyan-200/50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="mb-6 px-8 py-3 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform">
            <Award className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'ميزات متقدمة' : 'Advanced Features'}
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {language === 'ar' ? 'تجربة مصرفية استثنائية' : 'Exceptional Banking Experience'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'اكتشف عالماً جديداً من الخدمات المصرفية الرقمية المتطورة والآمنة'
              : 'Discover a new world of advanced and secure digital banking services'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 border-0 overflow-hidden bg-white/90 backdrop-blur-sm animate-fade-in hover:scale-105"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className={`absolute top-6 right-6 w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-bold text-xl text-white mb-2 drop-shadow-lg">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <div className={`mt-6 h-1 w-full bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in animation-delay-1000">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'ابدأ رحلتك المصرفية الآن' : 'Start Your Banking Journey Now'}
            </h3>
            <p className="text-xl opacity-90 mb-8">
              {language === 'ar' 
                ? 'انضم إلى آلاف العملاء الراضين واستمتع بخدمات مصرفية متطورة'
                : 'Join thousands of satisfied customers and enjoy advanced banking services'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                {language === 'ar' ? 'فتح حساب جديد' : 'Open New Account'}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
                {language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesShowcase;
