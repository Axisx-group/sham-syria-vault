
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
import { ArrowRight, Play, CheckCircle, Shield, Award } from "lucide-react";
import { translations } from '@/utils/translations';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-blue-100 text-blue-800 border-blue-200">
          {t.subtitle}
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          {t.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <NewAccountDialog language={language} />
          
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t.getStarted}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover:shadow-lg transition-all">
            <Play className="mr-2 h-5 w-5" />
            {t.watchDemo}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{language === 'ar' ? 'مرخص من المصرف المركزي' : 'Licensed by Central Bank'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span>{language === 'ar' ? 'تشفير 256-بت' : '256-bit Encryption'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-500" />
            <span>{language === 'ar' ? 'حائز على جوائز' : 'Award Winning'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
