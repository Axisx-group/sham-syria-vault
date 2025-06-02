
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
  Download,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      type: 'تحويل صادر',
      amount: '50,000',
      currency: 'SYP',
      fromAccount: 'ACC001',
      toAccount: 'ACC002',
      fromCustomer: 'أحمد محمد علي',
      toCustomer: 'فاطمة حسن محمود',
      status: 'مكتمل',
      timestamp: '2024-01-20 14:30:25',
      reference: 'REF123456789',
      description: 'دفع فاتورة',
      fee: '500',
      channel: 'تطبيق الموبايل'
    },
    {
      id: 'TXN002',
      type: 'إيداع',
      amount: '125,000',
      currency: 'USD',
      fromAccount: 'External',
      toAccount: 'ACC003',
      fromCustomer: 'تحويل خارجي',
      toCustomer: 'محمد سعد الدين',
      status: 'قيد المراجعة',
      timestamp: '2024-01-20 13:15:10',
      reference: 'REF987654321',
      description: 'إيداع نقدي',
      fee: '1,000',
      channel: 'فرع البنك'
    },
    {
      id: 'TXN003',
      type: 'سحب',
      amount: '25,000',
      currency: 'EUR',
      fromAccount: 'ACC004',
      toAccount: 'ATM',
      fromCustomer: 'نور عبد الرحمن',
      toCustomer: 'صراف آلي',
      status: 'فشل',
      timestamp: '2024-01-20 12:45:33',
      reference: 'REF456789123',
      description: 'سحب نقدي من الصراف الآلي',
      fee: '200',
      channel: 'صراف آلي'
    },
    {
      id: 'TXN004',
      type: 'دفع فاتورة',
      amount: '75,500',
      currency: 'TRY',
      fromAccount: 'ACC001',
      toAccount: 'Utility',
      fromCustomer: 'أحمد محمد علي',
      toCustomer: 'شركة الكهرباء',
      status: 'مكتمل',
      timestamp: '2024-01-20 11:20:15',
      reference: 'REF789123456',
      description: 'دفع فاتورة الكهرباء',
      fee: '300',
      channel: 'موقع الويب'
    },
    {
      id: 'TXN005',
      type: 'تحويل وارد',
      amount: '200,000',
      currency: 'SYP',
      fromAccount: 'External',
      toAccount: 'ACC002',
      fromCustomer: 'تحويل دولي',
      toCustomer: 'فاطمة حسن محمود',
      status: 'قيد المعالجة',
      timestamp: '2024-01-20 10:05:42',
      reference: 'REF321654987',
      description: 'تحويل من الخارج',
      fee: '2,000',
      channel: 'SWIFT'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'قيد المعالجة':
        return 'bg-blue-100 text-blue-800';
      case 'قيد المراجعة':
        return 'bg-yellow-100 text-yellow-800';
      case 'فشل':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'قيد المعالجة':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'قيد المراجعة':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'فشل':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('صادر') || type.includes('سحب') || type.includes('دفع')) {
      return <ArrowUpRight className="h-4 w-4 text-red-600" />;
    } else {
      return <ArrowDownRight className="h-4 w-4 text-green-600" />;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols = { SYP: '₺', USD: '$', EUR: '€', TRY: '₺' };
    return symbols[currency as keyof typeof symbols] || currency;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المعاملات المصرفية</h2>
          <p className="text-gray-600">مراقبة ومراجعة جميع المعاملات المصرفية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معاملات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs text-green-600">+12.5% من الأمس</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المعاملات المكتملة</p>
                <p className="text-2xl font-bold text-green-600">1,156</p>
                <p className="text-xs text-green-600">93.7% معدل النجاح</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">45</p>
                <p className="text-xs text-yellow-600">تحتاج مراجعة</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المبلغ</p>
                <p className="text-2xl font-bold text-purple-600">₺15.7M</p>
                <p className="text-xs text-purple-600">معاملات اليوم</p>
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
                placeholder="البحث برقم المعاملة، رقم الحساب أو اسم العميل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                فلترة متقدمة
              </Button>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">جميع الأنواع</option>
                <option value="transfer">تحويلات</option>
                <option value="deposit">إيداعات</option>
                <option value="withdrawal">سحوبات</option>
                <option value="payment">دفعات</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>جميع الحالات</option>
                <option>مكتمل</option>
                <option>قيد المعالجة</option>
                <option>قيد المراجعة</option>
                <option>فشل</option>
              </select>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                اليوم
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Transaction Type and Amount */}
                <div className="lg:col-span-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getTypeIcon(transaction.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{transaction.type}</h3>
                      <p className="text-lg font-bold text-gray-900">
                        {getCurrencySymbol(transaction.currency)}{transaction.amount}
                      </p>
                      <p className="text-xs text-gray-500">رسوم: {getCurrencySymbol(transaction.currency)}{transaction.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="lg:col-span-4">
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600">من: </span>
                      <span className="font-medium">{transaction.fromCustomer}</span>
                      <span className="text-gray-400 text-xs"> ({transaction.fromAccount})</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">إلى: </span>
                      <span className="font-medium">{transaction.toCustomer}</span>
                      <span className="text-gray-400 text-xs"> ({transaction.toAccount})</span>
                    </div>
                    <p className="text-xs text-gray-500">{transaction.description}</p>
                  </div>
                </div>

                {/* Status and Reference */}
                <div className="lg:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{transaction.reference}</p>
                    <p className="text-xs text-gray-500">{transaction.channel}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="lg:col-span-2">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{transaction.timestamp.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{transaction.timestamp.split(' ')[1]}</span>
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
                        <Download className="h-4 w-4 mr-2" />
                        تحميل الإيصال
                      </DropdownMenuItem>
                      {transaction.status === 'قيد المراجعة' && (
                        <>
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            الموافقة
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            الرفض
                          </DropdownMenuItem>
                        </>
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
          عرض 1 إلى 5 من أصل 15,847 معاملة
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

export default AdminTransactions;
