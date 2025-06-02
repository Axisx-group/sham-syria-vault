import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, PlusCircle, CreditCard, ArrowUpDown, Smartphone, Fuel } from "lucide-react";
import NewAccountDialog from "./NewAccountDialog";

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
      exchange: "صرف العملات",
      mobileTopup: "رصيد هاتف",
      billPayment: "دفع الفواتير"
    },
    en: {
      quickActions: "Quick Actions",
      sendMoney: "Send Money",
      addMoney: "Add Money", 
      newCard: "New Card",
      exchange: "Currency Exchange",
      mobileTopup: "Mobile Top-up",
      billPayment: "Bill Payment"
    }
  };

  const t = translations[language];

  const actions = [
    { icon: Send, label: t.sendMoney, color: "bg-blue-500" },
    { icon: PlusCircle, label: t.addMoney, color: "bg-green-500" },
    { icon: CreditCard, label: t.newCard, color: "bg-purple-500" },
    { icon: ArrowUpDown, label: t.exchange, color: "bg-orange-500" },
    { icon: Smartphone, label: t.mobileTopup, color: "bg-pink-500" },
    { icon: Fuel, label: t.billPayment, color: "bg-gray-500" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.quickActions}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Account Button */}
        <NewAccountDialog language={language} />
        
        {/* Other Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2 hover:shadow-md transition-all"
              >
                <div className={`p-2 rounded-full ${action.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
