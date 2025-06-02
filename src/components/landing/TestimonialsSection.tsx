
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Star } from "lucide-react";
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
      rating: 5
    },
    {
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      role: language === 'ar' ? 'مهندسة' : 'Engineer',
      content: t.testimonial2,
      rating: 5
    },
    {
      name: language === 'ar' ? 'محمد الأحمد' : 'Mohammed Al-Ahmad',
      role: language === 'ar' ? 'طبيب' : 'Doctor',
      content: t.testimonial3,
      rating: 5
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.testimonials}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف تجارب عملائنا الناجحة مع بنك الجزيرة الرقمي'
              : 'Discover our customers\' successful experiences with Bank Aljazira Digital'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed opacity-90">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
