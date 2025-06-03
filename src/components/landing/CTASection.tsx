
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
import { ArrowRight, Download, Star } from "lucide-react";

interface CTASectionProps {
  language: 'ar' | 'en';
}

const CTASection: React.FC<CTASectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'ابدأ مجاناً اليوم' : 'Start Free Today'}
              </span>
            </div>

            <h2 className="text-6xl font-black mb-8 leading-tight">
              {language === 'ar' ? (
                <>
                  <span className="block">جاهز لبدء</span>
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    رحلتك؟
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Ready to Start</span>
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Your Journey?
                  </span>
                </>
              )}
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'انضم إلى أكثر من مليوني عميل يثقون ببنك الجزيرة الرقمي في إدارة أموالهم'
                : 'Join over 2 million customers who trust Bank Aljazira Digital to manage their money'
              }
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <NewAccountDialog language={language} />
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/demo')}
              className="group border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg rounded-2xl backdrop-blur-sm transition-all"
            >
              <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              {language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
            </Button>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-300">متوفر على</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-300">متوفر على</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">5M+</div>
              <div className="text-sm text-gray-400">تحميل</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">4.8★</div>
              <div className="text-sm text-gray-400">تقييم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">40+</div>
              <div className="text-sm text-gray-400">دولة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
