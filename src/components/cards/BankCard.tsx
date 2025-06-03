
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, Wifi, CreditCard } from "lucide-react";

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
      case 'platinum': return language === 'ar' ? 'إليت' : 'ELITE';
      case 'gold': return language === 'ar' ? 'برستيج' : 'PRESTIGE';
      case 'classic': return language === 'ar' ? 'سمارت' : 'SMART';
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="relative group">
      {/* Card Container with 3D perspective */}
      <div className="relative w-full max-w-[380px] h-[240px] mx-auto">
        <div 
          className={`absolute inset-0 ${gradient} rounded-[20px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] ${textColor} overflow-hidden group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-700 cursor-pointer`}
          style={{
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Card surface with realistic texture */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
            {/* Subtle grain texture */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.8)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <IconComponent className="w-4 h-4" />
                </div>
                <Badge variant="secondary" className="bg-white/15 text-white border-white/30 text-xs px-3 py-1 backdrop-blur-sm font-medium">
                  {getBadgeText()}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold tracking-wider opacity-90">VISA</div>
                <Wifi className="w-5 h-5 opacity-50 mt-1 rotate-90" />
              </div>
            </div>

            {/* EMV Chip */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-7 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-md shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/80 to-transparent"></div>
                <div className="absolute inset-[1px] bg-gradient-to-br from-yellow-50 to-yellow-200 rounded-sm">
                  <div className="w-full h-full grid grid-cols-3 gap-[1px] p-[2px]">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-yellow-400/40 rounded-[1px]"></div>
                    ))}
                  </div>
                </div>
              </div>
              <CreditCard className="w-6 h-6 opacity-30" />
            </div>

            {/* Card Number */}
            <div className="font-mono text-lg tracking-[0.3em] font-medium mb-2 select-none">
              {number}
            </div>

            {/* Bottom Info */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] opacity-60 mb-1 tracking-[0.15em] font-medium uppercase">
                  {language === 'ar' ? 'حامل البطاقة' : 'CARD HOLDER'}
                </p>
                <p className="font-semibold text-sm tracking-wide">{holder}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] opacity-60 mb-1 tracking-[0.15em] font-medium uppercase">
                  {language === 'ar' ? 'ينتهي في' : 'EXPIRES'}
                </p>
                <p className="font-semibold text-sm">{expiry}</p>
              </div>
            </div>
          </div>

          {/* Bank Logo */}
          <div className="absolute bottom-4 right-6">
            <div className="text-[8px] opacity-30 tracking-[0.2em] font-bold">
              SYRIA VAULT
            </div>
          </div>

          {/* Magnetic stripe effect */}
          <div className="absolute top-14 left-0 w-full h-8 bg-black/30 opacity-40"></div>

          {/* Holographic security feature */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-tl-2xl opacity-60"></div>
        </div>

        {/* Floating shadow */}
        <div className={`absolute inset-0 ${gradient} rounded-[20px] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-10 scale-95`}></div>
      </div>
    </div>
  );
};

export default BankCard;
