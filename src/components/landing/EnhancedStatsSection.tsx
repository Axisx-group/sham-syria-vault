
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Shield, Globe, Award, CheckCircle } from 'lucide-react';

interface EnhancedStatsSectionProps {
  language: 'ar' | 'en';
}

const EnhancedStatsSection: React.FC<EnhancedStatsSectionProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    users: 0,
    transactions: 0,
    uptime: 0,
    countries: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Updated realistic values for a startup digital bank
  const finalValues = {
    users: 15000,      // 15K users - realistic for a growing digital bank
    transactions: 2.5,  // 2.5M in transactions - more realistic startup volume  
    uptime: 99.5,      // 99.5% uptime - realistic for a growing platform
    countries: 3       // 3 countries - starting regionally
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const animate = (key: keyof typeof finalValues, target: number) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepTime);
    };

    Object.entries(finalValues).forEach(([key, value]) => {
      animate(key as keyof typeof finalValues, value);
    });
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: animatedValues.users.toLocaleString(),
      suffix: '+',
      label: language === 'ar' ? 'عميل نشط' : 'Active Users',
      description: language === 'ar' ? 'يثقون في خدماتنا المصرفية' : 'Trust our banking services',
      color: 'from-blue-500 to-cyan-500',
      bgImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: TrendingUp,
      value: animatedValues.transactions.toFixed(1),
      suffix: 'M€',
      label: language === 'ar' ? 'معاملات شهرية' : 'Monthly Transactions',
      description: language === 'ar' ? 'معالجة آمنة وسريعة' : 'Secure and fast processing',
      color: 'from-green-500 to-emerald-500',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Shield,
      value: animatedValues.uptime.toFixed(1),
      suffix: '%',
      label: language === 'ar' ? 'وقت التشغيل' : 'System Uptime',
      description: language === 'ar' ? 'موثوقية عالية المستوى' : 'Enterprise-grade reliability',
      color: 'from-purple-500 to-violet-500',
      bgImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Globe,
      value: animatedValues.countries.toString(),
      suffix: '',
      label: language === 'ar' ? 'دول' : 'Countries',
      description: language === 'ar' ? 'تغطية إقليمية متنامية' : 'Growing regional coverage',
      color: 'from-orange-500 to-red-500',
      bgImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: language === 'ar' ? 'أفضل بنك ناشئ 2024' : 'Best Startup Bank 2024',
      issuer: language === 'ar' ? 'جوائز التكنولوجيا المالية' : 'FinTech Awards'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'شهادة الأمان المصرفي' : 'Banking Security Certified',
      issuer: language === 'ar' ? 'هيئة الرقابة المصرفية' : 'Banking Supervisory Authority'
    },
    {
      icon: CheckCircle,
      title: language === 'ar' ? 'ترخيص مؤسسة نقدية' : 'Electronic Money Institution',
      issuer: language === 'ar' ? 'البنك المركزي السوري' : 'Central Bank of Syria'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm30 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-5 h-5" />
            {language === 'ar' ? 'إحصائيات حقيقية' : 'Real Statistics'}
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Numbers That Speak'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'نمو مستمر وثقة متزايدة من عملائنا في رحلتنا لتطوير الخدمات المصرفية الرقمية'
              : 'Continuous growth and increasing trust from our customers in our journey to develop digital banking services'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative group animate-fade-in animation-delay-${(index + 1) * 200}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img 
                  src={stat.bgImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90`} />
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-8 text-white text-center h-80 flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8" />
                </div>
                
                <div className="text-5xl lg:text-6xl font-black mb-3">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{stat.label}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{stat.description}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'الجوائز والشهادات' : 'Awards & Certifications'}
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'ar' 
                ? 'اعتراف بجودة وتميز خدماتنا المصرفية الناشئة'
                : 'Recognition for the quality and excellence of our emerging banking services'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`text-center group animate-fade-in animation-delay-${(index + 1) * 300}`}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h4>
                <p className="text-gray-600">{achievement.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonial */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 rounded-3xl"></div>
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Customer"
                className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white/20"
              />
              <blockquote className="text-2xl lg:text-3xl font-medium mb-6 leading-relaxed">
                "{language === 'ar' 
                  ? 'نوباريوم يقدم خدمات مصرفية رقمية متطورة بثقة وشفافية عالية.'
                  : 'Nubarium provides advanced digital banking services with high trust and transparency.'
                }"
              </blockquote>
              <cite className="text-white/90">
                <div className="font-semibold text-lg">
                  {language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
                </div>
                <div className="text-sm">
                  {language === 'ar' ? 'رائد أعمال، دمشق' : 'Entrepreneur, Damascus'}
                </div>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedStatsSection;
