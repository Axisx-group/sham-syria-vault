
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
import { ArrowRight, Shield, Zap, Star } from "lucide-react";
import { translations } from '@/utils/translations';

interface CTASectionProps {
  language: 'ar' | 'en';
}

const CTASection: React.FC<CTASectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              {language === 'ar' ? 'ابدأ رحلتك المصرفية الآن' : 'Start Your Banking Journey Now'}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'انضم إلى آلاف العملاء الذين يثقون ببنك الجزيرة واستمتع بخدمات مصرفية متطورة'
                : 'Join thousands of customers who trust Bank Aljazira and enjoy advanced banking services'
              }
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <NewAccountDialog language={language} />
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="px-10 py-6 text-lg border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all rounded-xl"
            >
              {t.getStarted}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === 'ar' ? 'أمان مطلق' : 'Complete Security'}
              </h3>
              <p className="text-white/80 text-center text-sm">
                {language === 'ar' ? 'حماية متقدمة لأموالك' : 'Advanced protection for your money'}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast'}
              </h3>
              <p className="text-white/80 text-center text-sm">
                {language === 'ar' ? 'معاملات فورية على مدار الساعة' : 'Instant transactions 24/7'}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === 'ar' ? 'خدمة مميزة' : 'Premium Service'}
              </h3>
              <p className="text-white/80 text-center text-sm">
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
