
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Lock,
  Unlock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Building,
  CreditCard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminAccountsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const accounts = [
    {
      id: 'ACC001',
      iban: 'SY21 CBSY 0000 1234 5678 9012',
      customerName: 'أحمد محمد علي',
      accountType: 'حساب جاري شخصي',
      currency: 'SYP',
      balance: '2,500,000',
      status: 'نشط',
      openDate: '2023-01-15',
      lastTransaction: '2024-01-20',
      monthlyTransactions: 45,
      avgMonthlyBalance: '2,200,000'
    },
    {
      id: 'ACC002',
      iban: 'SY21 CBSY 0000 9876 5432 1098',
      customerName: 'فاطمة حسن محمود',
      accountType: 'حساب توفير تجاري',
      currency: 'USD',
      balance: '15,000',
      status: 'نشط',
      openDate: '2022-08-22',
      lastTransaction: '2024-01-19',
      monthlyTransactions: 28,
      avgMonthlyBalance: '14,500'
    },
    {
      id: 'ACC003',
      iban: 'SY21 CBSY 0000 5555 1234 5678',
      customerName: 'محمد سعد الدين',
      accountType: 'حساب جاري شخصي',
      currency: 'EUR',
      balance: '5,200',
      status: 'مجمد',
      openDate: '2023-03-10',
      lastTransaction: '2024-01-10',
      monthlyTransactions: 12,
      avgMonthlyBalance: '5,000'
    },
    {
      id: 'ACC004',
      iban: 'SY21 CBSY 0000 7777 8888 9999',
      customerName: 'نور عبد الرحمن',
      accountType: 'حساب استثماري',
      currency: 'TRY',
      balance: '89,200',
      status: 'نشط',
      openDate: '2022-11-05',
      lastTransaction: '2024-01-20',
      monthlyTransactions: 67,
      avgMonthlyBalance: '85,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'مجمد':
        return 'bg-yellow-100 text-yellow-800';
      case 'مغلق':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrencyColor = (currency: string) => {
    const colors = {
      'SYP': 'bg-blue-100 text-blue-800',
      'USD': 'bg-green-100 text-green-800',
      'EUR': 'bg-purple-100 text-purple-800',
      'TRY': 'bg-red-100 text-red-800'
    };
    return colors[currency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatBalance = (balance: string, currency: string) => {
    const symbols = { SYP: '₺', USD: '$', EUR: '€', TRY: '₺' };
    return `${balance} ${symbols[currency as keyof typeof symbols] || currency}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الحسابات المصرفية</h2>
          <p className="text-gray-600">مراقبة وإدارة جميع الحسابات المصرفية</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CreditCard className="h-4 w-4 mr-2" />
          إنشاء حساب جديد
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الحسابات</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الحسابات النشطة</p>
                <p className="text-2xl font-bold text-green-600">1,189</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الحسابات المجمدة</p>
                <p className="text-2xl font-bold text-yellow-600">42</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأرصدة</p>
                <p className="text-2xl font-bold text-purple-600">₺84.5M</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث برقم الحساب، IBAN، أو اسم العميل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                فلترة
              </Button>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>جميع العملات</option>
                <option>الليرة السورية (SYP)</option>
                <option>الدولار الأمريكي (USD)</option>
                <option>اليورو (EUR)</option>
                <option>الليرة التركية (TRY)</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>جميع الأنواع</option>
                <option>حساب جاري</option>
                <option>حساب توفير</option>
                <option>حساب استثماري</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Account Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{account.id}</h3>
                        <Badge className={getStatusColor(account.status)}>
                          {account.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{account.iban}</p>
                      <p className="text-sm font-medium text-gray-800">{account.customerName}</p>
                      <p className="text-xs text-gray-500">{account.accountType}</p>
                    </div>
                  </div>
                </div>

                {/* Balance and Currency */}
                <div className="lg:col-span-2">
                  <div className="text-center">
                    <Badge className={getCurrencyColor(account.currency)}>
                      {account.currency}
                    </Badge>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {formatBalance(account.balance, account.currency)}
                    </p>
                    <p className="text-xs text-gray-500">الرصيد الحالي</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{account.monthlyTransactions}</p>
                      <p className="text-xs text-gray-500">معاملة شهرية</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">
                        {formatBalance(account.avgMonthlyBalance, account.currency)}
                      </p>
                      <p className="text-xs text-gray-500">متوسط الرصيد</p>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 ml-1" />
                      افتتح: {account.openDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      آخر معاملة: {account.lastTransaction}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        تعديل الحساب
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        تاريخ المعاملات
                      </DropdownMenuItem>
                      {account.status === 'نشط' ? (
                        <DropdownMenuItem className="text-yellow-600">
                          <Lock className="h-4 w-4 mr-2" />
                          تجميد الحساب
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <Unlock className="h-4 w-4 mr-2" />
                          إلغاء التجميد
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          عرض 1 إلى 4 من أصل 1,247 حساب
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">السابق</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">التالي</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountsManagement;
