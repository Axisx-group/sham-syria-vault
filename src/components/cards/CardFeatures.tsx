
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";

interface CardFeaturesProps {
  title: string;
  features: string[];
  accentColor: string;
  language: 'ar' | 'en';
}

const CardFeatures: React.FC<CardFeaturesProps> = ({ title, features, accentColor, language }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge className={`${accentColor} text-white border-none px-4 py-1 text-xs font-semibold shadow-md`}>
            {language === 'ar' ? 'مميز' : 'Premium'}
          </Badge>
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
      </div>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-700 group-hover:text-gray-900 transition-colors">
            <div className="flex-shrink-0 mt-0.5 mr-3">
              <div className={`w-4 h-4 ${accentColor.replace('bg-gradient-to-r', 'bg-gradient-to-br')} rounded-full flex items-center justify-center shadow-sm`}>
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
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
