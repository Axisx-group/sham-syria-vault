
import React from 'react';
import { Zap } from 'lucide-react';

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
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const colors = {
    light: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Modern Logo Icon */}
      <div className={`${sizeClasses[size]} relative group`}>
        {/* Main logo container with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-all duration-300">
          {/* Logo symbol */}
          <div className="relative">
            {/* Lightning bolt icon for modern feel */}
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-2xl transform -rotate-12 group-hover:rotate-12 transition-transform duration-500"></div>
      </div>
      
      {/* Bank Name */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${colors[variant]} leading-tight`}>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Syria Vault
          </span>
        </span>
        {size !== 'sm' && (
          <span className={`text-xs ${variant === 'light' ? 'text-purple-200' : 'text-gray-500'} leading-none font-medium tracking-wide`}>
            Digital Banking
          </span>
        )}
      </div>
    </div>
  );
};

export default BankLogo;
