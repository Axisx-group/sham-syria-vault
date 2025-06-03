
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Award, Star, CreditCard, Palette, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardsShowcaseProps {
  language: 'ar' | 'en';
}

const CardsShowcase: React.FC<CardsShowcaseProps> = ({ language }) => {
  const [selectedCard, setSelectedCard] = useState(0);

  const translations = {
    ar: {
      title: "اختر البطاقة المثالية لك",
      subtitle: "مجموعة متنوعة من البطاقات لتناسب جميع احتياجاتك المالية",
      designCard: "صمم بطاقتك",
      designSubtitle: "اجعل بطاقتك فريدة من نوعها",
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج", 
      classic: "كلاسيكية سمارت",
      platinumDesc: "للعملاء المميزين الذين يسعون للرفاهية المطلقة",
      goldDesc: "توازن مثالي بين المزايا والقيمة",
      classicDesc: "بداية مثالية لرحلتك المصرفية",
      orderNow: "اطلب الآن",
      customize: "تخصيص التصميم",
      chooseColor: "اختر اللون",
      addName: "أضف الاسم",
      preview: "معاينة"
    },
    en: {
      title: "Choose your perfect card",
      subtitle: "A diverse range of cards to suit all your financial needs",
      designCard: "Design Your Card",
      designSubtitle: "Make your card uniquely yours",
      platinum: "Platinum Elite",
      gold: "Gold Prestige",
      classic: "Classic Smart", 
      platinumDesc: "For distinguished customers seeking absolute luxury",
      goldDesc: "Perfect balance between benefits and value",
      classicDesc: "Perfect start to your banking journey",
      orderNow: "Order Now",
      customize: "Customize Design",
      chooseColor: "Choose Color",
      addName: "Add Name",
      preview: "Preview"
    }
  };

  const t = translations[language];

  const cards = [
    {
      name: t.platinum,
      description: t.platinumDesc,
      gradient: "from-gray-900 via-black to-gray-800",
      accentGradient: "from-purple-400 via-pink-400 to-purple-600",
      icon: Crown,
      tier: "PLATINUM ELITE",
      number: "5432 **** **** 1234",
      holder: "AHMED HASSAN",
      expiry: "12/28",
      price: "$500/year"
    },
    {
      name: t.gold,
      description: t.goldDesc,
      gradient: "from-amber-400 via-yellow-500 to-amber-600",
      accentGradient: "from-orange-300 via-yellow-400 to-amber-500",
      icon: Award,
      tier: "GOLD PRESTIGE",
      number: "4567 **** **** 8901",
      holder: "SARA AHMED",
      expiry: "08/27",
      price: "$200/year"
    },
    {
      name: t.classic,
      description: t.classicDesc,
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-indigo-500 to-purple-600",
      icon: Star,
      tier: "CLASSIC SMART",
      number: "6789 **** **** 2345",
      holder: "OMAR HASSAN", 
      expiry: "03/29",
      price: "Free"
    }
  ];

  const designColors = [
    { name: "Midnight", gradient: "from-slate-900 to-black" },
    { name: "Ocean", gradient: "from-blue-600 to-cyan-500" },
    { name: "Sunset", gradient: "from-orange-500 to-pink-500" },
    { name: "Forest", gradient: "from-green-600 to-teal-500" },
    { name: "Aurora", gradient: "from-purple-600 to-indigo-500" }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200 shadow-lg">
            <CreditCard className="w-4 h-4 mr-2" />
            البطاقات المصرفية
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards Carousel */}
        <div className="max-w-7xl mx-auto mb-20">
          <Carousel className="w-full">
            <CarouselContent>
              {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer p-4">
                      {/* 3D Card */}
                      <div 
                        className={`bg-gradient-to-br ${card.gradient} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl group-hover:-translate-y-4 mb-6`}
                        onClick={() => setSelectedCard(index)}
                      >
                        {/* Holographic Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.accentGradient} rounded-full -translate-y-20 translate-x-20 blur-2xl`}></div>
                        </div>

                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-none backdrop-blur-sm text-xs">
                              {card.tier}
                            </Badge>
                          </div>
                          <div className="text-white font-bold text-lg italic tracking-wider">VISA</div>
                        </div>

                        {/* Chip */}
                        <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-xl mb-8 relative z-10 shadow-xl">
                          <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-xl p-1">
                            <div className="w-full h-full border-2 border-yellow-400 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200"></div>
                          </div>
                        </div>

                        {/* Card Number */}
                        <div className="font-mono text-xl tracking-wider mb-8 relative z-10">
                          {card.number}
                        </div>

                        {/* Card Details */}
                        <div className="flex justify-between items-end relative z-10">
                          <div>
                            <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                            <p className="font-semibold">{card.holder}</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                            <p className="font-semibold">{card.expiry}</p>
                          </div>
                        </div>

                        {/* Brand */}
                        <div className="absolute bottom-6 right-6 opacity-60">
                          <div className="text-xs tracking-widest font-light">SYRIA VAULT</div>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 group-hover:shadow-2xl">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{card.name}</h3>
                          <span className="text-lg font-semibold text-gray-600">{card.price}</span>
                        </div>
                        <p className="text-gray-600 mb-6">{card.description}</p>
                        <button className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${card.accentGradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                          {t.orderNow}
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Design Your Card Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200">
              <Palette className="w-4 h-4 mr-2" />
              {t.designCard}
            </Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">{t.designCard}</h3>
            <p className="text-xl text-gray-600">{t.designSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Design Options */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  {t.chooseColor}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {designColors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-full h-20 bg-gradient-to-br ${color.gradient} rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-transparent hover:border-white`}
                    >
                      <span className="text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  {t.customize}
                </Button>
                <Button variant="outline" className="w-full py-4 text-lg border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-xl">
                  {t.preview}
                </Button>
              </div>
            </div>

            {/* Preview Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden transform rotate-6 hover:rotate-3 transition-transform duration-500">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                      CUSTOM DESIGN
                    </Badge>
                    <div className="text-white font-bold text-lg italic">VISA</div>
                  </div>

                  <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-xl mb-8 shadow-xl"></div>
                  
                  <div className="font-mono text-xl tracking-wider mb-8">
                    **** **** **** 1234
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                      <p className="font-semibold">YOUR NAME</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                      <p className="font-semibold">12/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsShowcase;
