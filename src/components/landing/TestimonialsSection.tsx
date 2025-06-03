
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  language: 'ar' | 'en';
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const testimonials = [
    {
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: language === 'ar' ? 'رائدة أعمال' : 'Entrepreneur',
      content: language === 'ar' 
        ? 'تطبيق رائع جداً! سهّل علي إدارة أموال شركتي وأصبحت العمليات المصرفية أسرع بكثير.'
        : 'Amazing app! It made managing my company finances so much easier and banking operations are much faster.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: language === 'ar' ? 'محمد علي' : 'Mohammed Ali',
      role: language === 'ar' ? 'مطور برمجيات' : 'Software Developer',
      content: language === 'ar' 
        ? 'أفضل تطبيق بنكي استخدمته. التصميم أنيق والميزات متطورة جداً، خاصة التحويلات الفورية.'
        : 'Best banking app I\'ve used. Elegant design and very advanced features, especially instant transfers.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: language === 'ar' ? 'ليلى حسن' : 'Layla Hassan',
      role: language === 'ar' ? 'طبيبة' : 'Doctor',
      content: language === 'ar' 
        ? 'الأمان والسرعة في التطبيق مذهلان. أستطيع الوثوق به في جميع معاملاتي المالية.'
        : 'The security and speed in the app are amazing. I can trust it with all my financial transactions.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 mb-8 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">
                {language === 'ar' ? 'آراء العملاء' : 'Customer Reviews'}
              </span>
            </div>
            
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === 'ar' ? 'عملاؤنا يحبوننا' : 'Our Customers Love Us'}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'اكتشف لماذا يختار آلاف العملاء بنك الجزيرة الرقمي كشريكهم المصرفي الأول'
                : 'Discover why thousands of customers choose Bank Aljazira Digital as their primary banking partner'
              }
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-purple-500 opacity-60" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-8 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">4.8</div>
                  <div className="text-sm text-gray-600">متوسط التقييم</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">مراجعة إيجابية</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">99%</div>
                  <div className="text-sm text-gray-600">رضا العملاء</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">دعم فني</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
