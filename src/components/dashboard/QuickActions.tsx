
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, PlusCircle, CreditCard, Repeat, QrCode, Receipt } from "lucide-react";

interface QuickActionsProps {
  language: 'ar' | 'en';
}

const QuickActions: React.FC<QuickActionsProps> = ({ language }) => {
  const translations = {
    ar: {
      quickActions: "إجراءات سريعة",
      sendMoney: "إرسال أموال",
      addMoney: "إضافة أموال",
      newCard: "بطاقة جديدة",
      payBills: "دفع الفواتير",
      scanQR: "مسح QR",
      requestMoney: "طلب أموال"
    },
    en: {
      quickActions: "Quick Actions",
      sendMoney: "Send Money",
      addMoney: "Add Money", 
      newCard: "New Card",
      payBills: "Pay Bills",
      scanQR: "Scan QR",
      requestMoney: "Request Money"
    }
  };

  const t = translations[language];

  const actions = [
    { 
      title: t.sendMoney, 
      icon: Send, 
      color: "bg-blue-500 hover:bg-blue-600",
      description: language === 'ar' ? 'تحويل فوري' : 'Instant transfer'
    },
    { 
      title: t.addMoney, 
      icon: PlusCircle, 
      color: "bg-green-500 hover:bg-green-600",
      description: language === 'ar' ? 'إيداع' : 'Deposit'
    },
    { 
      title: t.newCard, 
      icon: CreditCard, 
      color: "bg-purple-500 hover:bg-purple-600",
      description: language === 'ar' ? 'بطاقة افتراضية' : 'Virtual card'
    },
    { 
      title: t.payBills, 
      icon: Receipt, 
      color: "bg-orange-500 hover:bg-orange-600",
      description: language === 'ar' ? 'فواتير' : 'Utilities'
    },
    { 
      title: t.scanQR, 
      icon: QrCode, 
      color: "bg-indigo-500 hover:bg-indigo-600",
      description: language === 'ar' ? 'دفع سريع' : 'Quick pay'
    },
    { 
      title: t.requestMoney, 
      icon: Repeat, 
      color: "bg-pink-500 hover:bg-pink-600",
      description: language === 'ar' ? 'طلب دفع' : 'Payment request'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.quickActions}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-200 border-2 hover:border-opacity-50`}
                onClick={() => console.log(`${action.title} clicked`)}
              >
                <div className={`p-3 rounded-full ${action.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-xs">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
