
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Eye, Fingerprint, ArrowRight, Cpu } from "lucide-react";

const ServicesSecurity = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 px-8 py-4 text-lg bg-white/20 text-white border-white/30">
              <Lock className="w-5 h-5 mr-3" />
              {language === 'ar' ? 'الحماية الكمية المتقدمة' : 'Advanced Quantum Protection'}
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              {language === 'ar' ? 'الأمان المطلق' : 'Ultimate Security'}
            </h1>
            
            <p className="text-2xl mb-12 text-white/90">
              {language === 'ar' 
                ? 'أعلى مستويات الأمان بتقنية التشفير الكمي وحماية البيانات الحيوية'
                : 'Highest security levels with quantum encryption and biometric data protection'
              }
            </p>
            
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold">
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
              {language === 'ar' ? 'ميزات الحماية' : 'Security Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Cpu className="w-16 h-16 text-green-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'تشفير كمي متقدم' : 'Advanced Quantum Encryption'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'تقنية التشفير الكمي لحماية فائقة للبيانات'
                    : 'Quantum encryption technology for superior data protection'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Fingerprint className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'مصادقة بيومترية' : 'Biometric Authentication'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'بصمة الإصبع والوجه والصوت للمصادقة الآمنة'
                    : 'Fingerprint, face, and voice recognition for secure authentication'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Eye className="w-16 h-16 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'حماية ضد التهديدات' : 'Threat Protection'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'مراقبة مستمرة وحماية من التهديدات السيبرانية'
                    : 'Continuous monitoring and protection from cyber threats'
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

export default ServicesSecurity;
