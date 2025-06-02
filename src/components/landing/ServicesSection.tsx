
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Smartphone, DollarSign } from "lucide-react";
import { translations } from '@/utils/translations';

interface ServicesSectionProps {
  language: 'ar' | 'en';
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ language }) => {
  const t = translations[language];

  const services = [
    {
      icon: Users,
      title: t.personalBanking,
      description: t.personalDesc,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: t.businessBanking,
      description: t.businessDesc,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Smartphone,
      title: t.digitalWallet,
      description: t.walletDesc,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: DollarSign,
      title: t.investment,
      description: t.investmentDesc,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.services}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'مجموعة شاملة من الخدمات المصرفية لتلبية جميع احتياجاتك المالية'
              : 'Comprehensive banking services to meet all your financial needs'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${service.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-10 w-10 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {service.description}
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

export default ServicesSection;
