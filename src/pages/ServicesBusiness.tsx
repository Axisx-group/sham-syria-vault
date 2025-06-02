
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Globe, CreditCard, TrendingUp, Users, Shield } from 'lucide-react';

const ServicesBusiness = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الخدمات المصرفية التجارية</h1>
            <p className="text-xl text-gray-600">
              حلول مصرفية متطورة لنمو وازدهار أعمالك التجارية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الحسابات التجارية</h3>
              <p className="text-gray-600 mb-6">
                حسابات تجارية مصممة خصيصاً لاحتياجات الشركات والمؤسسات
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• إدارة النقد والسيولة</li>
                <li>• تحويلات محلية ودولية</li>
                <li>• خدمات الرواتب</li>
                <li>• كشوف حساب تفصيلية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">التمويل التجاري</h3>
              <p className="text-gray-600 mb-6">
                حلول تمويل مرنة لدعم نمو أعمالك وتوسيع نشاطاتك التجارية
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• قروض رأس المال العامل</li>
                <li>• تمويل المعدات</li>
                <li>• خطوط ائتمان مرنة</li>
                <li>• تمويل المشاريع</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">التجارة الدولية</h3>
              <p className="text-gray-600 mb-6">
                خدمات شاملة لدعم أنشطة الاستيراد والتصدير والتجارة الخارجية
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• اعتمادات مستندية</li>
                <li>• كفالات مصرفية</li>
                <li>• تحصيل مستندي</li>
                <li>• تمويل التجارة</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">بطاقات الأعمال</h3>
              <p className="text-gray-600 mb-6">
                بطاقات ائتمان وخصم مصممة خصيصاً لاحتياجات الشركات
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• بطاقات متعددة للموظفين</li>
                <li>• تقارير مصاريف تفصيلية</li>
                <li>• حدود ائتمان عالية</li>
                <li>• برامج مكافآت للشركات</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">خدمات الرواتب</h3>
              <p className="text-gray-600 mb-6">
                حلول شاملة لإدارة رواتب الموظفين وتبسيط العمليات الإدارية
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• معالجة الرواتب التلقائية</li>
                <li>• بطاقات راتب للموظفين</li>
                <li>• تقارير شاملة</li>
                <li>• خدمات موارد بشرية</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الخدمات الاستشارية</h3>
              <p className="text-gray-600 mb-6">
                استشارات مالية ومصرفية متخصصة لمساعدتك في اتخاذ القرارات الصحيحة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• التخطيط المالي</li>
                <li>• إدارة المخاطر</li>
                <li>• استشارات الاستثمار</li>
                <li>• تطوير الأعمال</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">انطلق بأعمالك إلى المستوى التالي</h3>
              <p className="text-xl mb-6">
                افتح حسابك التجاري اليوم واستفد من خدماتنا المصرفية المتطورة
              </p>
              <button
                onClick={() => navigate('/apply/business')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                افتح حساب تجاري
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesBusiness;
