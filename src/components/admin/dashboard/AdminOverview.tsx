
import React from 'react';
import AdminStatsCards from './AdminStatsCards';
import AdminQuickActions from './AdminQuickActions';
import AdminRecentActivity from './AdminRecentActivity';
import AdminSystemHealth from './AdminSystemHealth';

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <AdminStatsCards />
      <AdminQuickActions />
      <AdminRecentActivity />
      <AdminSystemHealth />
    </div>
  );
};

export default AdminOverview;
