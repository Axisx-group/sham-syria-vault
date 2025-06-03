
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Home, BarChart3, Settings, Star, CreditCard, MessageSquare, Play } from "lucide-react";

interface SectionNavigationProps {
  language: 'ar' | 'en';
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ language }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);

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
      setIsExpanded(false);
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
    <>
      {/* Desktop Version - Positioned at right edge */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="space-y-2">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div key={section.id} className="relative group">
                  {/* Active Indicator */}
                  {isActive && (
                    <div className={`absolute -left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b ${section.color} rounded-full`}></div>
                  )}
                  
                  {/* Tooltip */}
                  <div className={`absolute -left-32 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${language === 'ar' ? 'text-right' : ''}`}>
                    <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-xl">
                      {section.label}
                    </div>
                  </div>
                  
                  {/* Icon Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => scrollToSection(section.id)}
                    className={`w-10 h-10 text-white hover:bg-white/20 rounded-xl transition-all duration-300 group-hover:scale-110 relative overflow-hidden ${
                      isActive ? 'bg-white/20 shadow-lg scale-110' : ''
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    } transition-transform duration-300`}>
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Compact Progress Indicator */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500"
                style={{ 
                  width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                }}
              ></div>
            </div>
            <div className="text-white/60 text-xs mt-1 text-center">
              {sections.findIndex(s => s.id === activeSection) + 1}/{sections.length}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Collapsible at bottom */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 text-white hover:bg-white/20 rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${sections.find(s => s.id === activeSection)?.color || 'from-blue-500 to-purple-500'} flex items-center justify-center`}>
                {React.createElement(sections.find(s => s.id === activeSection)?.icon || Home, { className: "w-3 h-3 text-white" })}
              </div>
              <span className="text-sm font-medium">
                {sections.find(s => s.id === activeSection)?.label}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </Button>

          {/* Expanded Menu */}
          {isExpanded && (
            <div className="p-2 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <Button
                      key={section.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex flex-col items-center gap-1 p-2 h-auto text-white hover:bg-white/20 rounded-xl ${
                        isActive ? 'bg-white/20' : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs">{section.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionNavigation;
