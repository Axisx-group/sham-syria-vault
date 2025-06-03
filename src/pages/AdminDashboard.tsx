
import React, { useState } from 'react';
import AdminHeader from "@/components/admin/dashboard/AdminHeader";
import AdminNavigation from "@/components/admin/dashboard/AdminNavigation";
import AdminOverview from "@/components/admin/dashboard/AdminOverview";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
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
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <AdminHeader />
      <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
