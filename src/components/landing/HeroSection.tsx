
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Star } from "lucide-react";
import NewAccountDialog from '@/components/dashboard/NewAccountDialog';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-right">
              <Badge className="inline-flex items-center gap-2 mb-8 bg-white/10 text-white border-white/20 px-6 py-3 text-sm backdrop-blur-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {language === 'ar' ? 'البنك الرقمي #1 في سوريا' : '#1 Digital Bank in Syria'}
              </Badge>

              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="block mb-2">
                  {language === 'ar' ? 'مستقبل' : 'Future of'}
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {language === 'ar' ? 'المصرفية' : 'Banking'}
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {language === 'ar' 
                  ? 'منصة مصرفية رقمية متكاملة مع أحدث التقنيات وأعلى معايير الأمان والسرعة'
                  : 'Complete digital banking platform with cutting-edge technology and highest security standards'
                }
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                <NewAccountDialog language={language} />
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="group border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl backdrop-blur-sm transition-all"
                >
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  {language === 'ar' ? 'شاهد العرض' : 'Watch Demo'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{language === 'ar' ? 'مؤمن بالكامل' : 'Fully Insured'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{language === 'ar' ? 'مرخص رسمياً' : 'Officially Licensed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{language === 'ar' ? 'دعم 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </div>

            {/* Right Content - App Preview */}
            <div className="relative">
              <div className="relative max-w-md mx-auto">
                {/* Phone Mockup */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-black px-6 py-2 flex justify-between items-center text-white text-sm">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 h-[600px]">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h3 className="text-white text-xl font-bold">مرحباً أحمد</h3>
                          <p className="text-gray-300 text-sm">إجمالي الرصيد</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                      </div>

                      {/* Balance */}
                      <div className="mb-8">
                        <div className="text-4xl font-bold text-white mb-2">€247,850</div>
                        <div className="text-green-400 text-sm">+5.2% هذا الشهر</div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                          <span className="text-white text-xs">تحويل</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                          <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2"></div>
                          <span className="text-white text-xs">دفع</span>
                        </div>
                      </div>

                      {/* Transactions */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
                            <div>
                              <div className="text-white text-sm font-medium">Netflix</div>
                              <div className="text-gray-400 text-xs">اشتراك شهري</div>
                            </div>
                          </div>
                          <div className="text-white text-sm">-€12.99</div>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                            <div>
                              <div className="text-white text-sm font-medium">راتب</div>
                              <div className="text-gray-400 text-xs">مرتب شهري</div>
                            </div>
                          </div>
                          <div className="text-green-400 text-sm">+€3,250</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-6 transition-transform">
                  <div className="text-xs text-gray-600 mb-1">رصيد البطاقة</div>
                  <div className="text-lg font-bold text-gray-900">€12,840</div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 shadow-xl transform -rotate-12 hover:-rotate-6 transition-transform">
                  <div className="text-xs text-white/80 mb-1">المدخرات</div>
                  <div className="text-lg font-bold text-white">€45,200</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
