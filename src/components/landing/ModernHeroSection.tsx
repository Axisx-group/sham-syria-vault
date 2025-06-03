
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Shield, Zap, Globe, Users, Award, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BankLogo from './BankLogo';
import { translations } from '@/utils/translations';
import SearchOverlay from '@/components/features/SearchOverlay';
import NetBankLoginDialog from '@/components/auth/NetBankLoginDialog';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface ModernHeroSectionProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const ModernHeroSection: React.FC<ModernHeroSectionProps> = ({ language, onLanguageChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNetBankDialogOpen, setIsNetBankDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const t = translations[language];

  const heroImages = [
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Background Video/Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-50 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                <BankLogo size="lg" variant="light" />
              </div>

              <div className="hidden lg:flex items-center space-x-8">
                <Button variant="ghost" className="text-white hover:text-blue-300 hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium">
                  {t.personal}
                </Button>
                <Button variant="ghost" className="text-white hover:text-blue-300 hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium">
                  {t.business}
                </Button>
                <Button variant="ghost" className="text-white hover:text-blue-300 hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium">
                  البطاقات
                </Button>
                <Button variant="ghost" className="text-white hover:text-blue-300 hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-medium">
                  {t.contact}
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setIsNetBankDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  نت بنك
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
                  className="border-white/30 text-white hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm transition-all"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
              
              {/* Left Content */}
              <div className={`text-center lg:text-right space-y-8 animate-fade-in ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
                
                {/* Badge */}
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span className="text-white font-semibold text-lg">
                    {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : 'Syria\'s First Digital Bank'}
                  </span>
                </div>

                {/* Main Title */}
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-8xl font-black leading-tight tracking-tight text-white">
                    <span className="block mb-4">
                      {language === 'ar' ? 'مستقبل' : 'Future of'}
                    </span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-revolut-gradient">
                      {language === 'ar' ? 'المصرفية' : 'Banking'}
                    </span>
                  </h1>
                  
                  <p className="text-2xl lg:text-3xl text-blue-100 max-w-3xl leading-relaxed">
                    {language === 'ar' 
                      ? 'تجربة مصرفية رقمية ثورية مع أمان عالي المستوى وتقنيات الذكاء الاصطناعي'
                      : 'Revolutionary digital banking experience with AI-powered security and cutting-edge technology'
                    }
                  </p>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                  {[
                    { icon: Shield, text: language === 'ar' ? 'أمان بدرجة البنوك' : 'Bank-grade Security' },
                    { icon: Zap, text: language === 'ar' ? 'معاملات فورية' : 'Instant Transactions' },
                    { icon: Globe, text: language === 'ar' ? 'تحويلات عالمية' : 'Global Transfers' },
                    { icon: Users, text: language === 'ar' ? '+2M عميل نشط' : '2M+ Active Users' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/90">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
                  <NewAccountDialog language={language} />
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/demo')}
                    className="group border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    {language === 'ar' ? 'شاهد العرض التوضيحي' : 'Watch Demo'}
                  </Button>
                </div>
              </div>

              {/* Right Content - Enhanced Phone Mockup */}
              <div className="flex justify-center lg:justify-end animate-fade-in animation-delay-500">
                <div className="relative">
                  
                  {/* Floating Elements */}
                  <div 
                    className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
                    style={{
                      transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                  />
                  <div 
                    className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse animation-delay-1000"
                    style={{
                      transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
                    }}
                  />

                  {/* Main Phone */}
                  <div className="relative bg-black/20 backdrop-blur-sm rounded-[3.5rem] p-4 border border-white/20 shadow-2xl hover:shadow-4xl transition-all duration-500 hover:scale-105">
                    <div className="bg-white rounded-[3rem] overflow-hidden w-96 h-[700px] shadow-inner">
                      
                      {/* Status Bar */}
                      <div className="bg-gray-900 px-8 py-4 flex justify-between items-center text-white text-sm font-medium">
                        <span>9:41</span>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                          <div className="w-6 h-2 bg-white rounded-sm"></div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 h-full p-8 text-white relative overflow-hidden">
                        
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float -top-10 -left-10"></div>
                          <div className="absolute w-48 h-48 bg-white/5 rounded-full blur-3xl animate-float animation-delay-2000 bottom-20 right-0"></div>
                        </div>

                        {/* Header */}
                        <div className="flex justify-between items-center mb-10 relative z-10">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">
                              {language === 'ar' ? 'مرحباً أحمد' : 'Hello Ahmed'}
                            </h3>
                            <p className="text-blue-100 text-sm">
                              {language === 'ar' ? 'إجمالي الرصيد' : 'Total Balance'}
                            </p>
                          </div>
                          <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                            <img 
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                              alt="Profile"
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                          </div>
                        </div>

                        {/* Balance Card */}
                        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 relative z-10 hover:bg-white/20 transition-all">
                          <div className="text-5xl font-bold mb-3">€247,850</div>
                          <div className="text-green-300 text-lg flex items-center">
                            <ArrowRight className="w-5 h-5 mr-2 rotate-[-45deg]" />
                            +5.2% {language === 'ar' ? 'هذا الشهر' : 'this month'}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-4 gap-4 mb-8 relative z-10">
                          {[
                            { icon: ArrowRight, label: language === 'ar' ? 'تحويل' : 'Send', color: 'from-blue-500 to-blue-600' },
                            { icon: Play, label: language === 'ar' ? 'دفع' : 'Pay', color: 'from-green-500 to-green-600' },
                            { icon: Shield, label: language === 'ar' ? 'حفظ' : 'Save', color: 'from-purple-500 to-purple-600' },
                            { icon: Globe, label: language === 'ar' ? 'عالمي' : 'Global', color: 'from-orange-500 to-orange-600' }
                          ].map((action, index) => (
                            <div key={index} className="text-center">
                              <div className={`bg-gradient-to-r ${action.color} rounded-2xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer shadow-lg`}>
                                <action.icon className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-xs text-blue-100 font-medium">{action.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Recent Transactions */}
                        <div className="space-y-4 relative z-10">
                          <h4 className="text-lg font-semibold text-blue-100 mb-4">
                            {language === 'ar' ? 'آخر المعاملات' : 'Recent Transactions'}
                          </h4>
                          
                          {[
                            { 
                              name: 'Netflix', 
                              amount: '-€12.99', 
                              type: 'subscription', 
                              color: 'from-red-500 to-red-600',
                              image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=40&h=40&fit=crop&crop=center'
                            },
                            { 
                              name: language === 'ar' ? 'راتب شركة النفط' : 'Oil Company Salary', 
                              amount: '+€3,250', 
                              type: 'income', 
                              color: 'from-green-500 to-green-600',
                              image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center'
                            },
                            { 
                              name: 'Spotify Premium', 
                              amount: '-€9.99', 
                              type: 'subscription', 
                              color: 'from-green-600 to-green-700',
                              image: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=40&h=40&fit=crop&crop=center'
                            }
                          ].map((transaction, index) => (
                            <div key={index} className="flex justify-between items-center bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all">
                              <div className="flex items-center gap-4">
                                <div className={`bg-gradient-to-r ${transaction.color} rounded-xl p-3 shadow-lg`}>
                                  <img 
                                    src={transaction.image}
                                    alt={transaction.name}
                                    className="w-6 h-6 rounded-md object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-white text-base">{transaction.name}</div>
                                  <div className="text-sm text-blue-200 capitalize">{transaction.type}</div>
                                </div>
                              </div>
                              <div className={`font-bold text-lg ${transaction.amount.startsWith('+') ? 'text-green-300' : 'text-white'}`}>
                                {transaction.amount}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Cards */}
                  <div className="absolute -top-12 -right-12 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 transform rotate-12 hover:rotate-6 transition-transform duration-300 animate-float">
                    <div className="text-sm text-gray-500 mb-2">{language === 'ar' ? 'البطاقة الذهبية' : 'Gold Card'}</div>
                    <div className="text-2xl font-bold text-gray-900">€12,840</div>
                    <div className="text-green-600 text-sm mt-1">+2.3%</div>
                  </div>
                  
                  <div className="absolute -bottom-12 -left-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300 animate-float animation-delay-1000">
                    <div className="text-sm text-white/80 mb-2">{language === 'ar' ? 'حساب المدخرات' : 'Savings Account'}</div>
                    <div className="text-2xl font-bold text-white">€45,200</div>
                    <div className="text-cyan-300 text-sm mt-1">+8.7%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '2M+', label: language === 'ar' ? 'عميل نشط' : 'Active Users' },
                { value: '€50B+', label: language === 'ar' ? 'معاملات سنوية' : 'Annual Transactions' },
                { value: '99.9%', label: language === 'ar' ? 'وقت التشغيل' : 'Uptime' },
                { value: '24/7', label: language === 'ar' ? 'دعم العملاء' : 'Customer Support' }
              ].map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Overlay */}
      <SearchOverlay 
        language={language} 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* NetBank Login Dialog */}
      <NetBankLoginDialog
        isOpen={isNetBankDialogOpen}
        onClose={() => setIsNetBankDialogOpen(false)}
      />
    </>
  );
};

export default ModernHeroSection;
