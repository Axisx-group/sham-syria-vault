
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Crown, Sparkles, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface EnhancedHeroSectionProps {
  language: 'ar' | 'en';
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Interactive Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float animation-delay-2000"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float animation-delay-4000"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Shield className="absolute top-20 left-20 w-6 h-6 text-blue-400/30 animate-float" />
          <Zap className="absolute top-32 right-32 w-8 h-8 text-purple-400/30 animate-float animation-delay-1000" />
          <Globe className="absolute bottom-32 left-1/4 w-7 h-7 text-cyan-400/30 animate-float animation-delay-2000" />
          <Sparkles className="absolute bottom-20 right-20 w-6 h-6 text-pink-400/30 animate-float animation-delay-3000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 shadow-lg">
                <Crown className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'البنك الرقمي الأول في سوريا' : 'Syria\'s First Digital Bank'}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900">
                    {language === 'ar' ? 'مصرفية' : 'Banking'}
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    {language === 'ar' ? 'المستقبل' : 'Reimagined'}
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {language === 'ar' 
                    ? 'تجربة مصرفية رقمية متطورة مع أمان عالي وسرعة فائقة'
                    : 'Advanced digital banking with unparalleled security and lightning speed'
                  }
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NewAccountDialog language={language} />
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="group border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">2M+</div>
                  <div className="text-sm text-gray-500">{language === 'ar' ? 'عميل نشط' : 'Active Users'}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">€50B+</div>
                  <div className="text-sm text-gray-500">{language === 'ar' ? 'معاملات سنوية' : 'Transactions'}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-500">{language === 'ar' ? 'وقت التشغيل' : 'Uptime'}</div>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Phone Mockup */}
            <div className="flex justify-center lg:justify-end animate-fade-in animation-delay-500">
              <div className="relative">
                
                {/* Phone Container */}
                <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden w-80 h-[600px]">
                    
                    {/* Status Bar */}
                    <div className="bg-gray-900 px-6 py-3 flex justify-between items-center text-white text-sm">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 h-full p-6 text-white relative overflow-hidden">
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      </div>

                      {/* Header */}
                      <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                          <h3 className="text-xl font-bold">
                            {language === 'ar' ? 'مرحباً أحمد' : 'Hello Ahmed'}
                          </h3>
                          <p className="text-blue-100 text-sm">
                            {language === 'ar' ? 'إجمالي الرصيد' : 'Total Balance'}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                        </div>
                      </div>

                      {/* Balance Card */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/20 relative z-10">
                        <div className="text-4xl font-bold mb-2">€247,850</div>
                        <div className="text-green-300 text-sm flex items-center">
                          <ArrowRight className="w-4 h-4 mr-1 rotate-[-45deg]" />
                          +5.2% {language === 'ar' ? 'هذا الشهر' : 'this month'}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-4 gap-3 mb-6 relative z-10">
                        {[
                          { icon: ArrowRight, label: language === 'ar' ? 'تحويل' : 'Send', color: 'bg-blue-500' },
                          { icon: Play, label: language === 'ar' ? 'دفع' : 'Pay', color: 'bg-green-500' },
                          { icon: Shield, label: language === 'ar' ? 'حفظ' : 'Save', color: 'bg-purple-500' },
                          { icon: Globe, label: language === 'ar' ? 'عالمي' : 'Global', color: 'bg-orange-500' }
                        ].map((action, index) => (
                          <div key={index} className="text-center">
                            <div className={`${action.color} rounded-2xl p-3 mb-2 mx-auto w-14 h-14 flex items-center justify-center transform hover:scale-110 transition-transform`}>
                              <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs text-blue-100">{action.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recent Transactions */}
                      <div className="space-y-3 relative z-10">
                        <h4 className="text-sm font-semibold text-blue-100 mb-3">
                          {language === 'ar' ? 'آخر المعاملات' : 'Recent Transactions'}
                        </h4>
                        
                        {[
                          { name: 'Netflix', amount: '-€12.99', type: 'subscription', color: 'bg-red-500' },
                          { name: language === 'ar' ? 'راتب' : 'Salary', amount: '+€3,250', type: 'income', color: 'bg-green-500' },
                          { name: 'Spotify', amount: '-€9.99', type: 'subscription', color: 'bg-green-600' }
                        ].map((transaction, index) => (
                          <div key={index} className="flex justify-between items-center bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                            <div className="flex items-center gap-3">
                              <div className={`${transaction.color} rounded-xl p-2`}>
                                <div className="w-4 h-4 bg-white rounded-sm"></div>
                              </div>
                              <div>
                                <div className="font-medium text-sm">{transaction.name}</div>
                                <div className="text-xs text-blue-200">{transaction.type}</div>
                              </div>
                            </div>
                            <div className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-300' : 'text-white'}`}>
                              {transaction.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 transform rotate-12 hover:rotate-6 transition-transform duration-300 animate-float">
                  <div className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'البطاقة الذهبية' : 'Gold Card'}</div>
                  <div className="text-lg font-bold text-gray-900">€12,840</div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-4 shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300 animate-float animation-delay-1000">
                  <div className="text-xs text-white/80 mb-1">{language === 'ar' ? 'المدخرات' : 'Savings'}</div>
                  <div className="text-lg font-bold text-white">€45,200</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
