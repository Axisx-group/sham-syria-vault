
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Download } from "lucide-react";

interface FinancialReportsProps {
  language: 'ar' | 'en';
}

const FinancialReports: React.FC<FinancialReportsProps> = ({ language }) => {
  const [reportType, setReportType] = useState('monthly');
  const [reportPeriod, setReportPeriod] = useState('6months');

  const translations = {
    ar: {
      financialReports: "التقارير المالية",
      reportType: "نوع التقرير",
      reportPeriod: "فترة التقرير",
      monthlyReport: "تقرير شهري",
      categoryReport: "تقرير حسب الفئة",
      trendReport: "تقرير الاتجاهات",
      downloadReport: "تحميل التقرير",
      income: "الدخل",
      expenses: "المصروفات",
      savings: "المدخرات",
      month: "الشهر",
      amount: "المبلغ",
      category: "الفئة",
      lastSixMonths: "آخر 6 أشهر",
      lastYear: "آخر سنة",
      thisYear: "هذا العام"
    },
    en: {
      financialReports: "Financial Reports",
      reportType: "Report Type",
      reportPeriod: "Report Period",
      monthlyReport: "Monthly Report",
      categoryReport: "Category Report",
      trendReport: "Trend Report",
      downloadReport: "Download Report",
      income: "Income",
      expenses: "Expenses",
      savings: "Savings",
      month: "Month",
      amount: "Amount",
      category: "Category",
      lastSixMonths: "Last 6 Months",
      lastYear: "Last Year",
      thisYear: "This Year"
    }
  };

  const t = translations[language];

  const monthlyData = [
    { month: language === 'ar' ? 'يناير' : 'Jan', income: 450000, expenses: 320000, savings: 130000 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', income: 420000, expenses: 280000, savings: 140000 },
    { month: language === 'ar' ? 'مارس' : 'Mar', income: 480000, expenses: 350000, savings: 130000 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', income: 520000, expenses: 380000, savings: 140000 },
    { month: language === 'ar' ? 'مايو' : 'May', income: 490000, expenses: 340000, savings: 150000 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', income: 510000, expenses: 360000, savings: 150000 }
  ];

  const categoryData = [
    { name: language === 'ar' ? 'طعام' : 'Food', value: 120000, color: '#8884d8' },
    { name: language === 'ar' ? 'نقل' : 'Transport', value: 80000, color: '#82ca9d' },
    { name: language === 'ar' ? 'تسوق' : 'Shopping', value: 60000, color: '#ffc658' },
    { name: language === 'ar' ? 'ترفيه' : 'Entertainment', value: 40000, color: '#ff7300' },
    { name: language === 'ar' ? 'أخرى' : 'Others', value: 20000, color: '#00ff00' }
  ];

  const trendData = [
    { month: language === 'ar' ? 'ديسمبر' : 'Dec', balance: 2200000 },
    { month: language === 'ar' ? 'يناير' : 'Jan', balance: 2330000 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', balance: 2470000 },
    { month: language === 'ar' ? 'مارس' : 'Mar', balance: 2600000 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', balance: 2740000 },
    { month: language === 'ar' ? 'مايو' : 'May', balance: 2890000 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', balance: 3040000 }
  ];

  const renderChart = () => {
    switch (reportType) {
      case 'monthly':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#10b981" name={t.income} />
              <Bar dataKey="expenses" fill="#ef4444" name={t.expenses} />
              <Bar dataKey="savings" fill="#3b82f6" name={t.savings} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'category':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {t.financialReports}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.reportType}</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {t.monthlyReport}
                  </div>
                </SelectItem>
                <SelectItem value="category">
                  <div className="flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4" />
                    {t.categoryReport}
                  </div>
                </SelectItem>
                <SelectItem value="trend">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    {t.trendReport}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t.reportPeriod}</label>
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">{t.lastSixMonths}</SelectItem>
                <SelectItem value="1year">{t.lastYear}</SelectItem>
                <SelectItem value="thisyear">{t.thisYear}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          {renderChart()}
        </div>

        <Button className="w-full" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {t.downloadReport}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FinancialReports;
