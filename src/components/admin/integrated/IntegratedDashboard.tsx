
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntegratedStats } from '@/hooks/useIntegratedStats';
import { useIntegratedNotifications } from '@/hooks/useIntegratedNotifications';
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Globe,
  Smartphone,
  Shield,
  Activity,
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";

interface IntegratedDashboardProps {
  onNavigateToSection: (section: string, subSection?: string) => void;
}

const IntegratedDashboard: React.FC<IntegratedDashboardProps> = ({ onNavigateToSection }) => {
  const { stats, refreshStats } = useIntegratedStats();
  const { getCriticalNotifications, getNotificationsBySection } = useIntegratedNotifications();

  const criticalNotifications = getCriticalNotifications();

  const quickStats = [
    {
      title: 'إجمالي العملاء',
      value: stats.overview.totalCustomers.toLocaleString(),
      growth: `+${stats.growth.customersGrowth}%`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      section: 'customers'
    },
    {
      title: 'المعاملات النشطة',
      value: stats.realTime.activeTransactions.toLocaleString(),
      growth: `+${stats.growth.transactionsGrowth}%`,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      section: 'transactions'
    },
    {
      title: 'أجهزة الصراف النشطة',
      value: `${stats.overview.activeATMs}/50`,
      growth: `${stats.growth.atmUptime}% وقت التشغيل`,
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      section: 'atm'
    },
    {
      title: 'التحويلات المعلقة',
      value: stats.overview.pendingSwifts.toString(),
      growth: 'تحتاج مراجعة',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      section: 'swift'
    }
  ];

  const criticalAreas = [
    {
      title: 'تنبيهات أمنية',
      count: stats.overview.criticalAlerts,
      type: 'error' as const,
      section: 'security',
      description: 'تحتاج تدخل فوري'
    },
    {
      title: 'طلبات KYC',
      count: stats.overview.pendingKYCs,
      type: 'warning' as const,
      section: 'kyc',
      description: 'في انتظار المراجعة'
    },
    {
      title: 'العملاء المتصلين',
      count: stats.realTime.onlineUsers,
      type: 'info' as const,
      section: 'customers',
      description: 'نشطين الآن'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => onNavigateToSection(stat.section)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.growth}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* التنبيهات الحرجة */}
      {criticalNotifications.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              تنبيهات حرجة ({criticalNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex-1">
                    <p className="font-medium text-red-900">{notification.title}</p>
                    <p className="text-sm text-red-700">{notification.message}</p>
                    <p className="text-xs text-red-600 mt-1">
                      {notification.timestamp.toLocaleTimeString('ar-SA')}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (notification.actionUrl) {
                        const url = new URL(notification.actionUrl, window.location.origin);
                        const params = new URLSearchParams(url.search);
                        const tab = params.get('tab');
                        if (tab) onNavigateToSection(tab);
                      }
                    }}
                  >
                    عرض
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* المناطق الحرجة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              المناطق الحرجة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAreas.map((area, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                  onClick={() => onNavigateToSection(area.section)}
                >
                  <div>
                    <p className="font-medium">{area.title}</p>
                    <p className="text-sm text-gray-600">{area.description}</p>
                  </div>
                  <Badge className={getTypeColor(area.type)}>
                    {area.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* التوزيع الجغرافي */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              التوزيع الجغرافي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.geographic.topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-sm text-gray-600">{city.customers.toLocaleString()} عميل</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{city.transactions.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">معاملة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* حالة النظام */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              حالة النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">حالة الشبكة</span>
                <Badge className="bg-green-100 text-green-800">
                  {stats.realTime.networkStatus === 'online' && 'متصل'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">حمولة النظام</span>
                <Badge className={stats.realTime.systemLoad > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                  {stats.realTime.systemLoad}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">المستخدمين المتصلين</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {stats.realTime.onlineUsers.toLocaleString()}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={refreshStats}
              >
                <Activity className="h-4 w-4 mr-2" />
                تحديث البيانات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* روابط سريعة */}
      <Card>
        <CardHeader>
          <CardTitle>روابط سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'موافقات العملاء', section: 'customer-approvals', icon: Users, count: 3 },
              { label: 'تحويلات SWIFT', section: 'swift', icon: Globe, count: stats.overview.pendingSwifts },
              { label: 'أجهزة الصراف', section: 'atm', icon: Smartphone, count: stats.overview.criticalAlerts },
              { label: 'التحقق KYC', section: 'kyc', icon: Shield, count: stats.overview.pendingKYCs }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                  onClick={() => onNavigateToSection(link.section)}
                >
                  <div className="relative">
                    <IconComponent className="h-6 w-6" />
                    {link.count > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                        {link.count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium">{link.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedDashboard;
