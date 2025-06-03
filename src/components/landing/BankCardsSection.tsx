
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Zap, Globe } from "lucide-react";

interface BankCardsSectionProps {
  language: 'ar' | 'en';
}

const BankCardsSection: React.FC<BankCardsSectionProps> = ({ language }) => {
  const translations = {
    ar: {
      title: "بطاقاتنا المصرفية",
      subtitle: "اختر البطاقة التي تناسب احتياجاتك",
      platinum: "بلاتينية",
      gold: "ذهبية",
      classic: "كلاسيكية",
      features: {
        platinum: ["حد ائتماني عالي", "خدمات VIP", "مكافآت مضاعفة", "تأمين شامل"],
        gold: ["مكافآت متميزة", "خدمة عملاء مميزة", "حماية متقدمة", "عروض حصرية"],
        classic: ["استخدام عالمي", "أمان عالي", "رسوم منخفضة", "سهولة الاستخدام"]
      },
      secure: "آمنة",
      worldwide: "عالمية",
      rewards: "مكافآت"
    },
    en: {
      title: "Our Bank Cards",
      subtitle: "Choose the card that fits your needs",
      platinum: "Platinum",
      gold: "Gold", 
      classic: "Classic",
      features: {
        platinum: ["High Credit Limit", "VIP Services", "Double Rewards", "Comprehensive Insurance"],
        gold: ["Premium Rewards", "Premium Customer Service", "Advanced Protection", "Exclusive Offers"],
        classic: ["Global Usage", "High Security", "Low Fees", "Easy to Use"]
      },
      secure: "Secure",
      worldwide: "Worldwide",
      rewards: "Rewards"
    }
  };

  const t = translations[language];

  const cards = [
    {
      type: t.platinum,
      gradient: "from-gray-800 via-gray-700 to-gray-900",
      brand: "visa",
      features: t.features.platinum,
      number: "5432 **** **** 1234",
      name: "احمد محمد",
      expiry: "12/27"
    },
    {
      type: t.gold,
      gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
      brand: "mastercard",
      features: t.features.gold,
      number: "4567 **** **** 8901",
      name: "فاطمة علي",
      expiry: "08/26"
    },
    {
      type: t.classic,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      brand: "visa",
      features: t.features.classic,
      number: "6789 **** **** 2345",
      name: "محمد حسن",
      expiry: "03/28"
    }
  ];

  const VisaLogo = () => (
    <div className="text-white font-bold text-lg italic tracking-wider">
      VISA
    </div>
  );

  const MastercardLogo = () => (
    <div className="flex items-center">
      <div className="w-6 h-6 bg-red-500 rounded-full opacity-80"></div>
      <div className="w-6 h-6 bg-yellow-400 rounded-full -ml-3 opacity-80"></div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Card Visual */}
              <div className={`bg-gradient-to-br ${card.gradient} p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-3xl mb-6`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-none">
                      {card.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {card.brand === 'visa' ? <VisaLogo /> : <MastercardLogo />}
                  </div>
                </div>

                {/* Chip */}
                <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg mb-8 relative z-10 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg p-1">
                    <div className="w-full h-full border border-yellow-400 rounded-md"></div>
                  </div>
                </div>

                {/* Card Number */}
                <div className="font-mono text-xl tracking-wider mb-6 relative z-10">
                  {card.number}
                </div>

                {/* Card Details */}
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                    <p className="font-semibold">{card.name}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                    <p className="font-semibold">{card.expiry}</p>
                  </div>
                </div>

                {/* Contactless Symbol */}
                <div className="absolute top-6 left-8">
                  <div className="w-6 h-6 opacity-60">
                    <div className="absolute w-6 h-6 border-2 border-white rounded-full opacity-40"></div>
                    <div className="absolute w-4 h-4 border-2 border-white rounded-full opacity-60 top-1 left-1"></div>
                    <div className="absolute w-2 h-2 border-2 border-white rounded-full opacity-80 top-2 left-2"></div>
                  </div>
                </div>
              </div>

              {/* Card Features */}
              <Card className="transform transition-all duration-300 group-hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{card.type}</h3>
                  <ul className="space-y-2">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Features Icons */}
        <div className="flex justify-center items-center space-x-12 mt-16">
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t.secure}</span>
          </div>

          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t.worldwide}</span>
          </div>

          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t.rewards}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankCardsSection;
