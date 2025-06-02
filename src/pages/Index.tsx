
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';
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
  Lock,
  CheckCircle,
  Clock,
  Award,
  DollarSign,
  Eye,
  EyeOff,
  Play
} from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const navigate = useNavigate();

  const translations = {
    ar: {
      title: "بنك الجزيرة الرقمي",
      subtitle: "البنك الرقمي الأول في سوريا",
      description: "إدارة أموالك بذكاء مع أحدث التقنيات المصرفية الرقمية. نوفر لك خدمات مصرفية آمنة ومتطورة على مدار الساعة",
      getStarted: "ابدأ الآن",
      openAccount: "فتح حساب جديد",
      learnMore: "اعرف المزيد",
      watchDemo: "شاهد العرض التوضيحي",
      features: "المميزات",
      feature1Title: "تحويلات فورية",
      feature1Desc: "حوّل أموالك في ثوانٍ إلى أي مكان في العالم بأقل الرسوم",
      feature2Title: "أمان متقدم",
      feature2Desc: "حماية على أعلى مستوى مع تشفير 256-بت وحماية متعددة الطبقات",
      feature3Title: "بطاقات ذكية",
      feature3Desc: "بطاقات افتراضية وفيزيائية مع تحكم كامل وحماية متقدمة",
      feature4Title: "تطبيق متنقل",
      feature4Desc: "إدارة حساباتك من أي مكان وفي أي وقت مع تطبيق آمن وسهل",
      stats: "أرقامنا",
      customers: "عميل راضٍ",
      transactions: "معاملة يومياً",
      countries: "دولة",
      rating: "تقييم المستخدمين",
      services: "خدماتنا",
      personalBanking: "الخدمات الشخصية",
      businessBanking: "الخدمات التجارية",
      digitalWallet: "المحفظة الرقمية",
      investment: "الاستثمار",
      personalDesc: "حسابات شخصية وبطاقات ائتمان وقروض شخصية",
      businessDesc: "حلول مصرفية متكاملة للشركات الصغيرة والمتوسطة",
      walletDesc: "محفظة رقمية آمنة لجميع معاملاتك اليومية",
      investmentDesc: "فرص استثمارية متنوعة مع عوائد مجزية وآمنة",
      testimonials: "آراء العملاء",
      testimonial1: "بنك الجزيرة غيّر طريقة تعاملي مع الأموال. الخدمة سريعة وآمنة جداً",
      testimonial2: "أفضل تطبيق مصرفي استخدمته. كل شيء بسيط وواضح",
      testimonial3: "الدعم الفني ممتاز والخدمات متطورة. أنصح به بقوة",
      whyChooseUs: "لماذا تختارنا؟",
      reason1: "أمان مطلق",
      reason2: "خدمة 24/7",
      reason3: "رسوم منخفضة",
      reason4: "تقنية متطورة"
    },
    en: {
      title: "Bank Aljazira Digital",
      subtitle: "Syria's First Digital Bank",
      description: "Manage your money intelligently with the latest digital banking technologies. We provide secure and advanced banking services around the clock",
      getStarted: "Get Started",
      openAccount: "Open New Account",
      learnMore: "Learn More",
      watchDemo: "Watch Demo",
      features: "Features",
      feature1Title: "Instant Transfers",
      feature1Desc: "Transfer your money in seconds anywhere in the world with minimal fees",
      feature2Title: "Advanced Security", 
      feature2Desc: "Top-level protection with 256-bit encryption and multi-layer security",
      feature3Title: "Smart Cards",
      feature3Desc: "Virtual and physical cards with full control and advanced protection",
      feature4Title: "Mobile App",
      feature4Desc: "Manage your accounts from anywhere, anytime with secure and easy app",
      stats: "Our Numbers",
      customers: "satisfied customers",
      transactions: "daily transactions",
      countries: "countries",
      rating: "user rating",
      services: "Our Services",
      personalBanking: "Personal Banking",
      businessBanking: "Business Banking", 
      digitalWallet: "Digital Wallet",
      investment: "Investment",
      personalDesc: "Personal accounts, credit cards, and personal loans",
      businessDesc: "Integrated banking solutions for small and medium enterprises",
      walletDesc: "Secure digital wallet for all your daily transactions",
      investmentDesc: "Diverse investment opportunities with profitable and safe returns",
      testimonials: "Customer Reviews",
      testimonial1: "Bank Aljazira changed how I handle money. Service is fast and very secure",
      testimonial2: "Best banking app I've used. Everything is simple and clear",
      testimonial3: "Excellent technical support and advanced services. Highly recommend",
      whyChooseUs: "Why Choose Us?",
      reason1: "Absolute Security",
      reason2: "24/7 Service",
      reason3: "Low Fees",
      reason4: "Advanced Technology"
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Zap,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: CreditCard,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Smartphone,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: t.customers },
    { icon: TrendingUp, number: "15K+", label: t.transactions },
    { icon: Globe, number: "25+", label: t.countries },
    { icon: Star, number: "4.9", label: t.rating }
  ];

  const services = [
    {
      icon: Users,
      title: t.personalBanking,
      description: t.personalDesc,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: t.businessBanking,
      description: t.businessDesc,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Smartphone,
      title: t.digitalWallet,
      description: t.walletDesc,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: DollarSign,
      title: t.investment,
      description: t.investmentDesc,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رجل أعمال' : 'Businessman',
      content: t.testimonial1,
      rating: 5
    },
    {
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      role: language === 'ar' ? 'مهندسة' : 'Engineer',
      content: t.testimonial2,
      rating: 5
    },
    {
      name: language === 'ar' ? 'محمد الأحمد' : 'Mohammed Al-Ahmad',
      role: language === 'ar' ? 'طبيب' : 'Doctor',
      content: t.testimonial3,
      rating: 5
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: t.reason1,
      description: language === 'ar' ? 'تشفير متقدم وحماية متعددة الطبقات' : 'Advanced encryption and multi-layer protection'
    },
    {
      icon: Clock,
      title: t.reason2,
      description: language === 'ar' ? 'خدمة عملاء متاحة على مدار الساعة' : '24/7 customer service available'
    },
    {
      icon: DollarSign,
      title: t.reason3,
      description: language === 'ar' ? 'رسوم تنافسية وعروض مميزة' : 'Competitive fees and special offers'
    },
    {
      icon: Award,
      title: t.reason4,
      description: language === 'ar' ? 'أحدث التقنيات المصرفية الرقمية' : 'Latest digital banking technologies'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
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
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm bg-blue-100 text-blue-800 border-blue-200">
            {t.subtitle}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {t.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <NewAccountDialog language={language} />
            
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.getStarted}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover:shadow-lg transition-all">
              <Play className="mr-2 h-5 w-5" />
              {t.watchDemo}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{language === 'ar' ? 'مرخص من المصرف المركزي' : 'Licensed by Central Bank'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>{language === 'ar' ? 'تشفير 256-بت' : '256-bit Encryption'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <span>{language === 'ar' ? 'حائز على جوائز' : 'Award Winning'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4 group-hover:shadow-lg transition-all">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.whyChooseUs}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نتميز بمعايير عالية من الجودة والأمان في خدماتنا المصرفية'
                : 'We excel with high standards of quality and security in our banking services'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center pb-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-gray-600">
                      {reason.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.features}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف ما يميز بنك الجزيرة الرقمي عن البنوك التقليدية'
              : 'Discover what makes Bank Aljazira Digital different from traditional banks'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-10 w-10 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.services}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'مجموعة شاملة من الخدمات المصرفية لتلبية جميع احتياجاتك المالية'
                : 'Comprehensive banking services to meet all your financial needs'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${service.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-10 w-10 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.testimonials}</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف تجارب عملائنا الناجحة مع بنك الجزيرة الرقمي'
                : 'Discover our customers\' successful experiences with Bank Aljazira Digital'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm opacity-80">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed opacity-90">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'ar' 
              ? 'ابدأ رحلتك المصرفية الرقمية اليوم'
              : 'Start your digital banking journey today'
            }
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى آلاف العملاء الذين يثقون ببنك الجزيرة واستمتع بخدمات مصرفية متطورة'
              : 'Join thousands of customers who trust Bank Aljazira and enjoy advanced banking services'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NewAccountDialog language={language} />
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              {t.getStarted}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
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
                <li>{t.personalBanking}</li>
                <li>{t.businessBanking}</li>
                <li>{t.digitalWallet}</li>
                <li>{t.investment}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">
                {language === 'ar' ? 'الدعم' : 'Support'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</li>
                <li>{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</li>
                <li>{language === 'ar' ? 'الدعم الفني' : 'Technical Support'}</li>
                <li>{language === 'ar' ? 'مركز المساعدة' : 'Help Center'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">
                {language === 'ar' ? 'تواصل معنا' : 'Contact'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>+963 11 123 4567</li>
                <li>info@bankaljazira.sy</li>
                <li>{language === 'ar' ? 'دمشق، سوريا' : 'Damascus, Syria'}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 {language === 'ar' ? 'بنك الجزيرة الرقمي' : 'Bank Aljazira Digital'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
