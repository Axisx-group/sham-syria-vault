
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Fuel, Coffee, Smartphone } from "lucide-react";

interface TransactionHistoryProps {
  language: 'ar' | 'en';
  detailed?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ language, detailed = false }) => {
  const translations = {
    ar: {
      recentTransactions: "المعاملات الأخيرة",
      allTransactions: "جميع المعاملات",
      sent: "مرسل",
      received: "مستقبل", 
      grocery: "بقالة",
      fuel: "وقود",
      coffee: "مقهى",
      mobile: "رصيد هاتف",
      viewAll: "عرض الكل"
    },
    en: {
      recentTransactions: "Recent Transactions",
      allTransactions: "All Transactions",
      sent: "Sent",
      received: "Received",
      grocery: "Grocery",
      fuel: "Fuel",
      coffee: "Coffee",
      mobile: "Mobile Top-up",
      viewAll: "View All"
    }
  };

  const t = translations[language];

  const transactions = [
    {
      id: 1,
      type: 'received',
      description: language === 'ar' ? 'راتب شهر يناير' : 'January Salary',
      amount: 450000,
      currency: 'SYP',
      date: '2024-01-15',
      icon: ArrowDownLeft,
      category: 'salary'
    },
    {
      id: 2,
      type: 'sent',
      description: language === 'ar' ? 'تسوق من السوبر ماركت' : 'Supermarket Shopping',
      amount: -85000,
      currency: 'SYP',
      date: '2024-01-14',
      icon: ShoppingCart,
      category: 'grocery'
    },
    {
      id: 3,
      type: 'sent',
      description: language === 'ar' ? 'محطة الوقود' : 'Gas Station',
      amount: -120000,
      currency: 'SYP',
      date: '2024-01-13',
      icon: Fuel,
      category: 'fuel'
    },
    {
      id: 4,
      type: 'sent',
      description: language === 'ar' ? 'مقهى الحرية' : 'Freedom Cafe',
      amount: -15000,
      currency: 'SYP',
      date: '2024-01-12',
      icon: Coffee,
      category: 'coffee'
    },
    {
      id: 5,
      type: 'sent',
      description: language === 'ar' ? 'رصيد MTN' : 'MTN Top-up',
      amount: -25000,
      currency: 'SYP',
      date: '2024-01-11',
      icon: Smartphone,
      category: 'mobile'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SY', {
      style: 'currency',
      currency: 'SYP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const displayTransactions = detailed ? transactions : transactions.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{detailed ? t.allTransactions : t.recentTransactions}</CardTitle>
          {!detailed && (
            <Button variant="outline" size="sm">
              {t.viewAll}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'received' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'received' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.type === 'received' ? t.received : t.sent}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
