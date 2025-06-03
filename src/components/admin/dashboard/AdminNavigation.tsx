
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  DollarSign, 
  MessageSquare,
  Shield,
  Globe,
  BarChart3,
  Settings,
  UserCheck,
  Activity
} from "lucide-react";

interface NavigationTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface AdminNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNavigation = ({ activeTab, setActiveTab }: AdminNavigationProps) => {
  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'system-status', label: 'حالة النظام', icon: Activity },
    { id: 'customers', label: 'إدارة العملاء', icon: Users },
    { id: 'customer-control', label: 'التحكم بالعملاء', icon: UserCheck },
    { id: 'accounts', label: 'إدارة الحسابات', icon: CreditCard },
    { id: 'cards', label: 'إدارة البطاقات', icon: CreditCard },
    { id: 'transactions', label: 'المعاملات', icon: DollarSign },
    { id: 'messaging', label: 'نظام المراسلة', icon: MessageSquare },
    { id: 'moderation', label: 'الحظر والإشراف', icon: Shield },
    { id: 'page-management', label: 'إدارة الصفحات', icon: Globe },
    { id: 'analytics', label: 'التحليلات المتقدمة', icon: BarChart3 },
    { id: 'role-management', label: 'إدارة الأدوار', icon: Settings },
    { id: 'reports', label: 'التقارير', icon: TrendingUp }
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-1">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 space-x-reverse py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
