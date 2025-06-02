
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, QrCode, CreditCard, Shield, Zap, Users } from 'lucide-react';

const ServicesDigitalWallet = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">المحفظة الرقمية</h1>
            <p className="text-xl text-gray-600">
              مستقبل الدفع الرقمي في راحة يدك - آمن وسريع ومريح
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الدفع عبر الهاتف</h3>
              <p className="text-gray-600 mb-6">
                ادفع في أي مكان باستخدام هاتفك الذكي بمجرد لمسة واحدة
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• دفع لا تلامسي</li>
                <li>• متوافق مع جميع الأجهزة</li>
                <li>• سرعة في المعاملات</li>
                <li>• قبول واسع</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <QrCode className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الدفع بـ QR Code</h3>
              <p className="text-gray-600 mb-6">
                امسح الرمز واستمتع بتجربة دفع سريعة وآمنة في جميع المتاجر
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• دفع فوري</li>
                <li>• لا حاجة للنقد</li>
                <li>• إيصالات رقمية</li>
                <li>• تتبع المصاريف</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">البطاقة الافتراضية</h3>
              <p className="text-gray-600 mb-6">
                احصل على بطاقة افتراضية فورية للتسوق الإلكتروني بأمان تام
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• إنشاء فوري</li>
                <li>• أمان عالي</li>
                <li>• تحكم كامل في الإنفاق</li>
                <li>• صالحة للاستخدام الدولي</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">التحويل الفوري</h3>
              <p className="text-gray-600 mb-6">
                حول الأموال لأي شخص في ثوانٍ معدودة باستخدام رقم الهاتف فقط
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تحويل فوري 24/7</li>
                <li>• بدون رسوم</li>
                <li>• إشعارات فورية</li>
                <li>• سجل شامل للمعاملات</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">الأمان المتقدم</h3>
              <p className="text-gray-600 mb-6">
                حماية متعددة المستويات تضمن أمان أموالك ومعلوماتك الشخصية
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تشفير متقدم</li>
                <li>• بصمة الإصبع</li>
                <li>• التعرف على الوجه</li>
                <li>• رقم PIN آمن</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">دفع المجموعات</h3>
              <p className="text-gray-600 mb-6">
                قسم الفواتير واجمع الأموال من الأصدقاء بسهولة ويسر
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• تقسيم الفواتير</li>
                <li>• طلب الأموال</li>
                <li>• مجموعات الدفع</li>
                <li>• تذكيرات تلقائية</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">ميزات حصرية</h3>
              <ul className="space-y-3 text-lg">
                <li>✓ رصيد مجاني عند التسجيل</li>
                <li>✓ كاش باك على المشتريات</li>
                <li>✓ خصومات حصرية من الشركاء</li>
                <li>✓ برنامج الولاء والمكافآت</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">سهولة الاستخدام</h3>
              <ul className="space-y-3 text-lg">
                <li>✓ تطبيق بديهي وسهل</li>
                <li>✓ إعداد سريع في دقائق</li>
                <li>✓ دعم فني متواصل</li>
                <li>✓ تحديثات مستمرة</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">ابدأ رحلتك الرقمية اليوم</h3>
              <p className="text-xl mb-6">
                حمل التطبيق الآن واستمتع بتجربة مصرفية رقمية لا مثيل لها
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                  حمل التطبيق
                </button>
                <button
                  onClick={() => navigate('/apply/personal')}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
                >
                  سجل الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDigitalWallet;
