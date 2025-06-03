
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface CardFeaturesProps {
  title: string;
  features: string[];
  accentColor: string;
  language: 'ar' | 'en';
}

const CardFeatures: React.FC<CardFeaturesProps> = ({ title, features, accentColor, language }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
        <Badge className={`${accentColor} text-white border-none px-6 py-2 text-sm font-semibold shadow-lg`}>
          {language === 'ar' ? 'بريميوم' : 'Premium'}
        </Badge>
      </div>
      
      <ul className="space-y-5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-700 group hover:text-gray-900 transition-colors">
            <div className="flex-shrink-0 mt-0.5 mr-4">
              <div className={`w-5 h-5 ${accentColor.replace('bg-gradient-to-r', 'bg-gradient-to-br')} rounded-full flex items-center justify-center shadow-md`}>
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-sm font-medium leading-relaxed flex-1">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardFeatures;
