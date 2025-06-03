
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, Wifi, CreditCard, Shield } from "lucide-react";

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
    <div className="relative group perspective-1000">
      {/* Card Container with enhanced 3D effect */}
      <div className="relative w-full max-w-[400px] h-[250px] mx-auto transform-gpu">
        <div 
          className={`relative w-full h-full ${gradient} rounded-[16px] ${textColor} overflow-hidden transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-y-12 group-hover:-rotate-x-6 cursor-pointer`}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `
          }}
        >
          {/* Realistic card surface with multiple layers */}
          <div className="absolute inset-0">
            {/* Base material layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/[0.15]"></div>
            
            {/* Glossy finish */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent"></div>
            
            {/* Card texture - subtle grain */}
            <div className="absolute inset-0 opacity-[0.015]" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                 }}>
            </div>

            {/* Holographic security strip */}
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-purple-500/20 via-blue-500/15 via-pink-500/15 to-transparent opacity-60"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-20 p-7 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/[0.15] backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                  <IconComponent className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs px-4 py-1.5 backdrop-blur-md font-semibold tracking-wide">
                  {getBadgeText()}
                </Badge>
              </div>
              
              {/* Bank logo and contactless */}
              <div className="text-right flex flex-col items-end gap-2">
                <div className="text-xl font-black tracking-wider opacity-90 drop-shadow-sm">VISA</div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 opacity-60 rotate-90" />
                  <Shield className="w-4 h-4 opacity-50" />
                </div>
              </div>
            </div>

            {/* EMV Chip - More realistic */}
            <div className="flex items-center gap-6 my-2">
              <div className="relative w-12 h-9 rounded-lg overflow-hidden shadow-lg">
                {/* Chip base */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-300 border border-yellow-400/50"></div>
                
                {/* Chip contacts grid */}
                <div className="absolute inset-[3px] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-sm">
                  <div className="w-full h-full grid grid-cols-3 gap-[1.5px] p-[3px]">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-yellow-400/60 rounded-[1px] shadow-inner"></div>
                    ))}
                  </div>
                </div>
                
                {/* Chip highlight */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg"></div>
              </div>
              
              {/* Contactless payment symbol */}
              <div className="relative">
                <CreditCard className="w-6 h-6 opacity-40" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Card Number with realistic spacing */}
            <div className="my-4">
              <div className="font-mono text-[18px] tracking-[0.4em] font-medium select-none drop-shadow-sm">
                {number}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="flex justify-between items-end">
              <div className="flex-1">
                <p className="text-[10px] opacity-70 mb-1.5 tracking-[0.2em] font-medium uppercase">
                  {language === 'ar' ? 'حامل البطاقة' : 'CARDHOLDER NAME'}
                </p>
                <p className="font-bold text-sm tracking-wide uppercase truncate pr-4">{holder}</p>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] opacity-70 mb-1.5 tracking-[0.2em] font-medium uppercase">
                  {language === 'ar' ? 'صالحة حتى' : 'VALID THRU'}
                </p>
                <p className="font-bold text-sm tracking-wider">{expiry}</p>
              </div>
            </div>
          </div>

          {/* Bank Brand */}
          <div className="absolute bottom-5 right-7">
            <div className="text-[10px] opacity-40 tracking-[0.25em] font-bold">
              SYRIA VAULT
            </div>
          </div>

          {/* Magnetic stripe - more realistic */}
          <div className="absolute top-16 left-0 w-full h-10 bg-black/40 backdrop-blur-sm">
            <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Security hologram */}
          <div className="absolute bottom-4 right-20 w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400/30 via-blue-400/30 via-pink-400/30 to-cyan-400/30 opacity-70 animate-pulse"></div>

          {/* CVV area (back side indication) */}
          <div className="absolute bottom-8 right-8 w-6 h-3 bg-white/20 rounded-sm opacity-60"></div>

          {/* Enhanced edge lighting */}
          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
        </div>

        {/* Enhanced floating shadow */}
        <div className={`absolute inset-0 ${gradient} rounded-[16px] blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700 -z-10 scale-90 translate-y-6`}></div>
      </div>
    </div>
  );
};

export default BankCard;
