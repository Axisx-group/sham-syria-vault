
import React from 'react';
import { Button } from "@/components/ui/button";
import { NavigationSection } from '@/types/navigation';

interface DesktopNavigationProps {
  sections: NavigationSection[];
  activeSection: string;
  language: 'ar' | 'en';
  onScrollToSection: (sectionId: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  sections,
  activeSection,
  language,
  onScrollToSection
}) => {
  return (
    <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
        <div className="space-y-2">
          {sections.map((section) => {
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
                  onClick={() => onScrollToSection(section.id)}
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
  );
};

export default DesktopNavigation;
