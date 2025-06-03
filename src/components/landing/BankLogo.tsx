
import React from 'react';

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
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const colors = {
    light: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Bank Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg transform rotate-3"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">SV</div>
        </div>
      </div>
      
      {/* Bank Name */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${colors[variant]} leading-tight`}>
          Syria Vault
        </span>
        <span className={`text-xs ${variant === 'light' ? 'text-blue-100' : 'text-gray-600'} leading-none`}>
          {size !== 'sm' && 'Digital Banking'}
        </span>
      </div>
    </div>
  );
};

export default BankLogo;
