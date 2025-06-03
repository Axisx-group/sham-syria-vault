
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, DollarSign, Award } from "lucide-react";
import { translations } from '@/utils/translations';

interface WhyChooseUsSectionProps {
  language: 'ar' | 'en';
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ language }) => {
  const t = translations[language];

  const whyChooseUs = [
    {
      icon: Shield,
      title: t.reason1,
      description: language === 'ar' ? 'تشفير متقدم وحماية متعددة الطبقات' : 'Advanced encryption and multi-layer protection'
    },
    {
      icon: Clock,
      title: t.reason2,
      description: language === 'ar' ? 'خدمة عملاء متاحة على مدار الساعة' : '24/7 customer service available'
    },
    {
      icon: DollarSign,
      title: t.reason3,
      description: language === 'ar' ? 'رسوم تنافسية وعروض مميزة' : 'Competitive fees and special offers'
    },
    {
      icon: Award,
      title: t.reason4,
      description: language === 'ar' ? 'أحدث التقنيات المصرفية الرقمية' : 'Latest digital banking technologies'
    }
  ];

  return (
    <section className="light-section py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.whyChooseUs}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نتميز بمعايير عالية من الجودة والأمان في خدماتنا المصرفية'
              : 'We excel with high standards of quality and security in our banking services'
            }
          </p>
        </div>
        
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-gray-600">
                    {reason.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
