
import React from 'react';
import SystemStatusChecker from './SystemStatusChecker';

const AdminSystemStatus = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">حالة النظام</h1>
        <p className="text-gray-600">فحص الاتصالات والخدمات</p>
      </div>
      
      <SystemStatusChecker />
    </div>
  );
};

export default AdminSystemStatus;
