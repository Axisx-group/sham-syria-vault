
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, MessageCircle, Phone, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface QuickActionsFabProps {
  language: 'ar' | 'en';
}

const QuickActionsFab: React.FC<QuickActionsFabProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: CreditCard,
      label: language === 'ar' ? 'البطاقات' : 'Cards',
      onClick: () => navigate('/cards')
    },
    {
      icon: MessageCircle,
      label: language === 'ar' ? 'الدعم' : 'Support',
      onClick: () => navigate('/support/faq')
    },
    {
      icon: Phone,
      label: language === 'ar' ? 'اتصل بنا' : 'Contact',
      onClick: () => navigate('/contact')
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {/* Action buttons */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 space-y-3 animate-fade-in">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="icon"
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:scale-110 transition-all"
                >
                  <action.icon className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <span className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                {language === 'ar' ? 'حساب جديد' : 'New Account'}
              </span>
              <NewAccountDialog language={language} />
            </div>
          </div>
        )}

        {/* Main FAB */}
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:scale-110 transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsFab;
