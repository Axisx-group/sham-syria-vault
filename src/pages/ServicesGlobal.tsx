
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, CreditCard, TrendingUp, MapPin, ArrowRight, Banknote } from "lucide-react";

const ServicesGlobal = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 px-8 py-4 text-lg bg-white/20 text-white border-white/30">
              <Globe className="w-5 h-5 mr-3" />
              {language === 'ar' ? 'المصرفية العالمية' : 'Global Banking'}
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              {language === 'ar' ? 'مصرفية بلا حدود' : 'Banking Without Borders'}
            </h1>
            
            <p className="text-2xl mb-12 text-white/90">
              {language === 'ar' 
                ? 'خدمات مصرفية عالمية مع دعم متعدد العملات وتحويلات فورية دولية'
                : 'Global banking services with multi-currency support and instant international transfers'
              }
            </p>
            
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold">
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16">
              {language === 'ar' ? 'الخدمات العالمية' : 'Global Services'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Banknote className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'دعم 50+ عملة' : '50+ Currency Support'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'دعم أكثر من 50 عملة عالمية مع أسعار صرف تنافسية'
                    : 'Support for over 50 global currencies with competitive exchange rates'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <TrendingUp className="w-16 h-16 text-green-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'تحويلات فورية دولية' : 'Instant International Transfers'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'تحويل الأموال فوراً إلى أي مكان في العالم'
                    : 'Transfer money instantly anywhere in the world'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <MapPin className="w-16 h-16 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'حسابات متعددة العملات' : 'Multi-Currency Accounts'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'إدارة حسابات متعددة بعملات مختلفة في مكان واحد'
                    : 'Manage multiple accounts in different currencies in one place'
                  }
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default ServicesGlobal;
