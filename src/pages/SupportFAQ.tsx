
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

const SupportFAQ = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "كيف يمكنني فتح حساب جديد؟",
      answer: "يمكنك فتح حساب جديد من خلال زيارة موقعنا الإلكتروني والنقر على 'فتح حساب جديد'. ستحتاج إلى تقديم وثائق الهوية المطلوبة وملء النموذج الإلكتروني."
    },
    {
      question: "ما هي الرسوم المصرفية؟",
      answer: "نقدم خدمات مصرفية بأسعار تنافسية. يمكنك الاطلاع على جدول الرسوم الكامل في موقعنا الإلكتروني أو زيارة أقرب فرع."
    },
    {
      question: "كيف يمكنني إعادة تعيين كلمة المرور؟",
      answer: "يمكنك إعادة تعيين كلمة المرور من خلال النقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أو الاتصال بخدمة العملاء."
    },
    {
      question: "ما هي ساعات العمل لخدمة العملاء؟",
      answer: "خدمة العملاء متاحة على مدار 24 ساعة طوال أيام الأسبوع عبر التطبيق الإلكتروني والموقع الإلكتروني."
    },
    {
      question: "كيف يمكنني تحويل الأموال؟",
      answer: "يمكنك تحويل الأموال من خلال التطبيق المصرفي أو الموقع الإلكتروني بسهولة وأمان تام."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للرئيسية
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h1>
            <p className="text-xl text-gray-600">
              إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا المصرفية
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-right bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">لم تجد إجابة لسؤالك؟</h3>
              <p className="text-gray-600 mb-6">
                فريق خدمة العملاء لدينا مستعد لمساعدتك على مدار الساعة
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                اتصل بنا
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportFAQ;
