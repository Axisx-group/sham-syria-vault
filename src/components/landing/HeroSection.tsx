
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/90 via-blue-500/90 to-blue-600/90"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/20 rounded-full blur-lg animate-float animation-delay-500"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float animation-delay-1000"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-left">
            {/* Premium Badge */}
            <Badge className="mb-8 px-6 py-3 text-sm bg-white/20 text-white border-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in">
              <Star className="w-4 h-4 mr-2 text-yellow-300" />
              {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : "Syria's First Digital Bank"}
              <Sparkles className="w-4 h-4 ml-2 text-yellow-300" />
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in animation-delay-200">
              <span className="text-white block mb-4">
                {language === 'ar' ? 'الخدمات المصرفية' : 'BANKING'}
              </span>
              <span className="text-white/90 text-3xl md:text-5xl font-light">
                {language === 'ar' ? '& ما بعدها' : '& BEYOND'}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed animate-fade-in animation-delay-400">
              {language === 'ar' 
                ? 'سواء كنت في المنزل أو بعيداً - دع سوريا فولت يتجاوز توقعاتك المصرفية. اشترك مجاناً في دقائق.'
                : 'Whether home or away — let Syria Vault exceed your banking expectations. Sign up for free, in minutes.'
              }
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in animation-delay-600">
              <Button 
                size="lg"
                onClick={() => navigate('/apply/personal')}
                className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 border-0 rounded-2xl group"
              >
                {language === 'ar' ? 'تحميل التطبيق' : 'Download the app'}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/apply/business')}
                className="px-10 py-6 text-xl border-2 border-white/50 text-white hover:bg-white/20 hover:border-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm rounded-2xl group"
              >
                {language === 'ar' ? 'اعرف المزيد' : 'Learn more'}
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in animation-delay-800">
              <div className="flex items-center space-x-3 text-white/90">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'مجاني تماماً' : 'Completely Free'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Shield className="w-6 h-6 text-blue-300" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'أمان متقدم' : 'Advanced Security'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'معاملات فورية' : 'Instant Transfers'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Banking Interface */}
          <div className="relative animate-fade-in animation-delay-1000">
            {/* Main Banking Card */}
            <div className="relative">
              {/* Background Person Image */}
              <div className="relative w-full max-w-lg mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=600&h=800&fit=crop&crop=face"
                  alt="Modern Banking" 
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>

              {/* Floating Banking Interface */}
              <div className="absolute top-20 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 animate-float">
                <div className="text-sm text-gray-600 mb-2">Personal</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">6,012 €</div>
                <Button size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-full px-6">
                  Accounts
                </Button>
              </div>

              {/* Transaction Card */}
              <div className="absolute bottom-32 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 animate-float animation-delay-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Salary</div>
                    <div className="text-sm text-gray-500">Today, 11:28</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+2,550 €</div>
                  </div>
                </div>
              </div>

              {/* Mobile App Preview */}
              <div className="absolute bottom-4 left-8 bg-gray-900 rounded-2xl p-4 shadow-2xl animate-float animation-delay-700">
                <div className="grid grid-cols-4 gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section at Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 animate-fade-in animation-delay-1200">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2">100K+</div>
            <div className="text-white/70 text-sm">{language === 'ar' ? 'عميل راضٍ' : 'Happy Customers'}</div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/70 text-sm">{language === 'ar' ? 'معاملة يومية' : 'Daily Transactions'}</div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2">35+</div>
            <div className="text-white/70 text-sm">{language === 'ar' ? 'دولة' : 'Countries'}</div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-white mb-2">4.9</div>
            <div className="text-white/70 text-sm">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
