
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { translations } from '@/utils/translations';

interface TestimonialsSectionProps {
  language: 'ar' | 'en';
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t = translations[language];

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'رجل أعمال' : 'Businessman',
      content: t.testimonial1,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      role: language === 'ar' ? 'مهندسة' : 'Engineer',
      content: t.testimonial2,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: language === 'ar' ? 'محمد الأحمد' : 'Mohammed Al-Ahmad',
      role: language === 'ar' ? 'طبيب' : 'Doctor',
      content: t.testimonial3,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.testimonials}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف تجارب عملائنا الناجحة مع بنك الجزيرة الرقمي'
                : 'Discover our customers\' successful experiences with Bank Aljazira Digital'
              }
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
                <div className="text-gray-600 text-sm">تقييم العملاء</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">150K+</div>
                <div className="text-gray-600 text-sm">عميل راضٍ</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600 text-sm">وقت التشغيل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
