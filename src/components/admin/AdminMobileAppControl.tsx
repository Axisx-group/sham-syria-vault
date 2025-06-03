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
  XCircle,
  Globe,
  MapPin,
  Clock,
  Database,
  Lock,
  Key,
  UserX,
  Search,
  BarChart3,
  Monitor,
  Wifi,
  ServerCrash,
  Eye,
  FileX,
  Camera
} from "lucide-react";

const AdminMobileAppControl = () => {
  const { toast } = useToast();
  const [appSettings, setAppSettings] = useState({
    maintenanceMode: false,
    pushNotifications: true,
    biometricAuth: true,
    offlineMode: true,
    autoUpdate: true,
    debugMode: false,
    twoFactorAuth: true,
    sessionTimeout: true,
    encryptionEnabled: true,
    vpnRequired: false
  });

  const [securityStatus] = useState({
    vulnerabilityScans: 'active',
    sslCertificate: 'valid',
    dataEncryption: 'enabled',
    accessLogs: 'monitored',
    suspiciousActivity: 2,
    activeSessions: 1847,
    failedLogins: 15,
    securityScore: 94
  });

  const [realTimeMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    networkLatency: 280,
    activeConnections: 2341,
    errorRate: 0.02,
    throughput: 1250
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
      debugMode: 'وضع التصحيح',
      twoFactorAuth: 'المصادقة ثنائية العامل',
      sessionTimeout: 'انتهاء الجلسة التلقائي',
      encryptionEnabled: 'التشفير المتقدم',
      vpnRequired: 'إجبار استخدام VPN'
    };
    return labels[setting] || setting;
  };

  const handleEmergencyLockdown = () => {
    toast({
      title: "تم تفعيل وضع الطوارئ",
      description: "تم إغلاق جميع الجلسات وإيقاف العمليات غير الضرورية",
      variant: "destructive"
    });
  };

  const handleVulnerabilityScan = () => {
    toast({
      title: "بدء فحص الثغرات",
      description: "جاري فحص النظام للثغرات الأمنية...",
    });
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
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التحكم المتقدم بتطبيق البنك</h1>
          <p className="text-gray-600">إدارة شاملة مع التركيز على الأمان والمراقبة</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleEmergencyLockdown} variant="destructive">
            <Lock className="h-4 w-4 mr-2" />
            إغلاق طوارئ
          </Button>
          <Button onClick={handleVulnerabilityScan} className="bg-orange-600 hover:bg-orange-700">
            <Shield className="h-4 w-4 mr-2" />
            فحص الثغرات
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الجلسات النشطة</p>
                <p className="text-2xl font-bold text-green-600">{securityStatus.activeSessions.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">نقاط الأمان</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-blue-600">{securityStatus.securityScore}/100</p>
                  <Badge className="bg-blue-100 text-blue-800">ممتاز</Badge>
                </div>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">محاولات دخول فاشلة</p>
                <p className="text-2xl font-bold text-red-600">{securityStatus.failedLogins}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <UserX className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أنشطة مشبوهة</p>
                <p className="text-2xl font-bold text-orange-600">{securityStatus.suspiciousActivity}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="security-advanced" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="security-advanced">الأمان المتقدم</TabsTrigger>
          <TabsTrigger value="smart-monitoring">المراقبة الذكية</TabsTrigger>
          <TabsTrigger value="user-management">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          <TabsTrigger value="updates">التحديثات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="security-advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  فحص الثغرات الأمنية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">آخر فحص</span>
                  <Badge className="bg-green-100 text-green-800">منذ ساعتين</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ثغرات عالية الخطورة</span>
                    <span className="text-sm font-bold text-green-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ثغرات متوسطة</span>
                    <span className="text-sm font-bold text-yellow-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ثغرات منخفضة</span>
                    <span className="text-sm font-bold text-gray-600">5</span>
                  </div>
                </div>
                <Button className="w-full" onClick={handleVulnerabilityScan}>
                  <Search className="h-4 w-4 mr-2" />
                  بدء فحص جديد
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  إدارة الشهادات والمفاتيح
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">شهادة SSL الرئيسية</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">صالحة حتى 2025-12-31</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">مفاتيح التشفير</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">محدثة</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">مفاتيح API</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs">تحتاج تجديد</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  تجديد الشهادات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  إعدادات الأمان المتقدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(appSettings).filter(([key]) => 
                  ['twoFactorAuth', 'sessionTimeout', 'encryptionEnabled', 'vpnRequired'].includes(key)
                ).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{getSettingLabel(key)}</span>
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
                  <Activity className="h-5 w-5" />
                  سجلات الأمان المباشرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">محاولة دخول مشبوهة</p>
                      <p className="text-xs text-gray-600">IP: 192.168.1.100 - منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">تسجيل دخول من موقع جديد</p>
                      <p className="text-xs text-gray-600">المستخدم: user@example.com - منذ 15 دقيقة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">تم تحديث كلمة المرور</p>
                      <p className="text-xs text-gray-600">المستخدم: admin@bank.com - منذ 30 دقيقة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="smart-monitoring" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="user-management" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
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
                      {key === 'twoFactorAuth' && 'إجبار المصادقة ثنائية العامل'}
                      {key === 'sessionTimeout' && 'انتهاء الجلسة تلقائياً بعد فترة خمول'}
                      {key === 'encryptionEnabled' && 'تشفير البيانات الحساسة'}
                      {key === 'vpnRequired' && 'إجبار استخدام VPN للوصول'}
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

        <TabsContent value="reports" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMobileAppControl;
