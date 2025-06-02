
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, PieChart, BarChart3, Target, Shield, Award } from 'lucide-react';

const ServicesInvestment = () => {
  const navigate = useNavigate();

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
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">خدمات الاستثمار</h1>
            <p className="text-xl text-gray-600">
              حقق أهدافك المالية مع حلول الاستثمار المتطورة والمدروسة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الاستثمار في الأسهم</h3>
              <p className="text-gray-600 mb-6">
                استثمر في أسهم الشركات المحلية والعالمية مع إرشادات من خبرائنا
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تداول الأسهم المحلية</li>
                <li>• أسواق عالمية</li>
                <li>• تحليلات متخصصة</li>
                <li>• استشارات استثمارية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الصناديق الاستثمارية</h3>
              <p className="text-gray-600 mb-6">
                صناديق متنوعة تناسب جميع مستويات المخاطر والعوائد المطلوبة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• صناديق النمو</li>
                <li>• صناديق الدخل</li>
                <li>• صناديق متوازنة</li>
                <li>• صناديق إسلامية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">السندات والأدوات المالية</h3>
              <p className="text-gray-600 mb-6">
                استثمارات آمنة في السندات الحكومية والشركات المضمونة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• سندات حكومية</li>
                <li>• سندات الشركات</li>
                <li>• شهادات الإيداع</li>
                <li>• أذون الخزانة</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">التخطيط للتقاعد</h3>
              <p className="text-gray-600 mb-6">
                خطط لمستقبل مالي آمن مع برامج التقاعد المصممة خصيصاً لك
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• حسابات التقاعد</li>
                <li>• استثمارات طويلة المدى</li>
                <li>• تخطيط مالي شخصي</li>
                <li>• مراجعة دورية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">إدارة المخاطر</h3>
              <p className="text-gray-600 mb-6">
                حماية استثماراتك مع استراتيجيات إدارة المخاطر المتقدمة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تنويع المحفظة</li>
                <li>• تحليل المخاطر</li>
                <li>• استراتيجيات الحماية</li>
                <li>• مراقبة مستمرة</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">إدارة الثروات</h3>
              <p className="text-gray-600 mb-6">
                خدمات إدارة ثروات شخصية لعملائنا المميزين
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• مدير محفظة شخصي</li>
                <li>• استراتيجيات مخصصة</li>
                <li>• تقارير دورية</li>
                <li>• خدمة عملاء مميزة</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">لماذا تختار استثماراتنا؟</h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h4 className="text-xl font-semibold mb-2">خبرة متميزة</h4>
                  <p>فريق من الخبراء المتخصصين في الأسواق المالية</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">تقنية متطورة</h4>
                  <p>منصات تداول حديثة وأدوات تحليل متقدمة</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">شفافية كاملة</h4>
                  <p>تقارير واضحة وشفافة عن أداء استثماراتك</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">ابدأ رحلة الاستثمار</h3>
              <p className="text-xl text-gray-600 mb-6">
                احجز استشارة مجانية مع أحد خبرائنا المتخصصين
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  احجز استشارة
                </button>
                <button
                  onClick={() => navigate('/apply/personal')}
                  className="bg-gray-100 text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-lg"
                >
                  افتح حساب استثماري
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesInvestment;
