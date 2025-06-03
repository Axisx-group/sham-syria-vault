
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Monitor, 
  Globe, 
  Bell, 
  BarChart3, 
  MapPin, 
  ServerCrash, 
  Wifi, 
  Users, 
  CheckCircle 
} from "lucide-react";

interface SmartMonitoringTabProps {
  realTimeMetrics: any;
}

const SmartMonitoringTab = ({ realTimeMetrics }: SmartMonitoringTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            مراقبة الأداء المباشر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>استخدام المعالج</span>
                <span>{realTimeMetrics.cpuUsage}%</span>
              </div>
              <Progress value={realTimeMetrics.cpuUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>استخدام الذاكرة</span>
                <span>{realTimeMetrics.memoryUsage}%</span>
              </div>
              <Progress value={realTimeMetrics.memoryUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>زمن الاستجابة</span>
                <span>{realTimeMetrics.networkLatency}ms</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>معدل الإنتاجية</span>
                <span>{realTimeMetrics.throughput} req/sec</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            الاستخدام الجغرافي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">الرياض</p>
                  <p className="text-xs text-gray-600">المملكة العربية السعودية</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">847</p>
                <p className="text-xs text-gray-600">مستخدم نشط</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">دبي</p>
                  <p className="text-xs text-gray-600">الإمارات العربية المتحدة</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">623</p>
                <p className="text-xs text-gray-600">مستخدم نشط</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">القاهرة</p>
                  <p className="text-xs text-gray-600">جمهورية مصر العربية</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">412</p>
                <p className="text-xs text-gray-600">مستخدم نشط</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            التنبيهات الذكية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <ServerCrash className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">خطأ في الخادم الرئيسي</p>
                <p className="text-xs text-gray-600">مستوى عالي - منذ دقيقتين</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Wifi className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">بطء في الشبكة</p>
                <p className="text-xs text-gray-600">مستوى متوسط - منذ 8 دقائق</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">زيادة في عدد المستخدمين</p>
                <p className="text-xs text-gray-600">مستوى منخفض - منذ 15 دقيقة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            إحصائيات مفصلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{realTimeMetrics.activeConnections}</p>
                <p className="text-xs text-gray-600">اتصالات نشطة</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{(realTimeMetrics.errorRate * 100).toFixed(2)}%</p>
                <p className="text-xs text-gray-600">معدل الأخطاء</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>معدل النجاح</span>
                <span className="text-green-600">99.98%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>المعاملات/الثانية</span>
                <span className="text-blue-600">45.2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>البيانات المنقولة</span>
                <span className="text-purple-600">2.4 GB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartMonitoringTab;
