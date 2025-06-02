
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, DollarSign, Euro, Banknote } from "lucide-react";

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
      usdAccount: "الحساب بالدولار",
      eurAccount: "الحساب باليورو",
      sypAccount: "الحساب بالليرة السورية",
      monthlyIncome: "الدخل الشهري",
      monthlyExpenses: "المصروفات الشهرية",
      multiCurrency: "محفظة متعددة العملات"
    },
    en: {
      totalBalance: "Total Balance",
      mainAccount: "Main Account",
      savingsAccount: "Savings Account", 
      usdAccount: "USD Account",
      eurAccount: "EUR Account",
      sypAccount: "SYP Account",
      monthlyIncome: "Monthly Income",
      monthlyExpenses: "Monthly Expenses",
      multiCurrency: "Multi-Currency Wallet"
    }
  };

  const t = translations[language];

  const accounts = [
    { 
      name: t.sypAccount, 
      balance: 2450000, 
      currency: "SYP", 
      color: "bg-blue-500",
      icon: Banknote,
      change: "+15.2%"
    },
    { 
      name: t.usdAccount, 
      balance: 3250, 
      currency: "USD", 
      color: "bg-green-500",
      icon: DollarSign,
      change: "+8.5%"
    },
    { 
      name: t.eurAccount, 
      balance: 2750, 
      currency: "EUR", 
      color: "bg-purple-500",
      icon: Euro,
      change: "+12.1%"
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    if (!showBalance) return "••••••";
    
    switch (currency) {
      case "SYP":
        return new Intl.NumberFormat('ar-SY', {
          style: 'currency',
          currency: 'SYP',
          minimumFractionDigits: 0
        }).format(amount);
      case "USD":
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      case "EUR":
        return new Intl.NumberFormat('en-EU', {
          style: 'currency',
          currency: 'EUR'
        }).format(amount);
      default:
        return amount.toString();
    }
  };

  // Calculate total in SYP equivalent (using sample exchange rates)
  const exchangeRates = { USD: 12500, EUR: 13200, SYP: 1 };
  const totalSYP = accounts.reduce((sum, acc) => {
    return sum + (acc.balance * exchangeRates[acc.currency as keyof typeof exchangeRates]);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">{t.totalBalance}</CardTitle>
              <p className="text-blue-100 text-sm">{t.multiCurrency}</p>
            </div>
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

      {/* Currency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account, index) => {
          const Icon = account.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-full ${account.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">{account.change}</span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">{account.name}</p>
                  <p className="font-bold text-xl">
                    {formatCurrency(account.balance, account.currency)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {account.currency} • {language === 'ar' ? 'متاح' : 'Available'}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
                <p className="text-xs text-green-600">+12% من الشهر السابق</p>
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
                <p className="text-xs text-red-600">-5% من الشهر السابق</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;
