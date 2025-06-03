
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Home, BarChart3, Settings, Star, CreditCard, MessageSquare, Play } from "lucide-react";

interface SectionNavigationProps {
  language: 'ar' | 'en';
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ language }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { 
      id: 'hero', 
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      icon: Home,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'stats', 
      label: language === 'ar' ? 'الإحصائيات' : 'Stats',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'services', 
      label: language === 'ar' ? 'الخدمات' : 'Services',
      icon: Settings,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'features', 
      label: language === 'ar' ? 'الميزات' : 'Features',
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'cards', 
      label: language === 'ar' ? 'البطاقات' : 'Cards',
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      id: 'testimonials', 
      label: language === 'ar' ? 'آراء العملاء' : 'Testimonials',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'cta', 
      label: language === 'ar' ? 'ابدأ الآن' : 'Get Started',
      icon: Play,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="space-y-4">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div key={section.id} className="relative group">
                {/* Active Indicator */}
                {isActive && (
                  <div className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${section.color} rounded-full animate-pulse`}></div>
                )}
                
                {/* Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-white hover:bg-white/20 text-sm justify-start px-4 py-3 rounded-2xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden ${
                    isActive ? 'bg-white/20 shadow-lg' : ''
                  }`}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    {/* Icon with Gradient Background */}
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    } transition-transform duration-300`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-white/80'} group-hover:text-white transition-colors`}>
                      {section.label}
                    </span>
                  </div>
                </Button>

                {/* Tooltip for section number */}
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                    {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-white/60 text-xs mb-2">
              {language === 'ar' ? 'التقدم' : 'Progress'}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                }}
              ></div>
            </div>
            <div className="text-white/60 text-xs mt-1">
              {sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;
