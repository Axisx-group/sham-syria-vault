
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, PlusCircle, TrendingUp, Eye, EyeOff, Globe } from "lucide-react";
import AccountOverview from "@/components/dashboard/AccountOverview";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import QuickActions from "@/components/dashboard/QuickActions";
import CardsSection from "@/components/dashboard/CardsSection";

const Dashboard = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [showBalance, setShowBalance] = useState(true);

  const translations = {
    ar: {
      welcome: "مرحباً بك",
      totalBalance: "الرصيد الإجمالي",
      myAccounts: "حساباتي",
      transactions: "المعاملات",
      cards: "البطاقات",
      investments: "الاستثمارات",
      quickActions: "إجراءات سريعة",
      sendMoney: "إرسال أموال",
      addMoney: "إضافة أموال",
      newCard: "بطاقة جديدة",
      viewAll: "عرض الكل"
    },
    en: {
      welcome: "Welcome back",
      totalBalance: "Total Balance",
      myAccounts: "My Accounts",
      transactions: "Transactions",
      cards: "Cards",
      investments: "Investments",
      quickActions: "Quick Actions",
      sendMoney: "Send Money",
      addMoney: "Add Money",
      newCard: "New Card",
      viewAll: "View All"
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.welcome}</h1>
            <p className="text-gray-600">Bank Aljazira</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>

        {/* Account Overview */}
        <AccountOverview 
          language={language} 
          showBalance={showBalance} 
          onToggleBalance={() => setShowBalance(!showBalance)}
        />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.myAccounts}</TabsTrigger>
            <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
            <TabsTrigger value="cards">{t.cards}</TabsTrigger>
            <TabsTrigger value="investments">{t.investments}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TransactionHistory language={language} />
              </div>
              <div>
                <QuickActions language={language} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <TransactionHistory language={language} detailed={true} />
          </TabsContent>

          <TabsContent value="cards" className="mt-6">
            <CardsSection language={language} />
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t.investments}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'قريباً...' : 'Coming soon...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  {language === 'ar' 
                    ? 'ميزة الاستثمار ستكون متاحة قريباً' 
                    : 'Investment features will be available soon'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
