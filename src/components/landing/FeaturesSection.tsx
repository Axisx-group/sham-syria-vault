
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, CreditCard, Smartphone } from "lucide-react";
import { translations } from '@/utils/translations';

interface FeaturesSectionProps {
  language: 'ar' | 'en';
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ language }) => {
  const t = translations[language];

  const features = [
    {
      icon: Zap,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: CreditCard,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Smartphone,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.features}</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'اكتشف ما يميز بنك الجزيرة الرقمي عن البنوك التقليدية'
            : 'Discover what makes Bank Aljazira Digital different from traditional banks'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
