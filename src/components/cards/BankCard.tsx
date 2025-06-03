
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, Wifi, CreditCard, Shield, Zap, Radio, Cpu, Lock, Eye, EyeOff } from "lucide-react";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'platinum': return Crown;
      case 'gold': return Award;
      case 'classic': return Star;
    }
  };

  const getBadgeText = () => {
    switch (type) {
      case 'platinum': return language === 'ar' ? 'إليت تك' : 'ELITE TECH';
      case 'gold': return language === 'ar' ? 'برستيج برو' : 'PRESTIGE PRO';
      case 'classic': return language === 'ar' ? 'سمارت AI' : 'SMART AI';
    }
  };

  const getSecurityLevel = () => {
    switch (type) {
      case 'platinum': return 'QUANTUM';
      case 'gold': return 'BIOMETRIC';
      case 'classic': return 'DIGITAL';
    }
  };

  const IconComponent = getIcon();

  const maskedNumber = showNumber ? number : number.replace(/\d(?=\d{4})/g, "•");

  return (
    <div className="relative group perspective-1000">
      <div 
        className="relative w-full max-w-[400px] h-[250px] mx-auto transform-gpu cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Front */}
        <div 
          className={`absolute inset-0 ${gradient} rounded-[20px] ${textColor} overflow-hidden transform transition-all duration-700 ease-out ${
            isFlipped ? 'rotate-y-180' : ''
          } ${isHovered ? 'scale-105 rotate-y-12 -rotate-x-6' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 0 30px rgba(139, 92, 246, 0.3)
            `
          }}
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `
                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                     linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }}>
            </div>
          </div>

          {/* Holographic Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/10 via-pink-500/20 to-cyan-500/10 opacity-60 ${isHovered ? 'animate-pulse' : ''}`}></div>
          
          {/* Scanning Line Effect */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${isHovered ? 'animate-bounce' : ''}`}></div>

          {/* Card Content */}
          <div className="relative z-20 p-7 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-white/[0.15] backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs px-4 py-1.5 backdrop-blur-md font-semibold tracking-wide">
                  {getBadgeText()}
                </Badge>
              </div>
              
              {/* Security & Brand */}
              <div className="text-right flex flex-col items-end gap-2">
                <div className="text-xl font-black tracking-wider opacity-90 drop-shadow-sm">VISA</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 bg-green-500/20 rounded-full text-green-300 font-mono">
                    {getSecurityLevel()}
                  </div>
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>

            {/* Tech Features Row */}
            <div className="flex items-center justify-between my-4">
              {/* EMV Chip - Enhanced */}
              <div className="relative w-14 h-10 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-300 border border-yellow-400/50"></div>
                <div className="absolute inset-[3px] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-sm">
                  <div className="w-full h-full grid grid-cols-3 gap-[1.5px] p-[3px]">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-yellow-400/60 rounded-[1px] shadow-inner"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg"></div>
              </div>
              
              {/* NFC & Contactless */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Wifi className="w-6 h-6 opacity-60 rotate-90" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <Radio className="w-5 h-5 opacity-50 animate-pulse" />
                <Cpu className="w-5 h-5 opacity-60" />
              </div>
            </div>

            {/* Card Number with visibility toggle */}
            <div className="my-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs opacity-60 tracking-wider">CARD NUMBER</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNumber(!showNumber);
                  }}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {showNumber ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
              <div className="font-mono text-[18px] tracking-[0.4em] font-medium select-none drop-shadow-sm">
                {maskedNumber}
              </div>
              {!showNumber && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              )}
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

          {/* Tech Elements */}
          <div className="absolute bottom-5 right-7">
            <div className="text-[10px] opacity-40 tracking-[0.25em] font-bold flex items-center gap-2">
              <Zap className="w-3 h-3" />
              SYRIA VAULT
            </div>
          </div>

          {/* Interactive Security Hologram */}
          <div className={`absolute bottom-4 right-20 w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400/30 via-blue-400/30 via-pink-400/30 to-cyan-400/30 ${isHovered ? 'animate-spin' : 'animate-pulse'} flex items-center justify-center`}>
            <Lock className="w-4 h-4 text-white/60" />
          </div>

          {/* Circuit Lines */}
          <div className="absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        </div>

        {/* Card Back */}
        <div 
          className={`absolute inset-0 ${gradient} rounded-[20px] ${textColor} overflow-hidden transform transition-all duration-700 ease-out rotate-y-180 ${
            isFlipped ? 'rotate-y-0' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
          }}
        >
          {/* Magnetic Stripe */}
          <div className="absolute top-16 left-0 w-full h-12 bg-black/60 backdrop-blur-sm">
            <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* CVV Section */}
          <div className="absolute bottom-20 right-8 bg-white rounded-lg p-4 text-black">
            <div className="text-xs font-bold mb-2">CVV</div>
            <div className="text-lg font-mono tracking-wider">•••</div>
            <div className="text-xs mt-2 opacity-60">AUTHORIZED SIGNATURE</div>
            <div className="w-full h-8 border-b border-gray-300 mt-2"></div>
          </div>

          {/* Security Features */}
          <div className="absolute bottom-8 left-8 text-xs opacity-60">
            <div className="mb-2">QUANTUM ENCRYPTED</div>
            <div className="mb-2">BIOMETRIC SECURED</div>
            <div>AI FRAUD PROTECTION</div>
          </div>

          {/* QR Code Placeholder */}
          <div className="absolute top-32 right-8 w-16 h-16 bg-white rounded-lg p-2">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 rounded" style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, black 2px, black 4px)
              `
            }}></div>
          </div>

          {/* Bank Info */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-xs opacity-40">SYRIA VAULT BANK</div>
            <div className="text-xs opacity-40">www.syriavault.com</div>
          </div>
        </div>

        {/* Enhanced floating shadow */}
        <div className={`absolute inset-0 ${gradient} rounded-[20px] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700 -z-10 scale-90 translate-y-8`}></div>
      </div>
    </div>
  );
};

export default BankCard;
