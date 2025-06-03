
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIntegratedNotifications } from '@/hooks/useIntegratedNotifications';
import { useIntegratedStats } from '@/hooks/useIntegratedStats';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Calendar, Download, CreditCard, Shield, RefreshCw, Activity } from "lucide-react";

interface IntegratedHeaderProps {
  currentSection: string;
  onExportData: () => void;
  onRefreshData: () => void;
}

const IntegratedHeader: React.FC<IntegratedHeaderProps> = ({ 
  currentSection, 
  onExportData, 
  onRefreshData 
}) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    getUnreadCount,
    getCriticalNotifications 
  } = useIntegratedNotifications();
  
  const { stats } = useIntegratedStats();

  const handleNetBankLogin = () => {
    console.log('تسجيل الدخول عبر نت بنك');
  };

  const handleSecurePortalAccess = () => {
    window.location.href = '/secure-admin-portal-nubarium-2024';
  };

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      overview: 'نظرة عامة شاملة',
      'system-status': 'حالة النظام',
      customers: 'إدارة العملاء',
      'customer-control': 'التحكم بالعملاء',
      'customer-approvals': 'موافقات العملاء الجدد',
      accounts: 'إدارة الحسابات',
      cards: 'إدارة البطاقات',
      transactions: 'المعاملات',
      swift: 'تحويلات SWIFT',
      atm: 'أجهزة الصراف الآلي',
      kyc: 'التحقق من الهوية',
      geography: 'الإدارة الجغرافية',
      'app-control': 'التحكم بالتطبيق',
      messaging: 'نظام المراسلة',
      moderation: 'الحظر والإشراف',
      'page-management': 'إدارة الصفحات',
      analytics: 'التحليلات المتقدمة',
      'role-management': 'إدارة الأدوار',
      reports: 'التقارير'
    };
    return titles[section] || 'لوحة التحكم الإدارية';
  };

  const criticalNotifications = getCriticalNotifications();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle(currentSection)}</h1>
                <p className="text-sm text-gray-600">إدارة كاملة وشاملة لجميع عمليات البنك</p>
              </div>
              
              {/* مؤشرات سريعة */}
              <div className="hidden lg:flex items-center gap-4 ml-8">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {stats.realTime.onlineUsers.toLocaleString()} متصل
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {stats.realTime.activeTransactions} معاملة نشطة
                  </span>
                </div>
                {criticalNotifications.length > 0 && (
                  <Badge variant="destructive" className="animate-pulse">
                    {criticalNotifications.length} تنبيه حرج
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* مركز الإشعارات */}
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onRemove={removeNotification}
            />
            
            <Button 
              onClick={handleSecurePortalAccess}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              البوابة الآمنة
            </Button>
            
            <Button 
              onClick={handleNetBankLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              نت بنك
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRefreshData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              تحديث
            </Button>
            
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              اليوم
            </Button>
            
            <Button 
              size="sm"
              onClick={onExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              تصدير شامل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedHeader;
