
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Crown, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface EnhancedHeroSectionProps {
  language: 'ar' | 'en';
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Crown and Badge */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">
                  {language === 'ar' ? 'المصرفية الرقمية المتطورة' : 'Advanced Digital Banking'}
                </span>
              </div>
            </div>
            <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
              {language === 'ar' ? 'مصرفية' : 'Banking'}
            </span>
            <br />
            <span className="text-white">
              {language === 'ar' ? 'المستقبل' : 'of Tomorrow'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
            {language === 'ar' 
              ? 'تجربة مصرفية رقمية متطورة تجمع بين الأمان والسرعة والراحة في منصة واحدة شاملة'
              : 'Advanced digital banking experience combining security, speed, and convenience in one comprehensive platform'
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/demo')}
              className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3" />
              {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2M+</div>
              <div className="text-gray-300">{language === 'ar' ? 'عميل نشط' : 'Active Users'}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">€50B+</div>
              <div className="text-gray-300">{language === 'ar' ? 'معاملات سنوية' : 'Annual Transactions'}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-300">{language === 'ar' ? 'وقت التشغيل' : 'Uptime'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
