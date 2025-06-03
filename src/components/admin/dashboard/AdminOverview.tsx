
import React, { useEffect } from 'react';
import AdminStatsCards from './AdminStatsCards';
import AdminQuickActions from './AdminQuickActions';
import AdminRecentActivity from './AdminRecentActivity';
import AdminSystemHealth from './AdminSystemHealth';
import NewCustomerApproval from '../notifications/NewCustomerApproval';

const AdminOverview = () => {
  // تحديث البيانات كل 30 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      // يمكن إضافة منطق تحديث إضافي هنا إذا لزم الأمر
      console.log('تحديث بيانات لوحة الإدارة...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
