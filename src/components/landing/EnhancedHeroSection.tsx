
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Crown, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface EnhancedHeroSectionProps {
  language: 'ar' | 'en';
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Crown and Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 animate-pulse" />
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm font-semibold">
                  {language === 'ar' ? 'المصرفية الرقمية المتطورة' : 'Advanced Digital Banking'}
                </span>
              </div>
            </div>
            <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight px-2">
            <span className="block mb-2 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
              {language === 'ar' ? 'مصرفية' : 'Banking'}
            </span>
            <span className="block text-white">
              {language === 'ar' ? 'المستقبل' : 'of Tomorrow'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
            {language === 'ar' 
              ? 'تجربة مصرفية رقمية متطورة تجمع بين الأمان والسرعة والراحة في منصة واحدة شاملة'
              : 'Advanced digital banking experience combining security, speed, and convenience in one comprehensive platform'
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <NewAccountDialog language={language} />
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/demo')}
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">2M+</div>
              <div className="text-gray-300 text-sm sm:text-base">{language === 'ar' ? 'عميل نشط' : 'Active Users'}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">€50B+</div>
              <div className="text-gray-300 text-sm sm:text-base">{language === 'ar' ? 'معاملات سنوية' : 'Annual Transactions'}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-300 text-sm sm:text-base">{language === 'ar' ? 'وقت التشغيل' : 'Uptime'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
