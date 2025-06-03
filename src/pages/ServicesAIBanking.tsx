
import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, Zap, TrendingUp, Shield, Users, ArrowRight, Sparkles } from "lucide-react";

const ServicesAIBanking = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 px-8 py-4 text-lg bg-white/20 text-white border-white/30">
              <Brain className="w-5 h-5 mr-3" />
              {language === 'ar' ? 'الذكاء الاصطناعي المصرفي' : 'Banking AI Intelligence'}
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              {language === 'ar' ? 'المصرفية الذكية' : 'Smart Banking'}
            </h1>
            
            <p className="text-2xl mb-12 text-white/90">
              {language === 'ar' 
                ? 'تحليل ذكي للعادات المالية مع توصيات شخصية ومساعد ذكي متاح 24/7'
                : 'Smart analysis of financial habits with personal recommendations and 24/7 AI assistant'
              }
            </p>
            
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold">
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
              {language === 'ar' ? 'ميزات الذكاء الاصطناعي' : 'AI Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <TrendingUp className="w-16 h-16 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'تحليل الإنفاق الذكي' : 'Smart Spending Analysis'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'تحليل تلقائي لعادات الإنفاق وتصنيف المعاملات'
                    : 'Automatic analysis of spending habits and transaction categorization'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Shield className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'توصيات استثمارية' : 'Investment Recommendations'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'توصيات استثمارية ذكية بناءً على ملفك المالي'
                    : 'Smart investment recommendations based on your financial profile'
                  }
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <Users className="w-16 h-16 text-green-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'مساعد ذكي تفاعلي' : 'Interactive AI Assistant'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'مساعد ذكي متوفر 24/7 للإجابة على استفساراتك'
                    : '24/7 AI assistant available to answer your queries'
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

export default ServicesAIBanking;
