
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CardFeaturesProps {
  title: string;
  features: string[];
  accentColor: string;
  language: 'ar' | 'en';
}

const CardFeatures: React.FC<CardFeaturesProps> = ({ title, features, accentColor, language }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <Badge className={`${accentColor} text-white border-none px-4 py-2`}>
          {language === 'ar' ? 'بريميوم' : 'Premium'}
        </Badge>
      </div>
      
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <div className={`w-2 h-2 ${accentColor.replace('bg-', 'bg-')} rounded-full mr-4 flex-shrink-0`}></div>
            <span className="text-sm font-medium leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardFeatures;
