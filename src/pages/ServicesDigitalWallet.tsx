
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Zap, Shield, QrCode, Users, Gift } from "lucide-react";

const ServicesDigitalWallet = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "تحويلات فورية",
      description: "أرسل واستقبل الأموال في ثوان معدودة"
    },
    {
      icon: QrCode,
      title: "الدفع بـ QR Code",
      description: "ادفع في المتاجر بسهولة عبر مسح الكود"
    },
    {
      icon: Shield,
      title: "حماية متقدمة",
      description: "تشفير عالي المستوى لحماية أموالك"
    },
    {
      icon: Users,
      title: "مشاركة الفواتير",
      description: "قسم الفواتير مع الأصدقاء والعائلة"
    },
    {
      icon: Gift,
      title: "العروض والخصومات",
      description: "استفد من عروض حصرية مع الشركاء"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">المحفظة الرقمية</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              المستقبل في يدك - محفظة رقمية آمنة وسريعة لجميع معاملاتك المالية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">كل ما تحتاجه في تطبيق واحد</h2>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-8 text-white">
            <div className="text-center">
              <Smartphone className="h-24 w-24 mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">حمل التطبيق الآن</h3>
              <p className="text-lg opacity-90 mb-8">
                متوفر على جميع الأجهزة الذكية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  تحميل للأندرويد
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  تحميل للآيفون
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="py-8">
              <div className="text-3xl font-bold text-purple-600 mb-2">0%</div>
              <div className="text-lg font-semibold mb-2">رسوم التحويل</div>
              <div className="text-gray-600">لأول 6 أشهر</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="py-8">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-lg font-semibold mb-2">متاح دائماً</div>
              <div className="text-gray-600">طوال أيام الأسبوع</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="py-8">
              <div className="text-3xl font-bold text-purple-600 mb-2">5s</div>
              <div className="text-lg font-semibold mb-2">سرعة التحويل</div>
              <div className="text-gray-600">في المتوسط</div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-700 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">ابدأ مع المحفظة الرقمية اليوم</h2>
              <p className="text-xl mb-8 opacity-90">
                افتح حسابك واستمتع بمزايا المحفظة الرقمية الحديثة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/apply/personal')}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  افتح حساب الآن
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/demo')}
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg"
                >
                  شاهد العرض التوضيحي
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicesDigitalWallet;
