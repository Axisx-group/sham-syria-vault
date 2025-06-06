import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import BankLogo from './BankLogo';
import { translations } from '@/utils/translations';
import { Menu, X, Globe, Search, CreditCard } from "lucide-react";
import SearchOverlay from '@/components/features/SearchOverlay';
import NetBankLoginDialog from '@/components/auth/NetBankLoginDialog';
import HoverPopup from '@/components/navigation/HoverPopup';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNetBankDialogOpen, setIsNetBankDialogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const t = translations[language];

  const toggleLanguage = () => {
    onLanguageChange(language === 'ar' ? 'en' : 'ar');
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleNetBankLogin = () => {
    setIsNetBankDialogOpen(true);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (item: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handlePopupMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handlePopupMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <header className="bg-black/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <BankLogo size="md" variant="light" />
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8 relative">
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('cards')}
                onMouseLeave={handleMouseLeave}
              >
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('/cards')}
                  className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
                >
                  البطاقات
                </Button>
                
                {hoveredItem === 'cards' && (
                  <div
                    className="absolute top-full left-0 w-screen max-w-4xl -translate-x-1/2 left-1/2"
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <HoverPopup
                      language={language}
                      category="cards"
                      isVisible={hoveredItem === 'cards'}
                      onClose={() => setHoveredItem(null)}
                    />
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('personal')}
                onMouseLeave={handleMouseLeave}
              >
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('/services/personal')}
                  className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
                >
                  {t.personal}
                </Button>
                
                {hoveredItem === 'personal' && (
                  <div
                    className="absolute top-full left-0 w-screen max-w-4xl -translate-x-1/2 left-1/2"
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <HoverPopup
                      language={language}
                      category="personal"
                      isVisible={hoveredItem === 'personal'}
                      onClose={() => setHoveredItem(null)}
                    />
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('business')}
                onMouseLeave={handleMouseLeave}
              >
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('/services/business')}
                  className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
                >
                  {t.business}
                </Button>
                
                {hoveredItem === 'business' && (
                  <div
                    className="absolute top-full left-0 w-screen max-w-4xl -translate-x-1/2 left-1/2"
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <HoverPopup
                      language={language}
                      category="business"
                      isVisible={hoveredItem === 'business'}
                      onClose={() => setHoveredItem(null)}
                    />
                  </div>
                )}
              </div>

              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/services/nubarium')}
                className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
              >
                خدمة الاستعلام
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/services/iban-swift')}
                className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
              >
                IBAN والسويفت
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/contact')}
                className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
              >
                {t.contact}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/support/faq')}
                className="text-white hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium"
              >
                {t.support}
              </Button>
            </nav>

            {/* NetBank, Search, Language Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* NetBank Button */}
              <Button 
                onClick={handleNetBankLogin}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 hidden md:flex items-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                نت بنك
              </Button>

              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:bg-white/10 w-10 h-10 rounded-xl" 
              >
                <Search className="h-5 w-5 text-white" />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLanguage}
                className="group relative overflow-hidden border-purple-400/50 text-white bg-transparent hover:bg-purple-600/20 hover:border-purple-400 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Globe className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="font-medium text-sm text-white">
                    {language === 'ar' ? 'English' : 'العربية'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/10 w-10 h-10 rounded-xl" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 py-6">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {/* NetBank Button for Mobile */}
              <Button 
                onClick={handleNetBankLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                نت بنك
              </Button>

              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/cards')}
              >
                البطاقات
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/services/personal')}
              >
                {t.personal}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/services/business')}
              >
                {t.business}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/services/nubarium')}
              >
                خدمة الاستعلام
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/services/iban-swift')}
              >
                IBAN والسويفت
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/contact')}
              >
                {t.contact}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-white hover:bg-white/10 py-3 rounded-xl justify-start font-medium" 
                onClick={() => navigateTo('/support/faq')}
              >
                {t.support}
              </Button>

              {/* Mobile Language Toggle */}
              <div className="pt-4 border-t border-gray-800/50">
                <Button 
                  variant="outline" 
                  onClick={toggleLanguage}
                  className="w-full group relative overflow-hidden border-purple-400/50 text-white bg-transparent hover:bg-purple-600/20 hover:border-purple-400 py-3 rounded-xl backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Globe className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <span className="font-medium text-white">
                      {language === 'ar' ? 'English' : 'العربية'}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      <SearchOverlay 
        language={language} 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* NetBank Login Dialog */}
      <NetBankLoginDialog
        isOpen={isNetBankDialogOpen}
        onClose={() => setIsNetBankDialogOpen(false)}
      />
    </>
  );
};

export default Header;
