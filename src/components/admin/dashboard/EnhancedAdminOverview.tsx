
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  UserPlus
} from 'lucide-react';
import InteractiveChart from '@/components/charts/InteractiveChart';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import NewCustomerApproval from '@/components/admin/notifications/NewCustomerApproval';
import { supabase } from "@/integrations/supabase/client";

interface StatCard {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  color: string;
}

const EnhancedAdminOverview = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'معاملة جديدة',
      message: 'تم إجراء تحويل بقيمة 50,000 ريال',
      type: 'info' as const,
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false
    },
    {
      id: '2',
      title: 'تحذير أمني',
      message: 'محاولة دخول مشبوهة من IP غير معروف',
      type: 'warning' as const,
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false
    },
    {
      id: '3',
      title: 'نجح التحديث',
      message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0',
      type: 'success' as const,
      timestamp: new Date(Date.now() - 60 * 60000),
      read: true
    }
  ]);

  const [realStats, setRealStats] = useState({
    totalCustomers: 0,
    pendingApplications: 0,
    totalApplications: 0,
    approvedApplications: 0
  });

  // جلب الإحصائيات الحقيقية من قاعدة البيانات
  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        // جلب عدد الطلبات المعلقة
        const { count: pendingCount } = await supabase
          .from('account_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // جلب العدد الإجمالي للطلبات
        const { count: totalCount } = await supabase
          .from('account_applications')
          .select('*', { count: 'exact', head: true });

        // جلب عدد الطلبات المعتمدة
        const { count: approvedCount } = await supabase
          .from('account_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        setRealStats({
          totalCustomers: totalCount || 0,
          pendingApplications: pendingCount || 0,
          totalApplications: totalCount || 0,
          approvedApplications: approvedCount || 0
        });

      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
      }
    };

    fetchRealStats();

    // تحديث الإحصائيات كل 30 ثانية
    const interval = setInterval(fetchRealStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards: StatCard[] = [
    {
      title: 'إجمالي طلبات العملاء',
      value: realStats.totalApplications.toString(),
      change: 12.5,
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'طلبات في الانتظار',
      value: realStats.pendingApplications.toString(),
      change: realStats.pendingApplications > 0 ? 100 : 0,
      changeType: realStats.pendingApplications > 0 ? 'increase' : 'decrease',
      icon: UserPlus,
      color: 'bg-orange-500'
    },
    {
      title: 'طلبات معتمدة',
      value: realStats.approvedApplications.toString(),
      change: 8.2,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'إجمالي الإيرادات',
      value: '1.2M ريال',
      change: 15.8,
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const chartData = [
    { name: 'يناير', value: 4000, transactions: 2400 },
    { name: 'فبراير', value: 3000, transactions: 1398 },
    { name: 'مارس', value: 2000, transactions: 9800 },
    { name: 'أبريل', value: 2780, transactions: 3908 },
    { name: 'مايو', value: 1890, transactions: 4800 },
    { name: 'يونيو', value: 2390, transactions: 3800 }
  ];

  const pieData = [
    { name: 'الحسابات الجارية', value: 35 },
    { name: 'حسابات التوفير', value: 45 },
    { name: 'الحسابات الاستثمارية', value: 20 }
  ];

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">لوحة تحكم المدير</h1>
          <p className="text-muted-foreground mt-1">مرحباً بك في نظام إدارة البنك الرقمي</p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onRemove={handleRemoveNotification}
          />
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover-lift card-3d-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.changeType === 'increase' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      مقارنة بالشهر الماضي
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* طلبات العملاء الجدد - في المقدمة */}
      <NewCustomerApproval />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          type="area"
          data={chartData}
          title="إيرادات الشهور السابقة"
          dataKey="value"
          height={350}
        />
        <InteractiveChart
          type="pie"
          data={pieData}
          title="توزيع أنواع الحسابات"
          dataKey="value"
          height={350}
        />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              النشاطات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                action: 'تسجيل عميل جديد', 
                user: 'أحمد محمد', 
                time: 'منذ 5 دقائق',
                status: 'success'
              },
              { 
                action: 'إنشاء بطاقة ائتمان', 
                user: 'فاطمة أحمد', 
                time: 'منذ 15 دقيقة',
                status: 'pending'
              },
              { 
                action: 'تحويل مالي', 
                user: 'محمد علي', 
                time: 'منذ 30 دقيقة',
                status: 'success'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3">
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                  <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                    {activity.status === 'success' ? 'مكتمل' : 'قيد المعالجة'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              تنبيهات النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                title: 'حالة الخادم', 
                status: 'صحي', 
                type: 'success',
                description: 'جميع الخوادم تعمل بكفاءة'
              },
              { 
                title: 'استخدام قاعدة البيانات', 
                status: '78%', 
                type: 'warning',
                description: 'اقتراب من الحد الأقصى'
              },
              { 
                title: 'أمان النظام', 
                status: 'آمن', 
                type: 'success',
                description: 'لا توجد تهديدات مكتشفة'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
                <Badge variant={alert.type === 'success' ? 'default' : 'destructive'}>
                  {alert.status}
                </Badge>
              </div>
            ))}
          </Content>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAdminOverview;
