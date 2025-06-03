
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, CreditCard, Smartphone, Shield, Globe, Users, TrendingUp } from "lucide-react";

interface HoverPopupProps {
  language: 'ar' | 'en';
  category: string;
  isVisible: boolean;
  onClose: () => void;
}

const popupContent = {
  cards: {
    ar: {
      title: 'البطاقات',
      sections: [
        {
          title: 'الاقتصاد اليومي',
          items: [
            { name: 'حساب متعدد العملات', icon: Globe },
            { name: 'إدارة النفقات', icon: TrendingUp },
            { name: 'بطاقة الشركة', icon: Building2 },
            { name: 'التحويلات النقدية', icon: ArrowRight },
            { name: 'الفواتير', icon: CreditCard }
          ]
        },
        {
          title: 'التمويل',
          items: [
            { name: 'تبادل العملات', icon: Globe },
            { name: 'روابط مرنة للأسواق المالية', icon: TrendingUp },
            { name: 'العملات المشفرة', icon: Shield },
            { name: 'شروط التقييم', icon: CreditCard }
          ]
        },
        {
          title: 'استقبال المدفوعات',
          items: [
            { name: 'قبول المدفوعات', icon: Smartphone },
            { name: 'روابط الدفع', icon: ArrowRight },
            { name: 'قارئ Revolut', icon: CreditCard },
            { name: 'نظام الدفع', icon: Building2 }
          ]
        }
      ]
    },
    en: {
      title: 'Cards',
      sections: [
        {
          title: 'Daily Economy',
          items: [
            { name: 'Multi-currency Account', icon: Globe },
            { name: 'Expense Management', icon: TrendingUp },
            { name: 'Company Card', icon: Building2 },
            { name: 'Money Transfers', icon: ArrowRight },
            { name: 'Bills', icon: CreditCard }
          ]
        },
        {
          title: 'Finance',
          items: [
            { name: 'Currency Exchange', icon: Globe },
            { name: 'Flexible Market Links', icon: TrendingUp },
            { name: 'Cryptocurrencies', icon: Shield },
            { name: 'Valuation Terms', icon: CreditCard }
          ]
        },
        {
          title: 'Receive Payments',
          items: [
            { name: 'Accept Payments', icon: Smartphone },
            { name: 'Payment Links', icon: ArrowRight },
            { name: 'Revolut Reader', icon: CreditCard },
            { name: 'Payment System', icon: Building2 }
          ]
        }
      ]
    }
  },
  personal: {
    ar: {
      title: 'الخدمات الشخصية',
      sections: [
        {
          title: 'الحسابات',
          items: [
            { name: 'حساب شخصي', icon: Users },
            { name: 'حساب التوفير', icon: TrendingUp },
            { name: 'حساب جاري', icon: CreditCard }
          ]
        },
        {
          title: 'الخدمات',
          items: [
            { name: 'التحويلات الدولية', icon: Globe },
            { name: 'الأمان المصرفي', icon: Shield },
            { name: 'التطبيق المحمول', icon: Smartphone }
          ]
        }
      ]
    },
    en: {
      title: 'Personal Services',
      sections: [
        {
          title: 'Accounts',
          items: [
            { name: 'Personal Account', icon: Users },
            { name: 'Savings Account', icon: TrendingUp },
            { name: 'Current Account', icon: CreditCard }
          ]
        },
        {
          title: 'Services',
          items: [
            { name: 'International Transfers', icon: Globe },
            { name: 'Banking Security', icon: Shield },
            { name: 'Mobile App', icon: Smartphone }
          ]
        }
      ]
    }
  },
  business: {
    ar: {
      title: 'خدمات الأعمال',
      sections: [
        {
          title: 'حلول الأعمال',
          items: [
            { name: 'حساب الأعمال', icon: Building2 },
            { name: 'إدارة الرواتب', icon: Users },
            { name: 'التمويل التجاري', icon: TrendingUp }
          ]
        },
        {
          title: 'المدفوعات',
          items: [
            { name: 'معالجة المدفوعات', icon: CreditCard },
            { name: 'التحويلات التجارية', icon: ArrowRight },
            { name: 'إدارة السيولة', icon: Globe }
          ]
        }
      ]
    },
    en: {
      title: 'Business Services',
      sections: [
        {
          title: 'Business Solutions',
          items: [
            { name: 'Business Account', icon: Building2 },
            { name: 'Payroll Management', icon: Users },
            { name: 'Commercial Financing', icon: TrendingUp }
          ]
        },
        {
          title: 'Payments',
          items: [
            { name: 'Payment Processing', icon: CreditCard },
            { name: 'Business Transfers', icon: ArrowRight },
            { name: 'Liquidity Management', icon: Globe }
          ]
        }
      ]
    }
  }
};

const HoverPopup: React.FC<HoverPopupProps> = ({ language, category, isVisible, onClose }) => {
  if (!isVisible || !popupContent[category as keyof typeof popupContent]) return null;

  const content = popupContent[category as keyof typeof popupContent][language];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 mt-2 animate-fade-in">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {section.title}
                </h4>
                
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className="w-full justify-start p-3 h-auto text-left hover:bg-gray-50 rounded-xl group transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                          <item.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'اكتشف المزيد حول' : 'Learn more about'} {content.title}
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoverPopup;
