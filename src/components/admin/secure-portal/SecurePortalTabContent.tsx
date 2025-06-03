
import React from 'react';
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
import AdminMobileAppControl from "@/components/admin/AdminMobileAppControl";
import AdminATMManagement from "@/components/admin/AdminATMManagement";
import AdminSwiftManagement from "@/components/admin/AdminSwiftManagement";
import KYCDashboard from "@/components/kyc/KYCDashboard";

interface SecurePortalTabContentProps {
  activeTab: string;
}

const SecurePortalTabContent: React.FC<SecurePortalTabContentProps> = ({ activeTab }) => {
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
      case 'swift':
        return <AdminSwiftManagement />;
      case 'atm':
        return <AdminATMManagement />;
      case 'kyc':
        return <KYCDashboard />;
      case 'app-control':
        return <AdminMobileAppControl />;
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
    <div className="flex-1 overflow-y-auto p-8">
      {renderTabContent()}
    </div>
  );
};

export default SecurePortalTabContent;
