
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CustomerGeographyStats } from "@/types/geographyAnalytics";

interface CustomerDistributionChartProps {
  data: CustomerGeographyStats[];
  type: 'bar' | 'pie';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const CustomerDistributionChart: React.FC<CustomerDistributionChartProps> = ({ data, type }) => {
  const chartConfig = {
    customerCount: {
      label: "عدد العملاء",
    },
  };

  const sortedData = data
    .sort((a, b) => b.customerCount - a.customerCount)
    .slice(0, 10); // Top 10 locations

  if (type === 'pie') {
    const pieData = sortedData.map((item, index) => ({
      name: item.location,
      value: item.customerCount,
      fill: COLORS[index % COLORS.length]
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle>توزيع العملاء حسب المنطقة</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>توزيع العملاء حسب المنطقة</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData}>
              <XAxis 
                dataKey="location" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="customerCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerDistributionChart;
