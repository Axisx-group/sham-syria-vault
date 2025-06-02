
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminSystemHealth = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">صحة النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">حالة الخادم</span>
              <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">قاعدة البيانات</span>
              <Badge className="bg-green-100 text-green-800">متصلة</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">سرعة الاستجابة</span>
              <Badge className="bg-yellow-100 text-yellow-800">جيد</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">الأمان والحماية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">محاولات الاختراق</span>
              <Badge className="bg-green-100 text-green-800">0 اليوم</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">التحديثات الأمنية</span>
              <Badge className="bg-green-100 text-green-800">محدث</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">النسخ الاحتياطي</span>
              <Badge className="bg-blue-100 text-blue-800">تم اليوم</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">الإحصائيات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">الرسائل غير المقروءة</span>
              <Badge className="bg-red-100 text-red-800">23</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">القضايا المعلقة</span>
              <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">المراجعات المطلوبة</span>
              <Badge className="bg-orange-100 text-orange-800">8</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemHealth;
