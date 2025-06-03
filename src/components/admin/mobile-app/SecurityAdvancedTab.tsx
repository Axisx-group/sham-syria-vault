
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Key, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Activity, 
  UserX, 
  Eye, 
  Bell 
} from "lucide-react";

interface SecurityAdvancedTabProps {
  appSettings: any;
  securityStatus: any;
  onSettingChange: (setting: string, value: boolean) => void;
  onVulnerabilityScan: () => void;
  getSettingLabel: (setting: string) => string;
}

const SecurityAdvancedTab = ({ 
  appSettings, 
  securityStatus, 
  onSettingChange, 
  onVulnerabilityScan, 
  getSettingLabel 
}: SecurityAdvancedTabProps) => {
  return (
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
          <Button className="w-full" onClick={onVulnerabilityScan}>
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
                onCheckedChange={(checked) => onSettingChange(key, checked)}
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
  );
};

export default SecurityAdvancedTab;
