
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  language: 'ar' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ language, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchResults = [
    { 
      title: language === 'ar' ? 'البطاقات الائتمانية' : 'Credit Cards', 
      path: '/cards',
      description: language === 'ar' ? 'بطاقات ذكية مع ميزات متقدمة' : 'Smart cards with advanced features'
    },
    { 
      title: language === 'ar' ? 'الخدمات الشخصية' : 'Personal Services', 
      path: '/services/personal',
      description: language === 'ar' ? 'حلول مصرفية للأفراد' : 'Banking solutions for individuals'
    },
    { 
      title: language === 'ar' ? 'الخدمات التجارية' : 'Business Services', 
      path: '/services/business',
      description: language === 'ar' ? 'حلول مصرفية للشركات' : 'Banking solutions for businesses'
    },
    { 
      title: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', 
      path: '/dashboard',
      description: language === 'ar' ? 'إدارة حساباتك' : 'Manage your accounts'
    },
    { 
      title: language === 'ar' ? 'الدعم الفني' : 'Technical Support', 
      path: '/support/technical',
      description: language === 'ar' ? 'مساعدة تقنية متخصصة' : 'Specialized technical help'
    }
  ];

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث في الخدمات والصفحات...' : 'Search services and pages...'}
                  className="pr-12 text-lg py-3 border-none bg-gray-50 focus:bg-white"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery && filteredResults.length > 0 ? (
              <div className="p-4 space-y-2">
                {filteredResults.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => {
                      navigate(result.path);
                      onClose();
                    }}
                    className="w-full justify-between p-4 h-auto text-right hover:bg-gray-50"
                  >
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{result.title}</div>
                      <div className="text-sm text-gray-500">{result.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Button>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center text-gray-500">
                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                {language === 'ar' ? 'ابدأ بالكتابة للبحث...' : 'Start typing to search...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
