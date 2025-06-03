
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Star, Zap, TrendingUp, Smartphone, Globe, Sparkles } from "lucide-react";

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-2 border-white/10 rounded-full animate-bounce-gentle"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-32 right-1/3 w-2 h-2 bg-blue-300/40 rounded-full animate-float animation-delay-300"></div>
          <div className="absolute bottom-40 left-1/5 w-4 h-4 bg-purple-300/30 rounded-full animate-float animation-delay-700"></div>
          <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-pink-300/40 rounded-full animate-float animation-delay-200"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-left space-y-8">
            {/* Premium Badge */}
            <Badge className="mb-8 px-8 py-4 text-sm bg-gradient-to-r from-white/20 to-white/10 text-white border-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in">
              <Star className="w-5 h-5 mr-3 text-yellow-300" />
              {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : "Syria's Premier Digital Bank"}
              <Sparkles className="w-5 h-5 ml-3 text-yellow-300" />
            </Badge>
            
            {/* Main Heading */}
            <div className="space-y-6 animate-fade-in animation-delay-200">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent block mb-4">
                  {language === 'ar' ? 'مستقبل' : 'FUTURE'}
                </span>
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block mb-4">
                  {language === 'ar' ? 'المصرفية' : 'BANKING'}
                </span>
                <span className="text-white/90 text-4xl md:text-6xl font-light">
                  {language === 'ar' ? 'الآن هنا' : 'IS HERE'}
                </span>
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed animate-fade-in animation-delay-400">
              {language === 'ar' 
                ? 'تجربة مصرفية ثورية مع أحدث التقنيات. انضم إلى آلاف العملاء الذين اختاروا المستقبل اليوم.'
                : 'Revolutionary banking experience with cutting-edge technology. Join thousands who chose the future today.'
              }
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in animation-delay-600">
              <Button 
                size="lg"
                onClick={() => navigate('/apply/personal')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2 border-0 rounded-2xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{language === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo')}
                className="px-12 py-6 text-xl border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm rounded-2xl group"
              >
                <span className="relative z-10">{language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}</span>
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in animation-delay-800">
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
                <CheckCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'أمان مطلق' : 'Ultimate Security'}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
                <Shield className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'حماية متقدمة' : 'Advanced Protection'}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
                <Zap className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Visual */}
          <div className="relative animate-fade-in animation-delay-1000">
            {/* Main banking interface */}
            <div className="relative max-w-lg mx-auto">
              {/* Central Device */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop"
                  alt="Premium Banking" 
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-blue-900/30 rounded-3xl"></div>
              </div>

              {/* Floating Account Balance */}
              <div className="absolute top-16 -left-8 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 animate-float">
                <div className="text-sm text-gray-600 mb-2 font-medium">إجمالي الرصيد</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">247,850 €</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">+5.2% هذا الشهر</span>
                </div>
              </div>

              {/* Recent Transaction */}
              <div className="absolute bottom-24 -right-8 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700 animate-float animation-delay-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">راتب شهري</div>
                    <div className="text-sm text-gray-400">اليوم، 14:30</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400 text-lg">+3,250 €</div>
                  </div>
                </div>
              </div>

              {/* App Features Grid */}
              <div className="absolute top-32 -right-12 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-float animation-delay-700">
                <div className="grid grid-cols-3 gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="absolute bottom-8 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 shadow-xl animate-bounce-gentle">
                <div className="text-white text-xs font-medium">تحويل سريع</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-24 animate-fade-in animation-delay-1200">
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3">150K+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'عميل راضٍ' : 'Happy Customers'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">85K+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'معاملة يومية' : 'Daily Transactions'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-3">40+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'دولة' : 'Countries'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-3">4.9</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
