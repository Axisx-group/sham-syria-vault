
import React from 'react';
import AdminQuickActions from './AdminQuickActions';
import AdminRecentActivity from './AdminRecentActivity';
import AdminSystemHealth from './AdminSystemHealth';
import RealAdminStatsCards from './RealAdminStatsCards';

const EnhancedAdminOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
          <p className="text-gray-600 mt-1">نظرة شاملة على حالة النظام والعمليات</p>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <RealAdminStatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="xl:col-span-1">
          <AdminQuickActions />
        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-1">
          <AdminRecentActivity />
        </div>

        {/* System Health */}
        <div className="xl:col-span-1">
          <AdminSystemHealth />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminOverview;
