
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountOverview from '@/components/dashboard/AccountOverview';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CardsSection from '@/components/dashboard/CardsSection';
import EmailCounter from '@/components/dashboard/EmailCounter';
import ModernSidebar from '@/components/layout/ModernSidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <ModernSidebar />
      
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
            <AccountOverview />
            
            {/* الإجراءات السريعة */}
            <QuickActions />
            
            {/* قسم البطاقات */}
            <CardsSection />
            
            {/* سجل المعاملات */}
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
