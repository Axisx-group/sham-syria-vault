
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star } from "lucide-react";

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
    <div 
      className={`relative w-full max-w-[400px] h-[250px] ${gradient} rounded-3xl shadow-2xl ${textColor} overflow-hidden group hover:scale-105 transition-all duration-300`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-none text-xs px-3 py-1">
              {getBadgeText()}
            </Badge>
          </div>
          <div className="text-2xl font-bold italic tracking-wider">VISA</div>
        </div>

        {/* Chip */}
        <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-lg shadow-lg self-start">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-1">
            <div className="w-full h-full border border-yellow-300 rounded bg-gradient-to-br from-yellow-50 to-yellow-100"></div>
          </div>
        </div>

        {/* Card Number */}
        <div className="font-mono text-2xl tracking-wider font-light mb-4">
          {number}
        </div>

        {/* Card Details */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs opacity-75 mb-1 tracking-widest">CARD HOLDER</p>
            <p className="font-semibold text-lg tracking-wide">{holder}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-75 mb-1 tracking-widest">EXPIRES</p>
            <p className="font-semibold text-lg">{expiry}</p>
          </div>
        </div>

        {/* Bank Brand */}
        <div className="absolute bottom-8 right-8 text-xs opacity-60 tracking-widest">
          SYRIA VAULT
        </div>

        {/* Contactless Symbol */}
        <div className="absolute top-8 right-20">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
            <div className="absolute inset-1 border-2 border-white/60 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-white/80 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
