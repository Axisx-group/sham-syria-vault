
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface CardsApplicationProps {
  language: 'ar' | 'en';
}

const CardsApplication: React.FC<CardsApplicationProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "ابدأ رحلتك معنا اليوم",
      subtitle: "احصل على بطاقتك في 3 خطوات بسيطة",
      steps: [
        {
          number: "01",
          title: "أكمل الطلب",
          description: "املأ النموذج عبر الإنترنت في دقائق معدودة"
        },
        {
          number: "02", 
          title: "التحقق السريع",
          description: "سنراجع طلبك ونوافق عليه خلال 24 ساعة"
        },
        {
          number: "03",
          title: "استلم بطاقتك",
          description: "سنرسل بطاقتك مجاناً إلى عنوانك خلال 3-5 أيام"
        }
      ],
      applyNow: "تقدم بالطلب الآن",
      requirements: "متطلبات بسيطة"
    },
    en: {
      title: "Start your journey with us today",
      subtitle: "Get your card in 3 simple steps",
      steps: [
        {
          number: "01",
          title: "Complete Application",
          description: "Fill out the online form in just a few minutes"
        },
        {
          number: "02",
          title: "Quick Verification", 
          description: "We'll review and approve your application within 24 hours"
        },
        {
          number: "03",
          title: "Receive Your Card",
          description: "We'll send your card free to your address in 3-5 days"
        }
      ],
      applyNow: "Apply Now",
      requirements: "Simple Requirements"
    }
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <section className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {t.steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transform transition-all duration-300">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                {index < t.steps.length - 1 && (
                  <div className={`hidden md:block absolute top-12 ${isRTL ? 'right-0 transform -translate-x-12' : 'left-full transform translate-x-12'} w-24 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600`}></div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <span className="text-lg font-semibold text-gray-700">{t.requirements}</span>
            </div>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {t.applyNow}
              {isRTL ? <ArrowLeft className="ml-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsApplication;
