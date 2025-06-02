
import React from 'react';
import { Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { translations } from '@/utils/translations';

interface FooterProps {
  language: 'ar' | 'en';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => handleNavigation('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                {language === 'ar' ? 'بنك الجزيرة' : 'Bank Aljazira'}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {language === 'ar' 
                ? 'البنك الرقمي الأول في سوريا. نوفر خدمات مصرفية آمنة ومتطورة.'
                : 'Syria\'s first digital bank. We provide secure and advanced banking services.'
              }
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/dashboard')}>
                {t.personalBanking}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/dashboard')}>
                {t.businessBanking}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/dashboard')}>
                {t.digitalWallet}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/dashboard')}>
                {t.investment}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'الدعم' : 'Support'}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/contact')}>
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/contact')}>
                {language === 'ar' ? 'الدعم الفني' : 'Technical Support'}
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => handleNavigation('/demo')}>
                {language === 'ar' ? 'العروض التوضيحية' : 'Demo Videos'}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-white transition-colors">+963 11 123 4567</li>
              <li className="cursor-pointer hover:text-white transition-colors">info@bankaljazira.sy</li>
              <li>{language === 'ar' ? 'دمشق، سوريا' : 'Damascus, Syria'}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 {language === 'ar' ? 'بنك الجزيرة الرقمي' : 'Bank Aljazira Digital'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
