
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  UserX, 
  Database, 
  Clock, 
  Lock, 
  Eye, 
  Bell, 
  RefreshCw, 
  CheckCircle, 
  FileX, 
  Camera 
} from "lucide-react";

const UserManagementTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            الجلسات النشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">أ</span>
                </div>
                <div>
                  <p className="text-sm font-medium">أحمد محمد</p>
                  <p className="text-xs text-gray-600">admin@bank.com</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">نشط</Badge>
                <p className="text-xs text-gray-600 mt-1">منذ 25 دقيقة</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">س</span>
                </div>
                <div>
                  <p className="text-sm font-medium">سارة علي</p>
                  <p className="text-xs text-gray-600">sara@bank.com</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-yellow-100 text-yellow-800">خامل</Badge>
                <p className="text-xs text-gray-600 mt-1">منذ 2 ساعة</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">م</span>
                </div>
                <div>
                  <p className="text-sm font-medium">محمد خالد</p>
                  <p className="text-xs text-gray-600">mohammad@bank.com</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-red-100 text-red-800">مشبوه</Badge>
                <p className="text-xs text-gray-600 mt-1">تحت المراجعة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserX className="h-5 w-5" />
            الحسابات المشبوهة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">عدة محاولات دخول فاشلة</p>
                <p className="text-xs text-gray-600">IP: 192.168.1.100</p>
              </div>
              <Button size="sm" variant="destructive">
                <Lock className="h-4 w-4 mr-1" />
                حظر
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">نشاط غير عادي</p>
                <p className="text-xs text-gray-600">user123@example.com</p>
              </div>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                مراجعة
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <p className="text-sm font-medium">دخول من موقع جديد</p>
                <p className="text-xs text-gray-600">newuser@example.com</p>
              </div>
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-1" />
                تنبيه
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            النسخ الاحتياطية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">آخر نسخة احتياطية</span>
              <Badge className="bg-green-100 text-green-800">مكتملة</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">حجم البيانات</span>
              <span className="text-sm font-medium">2.4 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">التاريخ</span>
              <span className="text-sm">2024-01-15 03:00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">النسخ الاحتياطية التلقائية</span>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Database className="h-4 w-4 mr-1" />
              إنشاء نسخة
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-1" />
              استعادة
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            سجل العمليات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center gap-3 p-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>تسجيل دخول ناجح - admin@bank.com</span>
              <span className="text-xs text-gray-500 mr-auto">14:25</span>
            </div>
            <div className="flex items-center gap-3 p-2 text-sm">
              <FileX className="h-4 w-4 text-red-500" />
              <span>محاولة وصول مرفوضة - unknown@domain.com</span>
              <span className="text-xs text-gray-500 mr-auto">14:20</span>
            </div>
            <div className="flex items-center gap-3 p-2 text-sm">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span>تحديث إعدادات النظام</span>
              <span className="text-xs text-gray-500 mr-auto">14:15</span>
            </div>
            <div className="flex items-center gap-3 p-2 text-sm">
              <Camera className="h-4 w-4 text-purple-500" />
              <span>التقاط لقطة للنظام</span>
              <span className="text-xs text-gray-500 mr-auto">14:00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementTab;
