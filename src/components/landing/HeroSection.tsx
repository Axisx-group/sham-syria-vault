
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import DemoVideoDialog from './DemoVideoDialog';
import { ArrowRight, CheckCircle, Shield, Award, User, Building2, Sparkles } from "lucide-react";
import { translations } from '@/utils/translations';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="container mx-auto px-4 py-16 text-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform cursor-pointer">
          <Sparkles className="w-4 h-4 mr-2" />
          {t.subtitle}
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
          {t.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in delay-300">
          <Button 
            size="lg"
            onClick={() => navigate('/apply/personal')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            <User className="mr-2 h-5 w-5" />
            {language === 'ar' ? 'فتح حساب شخصي' : 'Open Personal Account'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/apply/business')}
            className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            <Building2 className="mr-2 h-5 w-5" />
            {language === 'ar' ? 'فتح حساب تجاري' : 'Open Business Account'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-400">
          <Button 
            size="lg"
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 text-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            {language === 'ar' ? 'دخول العملاء الحاليين' : 'Existing Customer Login'}
          </Button>
          
          <DemoVideoDialog language={language} />
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm animate-fade-in delay-500">
          <div className="flex items-center gap-2 hover:text-green-600 transition-colors cursor-pointer group">
            <CheckCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
            <span>{language === 'ar' ? 'مرخص من المصرف المركزي' : 'Licensed by Central Bank'}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer group">
            <Shield className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span>{language === 'ar' ? 'تشفير 256-بت' : '256-bit Encryption'}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-purple-600 transition-colors cursor-pointer group">
            <Award className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
            <span>{language === 'ar' ? 'حائز على جوائز' : 'Award Winning'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
