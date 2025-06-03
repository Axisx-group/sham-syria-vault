
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CreditCard, DollarSign, AlertTriangle, Bell, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminRecentActivity = () => {
  const activities = [
    { 
      action: 'طلب عميل جديد', 
      user: 'أحمد محمد علي', 
      time: 'منذ 5 دقائق', 
      type: 'new-customer',
      details: 'طلب فتح حساب شخصي',
      status: 'pending'
    },
    { 
      action: 'طلب عميل جديد', 
      user: 'فاطمة حسن محمود', 
      time: 'منذ 10 دقائق', 
      type: 'new-customer',
      details: 'طلب فتح حساب تجاري',
      status: 'pending'
    },
    { 
      action: 'تم إنشاء حساب جديد', 
      user: 'سارة أحمد', 
      time: 'منذ 15 دقيقة', 
      type: 'success',
      details: 'تم الموافقة وإنشاء الحساب'
    },
    { 
      action: 'طلب بطاقة ائتمان', 
      user: 'محمد علي', 
      time: 'منذ 20 دقيقة', 
      type: 'warning',
      details: 'بطاقة ذهبية'
    },
    { 
      action: 'تحويل مصرفي كبير', 
      user: 'نور حسن', 
      time: 'منذ 30 دقيقة', 
      type: 'info',
      details: '₺500,000'
    },
    { 
      action: 'تم رفض طلب قرض', 
      user: 'خالد محمود', 
      time: 'منذ ساعة', 
      type: 'error',
      details: 'عدم استيفاء الشروط'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new-customer':
        return <UserPlus className="h-4 w-4" />;
      case 'success':
        return <CreditCard className="h-4 w-4" />;
      case 'warning':
        return <CreditCard className="h-4 w-4" />;
      case 'info':
        return <DollarSign className="h-4 w-4" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'new-customer':
        return 'bg-purple-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const newCustomerRequests = activities.filter(activity => 
    activity.type === 'new-customer' && activity.status === 'pending'
  );

  return (
    <div className="space-y-6">
      {/* إشعار خاص بالعملاء الجدد */}
      {newCustomerRequests.length > 0 && (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-purple-800 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              طلبات عملاء جدد تحتاج موافقة
              <Badge className="bg-purple-600 text-white">
                {newCustomerRequests.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {newCustomerRequests.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      مراجعة
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                عرض جميع الطلبات ({newCustomerRequests.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* النشاط العام */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${getActivityColor(activity.type)}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    {activity.details && (
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    )}
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  {activity.status === 'pending' && (
                    <Badge className="ml-2 bg-orange-100 text-orange-800 text-xs">
                      في الانتظار
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRecentActivity;
