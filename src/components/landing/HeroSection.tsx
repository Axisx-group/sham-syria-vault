
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import DemoVideoDialog from './DemoVideoDialog';
import { ArrowRight, CheckCircle, Shield, Award, User, Building2, Sparkles, Star, Zap, TrendingUp } from "lucide-react";
import { translations } from '@/utils/translations';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/40 to-purple-500/40 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full filter blur-3xl animate-pulse-slow animation-delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/50 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute bottom-32 left-16 w-5 h-5 bg-blue-400/40 rounded-full animate-float animation-delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400/60 rounded-full animate-float animation-delay-1000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border-2 border-purple-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="mb-12 relative">
            <div className="relative w-full max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center"
                alt="Digital Banking Revolution" 
                className="w-full h-[400px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">المستقبل الرقمي للبنوك</h3>
                <p className="text-lg opacity-90">تجربة مصرفية لا مثيل لها</p>
              </div>
            </div>
          </div>

          {/* Premium Badge */}
          <Badge className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-purple-400/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            {t.subtitle}
            <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in animation-delay-200">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Syria Vault
            </span>
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-normal mt-4">
              Digital Banking Revolution
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
            {t.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-in animation-delay-600">
            <Button 
              size="lg"
              onClick={() => navigate('/apply/personal')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-6 text-xl shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 hover:-translate-y-1 border-0 rounded-2xl group"
            >
              <User className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              {language === 'ar' ? 'فتح حساب شخصي' : 'Open Personal Account'}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/apply/business')}
              className="px-10 py-6 text-xl border-2 border-purple-400/50 text-white hover:bg-purple-600/20 hover:border-purple-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm rounded-2xl group"
            >
              <Building2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              {language === 'ar' ? 'فتح حساب تجاري' : 'Open Business Account'}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 animate-fade-in animation-delay-800">
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{language === 'ar' ? 'مرخص من المصرف المركزي' : 'Licensed by Central Bank'}</h3>
              <p className="text-gray-400 text-sm">{language === 'ar' ? 'حماية قانونية كاملة' : 'Full legal protection'}</p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{language === 'ar' ? 'تشفير متقدم' : 'Advanced Encryption'}</h3>
              <p className="text-gray-400 text-sm">{language === 'ar' ? 'أمان عالي المستوى' : 'Bank-grade security'}</p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{language === 'ar' ? 'حائز على جوائز' : 'Award Winning'}</h3>
              <p className="text-gray-400 text-sm">{language === 'ar' ? 'تقييم 5 نجوم' : '5-star rated'}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-1000">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">100K+</div>
              <div className="text-gray-400 text-sm">{language === 'ar' ? 'عميل راضٍ' : 'Happy Customers'}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-gray-400 text-sm">{language === 'ar' ? 'معاملة يومية' : 'Daily Transactions'}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">35+</div>
              <div className="text-gray-400 text-sm">{language === 'ar' ? 'دولة' : 'Countries'}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">4.9</div>
              <div className="text-gray-400 text-sm">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in animation-delay-1200">
            <Button 
              size="lg"
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 text-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm rounded-xl group"
            >
              <TrendingUp className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {language === 'ar' ? 'دخول العملاء الحاليين' : 'Existing Customer Login'}
            </Button>
            
            <DemoVideoDialog language={language} />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
