
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Shield } from "lucide-react";
import SecurityAdvancedTab from "./mobile-app/SecurityAdvancedTab";
import SmartMonitoringTab from "./mobile-app/SmartMonitoringTab";
import UserManagementTab from "./mobile-app/UserManagementTab";
import SettingsTab from "./mobile-app/SettingsTab";
import UpdatesTab from "./mobile-app/UpdatesTab";
import ReportsTab from "./mobile-app/ReportsTab";
import StatsCards from "./mobile-app/StatsCards";

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

      {/* Stats Cards */}
      <StatsCards securityStatus={securityStatus} />

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
          <SecurityAdvancedTab
            appSettings={appSettings}
            securityStatus={securityStatus}
            onSettingChange={handleSettingChange}
            onVulnerabilityScan={handleVulnerabilityScan}
            getSettingLabel={getSettingLabel}
          />
        </TabsContent>

        <TabsContent value="smart-monitoring" className="space-y-6">
          <SmartMonitoringTab realTimeMetrics={realTimeMetrics} />
        </TabsContent>

        <TabsContent value="user-management" className="space-y-6">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsTab
            appSettings={appSettings}
            onSettingChange={handleSettingChange}
            getSettingLabel={getSettingLabel}
          />
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <UpdatesTab
            updateStatus={updateStatus}
            onPushUpdate={handlePushUpdate}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMobileAppControl;
