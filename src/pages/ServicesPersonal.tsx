
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, PiggyBank, Shield, Gift } from "lucide-react";

const ServicesPersonal = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: CreditCard,
      title: "حسابات الدفع",
      description: "حسابات جارية مع بطاقات خصم وإمكانية الوصول للأموال في أي وقت",
      features: ["بطاقة خصم مجانية", "تحويلات فورية", "خدمة عملاء 24/7"]
    },
    {
      icon: PiggyBank,
      title: "حسابات التوفير",
      description: "حسابات توفير بعوائد تنافسية لتنمية أموالك",
      features: ["عوائد شهرية", "حد أدنى منخفض", "مرونة في السحب"]
    },
    {
      icon: Shield,
      title: "التأمين الشخصي",
      description: "حماية شاملة لك ولعائلتك من المخاطر غير المتوقعة",
      features: ["تأمين على الحياة", "تأمين صحي", "تأمين السفر"]
    },
    {
      icon: Gift,
      title: "برنامج المكافآت",
      description: "اربح نقاط مع كل عملية واستبدلها بجوائز قيمة",
      features: ["نقاط على المشتريات", "عروض حصرية", "هدايا مميزة"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">الخدمات المصرفية الشخصية</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              خدمات مصرفية متكاملة مصممة خصيصاً لتلبية احتياجاتك الشخصية والمالية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">جاهز لبدء رحلتك المصرفية؟</h2>
              <p className="text-xl mb-8 opacity-90">
                افتح حسابك الشخصي اليوم واستمتع بخدمات مصرفية متطورة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/apply/personal')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  افتح حساب شخصي الآن
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                >
                  اتصل بنا للاستفسار
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicesPersonal;
