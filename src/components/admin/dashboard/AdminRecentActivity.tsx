
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminRecentActivity = () => {
  const activities = [
    { action: 'تم إنشاء حساب جديد', user: 'أحمد محمد', time: 'منذ 5 دقائق', type: 'success' },
    { action: 'طلب بطاقة ائتمان', user: 'فاطمة علي', time: 'منذ 15 دقيقة', type: 'warning' },
    { action: 'تحويل مصرفي كبير', user: 'محمد سعد', time: 'منذ 30 دقيقة', type: 'info' },
    { action: 'تم رفض طلب قرض', user: 'نور حسن', time: 'منذ ساعة', type: 'error' },
    { action: 'تم حظر حساب مشبوه', user: 'سارة أحمد', time: 'منذ ساعتين', type: 'warning' },
    { action: 'إرسال رسالة جماعية', user: 'إدارة النظام', time: 'منذ 3 ساعات', type: 'info' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">النشاط الأخير</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
