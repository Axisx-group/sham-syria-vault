
import { Home, BarChart3, Settings, Star, CreditCard, MessageSquare, Play } from "lucide-react";
import { NavigationSection } from '@/types/navigation';

export const getNavigationSections = (language: 'ar' | 'en'): NavigationSection[] => [
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
