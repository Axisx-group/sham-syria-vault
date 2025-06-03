
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Star, Zap } from "lucide-react";

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <Badge className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/15 transition-all">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : "Syria's Premier Digital Bank"}
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              <span className="block mb-4">
                {language === 'ar' ? 'مستقبل المصرفية' : 'Future of Banking'}
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {language === 'ar' ? 'الرقمية' : 'Digital'}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'تجربة مصرفية متطورة مع أحدث التقنيات وأعلى معايير الأمان. انضم إلى آلاف العملاء الراضين'
                : 'Advanced banking experience with cutting-edge technology and highest security standards. Join thousands of satisfied customers'
              }
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg"
                onClick={() => navigate('/apply/personal')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo')}
                className="px-10 py-6 text-lg border-2 border-white/30 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm transition-all"
              >
                {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'أمان مطلق' : 'Ultimate Security'}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'حماية متقدمة' : 'Advanced Protection'}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop"
                alt="Digital Banking" 
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-sm text-gray-600 mb-2">إجمالي الرصيد</div>
                <div className="text-2xl font-bold text-gray-900">247,850 €</div>
                <div className="text-xs text-green-600">+5.2% هذا الشهر</div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-sm text-gray-600 mb-2">آخر معاملة</div>
                <div className="text-lg font-bold text-green-600">+3,250 €</div>
                <div className="text-xs text-gray-500">راتب شهري</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">150K+</div>
              <div className="text-white/70 text-sm">{language === 'ar' ? 'عميل راضٍ' : 'Happy Customers'}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">85K+</div>
              <div className="text-white/70 text-sm">{language === 'ar' ? 'معاملة يومية' : 'Daily Transactions'}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">40+</div>
              <div className="text-white/70 text-sm">{language === 'ar' ? 'دولة' : 'Countries'}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-white/70 text-sm">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
