
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, Zap, Shield, Cpu } from "lucide-react";

interface CardFeaturesProps {
  title: string;
  features: string[];
  accentColor: string;
  language: 'ar' | 'en';
}

const CardFeatures: React.FC<CardFeaturesProps> = ({ title, features, accentColor, language }) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-cyan-400/20 group hover:-translate-y-1 relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                 linear-gradient(180deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '15px 15px'
             }}>
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Badge className={`${accentColor} text-white border-none px-4 py-1 text-xs font-semibold shadow-md flex items-center gap-1`}>
              <Zap className="w-3 h-3" />
              {language === 'ar' ? 'تقني' : 'Tech'}
            </Badge>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-300 group-hover:text-gray-200 transition-colors">
              <div className="flex-shrink-0 mt-0.5 mr-3">
                <div className={`w-5 h-5 ${accentColor.replace('bg-gradient-to-r', 'bg-gradient-to-br')} rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-sm font-medium leading-relaxed flex-1">{feature}</span>
              {index === 0 && <Shield className="w-4 h-4 text-green-400 ml-2" />}
              {index === 1 && <Cpu className="w-4 h-4 text-blue-400 ml-2" />}
              {index === 2 && <Zap className="w-4 h-4 text-purple-400 ml-2" />}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default CardFeatures;
