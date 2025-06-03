
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
import { ArrowRight, Star, Shield, Zap, Sparkles } from "lucide-react";
import { translations } from '@/utils/translations';

interface CTASectionProps {
  language: 'ar' | 'en';
}

const CTASection: React.FC<CTASectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0">
        <Star className="absolute top-24 left-1/6 w-8 h-8 text-white/20 animate-float" />
        <Sparkles className="absolute bottom-32 right-1/6 w-10 h-10 text-white/15 animate-float animation-delay-500" />
        <Shield className="absolute top-2/3 left-1/4 w-6 h-6 text-white/25 animate-float animation-delay-300" />
        <Zap className="absolute bottom-1/4 right-1/3 w-7 h-7 text-white/20 animate-float animation-delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="gradient-text-animated block mb-4">
                {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your'}
              </span>
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {language === 'ar' ? 'المصرفية الآن' : 'Banking Journey'}
              </span>
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'انضم إلى آلاف العملاء الذين يثقون ببنك الجزيرة واستمتع بخدمات مصرفية متطورة'
                : 'Join thousands of customers who trust Bank Aljazira and enjoy advanced banking services'
              }
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20 animate-fade-in animation-delay-300">
            <NewAccountDialog language={language} />
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="btn-3d px-12 py-6 text-xl border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 glass-effect rounded-2xl group"
            >
              <span className="relative z-10">{t.getStarted}</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in animation-delay-600">
            <div className="flex flex-col items-center p-8 glass-morphism rounded-3xl border border-white/20 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'ar' ? 'أمان مطلق' : 'Complete Security'}
              </h3>
              <p className="text-white/80 text-center">
                {language === 'ar' ? 'حماية متقدمة لأموالك' : 'Advanced protection for your money'}
              </p>
            </div>

            <div className="flex flex-col items-center p-8 glass-morphism rounded-3xl border border-white/20 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}
              </h3>
              <p className="text-white/80 text-center">
                {language === 'ar' ? 'معاملات فورية على مدار الساعة' : 'Instant transactions 24/7'}
              </p>
            </div>

            <div className="flex flex-col items-center p-8 glass-morphism rounded-3xl border border-white/20 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'ar' ? 'خدمة مميزة' : 'Premium Service'}
              </h3>
              <p className="text-white/80 text-center">
                {language === 'ar' ? 'دعم فني متخصص' : 'Specialized technical support'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
