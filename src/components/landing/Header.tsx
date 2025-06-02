
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Globe, Lock } from "lucide-react";

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const navigate = useNavigate();

  return (
    <header className="container mx-auto px-4 py-6 relative">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 block">
              {language === 'ar' ? 'بنك الجزيرة' : 'Bank Aljazira'}
            </span>
            <span className="text-xs text-gray-500">
              {language === 'ar' ? 'البنك الرقمي' : 'Digital Bank'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 hover:shadow-md transition-all"
          >
            <Globe className="h-4 w-4" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all"
          >
            {language === 'ar' ? 'الدخول' : 'Login'}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
