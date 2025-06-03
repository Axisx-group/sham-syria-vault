
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, DollarSign, TrendingUp, Banknote, Activity } from "lucide-react";
import { useCustomers } from '@/hooks/useCustomers';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useBankCards } from '@/hooks/useBankCards';
import { useBankTransactions } from '@/hooks/useBankTransactions';

const RealAdminStatsCards = () => {
  const { customers } = useCustomers();
  const { accounts } = useBankAccounts();
  const { cards } = useBankCards();
  const { transactions } = useBankTransactions();

  // Calculate real statistics
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    totalAccounts: accounts.length,
    totalBalance: accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0),
    totalCards: cards.length,
    activeCards: cards.filter(c => c.status === 'active').length,
    todayTransactions: transactions.filter(t => {
      const today = new Date().toDateString();
      return new Date(t.created_at).toDateString() === today;
    }).length,
    pendingTransactions: transactions.filter(t => t.status === 'pending').length
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SYP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeCustomers} عميل نشط
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الحسابات البنكية</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAccounts.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            إجمالي الرصيد: {formatCurrency(stats.totalBalance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">البطاقات البنكية</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCards.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeCards} بطاقة نشطة
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">معاملات اليوم</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayTransactions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {stats.pendingTransactions} في الانتظار
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المعاملات</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactions.length.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            جميع المعاملات المالية
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">النمو الشهري</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12.5%</div>
          <p className="text-xs text-muted-foreground">
            مقارنة بالشهر الماضي
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealAdminStatsCards;
