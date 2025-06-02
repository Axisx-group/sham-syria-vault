
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Fuel, Coffee, Smartphone, DollarSign, Euro, Banknote } from "lucide-react";

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
      salary: "راتب",
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
      salary: "Salary",
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
      description: language === 'ar' ? 'تحويل دولي' : 'International Transfer',
      amount: -500,
      currency: 'USD',
      date: '2024-01-14',
      icon: DollarSign,
      category: 'transfer'
    },
    {
      id: 3,
      type: 'received',
      description: language === 'ar' ? 'استلام يورو' : 'EUR Received',
      amount: 250,
      currency: 'EUR',
      date: '2024-01-14',
      icon: Euro,
      category: 'received'
    },
    {
      id: 4,
      type: 'sent',
      description: language === 'ar' ? 'تسوق من السوبر ماركت' : 'Supermarket Shopping',
      amount: -85000,
      currency: 'SYP',
      date: '2024-01-13',
      icon: ShoppingCart,
      category: 'grocery'
    },
    {
      id: 5,
      type: 'sent',
      description: language === 'ar' ? 'محطة الوقود' : 'Gas Station',
      amount: -120000,
      currency: 'SYP',
      date: '2024-01-12',
      icon: Fuel,
      category: 'fuel'
    },
    {
      id: 6,
      type: 'sent',
      description: language === 'ar' ? 'قهوة ستاربكس' : 'Starbucks Coffee',
      amount: -15,
      currency: 'USD',
      date: '2024-01-11',
      icon: Coffee,
      category: 'coffee'
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const absAmount = Math.abs(amount);
    
    switch (currency) {
      case "SYP":
        return new Intl.NumberFormat('ar-SY', {
          style: 'currency',
          currency: 'SYP',
          minimumFractionDigits: 0
        }).format(absAmount);
      case "USD":
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(absAmount);
      case "EUR":
        return new Intl.NumberFormat('en-EU', {
          style: 'currency',
          currency: 'EUR'
        }).format(absAmount);
      default:
        return absAmount.toString();
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD': return DollarSign;
      case 'EUR': return Euro;
      case 'SYP': return Banknote;
      default: return Banknote;
    }
  };

  const displayTransactions = detailed ? transactions : transactions.slice(0, 5);

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
            const CurrencyIcon = getCurrencyIcon(transaction.currency);
            
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
                  <div className="flex items-center gap-1">
                    <p className={`font-semibold ${
                      transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    <CurrencyIcon className="h-3 w-3 text-gray-400" />
                  </div>
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
