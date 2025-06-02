
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  CreditCard,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminAdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const kpiMetrics = [
    {
      title: 'إجمالي العملاء النشطين',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      period: 'مقارنة بالشهر الماضي',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'إجمالي الأرصدة',
      value: '₺84.5M',
      change: '+15.3%',
      changeType: 'positive',
      period: 'مقارنة بالشهر الماضي',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'المعاملات اليومية',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative',
      period: 'مقارنة بالأمس',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'معدل النمو الشهري',
      value: '8.7%',
      change: '+1.2%',
      changeType: 'positive',
      period: 'مقارنة بالشهر الماضي',
      icon: Target,
      color: 'orange'
    }
  ];

  const trafficSources = [
    { source: 'البحث المباشر', visitors: '45%', color: 'bg-blue-500' },
    { source: 'وسائل التواصل', visitors: '28%', color: 'bg-green-500' },
    { source: 'الإحالات', visitors: '15%', color: 'bg-purple-500' },
    { source: 'البريد الإلكتروني', visitors: '12%', color: 'bg-orange-500' }
  ];

  const deviceStats = [
    { device: 'الهاتف المحمول', percentage: 68, icon: Smartphone, color: 'text-blue-600' },
    { device: 'سطح المكتب', percentage: 25, icon: Monitor, color: 'text-green-600' },
    { device: 'الجهاز اللوحي', percentage: 7, icon: Monitor, color: 'text-purple-600' }
  ];

  const topPages = [
    { page: 'الصفحة الرئيسية', views: 12543, bounce: '32%', time: '3:45' },
    { page: 'الخدمات المصرفية', views: 8234, bounce: '28%', time: '4:12' },
    { page: 'فتح حساب جديد', views: 5671, bounce: '45%', time: '2:30' },
    { page: 'تطبيق للحساب التجاري', views: 4289, bounce: '38%', time: '5:15' },
    { page: 'الاتصال بنا', views: 3456, bounce: '52%', time: '1:45' }
  ];

  const customerSegments = [
    { segment: 'العملاء الجدد', count: 234, percentage: 15, growth: '+23%' },
    { segment: 'العملاء النشطين', count: 1456, percentage: 65, growth: '+8%' },
    { segment: 'العملاء VIP', count: 89, percentage: 5, growth: '+15%' },
    { segment: 'العملاء غير النشطين', count: 342, percentage: 15, growth: '-5%' }
  ];

  const revenueByService = [
    { service: 'التحويلات المصرفية', revenue: '₺15.2M', percentage: 35 },
    { service: 'رسوم البطاقات', revenue: '₺8.7M', percentage: 20 },
    { service: 'القروض الشخصية', revenue: '₺12.3M', percentage: 28 },
    { service: 'الاستثمار', revenue: '₺5.1M', percentage: 12 },
    { service: 'خدمات أخرى', revenue: '₺2.2M', percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">التحليلات المتقدمة</h2>
          <p className="text-gray-600">تقارير شاملة وإحصائيات مفصلة عن الأداء</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">آخر أسبوع</SelectItem>
              <SelectItem value="month">آخر شهر</SelectItem>
              <SelectItem value="quarter">آخر ربع</SelectItem>
              <SelectItem value="year">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <div className="flex items-center">
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                </div>
                <div className={`bg-${metric.color}-500 p-3 rounded-full`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="customers">تحليل العملاء</TabsTrigger>
          <TabsTrigger value="revenue">تحليل الإيرادات</TabsTrigger>
          <TabsTrigger value="website">إحصائيات الموقع</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  نمو الإيرادات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط الإيرادات الشهرية</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  نمو قاعدة العملاء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط نمو العملاء</p>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Volume */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  حجم المعاملات اليومية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط المعاملات اليومية</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  توزيع استخدام الخدمات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط دائري للخدمات</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle>تصنيف العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{segment.segment}</span>
                          <span className="text-sm text-green-600 font-medium">{segment.growth}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{segment.count}</span>
                          <span className="text-sm text-gray-600">{segment.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Activity */}
            <Card>
              <CardHeader>
                <CardTitle>نشاط العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط نشاط العملاء</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Acquisition */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>مصادر اكتساب العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 ${source.color} rounded`}></div>
                      <span className="flex-1 font-medium">{source.source}</span>
                      <span className="font-bold">{source.visitors}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Service */}
            <Card>
              <CardHeader>
                <CardTitle>الإيرادات حسب الخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByService.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{service.service}</span>
                        <span className="font-bold">{service.revenue}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${service.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>اتجاه الإيرادات الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط اتجاه الإيرادات</p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Forecast */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>توقعات الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط توقعات الإيرادات</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="website">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>أكثر الصفحات زيارة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{page.page}</h4>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{page.views.toLocaleString()} مشاهدة</span>
                          <span>الارتداد: {page.bounce}</span>
                          <span>الوقت: {page.time}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الأجهزة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStats.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <device.icon className={`h-5 w-5 ${device.color}`} />
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{device.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>مصادر الزيارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">مخطط مصادر الزيارات</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">سرعة الموقع</p>
                    <p className="text-2xl font-bold text-green-600">2.3s</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل الاستجابة</p>
                    <p className="text-2xl font-bold text-blue-600">99.9%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                    <p className="text-2xl font-bold text-purple-600">12.5%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">رضا العملاء</p>
                    <p className="text-2xl font-bold text-orange-600">4.8/5</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAdvancedAnalytics;
