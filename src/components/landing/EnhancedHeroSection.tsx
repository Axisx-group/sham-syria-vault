
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, Globe, Sparkles, CreditCard, Smartphone } from "lucide-react";
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface EnhancedHeroSectionProps {
  language: 'ar' | 'en';
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "2M+", label: language === 'ar' ? 'عميل راضٍ' : 'Happy Customers' },
    { number: "€50B+", label: language === 'ar' ? 'قيمة المعاملات' : 'Transaction Volume' },
    { number: "99.9%", label: language === 'ar' ? 'وقت التشغيل' : 'Uptime' },
    { number: "4.8/5", label: language === 'ar' ? 'تقييم التطبيق' : 'App Rating' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                   linear-gradient(180deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Shield className="w-8 h-8 text-cyan-400/40" />
        </div>
        <div className="absolute top-40 right-40 animate-float delay-500">
          <Zap className="w-6 h-6 text-purple-400/40" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float delay-1000">
          <Globe className="w-7 h-7 text-blue-400/40" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float delay-1500">
          <CreditCard className="w-6 h-6 text-pink-400/40" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Enhanced Left Content */}
            <div className="text-center lg:text-right space-y-8">
              <div className="space-y-6">
                <Badge className="inline-flex items-center gap-3 mb-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-cyan-300 border-cyan-400/30 px-8 py-4 text-sm backdrop-blur-sm shadow-xl">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                  <Sparkles className="w-4 h-4" />
                  {language === 'ar' ? 'البنك الرقمي #1 في سوريا' : '#1 Digital Bank in Syria'}
                </Badge>

                <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                  <span className="block mb-4 text-white drop-shadow-2xl">
                    {language === 'ar' ? 'مستقبل' : 'Future of'}
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                    {language === 'ar' ? 'المصرفية' : 'Banking'}
                  </span>
                  <span className="block text-4xl lg:text-5xl mt-4 text-gray-300 font-medium">
                    {language === 'ar' ? 'الذكية' : 'Intelligence'}
                  </span>
                </h1>

                <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
                  {language === 'ar' 
                    ? 'منصة مصرفية رقمية متكاملة مع أحدث تقنيات الذكاء الاصطناعي والحماية الكمية وأعلى معايير الأمان والسرعة'
                    : 'Complete digital banking platform with cutting-edge AI technology, quantum protection and highest security standards'
                  }
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <NewAccountDialog language={language} />
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="group border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 px-10 py-6 text-lg rounded-2xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Animated Stats Counter */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-black text-cyan-400 mb-2 transition-all duration-500">
                    {stats[currentStat].number}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stats[currentStat].label}
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? 'bg-cyan-400 w-8' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'ar' ? 'مؤمن بالكامل' : 'Fully Insured'}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'ar' ? 'مرخص رسمياً' : 'Officially Licensed'}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'ar' ? 'دعم 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Right Content - 3D App Preview */}
            <div className="relative">
              <div className="relative max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
                {/* Enhanced Phone Mockup with 3D Effect */}
                <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-6 shadow-2xl hover:shadow-cyan-400/25 transition-all duration-500" 
                     style={{ 
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)' 
                     }}>
                  
                  {/* Phone Screen */}
                  <div className="bg-black rounded-[2.5rem] overflow-hidden border-2 border-gray-700">
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-gray-900 to-black px-6 py-3 flex justify-between items-center text-white text-sm">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-white rounded-full"></div>
                          <div className="w-1 h-3 bg-white/60 rounded-full"></div>
                          <div className="w-1 h-3 bg-white/40 rounded-full"></div>
                          <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 bg-green-400 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced App Content */}
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 h-[650px] relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" 
                             style={{
                               backgroundImage: `
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                               `,
                               backgroundSize: '20px 20px'
                             }}>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                          <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                            مرحباً أحمد
                          </h3>
                          <p className="text-gray-300 text-sm mt-1">إجمالي الرصيد</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Enhanced Balance Display */}
                      <div className="mb-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                        <div className="text-5xl font-black text-white mb-3 flex items-center gap-2">
                          €247,850
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-green-400 text-lg font-semibold">+5.2%</div>
                          <div className="text-gray-300 text-sm">هذا الشهر</div>
                          <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                      </div>

                      {/* Enhanced Quick Actions */}
                      <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-400/30 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 bg-blue-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold">تحويل</span>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-green-400/30 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 bg-green-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold">دفع</span>
                        </div>
                      </div>

                      {/* Enhanced Transactions */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-white text-lg font-semibold">Netflix</div>
                              <div className="text-gray-400 text-sm">اشتراك شهري</div>
                            </div>
                          </div>
                          <div className="text-red-400 text-lg font-bold">-€12.99</div>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-white text-lg font-semibold">راتب</div>
                              <div className="text-gray-400 text-sm">مرتب شهري</div>
                            </div>
                          </div>
                          <div className="text-green-400 text-lg font-bold">+€3,250</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Cards */}
                <div className="absolute -top-12 -right-12 bg-gradient-to-r from-white to-gray-100 rounded-3xl p-6 shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-110">
                  <div className="text-xs text-gray-600 mb-2 font-semibold">رصيد البطاقة</div>
                  <div className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    €12,840
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                
                <div className="absolute -bottom-12 -left-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-6 shadow-2xl transform -rotate-12 hover:-rotate-6 transition-all duration-500 hover:scale-110">
                  <div className="text-xs text-white/80 mb-2 font-semibold">المدخرات</div>
                  <div className="text-2xl font-black text-white flex items-center gap-2">
                    €45,200
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-500">
                  <div className="text-xs text-white/90 mb-1">AI تحليل</div>
                  <div className="text-lg font-bold text-white">+15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-purple-900/50 to-transparent"></div>
    </section>
  );
};

export default EnhancedHeroSection;
