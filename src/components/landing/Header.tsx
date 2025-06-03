
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import BankLogo from './BankLogo';
import { translations } from '@/utils/translations';
import { Menu, X } from "lucide-react";

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const t = translations[language];

  const toggleLanguage = () => {
    onLanguageChange(language === 'ar' ? 'en' : 'ar');
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <BankLogo size="md" variant="light" />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              onClick={() => navigateTo('/services/personal')}
              className="text-gray-300 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all"
            >
              {t.personal}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigateTo('/services/business')}
              className="text-gray-300 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all"
            >
              {t.business}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigateTo('/contact')}
              className="text-gray-300 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all"
            >
              {t.contact}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigateTo('/support/faq')}
              className="text-gray-300 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all"
            >
              {t.support}
            </Button>
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="border-purple-400/50 text-white hover:bg-purple-600/20 hover:border-purple-400 px-4 py-2 rounded-xl backdrop-blur-sm"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:bg-white/10 w-10 h-10 rounded-xl" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 py-6">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Button 
              variant="ghost" 
              className="w-full text-left text-gray-300 hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start" 
              onClick={() => navigateTo('/services/personal')}
            >
              {t.personal}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-left text-gray-300 hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start" 
              onClick={() => navigateTo('/services/business')}
            >
              {t.business}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-left text-gray-300 hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start" 
              onClick={() => navigateTo('/contact')}
            >
              {t.contact}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-left text-gray-300 hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start" 
              onClick={() => navigateTo('/support/faq')}
            >
              {t.support}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
