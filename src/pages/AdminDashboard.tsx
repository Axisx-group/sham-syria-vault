
import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ModernSidebar from '@/components/layout/ModernSidebar';
import EnhancedAdminOverview from '@/components/admin/dashboard/EnhancedAdminOverview';
import AdminSystemStatus from "@/components/admin/AdminSystemStatus";
import AdminCustomersList from "@/components/admin/AdminCustomersList";
import AdminAccountsManagement from "@/components/admin/AdminAccountsManagement";
import AdminCardsManagement from "@/components/admin/AdminCardsManagement";
import AdminReportsStats from "@/components/admin/AdminReportsStats";
import AdminTransactions from "@/components/admin/AdminTransactions";
import AdminCustomerControl from "@/components/admin/AdminCustomerControl";
import AdminMessaging from "@/components/admin/AdminMessaging";
import AdminModeration from "@/components/admin/AdminModeration";
import AdminPageManagement from "@/components/admin/AdminPageManagement";
import AdminAdvancedAnalytics from "@/components/admin/AdminAdvancedAnalytics";
import AdminRoleManagement from "@/components/admin/AdminRoleManagement";
import KYCDashboard from "@/components/kyc/KYCDashboard";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'system-status', label: 'حالة النظام', icon: Activity },
    { 
      id: 'customers', 
      label: 'إدارة العملاء', 
      icon: Users,
      children: [
        { id: 'customers', label: 'قائمة العملاء', icon: Users },
        { id: 'customer-control', label: 'التحكم بالعملاء', icon: UserCheck }
      ]
    },
    { 
      id: 'accounts', 
      label: 'الحسابات والبطاقات', 
      icon: CreditCard,
      children: [
        { id: 'accounts', label: 'إدارة الحسابات', icon: CreditCard },
        { id: 'cards', label: 'إدارة البطاقات', icon: CreditCard }
      ]
    },
    { id: 'transactions', label: 'المعاملات', icon: DollarSign },
    { id: 'kyc', label: 'التحقق من الهوية', icon: Shield, badge: 3 },
    { id: 'messaging', label: 'نظام المراسلة', icon: MessageSquare, badge: 5 },
    { id: 'moderation', label: 'الحظر والإشراف', icon: Shield },
    { id: 'page-management', label: 'إدارة الصفحات', icon: Globe },
    { id: 'analytics', label: 'التحليلات المتقدمة', icon: BarChart3 },
    { id: 'role-management', label: 'إدارة الأدوار', icon: Settings },
    { id: 'reports', label: 'التقارير', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system-status':
        return <AdminSystemStatus />;
      case 'customers':
        return <AdminCustomersList />;
      case 'customer-control':
        return <AdminCustomerControl />;
      case 'accounts':
        return <AdminAccountsManagement />;
      case 'cards':
        return <AdminCardsManagement />;
      case 'transactions':
        return <AdminTransactions />;
      case 'kyc':
        return <KYCDashboard />;
      case 'messaging':
        return <AdminMessaging />;
      case 'moderation':
        return <AdminModeration />;
      case 'page-management':
        return <AdminPageManagement />;
      case 'analytics':
        return <AdminAdvancedAnalytics />;
      case 'role-management':
        return <AdminRoleManagement />;
      case 'reports':
        return <AdminReportsStats />;
      default:
        return <EnhancedAdminOverview />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex w-full">
        <ModernSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          items={sidebarItems}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;
