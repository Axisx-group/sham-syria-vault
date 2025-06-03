
import { LucideIcon } from 'lucide-react';

export interface NavigationSection {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface SectionNavigationProps {
  language: 'ar' | 'en';
}
