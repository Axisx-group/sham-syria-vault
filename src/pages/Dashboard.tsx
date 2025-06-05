
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountOverview from '@/components/dashboard/AccountOverview';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CardsSection from '@/components/dashboard/CardsSection';
import EmailCounter from '@/components/dashboard/EmailCounter';
import ModernSidebar from '@/components/layout/ModernSidebar';
import { Home, CreditCard, TrendingUp, Users, Settings, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'accounts', label: 'الحسابات', icon: CreditCard },
    { id: 'transactions', label: 'المعاملات', icon: TrendingUp },
    { id: 'customers', label: 'العملاء', icon: Users },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare, badge: 5 },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <ModernSidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 lg:mr-64">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-2">مرحباً بك في نظام إدارة الحسابات المصرفية</p>
          </div>

          <div className="space-y-8">
            {/* عداد الإيميلات */}
            <EmailCounter />
            
            {/* نظرة عامة على الحساب */}
            <AccountOverview 
              language="ar"
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
            
            {/* الإجراءات السريعة */}
            <QuickActions language="ar" />
            
            {/* قسم البطاقات */}
            <CardsSection language="ar" />
            
            {/* سجل المعاملات */}
            <TransactionHistory language="ar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
