
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import DemoVideoDialog from './DemoVideoDialog';
import { ArrowRight, CheckCircle, Shield, Award, User, Building2, Sparkles, Star, Zap } from "lucide-react";
import { translations } from '@/utils/translations';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-16 w-5 h-5 bg-blue-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400/50 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <Badge className="mb-8 px-8 py-3 text-sm bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-purple-400/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            {t.subtitle}
            <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
              Syria Vault
            </span>
            <span className="block text-3xl md:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-normal mt-4 animate-fade-in delay-200">
              Digital Banking Revolution
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300">
            {t.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-in delay-400">
            <Button 
              size="lg"
              onClick={() => navigate('/apply/personal')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-6 text-xl shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 hover:-translate-y-1 border-0 rounded-2xl"
            >
              <User className="mr-3 h-6 w-6" />
              {language === 'ar' ? 'فتح حساب شخصي' : 'Open Personal Account'}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/apply/business')}
              className="px-10 py-6 text-xl border-2 border-purple-400/50 text-white hover:bg-purple-600/20 hover:border-purple-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm rounded-2xl"
            >
              <Building2 className="mr-3 h-6 w-6" />
              {language === 'ar' ? 'فتح حساب تجاري' : 'Open Business Account'}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in delay-500">
            <Button 
              size="lg"
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 text-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm rounded-xl"
            >
              {language === 'ar' ? 'دخول العملاء الحاليين' : 'Existing Customer Login'}
            </Button>
            
            <DemoVideoDialog language={language} />
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in delay-600">
            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">{language === 'ar' ? 'مرخص من المصرف المركزي' : 'Licensed by Central Bank'}</p>
                <p className="text-gray-400 text-sm">{language === 'ar' ? 'حماية قانونية كاملة' : 'Full legal protection'}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">{language === 'ar' ? 'تشفير متقدم' : 'Advanced Encryption'}</p>
                <p className="text-gray-400 text-sm">{language === 'ar' ? 'أمان عالي المستوى' : 'Bank-grade security'}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">{language === 'ar' ? 'حائز على جوائز' : 'Award Winning'}</p>
                <p className="text-gray-400 text-sm">{language === 'ar' ? 'تقييم 5 نجوم' : '5-star rated'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
