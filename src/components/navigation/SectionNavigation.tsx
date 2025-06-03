
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface SectionNavigationProps {
  language: 'ar' | 'en';
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ language }) => {
  const sections = [
    { id: 'hero', label: language === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'stats', label: language === 'ar' ? 'الإحصائيات' : 'Stats' },
    { id: 'services', label: language === 'ar' ? 'الخدمات' : 'Services' },
    { id: 'features', label: language === 'ar' ? 'الميزات' : 'Features' },
    { id: 'cards', label: language === 'ar' ? 'البطاقات' : 'Cards' },
    { id: 'testimonials', label: language === 'ar' ? 'آراء العملاء' : 'Testimonials' },
    { id: 'cta', label: language === 'ar' ? 'ابدأ الآن' : 'Get Started' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/10">
        <div className="space-y-3">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(section.id)}
              className="w-full text-white hover:bg-white/20 text-xs justify-start px-3 py-2 rounded-xl transition-all"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;
