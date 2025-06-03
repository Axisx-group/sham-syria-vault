
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, Wifi } from "lucide-react";

interface BankCardProps {
  type: 'platinum' | 'gold' | 'classic';
  name: string;
  number: string;
  holder: string;
  expiry: string;
  gradient: string;
  textColor?: string;
  language: 'ar' | 'en';
}

const BankCard: React.FC<BankCardProps> = ({
  type,
  name,
  number,
  holder,
  expiry,
  gradient,
  textColor = 'text-white',
  language
}) => {
  const getIcon = () => {
    switch (type) {
      case 'platinum': return Crown;
      case 'gold': return Award;
      case 'classic': return Star;
    }
  };

  const getBadgeText = () => {
    switch (type) {
      case 'platinum': return language === 'ar' ? 'بلاتينية إليت' : 'PLATINUM ELITE';
      case 'gold': return language === 'ar' ? 'ذهبية برستيج' : 'GOLD PRESTIGE';
      case 'classic': return language === 'ar' ? 'كلاسيكية سمارت' : 'CLASSIC SMART';
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="perspective-1000">
      <div 
        className={`relative w-full max-w-[420px] h-[264px] ${gradient} rounded-[20px] shadow-2xl ${textColor} overflow-hidden group hover:scale-105 hover:-rotate-2 transition-all duration-500 cursor-pointer`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Realistic Card Texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Background Pattern - More subtle */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-8 right-8 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-20 p-8 h-full flex flex-col justify-between">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs px-3 py-1 backdrop-blur-sm">
                  {getBadgeText()}
                </Badge>
              </div>
            </div>
            <div className="text-2xl font-bold italic tracking-widest opacity-90">VISA</div>
          </div>

          {/* EMV Chip - More realistic */}
          <div className="w-12 h-9 mb-6">
            <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 to-transparent opacity-50"></div>
              <div className="absolute inset-[1px] bg-gradient-to-br from-yellow-50 to-yellow-200 rounded-md">
                <div className="w-full h-full grid grid-cols-4 gap-[1px] p-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-yellow-300/30 rounded-[1px]"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Number with better spacing */}
          <div className="font-mono text-[22px] tracking-[0.2em] font-medium mb-6 select-none">
            {number}
          </div>

          {/* Card Details Row */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-60 mb-1 tracking-[0.1em] font-medium">CARD HOLDER</p>
              <p className="font-semibold text-base tracking-wide">{holder}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-60 mb-1 tracking-[0.1em] font-medium">EXPIRES</p>
              <p className="font-semibold text-base">{expiry}</p>
            </div>
          </div>
        </div>

        {/* Contactless Payment Symbol */}
        <div className="absolute top-8 left-8">
          <Wifi className="w-6 h-6 opacity-40 rotate-90" />
        </div>

        {/* Bank Logo/Brand */}
        <div className="absolute bottom-6 right-8">
          <div className="text-[10px] opacity-40 tracking-widest font-medium">
            SYRIA VAULT
          </div>
        </div>

        {/* Magnetic Stripe Simulation */}
        <div className="absolute top-16 left-0 w-full h-12 bg-black/20 opacity-30"></div>

        {/* Security Hologram Effect */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-tl-3xl opacity-50"></div>
      </div>
    </div>
  );
};

export default BankCard;
