
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Award,
  ArrowRight,
  Sparkles,
  Brain,
  Cpu,
  Lock
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface AdvancedServicesSectionProps {
  language: 'ar' | 'en';
}

const AdvancedServicesSection: React.FC<AdvancedServicesSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Brain,
      title: language === 'ar' ? 'الذكاء الاصطناعي المصرفي' : 'Banking AI Intelligence',
      description: language === 'ar' 
        ? 'تحليل ذكي للعادات المالية مع توصيات شخصية ومساعد ذكي متاح 24/7'
        : 'Smart analysis of financial habits with personal recommendations and 24/7 AI assistant',
      features: [
        language === 'ar' ? 'تحليل الإنفاق الذكي' : 'Smart Spending Analysis',
        language === 'ar' ? 'توصيات استثمارية' : 'Investment Recommendations',
        language === 'ar' ? 'مساعد ذكي تفاعلي' : 'Interactive AI Assistant'
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      route: "/services/ai-banking"
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'الحماية الكمية المتقدمة' : 'Advanced Quantum Protection',
      description: language === 'ar' 
        ? 'أعلى مستويات الأمان بتقنية التشفير الكمي وحماية البيانات الحيوية'
        : 'Highest security levels with quantum encryption and biometric data protection',
      features: [
        language === 'ar' ? 'تشفير كمي متقدم' : 'Advanced Quantum Encryption',
        language === 'ar' ? 'مصادقة بيومترية' : 'Biometric Authentication',
        language === 'ar' ? 'حماية ضد التهديدات' : 'Threat Protection'
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      route: "/services/security"
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'المصرفية العالمية' : 'Global Banking',
      description: language === 'ar' 
        ? 'خدمات مصرفية عالمية مع دعم متعدد العملات وتحويلات فورية دولية'
        : 'Global banking services with multi-currency support and instant international transfers',
      features: [
        language === 'ar' ? 'دعم 50+ عملة' : '50+ Currency Support',
        language === 'ar' ? 'تحويلات فورية دولية' : 'Instant International Transfers',
        language === 'ar' ? 'حسابات متعددة العملات' : 'Multi-Currency Accounts'
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      route: "/services/global"
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'الاستثمار الذكي' : 'Smart Investment',
      description: language === 'ar' 
        ? 'منصة استثمارية متطورة مع تحليلات السوق الفورية وإدارة المحافظ الذكية'
        : 'Advanced investment platform with real-time market analysis and smart portfolio management',
      features: [
        language === 'ar' ? 'تحليل السوق الفوري' : 'Real-time Market Analysis',
        language === 'ar' ? 'إدارة المحافظ الذكية' : 'Smart Portfolio Management',
        language === 'ar' ? 'استشارات استثمارية' : 'Investment Consulting'
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      route: "/services/investment"
    },
    {
      icon: CreditCard,
      title: language === 'ar' ? 'البطاقات التقنية' : 'Tech Cards',
      description: language === 'ar' 
        ? 'بطاقات ذكية مع تقنيات متقدمة وتحكم كامل عبر التطبيق'
        : 'Smart cards with advanced technologies and full app control',
      features: [
        language === 'ar' ? 'بطاقات افتراضية فورية' : 'Instant Virtual Cards',
        language === 'ar' ? 'تحكم في الحدود' : 'Limit Control',
        language === 'ar' ? 'مكافآت ذكية' : 'Smart Rewards'
      ],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      route: "/cards"
    },
    {
      icon: Users,
      title: language === 'ar' ? 'الخدمات التجارية' : 'Business Services',
      description: language === 'ar' 
        ? 'حلول مصرفية متكاملة للشركات مع أدوات إدارة مالية متقدمة'
        : 'Integrated banking solutions for businesses with advanced financial management tools',
      features: [
        language === 'ar' ? 'إدارة المدفوعات' : 'Payment Management',
        language === 'ar' ? 'تقارير مالية متقدمة' : 'Advanced Financial Reports',
        language === 'ar' ? 'حلول الرواتب' : 'Payroll Solutions'
      ],
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-50 to-green-50",
      route: "/services/business"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header */}
          <div className="text-center mb-24">
            <Badge className="mb-8 px-8 py-4 text-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 text-purple-700 border-purple-200 shadow-lg">
              <Sparkles className="w-5 h-5 mr-3" />
              {language === 'ar' ? 'خدمات تقنية متطورة' : 'Advanced Tech Services'}
            </Badge>
            
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'خدماتنا' : 'Our Services'}
              </span>
              <br />
              <span className="text-gray-800">
                {language === 'ar' ? 'المبتكرة' : 'Innovation'}
              </span>
            </h2>
            
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'مجموعة شاملة من الخدمات المصرفية التقنية المتطورة لتلبية جميع احتياجاتك المالية والاستثمارية'
                : 'Comprehensive suite of advanced tech banking services to meet all your financial and investment needs'
              }
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-6 bg-white/90 backdrop-blur-lg cursor-pointer"
                      onClick={() => navigate(service.route)}>
                  
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-700">
                          <Zap className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-white group-hover:border-gray-300 transition-all duration-300 py-6 text-lg font-semibold"
                    >
                      {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                  
                  {/* Tech Pattern Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <Cpu className="w-8 h-8 text-gray-600" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 rounded-[2rem] p-1 shadow-2xl max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[1.8rem] p-16 text-white">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <Shield className="w-16 h-16 text-cyan-400" />
                  <Award className="w-14 h-14 text-purple-400" />
                  <Globe className="w-16 h-16 text-blue-400" />
                </div>
                
                <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {language === 'ar' ? 'مستقبل' : 'Future of'}
                  </span>
                  <br />
                  <span className="text-white">
                    {language === 'ar' ? 'الخدمات المصرفية' : 'Banking Services'}
                  </span>
                </h3>
                
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10">
                  {language === 'ar' 
                    ? 'انضم إلى أكثر من 2 مليون عميل يثقون في خدماتنا المصرفية المتطورة والآمنة'
                    : 'Join over 2 million customers who trust our advanced and secure banking services'
                  }
                </p>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/dashboard')}
                >
                  {language === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedServicesSection;
