
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Home } from "lucide-react";
import { NavigationSection } from '@/types/navigation';

interface MobileNavigationProps {
  sections: NavigationSection[];
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  sections,
  activeSection,
  onScrollToSection
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsExpanded(false);
  };

  return (
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
  );
};

export default MobileNavigation;
