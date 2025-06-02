
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const AdminReportsStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const kpiCards = [
    {
      title: 'إجمالي الإيرادات',
      value: '₺12.5M',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'هذا الشهر'
    },
    {
      title: 'العملاء الجدد',
      value: '2,847',
      change: '+22.1%',
      changeType: 'positive',
      icon: Users,
      description: 'هذا الشهر'
    },
    {
      title: 'البطاقات المصدرة',
      value: '1,456',
      change: '+8.7%',
      changeType: 'positive',
      icon: CreditCard,
      description: 'هذا الشهر'
    },
    {
      title: 'معدل الاحتفاظ',
      value: '94.2%',
      change: '-1.2%',
      changeType: 'negative',
      icon: TrendingUp,
      description: 'آخر 6 أشهر'
    }
  ];

  const reportCategories = [
    {
      title: 'تقارير العملاء',
      description: 'إحصائيات شاملة عن العملاء والحسابات',
      icon: Users,
      reports: [
        'تقرير العملاء الجدد',
        'تحليل ديموغرافي للعملاء',
        'تقرير نشاط الحسابات',
        'تحليل رضا العملاء'
      ]
    },
    {
      title: 'التقارير المالية',
      description: 'تحليل الأداء المالي والإيرادات',
      icon: DollarSign,
      reports: [
        'تقرير الإيرادات الشهرية',
        'تحليل الربحية',
        'تقرير التدفق النقدي',
        'مقارنة الأداء السنوي'
      ]
    },
    {
      title: 'تقارير المعاملات',
      description: 'إحصائيات المعاملات والعمليات المصرفية',
      icon: BarChart3,
      reports: [
        'حجم المعاملات اليومية',
        'تحليل أنواع المعاملات',
        'تقرير المعاملات الفاشلة',
        'إحصائيات الذروة'
      ]
    },
    {
      title: 'تقارير البطاقات',
      description: 'تحليل استخدام البطاقات والإنفاق',
      icon: CreditCard,
      reports: [
        'تحليل استخدام البطاقات',
        'تقرير الإنفاق الشهري',
        'إحصائيات البطاقات المحظورة',
        'تحليل أنماط الاستهلاك'
      ]
    }
  ];

  const quickStats = [
    { label: 'معدل نمو العملاء', value: '12.5%', trend: 'up' },
    { label: 'متوسط رصيد الحساب', value: '₺125K', trend: 'up' },
    { label: 'معدل استخدام البطاقات', value: '78%', trend: 'down' },
    { label: 'رضا العملاء', value: '4.7/5', trend: 'up' },
    { label: 'معدل التحويلات اليومية', value: '1,234', trend: 'up' },
    { label: 'متوسط قيمة المعاملة', value: '₺45K', trend: 'down' }
  ];

  const topPerformers = [
    { category: 'أعلى فرع', name: 'فرع دمشق المركزي', value: '₺2.1M', change: '+18%' },
    { category: 'أكثر خدمة طلباً', name: 'التحويلات المصرفية', value: '45%', change: '+5%' },
    { category: 'أعلى عميل', name: 'شركة التجارة المتقدمة', value: '₺850K', change: '+25%' },
    { category: 'أسرع نمو', name: 'حسابات الشركات', value: '+35%', change: 'هذا الشهر' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">التقارير والإحصائيات</h2>
          <p className="text-gray-600">تحليل شامل لأداء البنك والعمليات المصرفية</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="quarter">هذا الربع</option>
            <option value="year">هذا العام</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium mr-1 ${
                      kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  kpi.changeType === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              نمو الإيرادات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>رسم بياني لنمو الإيرادات</p>
                <p className="text-sm">سيتم عرض البيانات الفعلية هنا</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الحسابات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>مخطط دائري لأنواع الحسابات</p>
                <p className="text-sm">سيتم عرض البيانات الفعلية هنا</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>إحصائيات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>أفضل الأداءات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{performer.category}</p>
                    <p className="font-semibold text-gray-900">{performer.name}</p>
                    <p className="text-lg font-bold text-blue-600">{performer.value}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {performer.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-600 font-normal">{category.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <span className="text-sm font-medium">{report}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReportsStats;
