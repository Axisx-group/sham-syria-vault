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
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <BankLogo size="md" variant="dark" />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigateTo('/services/personal')}>{t.personal}</Button>
            <Button variant="ghost" onClick={() => navigateTo('/services/business')}>{t.business}</Button>
            <Button variant="ghost" onClick={() => navigateTo('/contact')}>{t.contact}</Button>
            <Button variant="ghost" onClick={() => navigateTo('/support/faq')}>{t.support}</Button>
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Button variant="ghost" className="w-full text-left" onClick={() => navigateTo('/services/personal')}>{t.personal}</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigateTo('/services/business')}>{t.business}</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigateTo('/contact')}>{t.contact}</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigateTo('/support/faq')}>{t.support}</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
