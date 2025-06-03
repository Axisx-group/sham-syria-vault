
import React from 'react';
import { Sparkles } from 'lucide-react';

interface BankLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

const BankLogo: React.FC<BankLogoProps> = ({ 
  size = 'md', 
  variant = 'light',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const colors = {
    light: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Enhanced Bank Icon */}
      <div className={`${sizeClasses[size]} relative group`}>
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-2xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80"></div>
        
        {/* Main logo container */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-all duration-300">
          {/* Logo symbol */}
          <div className="relative">
            {/* Background sparkle */}
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 opacity-60" />
            
            {/* Main logo text */}
            <div className="text-white font-bold text-lg tracking-wider">
              <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                SV
              </span>
            </div>
            
            {/* Bottom sparkle */}
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full opacity-80"></div>
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-2xl transform -rotate-12 group-hover:rotate-12 transition-transform duration-500"></div>
      </div>
      
      {/* Enhanced Bank Name */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${colors[variant]} leading-tight bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text ${variant === 'dark' ? 'text-transparent' : ''}`}>
          Syria Vault
        </span>
        {size !== 'sm' && (
          <span className={`text-sm ${variant === 'light' ? 'text-blue-100' : 'text-gray-600'} leading-none font-medium tracking-wide`}>
            Digital Banking Excellence
          </span>
        )}
      </div>
    </div>
  );
};

export default BankLogo;
