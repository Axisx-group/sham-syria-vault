
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Globe, BarChart3, Users, TrendingUp } from "lucide-react";
import SyrianGovernorates from './SyrianGovernorates';
import CountriesManagement from './CountriesManagement';
import CustomerDistributionChart from './CustomerDistributionChart';
import AccountTypesBreakdown from './AccountTypesBreakdown';
import RegionalGrowthAnalytics from './RegionalGrowthAnalytics';
import { useEnhancedGeographyStats } from '@/hooks/useEnhancedGeographyStats';
import { Card, CardContent } from "@/components/ui/card";

const EnhancedGeographyManagement: React.FC = () => {
  const { analytics, loading } = useEnhancedGeographyStats();
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">الإدارة الجغرافية المتقدمة</h1>
          <p className="text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">الإدارة الجغرافية المتقدمة</h1>
          <p className="text-gray-600 text-red-500">فشل في تحميل الإحصائيات</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">الإدارة الجغرافية المتقدمة</h1>
        <p className="text-gray-600">إدارة شاملة للمحافظات والدول مع إحصائيات العملاء</p>
      </div>
      
      <Tabs defaultValue="governorates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="governorates" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            المحافظات السورية
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            دول العالم
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            توزيع العملاء
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            تحليل الحسابات
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            اتجاهات النمو
          </TabsTrigger>
        </TabsList>

        <TabsContent value="governorates">
          <SyrianGovernorates />
        </TabsContent>

        <TabsContent value="countries">
          <CountriesManagement />
        </TabsContent>

        <TabsContent value="distribution">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">توزيع العملاء الجغرافي</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  عمودي
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1 rounded ${chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  دائري
                </button>
              </div>
            </div>
            <CustomerDistributionChart 
              data={analytics.customersByLocation} 
              type={chartType}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">تحليل أنواع الحسابات والبطاقات</h2>
            <AccountTypesBreakdown analytics={analytics} />
          </div>
        </TabsContent>

        <TabsContent value="growth">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">اتجاهات النمو الإقليمي</h2>
            <RegionalGrowthAnalytics analytics={analytics} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedGeographyManagement;
