
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Lock
} from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const navigate = useNavigate();

  const translations = {
    ar: {
      title: "بنك الجزيرة الرقمي",
      subtitle: "البنك الرقمي الأول في سوريا",
      description: "إدارة أموالك بذكاء مع أحدث التقنيات المصرفية الرقمية",
      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",
      features: "المميزات",
      feature1Title: "تحويلات فورية",
      feature1Desc: "حوّل أموالك في ثوانٍ إلى أي مكان في العالم",
      feature2Title: "أمان متقدم",
      feature2Desc: "حماية على أعلى مستوى لضمان أمان أموالك",
      feature3Title: "بطاقات ذكية",
      feature3Desc: "بطاقات افتراضية وفيزيائية بتقنيات متطورة",
      feature4Title: "تطبيق متنقل",
      feature4Desc: "إدارة حساباتك من أي مكان وفي أي وقت",
      stats: "أرقامنا",
      customers: "عميل",
      transactions: "معاملة يومياً",
      countries: "دولة",
      rating: "تقييم المستخدمين"
    },
    en: {
      title: "Bank Aljazira Digital",
      subtitle: "Syria's First Digital Bank",
      description: "Manage your money intelligently with the latest digital banking technologies",
      getStarted: "Get Started",
      learnMore: "Learn More",
      features: "Features",
      feature1Title: "Instant Transfers",
      feature1Desc: "Transfer your money in seconds anywhere in the world",
      feature2Title: "Advanced Security", 
      feature2Desc: "Top-level protection to ensure your money's safety",
      feature3Title: "Smart Cards",
      feature3Desc: "Virtual and physical cards with advanced technologies",
      feature4Title: "Mobile App",
      feature4Desc: "Manage your accounts from anywhere, anytime",
      stats: "Our Numbers",
      customers: "customers",
      transactions: "daily transactions",
      countries: "countries",
      rating: "user rating"
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Zap,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: "text-green-600"
    },
    {
      icon: CreditCard,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: "text-purple-600"
    },
    {
      icon: Smartphone,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: "text-orange-600"
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: t.customers },
    { icon: TrendingUp, number: "10K+", label: t.transactions },
    { icon: Globe, number: "25+", label: t.countries },
    { icon: Star, number: "4.9", label: t.rating }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'بنك الجزيرة' : 'Bank Aljazira'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            >
              {language === 'ar' ? 'الدخول' : 'Login'}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2">
          {t.subtitle}
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {t.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-3"
          >
            {t.getStarted}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-3">
            {t.learnMore}
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features}</h2>
          <p className="text-xl text-gray-600">
            {language === 'ar' 
              ? 'اكتشف ما يميز بنك الجزيرة الرقمي'
              : 'Discover what makes Bank Aljazira Digital special'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 ${feature.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'ar' 
              ? 'ابدأ رحلتك المصرفية الرقمية اليوم'
              : 'Start your digital banking journey today'
            }
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar' 
              ? 'انضم إلى آلاف العملاء الذين يثقون ببنك الجزيرة'
              : 'Join thousands of customers who trust Bank Aljazira'
            }
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3"
          >
            {t.getStarted}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
