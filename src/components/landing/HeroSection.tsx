
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Star, Zap, TrendingUp, Smartphone, Globe, Sparkles, Circle, Car, Send, Image, Plane, Award, Heart, Coffee, Music } from "lucide-react";

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/95 animate-gradient-xy"></div>
        
        {/* Enhanced floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/25 to-blue-500/25 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur-3xl animate-blob"></div>
        </div>
        
        {/* Enhanced geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-2 border-white/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/25 animate-particle-rotate"></div>
        
        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-white/40 rounded-full animate-particle-float"></div>
          <div className="absolute top-32 right-1/3 w-2 h-2 bg-blue-300/50 rounded-full animate-particle-float animation-delay-300"></div>
          <div className="absolute bottom-40 left-1/5 w-4 h-4 bg-purple-300/40 rounded-full animate-particle-float animation-delay-700"></div>
          <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-pink-300/50 rounded-full animate-particle-float animation-delay-200"></div>
          <div className="absolute top-40 left-2/3 w-3 h-3 bg-cyan-300/45 rounded-full animate-particle-float animation-delay-600"></div>
          <div className="absolute bottom-32 right-2/3 w-2 h-2 bg-green-300/40 rounded-full animate-particle-float animation-delay-400"></div>
        </div>

        {/* Additional decorative icons */}
        <div className="absolute inset-0">
          <Circle className="absolute top-24 left-1/6 w-6 h-6 text-white/20 animate-float animation-delay-100" />
          <Car className="absolute top-1/3 right-1/6 w-8 h-8 text-white/15 animate-float animation-delay-800" />
          <Send className="absolute bottom-1/4 left-1/2 w-5 h-5 text-white/25 animate-float animation-delay-400" />
          <Music className="absolute top-2/3 right-1/3 w-6 h-6 text-white/20 animate-float animation-delay-600" />
          <Heart className="absolute bottom-1/3 right-1/5 w-7 h-7 text-white/18 animate-float animation-delay-300" />
          <Coffee className="absolute top-1/2 left-1/8 w-5 h-5 text-white/22 animate-float animation-delay-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content - Enhanced */}
          <div className="text-left space-y-8">
            {/* Premium Badge with enhanced animation */}
            <Badge className="mb-8 px-8 py-4 text-sm glass-effect text-white border-white/30 hover:scale-110 hover-glow transition-all duration-500 backdrop-blur-sm animate-fade-in group">
              <Star className="w-5 h-5 mr-3 text-yellow-300 animate-pulse" />
              <span className="gradient-text-animated">
                {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : "Syria's Premier Digital Bank"}
              </span>
              <Sparkles className="w-5 h-5 ml-3 text-yellow-300 animate-pulse animation-delay-500" />
            </Badge>
            
            {/* Enhanced Main Heading */}
            <div className="space-y-6 animate-fade-in animation-delay-200">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="gradient-text-animated block mb-4 animate-text-glow">
                  {language === 'ar' ? 'مستقبل' : 'FUTURE'}
                </span>
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent block mb-4 hover-scale">
                  {language === 'ar' ? 'المصرفية' : 'BANKING'}
                </span>
                <span className="text-white/90 text-4xl md:text-6xl font-light animate-shimmer">
                  {language === 'ar' ? 'الآن هنا' : 'IS HERE'}
                </span>
              </h1>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed animate-fade-in animation-delay-400 hover-lift">
              {language === 'ar' 
                ? 'تجربة مصرفية ثورية مع أحدث التقنيات. انضم إلى آلاف العملاء الذين اختاروا المستقبل اليوم.'
                : 'Revolutionary banking experience with cutting-edge technology. Join thousands who chose the future today.'
              }
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in animation-delay-600">
              <Button 
                size="lg"
                onClick={() => navigate('/apply/personal')}
                className="btn-3d bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2 border-0 rounded-2xl group relative overflow-hidden btn-glow animate-button-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{language === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo')}
                className="btn-3d px-12 py-6 text-xl border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 glass-effect rounded-2xl group"
              >
                <span className="relative z-10">{language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}</span>
              </Button>
            </div>

            {/* Enhanced Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in animation-delay-800">
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl glass-effect border border-white/10 hover:bg-white/10 transition-all group card-hover-float">
                <CheckCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform animate-pulse" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'أمان مطلق' : 'Ultimate Security'}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl glass-effect border border-white/10 hover:bg-white/10 transition-all group card-hover-float animation-delay-100">
                <Shield className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform animate-pulse animation-delay-200" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'حماية متقدمة' : 'Advanced Protection'}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-white/90 p-4 rounded-xl glass-effect border border-white/10 hover:bg-white/10 transition-all group card-hover-float animation-delay-200">
                <Zap className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform animate-pulse animation-delay-400" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Visual */}
          <div className="relative animate-fade-in animation-delay-1000 perspective-2000">
            {/* Enhanced Main banking interface */}
            <div className="relative max-w-lg mx-auto">
              {/* Enhanced Central Device */}
              <div className="relative card-realistic">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop"
                  alt="Premium Banking" 
                  className="w-full h-[600px] object-cover rounded-3xl shadow-3xl transform hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-blue-900/30 rounded-3xl"></div>
              </div>

              {/* Enhanced Floating Account Balance */}
              <div className="absolute top-16 -left-8 glass-morphism rounded-2xl p-6 shadow-3xl border border-white/20 animate-card-float hover-glow">
                <div className="text-sm text-gray-600 mb-2 font-medium">إجمالي الرصيد</div>
                <div className="text-3xl font-bold gradient-text-animated mb-2">247,850 €</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">+5.2% هذا الشهر</span>
                </div>
              </div>

              {/* Enhanced Recent Transaction */}
              <div className="absolute bottom-24 -right-8 glass-morphism-dark rounded-2xl p-6 shadow-3xl border border-gray-700 animate-card-float animation-delay-500 hover-glow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">راتب شهري</div>
                    <div className="text-sm text-gray-400">اليوم، 14:30</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400 text-lg animate-text-glow">+3,250 €</div>
                  </div>
                </div>
              </div>

              {/* Enhanced App Features Grid */}
              <div className="absolute top-32 -right-12 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-2xl p-4 shadow-3xl animate-card-float animation-delay-700 hover-glow">
                <div className="grid grid-cols-3 gap-3">
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale">
                    <Smartphone className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale animation-delay-100">
                    <Shield className="w-5 h-5 text-white animate-pulse animation-delay-200" />
                  </div>
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale animation-delay-200">
                    <Globe className="w-5 h-5 text-white animate-pulse animation-delay-400" />
                  </div>
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale animation-delay-300">
                    <Zap className="w-5 h-5 text-white animate-pulse animation-delay-600" />
                  </div>
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale animation-delay-400">
                    <TrendingUp className="w-5 h-5 text-white animate-pulse animation-delay-800" />
                  </div>
                  <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center backdrop-blur-sm hover-scale animation-delay-500">
                    <Star className="w-5 h-5 text-white animate-pulse animation-delay-1000" />
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Action Button */}
              <div className="absolute bottom-8 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 shadow-xl animate-bounce-gentle hover-glow">
                <div className="text-white text-xs font-medium">تحويل سريع</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-24 animate-fade-in animation-delay-1200">
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl glass-effect border border-white/10 card-hover-float">
            <div className="text-5xl font-bold gradient-text-animated mb-3">150K+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'عميل راضٍ' : 'Happy Customers'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl glass-effect border border-white/10 card-hover-float animation-delay-100">
            <div className="text-5xl font-bold gradient-text-animated mb-3">85K+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'معاملة يومية' : 'Daily Transactions'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl glass-effect border border-white/10 card-hover-float animation-delay-200">
            <div className="text-5xl font-bold gradient-text-animated mb-3">40+</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'دولة' : 'Countries'}</div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 p-6 rounded-2xl glass-effect border border-white/10 card-hover-float animation-delay-300">
            <div className="text-5xl font-bold gradient-text-animated mb-3">4.9</div>
            <div className="text-white/80 text-sm font-medium">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
