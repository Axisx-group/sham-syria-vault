
import React from 'react';
import { Crown, Award, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardsCarouselProps {
  language: 'ar' | 'en';
  selectedCard: number;
  onCardSelect: (index: number) => void;
}

const CardsCarousel: React.FC<CardsCarouselProps> = ({ language, selectedCard, onCardSelect }) => {
  const translations = {
    ar: {
      platinum: "بلاتينية إليت",
      gold: "ذهبية برستيج", 
      classic: "كلاسيكية سمارت",
      platinumDesc: "للعملاء المميزين الذين يسعون للرفاهية المطلقة",
      goldDesc: "توازن مثالي بين المزايا والقيمة",
      classicDesc: "بداية مثالية لرحلتك المصرفية",
      orderNow: "اطلب الآن"
    },
    en: {
      platinum: "Platinum Elite",
      gold: "Gold Prestige",
      classic: "Classic Smart", 
      platinumDesc: "For distinguished customers seeking absolute luxury",
      goldDesc: "Perfect balance between benefits and value",
      classicDesc: "Perfect start to your banking journey",
      orderNow: "Order Now"
    }
  };

  const t = translations[language];

  const cards = [
    {
      name: t.platinum,
      description: t.platinumDesc,
      gradient: "from-slate-900 via-gray-900 to-black",
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
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      accentGradient: "from-yellow-300 via-orange-400 to-red-500",
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
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      accentGradient: "from-blue-400 via-cyan-500 to-indigo-600",
      icon: Star,
      tier: "CLASSIC SMART",
      number: "6789 **** **** 2345",
      holder: "OMAR HASSAN", 
      expiry: "03/29",
      price: "Free"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mb-20">
      <Carousel className="w-full">
        <CarouselContent>
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="group cursor-pointer p-4">
                  {/* Realistic 3D Card */}
                  <div 
                    className={`relative w-full bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl text-white overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-3xl group-hover:-translate-y-4 mb-6 card-realistic`}
                    onClick={() => onCardSelect(index)}
                    style={{
                      aspectRatio: '1.586/1',
                      width: '100%',
                      maxWidth: '360px',
                      height: '227px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Card shine and holographic effects */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                      {/* Top Row - Syria Vault & VISA */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium tracking-wider opacity-90">SYRIA VAULT</div>
                        <div className="text-2xl font-bold italic tracking-wider">VISA</div>
                      </div>

                      {/* Chip */}
                      <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-lg shadow-lg relative self-start">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-md">
                          <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-md border border-yellow-300">
                            <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="bg-yellow-400 rounded-sm opacity-60"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="font-mono text-xl tracking-widest font-light">
                        {card.number}
                      </div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-70 tracking-widest mb-1">CARD HOLDER</div>
                          <div className="font-semibold tracking-wide">{card.holder}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-70 tracking-widest mb-1">EXPIRES</div>
                          <div className="font-semibold">{card.expiry}</div>
                        </div>
                      </div>

                      {/* Contactless symbol */}
                      <div className="absolute top-6 right-20">
                        <div className="relative w-6 h-6">
                          <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
                          <div className="absolute inset-1 border-2 border-white/60 rounded-full"></div>
                          <div className="absolute inset-2 border-2 border-white/80 rounded-full"></div>
                        </div>
                      </div>

                      {/* Card tier badge */}
                      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-medium tracking-wider">{card.tier}</span>
                      </div>
                    </div>

                    {/* Card edge lighting */}
                    <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
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
  );
};

export default CardsCarousel;
