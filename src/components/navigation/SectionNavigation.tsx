
import React from 'react';
import { SectionNavigationProps } from '@/types/navigation';
import { getNavigationSections } from '@/data/navigationSections';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const SectionNavigation: React.FC<SectionNavigationProps> = ({ language }) => {
  const sections = getNavigationSections(language);
  const { activeSection, scrollToSection } = useScrollTracking(sections);

  return (
    <>
      <DesktopNavigation
        sections={sections}
        activeSection={activeSection}
        language={language}
        onScrollToSection={scrollToSection}
      />
      
      <MobileNavigation
        sections={sections}
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />
    </>
  );
};

export default SectionNavigation;
