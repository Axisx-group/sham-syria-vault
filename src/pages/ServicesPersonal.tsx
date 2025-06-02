
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Shield, TrendingUp } from 'lucide-react';

const ServicesPersonal = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الخدمات المصرفية الشخصية</h1>
            <p className="text-xl text-gray-600">
              حلول مصرفية متكاملة تلبي احتياجاتك المالية الشخصية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الحسابات الجارية</h3>
              <p className="text-gray-600 mb-6">
                احصل على حساب جاري مع إمكانية الوصول الفوري لأموالك وخدمات مصرفية شاملة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• عدم وجود حد أدنى للرصيد</li>
                <li>• بطاقة خصم مجانية</li>
                <li>• خدمات مصرفية إلكترونية</li>
                <li>• تحويلات مجانية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">حسابات التوفير</h3>
              <p className="text-gray-600 mb-6">
                وفر أموالك واحصل على عوائد تنافسية مع مرونة كاملة في الإيداع والسحب
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• فوائد تنافسية</li>
                <li>• مرونة في الإيداع والسحب</li>
                <li>• لا توجد رسوم خفية</li>
                <li>• حماية كاملة للودائع</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الخدمات الرقمية</h3>
              <p className="text-gray-600 mb-6">
                استمتع بالخدمات المصرفية الرقمية المتطورة متاحة 24/7 عبر التطبيق والموقع
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تطبيق مصرفي متطور</li>
                <li>• تحويلات فورية</li>
                <li>• دفع الفواتير</li>
                <li>• إدارة الحسابات</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">بطاقات الائتمان</h3>
              <p className="text-gray-600 mb-6">
                بطاقات ائتمان بمزايا استثنائية وحدود ائتمانية مرنة تناسب احتياجاتك
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• حدود ائتمانية مرنة</li>
                <li>• برنامج نقاط المكافآت</li>
                <li>• تأمين شامل</li>
                <li>• قبول عالمي</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">التأمين</h3>
              <p className="text-gray-600 mb-6">
                حلول التأمين الشاملة لحماية أموالك وممتلكاتك وعائلتك
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تأمين على الحياة</li>
                <li>• تأمين المركبات</li>
                <li>• تأمين المنازل</li>
                <li>• تأمين السفر</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">القروض الشخصية</h3>
              <p className="text-gray-600 mb-6">
                قروض شخصية بأسعار فائدة تنافسية وإجراءات ميسرة لتحقيق أهدافك
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• أسعار فائدة تنافسية</li>
                <li>• إجراءات سريعة</li>
                <li>• مرونة في السداد</li>
                <li>• بدون ضمانات</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">ابدأ رحلتك المصرفية معنا</h3>
              <p className="text-xl mb-6">
                افتح حسابك الشخصي اليوم واستمتع بأفضل الخدمات المصرفية
              </p>
              <button
                onClick={() => navigate('/apply/personal')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                افتح حساب شخصي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPersonal;
