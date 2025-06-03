
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface SettingsTabProps {
  appSettings: any;
  onSettingChange: (setting: string, value: boolean) => void;
  getSettingLabel: (setting: string) => string;
}

const SettingsTab = ({ appSettings, onSettingChange, getSettingLabel }: SettingsTabProps) => {
  const getSettingDescription = (key: string) => {
    const descriptions = {
      maintenanceMode: 'تفعيل وضع الصيانة يمنع الوصول للتطبيق',
      pushNotifications: 'إرسال الإشعارات الفورية للمستخدمين',
      biometricAuth: 'السماح بالمصادقة البيومترية',
      offlineMode: 'السماح بالاستخدام في الوضع غير المتصل',
      autoUpdate: 'تحديث التطبيق تلقائياً',
      debugMode: 'تفعيل وضع التصحيح للمطورين',
      twoFactorAuth: 'إجبار المصادقة ثنائية العامل',
      sessionTimeout: 'انتهاء الجلسة تلقائياً بعد فترة خمول',
      encryptionEnabled: 'تشفير البيانات الحساسة',
      vpnRequired: 'إجبار استخدام VPN للوصول'
    };
    return descriptions[key] || '';
  };

  return (
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
                {getSettingDescription(key)}
              </p>
            </div>
            <Switch
              checked={value}
              onCheckedChange={(checked) => onSettingChange(key, checked)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
