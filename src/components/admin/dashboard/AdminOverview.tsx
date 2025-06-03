
import React from 'react';
import AdminStatsCards from './AdminStatsCards';
import AdminQuickActions from './AdminQuickActions';
import AdminRecentActivity from './AdminRecentActivity';
import AdminSystemHealth from './AdminSystemHealth';
import NewCustomerApproval from '../notifications/NewCustomerApproval';

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <AdminStatsCards />
      <NewCustomerApproval />
      <AdminQuickActions />
      <AdminRecentActivity />
      <AdminSystemHealth />
    </div>
  );
};

export default AdminOverview;
