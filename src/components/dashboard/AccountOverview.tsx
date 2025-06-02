
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface AccountOverviewProps {
  language: 'ar' | 'en';
  showBalance: boolean;
  onToggleBalance: () => void;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ 
  language, 
  showBalance, 
  onToggleBalance 
}) => {
  const translations = {
    ar: {
      totalBalance: "الرصيد الإجمالي",
      mainAccount: "الحساب الرئيسي",
      savingsAccount: "حساب التوفير",
      euroAccount: "الحساب باليورو",
      monthlyIncome: "الدخل الشهري",
      monthlyExpenses: "المصروفات الشهرية"
    },
    en: {
      totalBalance: "Total Balance",
      mainAccount: "Main Account",
      savingsAccount: "Savings Account", 
      euroAccount: "EUR Account",
      monthlyIncome: "Monthly Income",
      monthlyExpenses: "Monthly Expenses"
    }
  };

  const t = translations[language];

  const accounts = [
    { name: t.mainAccount, balance: 2450000, currency: "SYP", color: "bg-blue-500" },
    { name: t.savingsAccount, balance: 850000, currency: "SYP", color: "bg-green-500" },
    { name: t.euroAccount, balance: 1250, currency: "EUR", color: "bg-purple-500" }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    if (!showBalance) return "••••••";
    
    if (currency === "SYP") {
      return new Intl.NumberFormat('ar-SY', {
        style: 'currency',
        currency: 'SYP',
        minimumFractionDigits: 0
      }).format(amount);
    }
    
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const totalSYP = accounts.filter(acc => acc.currency === "SYP")
    .reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-4">
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{t.totalBalance}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleBalance}
              className="text-white hover:bg-white/20"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatCurrency(totalSYP, "SYP")}
          </div>
          <p className="text-blue-100 text-sm mt-1">
            {language === 'ar' ? 'تحديث منذ دقائق' : 'Updated minutes ago'}
          </p>
        </CardContent>
      </Card>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${account.color}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{account.name}</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-green-700">{t.monthlyIncome}</p>
                <p className="font-semibold text-lg text-green-800">
                  {formatCurrency(450000, "SYP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-700">{t.monthlyExpenses}</p>
                <p className="font-semibold text-lg text-red-800">
                  {formatCurrency(320000, "SYP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;
