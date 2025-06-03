
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Users, CreditCard } from "lucide-react";
import { GeographyAnalytics } from "@/hooks/useEnhancedGeographyStats";

interface RegionalGrowthAnalyticsProps {
  analytics: GeographyAnalytics;
}

const RegionalGrowthAnalytics: React.FC<RegionalGrowthAnalyticsProps> = ({ analytics }) => {
  const chartConfig = {
    newCustomers: {
      label: "عملاء جدد",
    },
    newAccounts: {
      label: "حسابات جديدة",
    },
  };

  // Calculate growth trends
  const growthData = analytics.growthTrends.map(trend => ({
    ...trend,
    month: new Date(trend.month).toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'short' 
    })
  }));

  // Calculate total growth
  const totalNewCustomers = analytics.growthTrends.reduce((sum, trend) => sum + trend.newCustomers, 0);
  const totalNewAccounts = analytics.growthTrends.reduce((sum, trend) => sum + trend.newAccounts, 0);
  
  // Calculate average monthly growth
  const avgMonthlyCustomers = totalNewCustomers / Math.max(analytics.growthTrends.length, 1);
  const avgMonthlyAccounts = totalNewAccounts / Math.max(analytics.growthTrends.length, 1);

  // Calculate growth percentage (comparing last month with previous)
  const lastMonth = analytics.growthTrends[analytics.growthTrends.length - 1];
  const previousMonth = analytics.growthTrends[analytics.growthTrends.length - 2];
  
  const customerGrowthPercentage = previousMonth ? 
    ((lastMonth?.newCustomers || 0) - (previousMonth?.newCustomers || 0)) / Math.max(previousMonth?.newCustomers || 1, 1) * 100 : 0;
  
  const accountGrowthPercentage = previousMonth ? 
    ((lastMonth?.newAccounts || 0) - (previousMonth?.newAccounts || 0)) / Math.max(previousMonth?.newAccounts || 1, 1) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Growth Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">العملاء الجدد (الشهر الماضي)</p>
                <p className="text-2xl font-bold">{lastMonth?.newCustomers || 0}</p>
              </div>
              <div className={`flex items-center gap-1 ${customerGrowthPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {customerGrowthPercentage >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{Math.abs(customerGrowthPercentage).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الحسابات الجديدة (الشهر الماضي)</p>
                <p className="text-2xl font-bold">{lastMonth?.newAccounts || 0}</p>
              </div>
              <div className={`flex items-center gap-1 ${accountGrowthPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {accountGrowthPercentage >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{Math.abs(accountGrowthPercentage).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">متوسط العملاء الشهري</p>
                <p className="text-2xl font-bold">{Math.round(avgMonthlyCustomers)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">متوسط الحسابات الشهري</p>
                <p className="text-2xl font-bold">{Math.round(avgMonthlyAccounts)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>اتجاهات النمو الشهري</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="عملاء جدد"
                />
                <Line 
                  type="monotone" 
                  dataKey="newAccounts" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="حسابات جديدة"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cumulative Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>النمو التراكمي</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stackId="1"
                  stroke="#8884d8" 
                  fill="#8884d8"
                  fillOpacity={0.6}
                  name="عملاء جدد"
                />
                <Area 
                  type="monotone" 
                  dataKey="newAccounts" 
                  stackId="1"
                  stroke="#82ca9d" 
                  fill="#82ca9d"
                  fillOpacity={0.6}
                  name="حسابات جديدة"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalGrowthAnalytics;
