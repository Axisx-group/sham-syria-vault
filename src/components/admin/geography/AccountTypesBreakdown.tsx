
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Users, Building, CreditCard, Activity } from "lucide-react";
import { GeographyAnalytics } from "@/hooks/useEnhancedGeographyStats";

interface AccountTypesBreakdownProps {
  analytics: GeographyAnalytics;
}

const COLORS = {
  personal: '#10B981',
  business: '#3B82F6',
  active: '#059669',
  suspended: '#F59E0B',
  closed: '#EF4444',
  debit: '#8B5CF6',
  credit: '#F97316'
};

const AccountTypesBreakdown: React.FC<AccountTypesBreakdownProps> = ({ analytics }) => {
  const accountTypeData = [
    {
      name: 'حسابات شخصية',
      value: analytics.accountTypeDistribution.personal,
      fill: COLORS.personal
    },
    {
      name: 'حسابات تجارية',
      value: analytics.accountTypeDistribution.business,
      fill: COLORS.business
    }
  ];

  const statusData = [
    {
      name: 'نشط',
      value: analytics.statusDistribution.active,
      fill: COLORS.active
    },
    {
      name: 'معلق',
      value: analytics.statusDistribution.suspended,
      fill: COLORS.suspended
    },
    {
      name: 'مغلق',
      value: analytics.statusDistribution.closed,
      fill: COLORS.closed
    }
  ];

  const cardTypeData = [
    {
      name: 'بطاقات مدينة',
      value: analytics.cardTypeDistribution.debit,
      fill: COLORS.debit
    },
    {
      name: 'بطاقات ائتمانية',
      value: analytics.cardTypeDistribution.credit,
      fill: COLORS.credit
    }
  ];

  const chartConfig = {
    value: {
      label: "العدد",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalCustomers}</p>
                <p className="text-sm text-gray-600">إجمالي العملاء</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalAccounts}</p>
                <p className="text-sm text-gray-600">إجمالي الحسابات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalCards}</p>
                <p className="text-sm text-gray-600">إجمالي البطاقات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((analytics.statusDistribution.active / analytics.totalCustomers) * 100)}%
                </p>
                <p className="text-sm text-gray-600">معدل النشاط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Types Chart */}
      <Card>
        <CardHeader>
          <CardTitle>أنواع الحسابات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">شخصية</span>
              </div>
              <Badge variant="outline">{analytics.accountTypeDistribution.personal}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">تجارية</span>
              </div>
              <Badge variant="outline">{analytics.accountTypeDistribution.business}</Badge>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accountTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {accountTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>توزيع حالات الحسابات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm">نشط</span>
              </div>
              <Badge variant="outline">{analytics.statusDistribution.active}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">معلق</span>
              </div>
              <Badge variant="outline">{analytics.statusDistribution.suspended}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">مغلق</span>
              </div>
              <Badge variant="outline">{analytics.statusDistribution.closed}</Badge>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Card Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>أنواع البطاقات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">مدينة</span>
              </div>
              <Badge variant="outline">{analytics.cardTypeDistribution.debit}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">ائتمانية</span>
              </div>
              <Badge variant="outline">{analytics.cardTypeDistribution.credit}</Badge>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cardTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cardTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTypesBreakdown;
