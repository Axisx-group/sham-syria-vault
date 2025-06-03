
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Shield, Globe, Smartphone, TrendingUp, Users, Zap, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RealServicesSectionProps {
  language: 'ar' | 'en';
}

const RealServicesSection: React.FC<RealServicesSectionProps> = ({ language }) => {
  const navigate = useNavigate();

  const services = [
    {
      icon: CreditCard,
      title: language === 'ar' ? 'البطاقات المصرفية' : 'Banking Cards',
      description: language === 'ar' 
        ? 'بطاقات ذكية مع تحكم كامل، حدود مرنة، وحماية متقدمة ضد الاحتيال'
        : 'Smart cards with full control, flexible limits, and advanced fraud protection',
      features: [
        language === 'ar' ? 'بطاقات بدون رسوم سنوية' : 'No annual fee cards',
        language === 'ar' ? 'تحكم فوري في البطاقة' : 'Instant card controls',
        language === 'ar' ? 'مكافآت على كل عملية شراء' : 'Rewards on every purchase'
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-blue-600 to-cyan-600',
      path: '/cards'
    },
    {
      icon: Smartphone,
      title: language === 'ar' ? 'المصرفية المحمولة' : 'Mobile Banking',
      description: language === 'ar' 
        ? 'تطبيق متطور مع واجهة سهلة الاستخدام وميزات ذكية مدعومة بالذكاء الاصطناعي'
        : 'Advanced app with user-friendly interface and AI-powered smart features',
      features: [
        language === 'ar' ? 'مصادقة بيومترية' : 'Biometric authentication',
        language === 'ar' ? 'إشعارات ذكية' : 'Smart notifications',
        language === 'ar' ? 'مساعد مالي ذكي' : 'AI financial assistant'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-green-600 to-emerald-600',
      path: '/demo'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'التحويلات الدولية' : 'International Transfers',
      description: language === 'ar' 
        ? 'تحويلات سريعة وآمنة إلى أكثر من 200 دولة بأسعار صرف تنافسية'
        : 'Fast and secure transfers to 200+ countries with competitive exchange rates',
      features: [
        language === 'ar' ? 'تحويل فوري لـ 50+ دولة' : 'Instant transfer to 50+ countries',
        language === 'ar' ? 'أسعار صرف شفافة' : 'Transparent exchange rates',
        language === 'ar' ? 'تتبع التحويل المباشر' : 'Real-time transfer tracking'
      ],
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-purple-600 to-violet-600',
      path: '/services/global'
    },
    {
      icon: TrendingUp,
      title: language === 'ar' ? 'الاستثمار الذكي' : 'Smart Investment',
      description: language === 'ar' 
        ? 'أدوات استثمار متقدمة مع تحليل ذكي للمخاطر ومحافظ استثمارية مخصصة'
        : 'Advanced investment tools with smart risk analysis and personalized portfolios',
      features: [
        language === 'ar' ? 'محافظ استثمارية آلية' : 'Automated portfolios',
        language === 'ar' ? 'تحليل مخاطر ذكي' : 'Smart risk analysis',
        language === 'ar' ? 'استثمار بدءاً من 10€' : 'Invest from €10'
      ],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-orange-600 to-red-600',
      path: '/services/investment'
    },
    {
      icon: Building2,
      title: language === 'ar' ? 'حلول الأعمال' : 'Business Solutions',
      description: language === 'ar' 
        ? 'خدمات مصرفية شاملة للشركات مع أدوات إدارة مالية متطورة'
        : 'Comprehensive business banking with advanced financial management tools',
      features: [
        language === 'ar' ? 'حسابات متعددة العملات' : 'Multi-currency accounts',
        language === 'ar' ? 'إدارة الرواتب' : 'Payroll management',
        language === 'ar' ? 'تقارير مالية ذكية' : 'Smart financial reports'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-indigo-600 to-blue-600',
      path: '/services/business'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'الأمان المتقدم' : 'Advanced Security',
      description: language === 'ar' 
        ? 'حماية عالمية المستوى مع تشفير متقدم ومراقبة الاحتيال على مدار الساعة'
        : 'World-class protection with advanced encryption and 24/7 fraud monitoring',
      features: [
        language === 'ar' ? 'تشفير عسكري الدرجة' : 'Military-grade encryption',
        language === 'ar' ? 'مراقبة الاحتيال الذكية' : 'Smart fraud monitoring',
        language === 'ar' ? 'مصادقة متعددة العوامل' : 'Multi-factor authentication'
      ],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'from-gray-600 to-slate-600',
      path: '/services/security'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-30 0a30 30 0 1 1 60 0a30 30 0 1 1 -60 0' stroke='%23000' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-5 h-5" />
            {language === 'ar' ? 'خدماتنا المتميزة' : 'Our Premium Services'}
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'مجموعة شاملة من الخدمات المصرفية المتطورة المصممة لتلبية جميع احتياجاتك المالية'
              : 'A comprehensive suite of advanced banking services designed to meet all your financial needs'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 animate-fade-in animation-delay-${(index + 1) * 100}`}
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                
                {/* Service Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* CTA Button */}
                <div className="absolute bottom-6 right-6">
                  <Button
                    size="sm"
                    onClick={() => navigate(service.path)}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 rounded-xl"
                  >
                    {language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">
                {language === 'ar' ? 'جاهز لتجربة المستقبل؟' : 'Ready to Experience the Future?'}
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'انضم إلى ملايين العملاء الذين اختاروا نوباريوم لتجربة مصرفية استثنائية'
                  : 'Join millions of customers who chose Nubarium for an exceptional banking experience'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/apply/personal')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? 'افتح حسابك الآن' : 'Open Your Account Now'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/demo')}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm"
                >
                  {language === 'ar' ? 'جرب التطبيق' : 'Try the App'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Stories */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === 'ar' ? 'قصص نجاح عملائنا' : 'Our Customer Success Stories'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
                role: language === 'ar' ? 'صاحبة متجر إلكتروني' : 'E-commerce Owner',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
                story: language === 'ar' 
                  ? 'بفضل حلول الأعمال من نوباريوم، تمكنت من إدارة متجري بكفاءة أكبر وزيادة أرباحي بنسبة 40%'
                  : 'Thanks to Nubarium\'s business solutions, I managed my store more efficiently and increased profits by 40%'
              },
              {
                name: language === 'ar' ? 'محمد علي' : 'Mohammed Ali',
                role: language === 'ar' ? 'مهندس برمجيات' : 'Software Engineer',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
                story: language === 'ar' 
                  ? 'التطبيق المحمول سهل جداً والتحويلات الدولية سريعة ورخيصة. لا أستطيع تخيل حياتي بدون نوباريوم'
                  : 'The mobile app is so easy and international transfers are fast and cheap. I can\'t imagine life without Nubarium'
              },
              {
                name: language === 'ar' ? 'فاطمة خالد' : 'Fatima Khalid',
                role: language === 'ar' ? 'مديرة تسويق' : 'Marketing Manager',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
                story: language === 'ar' 
                  ? 'الاستثمار الذكي ساعدني في تنمية مدخراتي. النظام يقترح استثمارات مناسبة لملفي المالي'
                  : 'Smart investment helped me grow my savings. The system suggests investments suitable for my financial profile'
              }
            ].map((customer, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                <img 
                  src={customer.image}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-bold text-gray-900 mb-2">{customer.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{customer.role}</p>
                <p className="text-gray-700 italic">"{customer.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealServicesSection;
