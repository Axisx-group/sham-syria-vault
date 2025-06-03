
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Activity } from "lucide-react";

const ReportsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            تقارير الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              تقرير الأداء اليومي
            </Button>
            <Button className="w-full" variant="outline">
              تقرير الأمان الأسبوعي
            </Button>
            <Button className="w-full" variant="outline">
              تقرير المستخدمين الشهري
            </Button>
            <Button className="w-full" variant="outline">
              تقرير مخصص
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            التحليلات التنبؤية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm">توقع الأحمال</h4>
              <p className="text-xs text-gray-600">زيادة متوقعة 15% في الأسبوع القادم</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-sm">كفاءة النظام</h4>
              <p className="text-xs text-gray-600">أداء مستقر مع توفير 8% في الموارد</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-sm">صيانة مقترحة</h4>
              <p className="text-xs text-gray-600">تحديث الخوادم مقترح خلال 3 أسابيع</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
