
import React from 'react';
import { Users, TrendingUp, Globe, Star } from "lucide-react";
import { translations } from '@/utils/translations';

interface StatsSectionProps {
  language: 'ar' | 'en';
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  const t = translations[language];

  const stats = [
    { icon: Users, number: "50K+", label: t.customers },
    { icon: TrendingUp, number: "15K+", label: t.transactions },
    { icon: Globe, number: "25+", label: t.countries },
    { icon: Star, number: "4.9", label: t.rating }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4 group-hover:shadow-lg transition-all">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
