
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Mail, Phone, Calendar, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface ApplicationData {
  id: string;
  application_token: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_type: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  created_at: string;
  preferred_currency: string;
}

const ApplicationStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('رقم الطلب مطلوب');
      setLoading(false);
      return;
    }

    fetchApplicationStatus();
  }, [token]);

  const fetchApplicationStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('account_applications')
        .select('*')
        .eq('application_token', token)
        .single();

      if (error) {
        setError('الطلب غير موجود');
        return;
      }

      setApplication(data);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الطلب');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'في الانتظار',
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-4 w-4" />,
          description: 'طلبكم قيد المراجعة من قبل فريقنا'
        };
      case 'under_review':
        return {
          label: 'قيد المراجعة',
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-4 w-4" />,
          description: 'يتم مراجعة طلبكم حالياً من قبل المختصين'
        };
      case 'approved':
        return {
          label: 'تمت الموافقة',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4" />,
          description: 'تم قبول طلبكم! سيتم التواصل معكم قريباً لإكمال الإجراءات'
        };
      case 'rejected':
        return {
          label: 'تم الرفض',
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-4 w-4" />,
          description: 'للأسف، لم يتم قبول طلبكم. يمكنكم التواصل معنا لمعرفة الأسباب'
        };
      default:
        return {
          label: 'غير محدد',
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-4 w-4" />,
          description: ''
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل حالة الطلب...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(application.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">حالة طلب فتح الحساب</h1>
            <p className="text-gray-600">تتبع حالة طلبكم لفتح حساب جديد</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* حالة الطلب */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>حالة الطلب</span>
                <Badge className={statusInfo.color}>
                  {statusInfo.icon}
                  <span className="ml-2">{statusInfo.label}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{statusInfo.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">#{application.application_token.slice(-8)}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الطلب</p>
                    <p className="font-medium">{application.application_token}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">تاريخ التقديم</p>
                    <p className="font-medium">{new Date(application.created_at).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بيانات الطلب */}
          <Card>
            <CardHeader>
              <CardTitle>بيانات الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">المعلومات الشخصية</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">الاسم:</span> {application.first_name} {application.last_name}</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">البريد الإلكتروني:</span>
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">الهاتف:</span>
                      <span>{application.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">تفاصيل الحساب</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">نوع الحساب:</span> {application.account_type === 'personal' ? 'شخصي' : 'تجاري'}</p>
                    <p><span className="text-gray-600">العملة المفضلة:</span> {application.preferred_currency}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* معلومات عن البنك */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات مهمة عن البنك</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">خدماتنا المصرفية</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>تحويلات SWIFT دولية سريعة وآمنة</li>
                  <li>بطاقات مصرفية متعددة العملات</li>
                  <li>خدمات الدفع الإلكتروني والمحافظ الرقمية</li>
                  <li>خدمات الاستثمار والودائع</li>
                  <li>دعم فني متاح 24/7</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">الخطوات التالية</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  {application.status === 'approved' ? (
                    <div>
                      <p className="text-blue-800 font-medium mb-2">تهانينا! تمت الموافقة على طلبكم</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• سيتم التواصل معكم خلال 24-48 ساعة</li>
                        <li>• سيتم إرسال بيانات الحساب عبر البريد الإلكتروني</li>
                        <li>• يمكنكم زيارة أقرب فرع لاستلام البطاقة المصرفية</li>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <p className="text-blue-800 font-medium mb-2">ما يمكنكم فعله الآن:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• تحضير الوثائق المطلوبة (هوية، جواز سفر)</li>
                        <li>• التأكد من صحة البيانات المقدمة</li>
                        <li>• انتظار التواصل من فريقنا</li>
                        <li>• مراجعة شروط وأحكام البنك</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">التواصل معنا</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">خدمة العملاء</p>
                    <p className="font-medium">+963-11-123-4567</p>
                  </div>
                  <div>
                    <p className="text-gray-600">البريد الإلكتروني</p>
                    <p className="font-medium">support@bank.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
