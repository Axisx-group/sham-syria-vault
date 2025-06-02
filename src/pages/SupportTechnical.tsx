
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

const SupportTechnical = () => {
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
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الدعم الفني</h1>
            <p className="text-xl text-gray-600">
              نحن هنا لمساعدتك في حل أي مشكلة تقنية تواجهها
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">الدعم الهاتفي</h3>
              </div>
              <p className="text-gray-600 mb-4">
                للحصول على مساعدة فورية، اتصل بفريق الدعم الفني لدينا
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">+963-11-123-4567</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  متاح 24/7
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">الدردشة المباشرة</h3>
              </div>
              <p className="text-gray-600 mb-4">
                تحدث مع أحد مختصي الدعم الفني عبر الدردشة المباشرة
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                ابدأ الدردشة
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">البريد الإلكتروني</h3>
            </div>
            <p className="text-gray-600 mb-4">
              أرسل لنا رسالة تفصيلية عن المشكلة التي تواجهها وسنرد عليك في أقرب وقت
            </p>
            <p className="font-semibold text-gray-900">tech-support@bankaljazira.com</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">مشاكل شائعة وحلولها</h3>
            <div className="space-y-4">
              <div className="border-r-4 border-blue-500 pr-4">
                <h4 className="font-semibold text-gray-900 mb-2">مشكلة في تسجيل الدخول</h4>
                <p className="text-gray-600">تأكد من صحة البيانات أو اطلب إعادة تعيين كلمة المرور</p>
              </div>
              <div className="border-r-4 border-green-500 pr-4">
                <h4 className="font-semibold text-gray-900 mb-2">التطبيق لا يعمل بشكل صحيح</h4>
                <p className="text-gray-600">جرب إعادة تشغيل التطبيق أو تحديثه لآخر إصدار</p>
              </div>
              <div className="border-r-4 border-orange-500 pr-4">
                <h4 className="font-semibold text-gray-900 mb-2">مشكلة في العمليات المصرفية</h4>
                <p className="text-gray-600">تواصل معنا فوراً عبر الهاتف للحصول على مساعدة عاجلة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTechnical;
