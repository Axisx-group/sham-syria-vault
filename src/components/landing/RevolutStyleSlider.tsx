
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, User, CreditCard, TrendingUp, Globe } from "lucide-react";

interface SliderProps {
  language: 'ar' | 'en';
}

const slides = [
  {
    id: 1,
    titleEn: "BANKING & BEYOND",
    titleAr: "مصرفية وأكثر",
    subtitleEn: "Let Nubarium take care of your banking needs so you can focus on what matters most",
    subtitleAr: "دع نوباريوم يتولى احتياجاتك المصرفية حتى تتمكن من التركيز على ما يهمك أكثر",
    amount: "6.012 €",
    category: "Personal",
    categoryAr: "شخصي",
    transaction: {
      titleEn: "Salary",
      titleAr: "راتب",
      amount: "+2.550 €",
      time: "Today, 11:28"
    },
    gradient: "from-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
  },
  {
    id: 2,
    titleEn: "SMART INVESTMENTS",
    titleAr: "استثمارات ذكية",
    subtitleEn: "Grow your wealth with our AI-powered investment solutions",
    subtitleAr: "نمي ثروتك مع حلول الاستثمار المدعومة بالذكاء الاصطناعي",
    amount: "12.450 €",
    category: "Investment",
    categoryAr: "استثمار",
    transaction: {
      titleEn: "Portfolio Growth",
      titleAr: "نمو المحفظة",
      amount: "+850 €",
      time: "This week"
    },
    gradient: "from-purple-400 to-purple-600",
    bgColor: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600"
  },
  {
    id: 3,
    titleEn: "GLOBAL TRANSFERS",
    titleAr: "تحويلات عالمية",
    subtitleEn: "Send money worldwide with the best exchange rates",
    subtitleAr: "أرسل الأموال حول العالم بأفضل أسعار الصرف",
    amount: "8.750 €",
    category: "Business",
    categoryAr: "أعمال",
    transaction: {
      titleEn: "International Transfer",
      titleAr: "تحويل دولي",
      amount: "-1.200 €",
      time: "Yesterday"
    },
    gradient: "from-green-400 to-green-600",
    bgColor: "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
  }
];

const RevolutStyleSlider: React.FC<SliderProps> = ({ language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with smooth transition */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${current.bgColor}`}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float -top-20 -left-20"></div>
          <div className="absolute w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float animation-delay-2000 top-1/2 right-0"></div>
          <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float animation-delay-4000 bottom-0 left-1/3"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Content */}
            <div className={`text-white space-y-8 ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
              
              {/* Main Title with Animation */}
              <div 
                key={currentSlide}
                className="space-y-6 animate-fade-in"
              >
                <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                  {language === 'ar' ? current.titleAr : current.titleEn}
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed">
                  {language === 'ar' ? current.subtitleAr : current.subtitleEn}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <Button 
                  size="lg"
                  className="bg-black text-white hover:bg-gray-900 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-3" />
                  {language === 'ar' ? 'تحميل التطبيق' : 'Download app'}
                </Button>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                
                {/* Phone Container */}
                <div className="relative bg-black/20 backdrop-blur-sm rounded-[3rem] p-3 border border-white/20">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden w-80 h-[600px] shadow-2xl">
                    
                    {/* Status Bar */}
                    <div className="bg-gray-900 px-6 py-3 flex justify-between items-center text-white text-sm">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Content with Smooth Transition */}
                    <div 
                      key={currentSlide}
                      className={`h-full p-6 text-white relative overflow-hidden transition-all duration-700 ${current.bgColor}`}
                    >
                      
                      {/* Header */}
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                            <User className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-white/80 mb-1">
                            {language === 'ar' ? current.categoryAr : current.category}
                          </div>
                          <div className="text-3xl font-bold">{current.amount}</div>
                        </div>
                      </div>

                      {/* Accounts Button */}
                      <div className="mb-8 flex justify-center">
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold">
                          {language === 'ar' ? 'الحسابات' : 'Accounts'}
                        </Button>
                      </div>

                      {/* Transaction Card */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${current.gradient}`}>
                                <TrendingUp className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {language === 'ar' ? current.transaction.titleAr : current.transaction.titleEn}
                                </div>
                                <div className="text-sm text-gray-500">{current.transaction.time}</div>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {current.transaction.amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default RevolutStyleSlider;
