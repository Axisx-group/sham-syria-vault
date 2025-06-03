
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Smartphone, 
  Download, 
  Users, 
  Star, 
  AlertTriangle,
  Settings,
  Bell,
  Shield,
  Activity,
  Zap,
  RefreshCw,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminMobileAppControl = () => {
  const { toast } = useToast();
  const [appSettings, setAppSettings] = useState({
    maintenanceMode: false,
    pushNotifications: true,
    biometricAuth: true,
    offlineMode: true,
    autoUpdate: true,
    debugMode: false
  });

  const [appStats] = useState({
    totalDownloads: 125847,
    activeUsers: 89234,
    rating: 4.7,
    lastUpdate: '2024-01-15',
    version: '2.1.0',
    crashRate: 0.02
  });

  const [updateStatus, setUpdateStatus] = useState({
    available: true,
    version: '2.2.0',
    size: '45 MB',
    features: [
      'تحسينات الأمان',
      'واجهة مستخدم محدثة',
      'إصلاح الأخطاء',
      'ميزات جديدة للدفع'
    ]
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    toast({
      title: "تم تحديث الإعداد",
      description: `تم ${value ? 'تفعيل' : 'إلغاء'} ${getSettingLabel(setting)}`,
    });
  };

  const getSettingLabel = (setting: string) => {
    const labels = {
      maintenanceMode: 'وضع الصيانة',
      pushNotifications: 'الإشعارات الفورية',
      biometricAuth: 'المصادقة البيومترية',
      offlineMode: 'الوضع غير المتصل',
      autoUpdate: 'التحديث التلقائي',
      debugMode: 'وضع التصحيح'
    };
    return labels[setting] || setting;
  };

  const handlePushUpdate = () => {
    toast({
      title: "تم إرسال التحديث",
      description: "تم إرسال التحديث الجديد إلى جميع المستخدمين",
    });
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "تم إرسال تنبيه طوارئ",
      description: "تم إرسال تنبيه طوارئ إلى جميع المستخدمين",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التحكم بتطبيق البنك</h1>
          <p className="text-gray-600">إدارة ومراقبة تطبيق البنك المحمول</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleEmergencyAlert} variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-2" />
            تنبيه طوارئ
          </Button>
          <Button onClick={handlePushUpdate} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            دفع التحديث
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التحميلات</p>
                <p className="text-2xl font-bold text-gray-900">{appStats.totalDownloads.toLocaleString()}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
                <p className="text-2xl font-bold text-green-600">{appStats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تقييم التطبيق</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-yellow-600">{appStats.rating}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الأخطاء</p>
                <p className="text-2xl font-bold text-red-600">{(appStats.crashRate * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          <TabsTrigger value="updates">التحديثات</TabsTrigger>
          <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  الإعدادات العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(appSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{getSettingLabel(key)}</p>
                      <p className="text-xs text-gray-500">
                        {key === 'maintenanceMode' && 'تفعيل وضع الصيانة يمنع الوصول للتطبيق'}
                        {key === 'pushNotifications' && 'إرسال الإشعارات الفورية للمستخدمين'}
                        {key === 'biometricAuth' && 'السماح بالمصادقة البيومترية'}
                        {key === 'offlineMode' && 'السماح بالاستخدام في الوضع غير المتصل'}
                        {key === 'autoUpdate' && 'تحديث التطبيق تلقائياً'}
                        {key === 'debugMode' && 'تفعيل وضع التصحيح للمطورين'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => handleSettingChange(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  معلومات التطبيق
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">النسخة الحالية:</span>
                  <Badge variant="outline">{appStats.version}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">آخر تحديث:</span>
                  <span className="text-sm">{appStats.lastUpdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الحالة:</span>
                  <Badge className={appSettings.maintenanceMode ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                    {appSettings.maintenanceMode ? 'صيانة' : 'نشط'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                التحديثات المتاحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {updateStatus.available ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">النسخة {updateStatus.version}</h3>
                      <p className="text-sm text-gray-600">حجم التحديث: {updateStatus.size}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">متاح</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">الميزات الجديدة:</h4>
                    <ul className="space-y-1">
                      {updateStatus.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handlePushUpdate} className="bg-blue-600 hover:bg-blue-700">
                      دفع التحديث للجميع
                    </Button>
                    <Button variant="outline">
                      دفع للمجموعة التجريبية
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">التطبيق محدث</h3>
                  <p className="text-gray-600">لا توجد تحديثات متاحة حالياً</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  الأداء المباشر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>استخدام المعالج</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>استخدام الذاكرة</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>سرعة الاستجابة</span>
                    <span>280ms</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  التنبيهات النشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">استخدام عالي للذاكرة</p>
                      <p className="text-xs text-gray-600">منذ 5 دقائق</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">زيادة في عدد المستخدمين</p>
                      <p className="text-xs text-gray-600">منذ 15 دقيقة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                حالة الأمان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">فحوصات الأمان</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تشفير البيانات</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">شهادة SSL</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">المصادقة ثنائية العامل</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">مراقبة الثغرات</span>
                      <XCircle className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">التهديدات المكتشفة</h4>
                  <div className="text-center py-4">
                    <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">لا توجد تهديدات مكتشفة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMobileAppControl;
