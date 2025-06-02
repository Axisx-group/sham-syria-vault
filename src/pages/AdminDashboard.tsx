
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Shield,
  Globe,
  BarChart3,
  Settings,
  UserCheck
} from "lucide-react";
import AdminCustomersList from "@/components/admin/AdminCustomersList";
import AdminAccountsManagement from "@/components/admin/AdminAccountsManagement";
import AdminCardsManagement from "@/components/admin/AdminCardsManagement";
import AdminReportsStats from "@/components/admin/AdminReportsStats";
import AdminTransactions from "@/components/admin/AdminTransactions";
import AdminCustomerControl from "@/components/admin/AdminCustomerControl";
import AdminMessaging from "@/components/admin/AdminMessaging";
import AdminModeration from "@/components/admin/AdminModeration";
import AdminPageManagement from "@/components/admin/AdminPageManagement";
import AdminAdvancedAnalytics from "@/components/admin/AdminAdvancedAnalytics";
import AdminRoleManagement from "@/components/admin/AdminRoleManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const statsCards = [
    {
      title: 'إجمالي العملاء',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'الحسابات النشطة',
      value: '3,251',
      change: '+8.2%',
      changeType: 'positive',
      icon: CreditCard,
      color: 'bg-green-500'
    },
    {
      title: 'إجمالي الأرصدة',
      value: '₺84.5M',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'المعاملات اليومية',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const navigationTabs = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'customers', label: 'إدارة العملاء', icon: Users },
    { id: 'customer-control', label: 'التحكم بالعملاء', icon: UserCheck },
    { id: 'accounts', label: 'إدارة الحسابات', icon: CreditCard },
    { id: 'cards', label: 'إدارة البطاقات', icon: CreditCard },
    { id: 'transactions', label: 'المعاملات', icon: DollarSign },
    { id: 'messaging', label: 'نظام المراسلة', icon: MessageSquare },
    { id: 'moderation', label: 'الحظر والإشراف', icon: Shield },
    { id: 'page-management', label: 'إدارة الصفحات', icon: Globe },
    { id: 'analytics', label: 'التحليلات المتقدمة', icon: BarChart3 },
    { id: 'role-management', label: 'إدارة الأدوار', icon: Settings },
    { id: 'reports', label: 'التقارير', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'customers':
        return <AdminCustomersList />;
      case 'customer-control':
        return <AdminCustomerControl />;
      case 'accounts':
        return <AdminAccountsManagement />;
      case 'cards':
        return <AdminCardsManagement />;
      case 'transactions':
        return <AdminTransactions />;
      case 'messaging':
        return <AdminMessaging />;
      case 'moderation':
        return <AdminModeration />;
      case 'page-management':
        return <AdminPageManagement />;
      case 'analytics':
        return <AdminAdvancedAnalytics />;
      case 'role-management':
        return <AdminRoleManagement />;
      case 'reports':
        return <AdminReportsStats />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.changeType === 'positive' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-500 hover:bg-blue-600">
                    <Users className="h-6 w-6" />
                    <span>إضافة عميل جديد</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-500 hover:bg-green-600">
                    <CreditCard className="h-6 w-6" />
                    <span>إنشاء حساب جديد</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-500 hover:bg-purple-600">
                    <MessageSquare className="h-6 w-6" />
                    <span>إرسال رسالة جماعية</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-500 hover:bg-orange-600">
                    <Download className="h-6 w-6" />
                    <span>تصدير التقارير</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'تم إنشاء حساب جديد', user: 'أحمد محمد', time: 'منذ 5 دقائق', type: 'success' },
                    { action: 'طلب بطاقة ائتمان', user: 'فاطمة علي', time: 'منذ 15 دقيقة', type: 'warning' },
                    { action: 'تحويل مصرفي كبير', user: 'محمد سعد', time: 'منذ 30 دقيقة', type: 'info' },
                    { action: 'تم رفض طلب قرض', user: 'نور حسن', time: 'منذ ساعة', type: 'error' },
                    { action: 'تم حظر حساب مشبوه', user: 'سارة أحمد', time: 'منذ ساعتين', type: 'warning' },
                    { action: 'إرسال رسالة جماعية', user: 'إدارة النظام', time: 'منذ 3 ساعات', type: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' :
                          activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">صحة النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">حالة الخادم</span>
                      <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">قاعدة البيانات</span>
                      <Badge className="bg-green-100 text-green-800">متصلة</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">سرعة الاستجابة</span>
                      <Badge className="bg-yellow-100 text-yellow-800">جيد</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الأمان والحماية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">محاولات الاختراق</span>
                      <Badge className="bg-green-100 text-green-800">0 اليوم</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">التحديثات الأمنية</span>
                      <Badge className="bg-green-100 text-green-800">محدث</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">النسخ الاحتياطي</span>
                      <Badge className="bg-blue-100 text-blue-800">تم اليوم</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الإحصائيات السريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">الرسائل غير المقروءة</span>
                      <Badge className="bg-red-100 text-red-800">23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">القضايا المعلقة</span>
                      <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">المراجعات المطلوبة</span>
                      <Badge className="bg-orange-100 text-orange-800">8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة الشاملة</h1>
              <p className="text-sm text-gray-600">إدارة كاملة وشاملة لجميع عمليات البنك</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                اليوم
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير شامل
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-1">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
