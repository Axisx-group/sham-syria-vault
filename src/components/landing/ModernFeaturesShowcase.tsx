
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CreditCard, Shield, Zap, Globe, TrendingUp, Award } from "lucide-react";

interface ModernFeaturesShowcaseProps {
  language: 'ar' | 'en';
}

const ModernFeaturesShowcase: React.FC<ModernFeaturesShowcaseProps> = ({ language }) => {
  const features = [
    {
      icon: Smartphone,
      title: language === 'ar' ? 'تطبيق ذكي متطور' : 'Smart Advanced App',
      description: language === 'ar' ? 'إدارة كاملة لحساباتك من أي مكان' : 'Complete account management from anywhere',
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'بطاقات متطورة' : 'Advanced Cards',
      description: language === 'ar' ? 'بطاقات ذكية بتقنيات الدفع الحديثة' : 'Smart cards with modern payment technology',
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'أمان عالي المستوى' : 'Bank-Grade Security',
      description: language === 'ar' ? 'حماية متقدمة لأموالك وبياناتك' : 'Advanced protection for your money and data',
      gradient: 'from-green-600 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'معاملات فورية' : 'Lightning Fast',
      description: language === 'ar' ? 'تحويلات فورية على مدار الساعة' : 'Instant transfers 24/7',
      gradient: 'from-yellow-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'وصول عالمي' : 'Global Access',
      description: language === 'ar' ? 'استخدم خدماتنا في أي مكان بالعالم' : 'Use our services anywhere in the world',
      gradient: 'from-indigo-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'استثمار ذكي' : 'Smart Investment',
      description: language === 'ar' ? 'نمّي أموالك مع خيارات الاستثمار المتنوعة' : 'Grow your money with diverse investment options',
      gradient: 'from-teal-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="mb-8 px-8 py-4 text-lg bg-gradient-to-r from-white/20 to-white/10 text-white border-white/30 hover:scale-105 transition-transform backdrop-blur-sm">
            <Award className="w-5 h-5 mr-3" />
            {language === 'ar' ? 'ميزات متقدمة' : 'Advanced Features'}
          </Badge>
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent block">
              {language === 'ar' ? 'تجربة مصرفية' : 'Banking Experience'}
            </span>
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {language === 'ar' ? 'استثنائية' : 'Redefined'}
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'اكتشف عالماً جديداً من الخدمات المصرفية الرقمية المتطورة والآمنة مع تقنيات المستقبل'
              : 'Discover a new world of advanced and secure digital banking services with future technologies'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-3xl transition-all duration-700 hover:-translate-y-6 border-0 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md animate-fade-in hover:scale-105 border border-white/20"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className={`absolute top-6 right-6 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-bold text-2xl text-white mb-3 drop-shadow-lg">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm">
                  <p className="text-white/90 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <div className={`mt-6 h-1 w-full bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-24 animate-fade-in animation-delay-1000">
          <div className="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 rounded-3xl p-16 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-md border border-white/20">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'ar' ? 'ابدأ رحلتك المصرفية الآن' : 'Start Your Banking Revolution'}
            </h3>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'انضم إلى آلاف العملاء الراضين واستمتع بخدمات مصرفية تفوق التوقعات'
                : 'Join thousands of satisfied customers and enjoy banking services that exceed expectations'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105 hover:-translate-y-2">
                {language === 'ar' ? 'فتح حساب جديد' : 'Open New Account'}
              </button>
              <button className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 hover:-translate-y-2">
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
