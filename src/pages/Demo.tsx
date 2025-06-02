
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Download, Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();
  const [language] = useState<'ar' | 'en'>('ar');

  const translations = {
    ar: {
      title: "العروض التوضيحية",
      subtitle: "تعرف على خدماتنا المصرفية الرقمية",
      mainDemo: "العرض الرئيسي",
      mainDemoDesc: "جولة شاملة في تطبيق البنك الرقمي",
      accountOpening: "فتح الحساب",
      accountOpeningDesc: "كيفية فتح حساب جديد خطوة بخطوة",
      transfers: "التحويلات",
      transfersDesc: "طريقة إرسال الأموال بسهولة وأمان",
      cards: "البطاقات",
      cardsDesc: "إدارة بطاقاتك الائتمانية والخصم",
      backToHome: "العودة للرئيسية",
      watchNow: "شاهد الآن",
      downloadGuide: "تحميل الدليل",
      comingSoon: "قريباً"
    },
    en: {
      title: "Demo Videos",
      subtitle: "Learn about our digital banking services",
      mainDemo: "Main Demo",
      mainDemoDesc: "Complete tour of the digital banking app",
      accountOpening: "Account Opening",
      accountOpeningDesc: "How to open a new account step by step",
      transfers: "Transfers",
      transfersDesc: "How to send money easily and securely",
      cards: "Cards",
      cardsDesc: "Manage your credit and debit cards",
      backToHome: "Back to Home",
      watchNow: "Watch Now",
      downloadGuide: "Download Guide",
      comingSoon: "Coming Soon"
    }
  };

  const t = translations[language];

  const demos = [
    {
      title: t.mainDemo,
      description: t.mainDemoDesc,
      duration: "5:30",
      thumbnail: "🎬"
    },
    {
      title: t.accountOpening,
      description: t.accountOpeningDesc,
      duration: "3:15",
      thumbnail: "📱"
    },
    {
      title: t.transfers,
      description: t.transfersDesc,
      duration: "2:45",
      thumbnail: "💸"
    },
    {
      title: t.cards,
      description: t.cardsDesc,
      duration: "4:10",
      thumbnail: "💳"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToHome}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {demos.map((demo, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{demo.thumbnail}</div>
                  <div>
                    <CardTitle className="text-lg">{demo.title}</CardTitle>
                    <p className="text-sm text-gray-500">{demo.duration}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{demo.description}</p>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-500">{t.comingSoon}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    {t.watchNow}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.downloadGuide}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
