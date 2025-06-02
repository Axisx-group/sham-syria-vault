
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
import { ArrowRight } from "lucide-react";
import { translations } from '@/utils/translations';

interface CTASectionProps {
  language: 'ar' | 'en';
}

const CTASection: React.FC<CTASectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {language === 'ar' 
            ? 'ابدأ رحلتك المصرفية الرقمية اليوم'
            : 'Start your digital banking journey today'
          }
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'انضم إلى آلاف العملاء الذين يثقون ببنك الجزيرة واستمتع بخدمات مصرفية متطورة'
            : 'Join thousands of customers who trust Bank Aljazira and enjoy advanced banking services'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NewAccountDialog language={language} />
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-gray-900 transition-all"
          >
            {t.getStarted}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
