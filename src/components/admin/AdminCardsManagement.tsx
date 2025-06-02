
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
  CreditCard,
  Shield,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminCardsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cards = [
    {
      id: 'CARD001',
      cardNumber: '**** **** **** 1234',
      fullCardNumber: '4532123456781234',
      customerName: 'أحمد محمد علي',
      cardType: 'Visa',
      cardCategory: 'ذهبية',
      status: 'نشطة',
      expiryDate: '12/26',
      issueDate: '2023-01-15',
      linkedAccount: 'ACC001',
      creditLimit: '500,000',
      currentBalance: '125,000',
      monthlySpent: '45,000',
      lastTransaction: '2024-01-20',
      securityLevel: 'عالي'
    },
    {
      id: 'CARD002',
      cardNumber: '**** **** **** 5678',
      fullCardNumber: '5555123456785678',
      customerName: 'فاطمة حسن محمود',
      cardType: 'Mastercard',
      cardCategory: 'بلاتينية',
      status: 'نشطة',
      expiryDate: '08/25',
      issueDate: '2022-08-22',
      linkedAccount: 'ACC002',
      creditLimit: '1,000,000',
      currentBalance: '275,000',
      monthlySpent: '85,000',
      lastTransaction: '2024-01-19',
      securityLevel: 'عالي'
    },
    {
      id: 'CARD003',
      cardNumber: '**** **** **** 9012',
      fullCardNumber: '4000123456789012',
      customerName: 'محمد سعد الدين',
      cardType: 'Visa',
      cardCategory: 'فضية',
      status: 'محظورة',
      expiryDate: '03/27',
      issueDate: '2023-03-10',
      linkedAccount: 'ACC003',
      creditLimit: '200,000',
      currentBalance: '180,000',
      monthlySpent: '15,000',
      lastTransaction: '2024-01-10',
      securityLevel: 'متوسط'
    },
    {
      id: 'CARD004',
      cardNumber: '**** **** **** 3456',
      fullCardNumber: '5200123456783456',
      customerName: 'نور عبد الرحمن',
      cardType: 'Mastercard',
      cardCategory: 'ذهبية',
      status: 'منتهية الصلاحية',
      expiryDate: '01/24',
      issueDate: '2022-11-05',
      linkedAccount: 'ACC004',
      creditLimit: '750,000',
      currentBalance: '0',
      monthlySpent: '0',
      lastTransaction: '2024-01-05',
      securityLevel: 'عالي'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشطة':
        return 'bg-green-100 text-green-800';
      case 'محظورة':
        return 'bg-red-100 text-red-800';
      case 'منتهية الصلاحية':
        return 'bg-yellow-100 text-yellow-800';
      case 'معلقة':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardTypeColor = (type: string) => {
    return type === 'Visa' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-red-100 text-red-800';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'بلاتينية':
        return 'bg-gray-800 text-white';
      case 'ذهبية':
        return 'bg-yellow-400 text-yellow-900';
      case 'فضية':
        return 'bg-gray-400 text-gray-900';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case 'عالي':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'متوسط':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'منخفض':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة البطاقات المصرفية</h2>
          <p className="text-gray-600">مراقبة وإدارة جميع البطاقات المصرفية</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          إصدار بطاقة جديدة
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي البطاقات</p>
                <p className="text-2xl font-bold text-gray-900">3,251</p>
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
                <p className="text-sm font-medium text-gray-600">البطاقات النشطة</p>
                <p className="text-2xl font-bold text-green-600">2,847</p>
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
                <p className="text-sm font-medium text-gray-600">البطاقات المحظورة</p>
                <p className="text-2xl font-bold text-red-600">89</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الحدود الائتمانية</p>
                <p className="text-2xl font-bold text-purple-600">₺125M</p>
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
                placeholder="البحث برقم البطاقة، اسم العميل أو رقم الحساب..."
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
                <option>جميع الأنواع</option>
                <option>Visa</option>
                <option>Mastercard</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>جميع الحالات</option>
                <option>نشطة</option>
                <option>محظورة</option>
                <option>منتهية الصلاحية</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards List */}
      <div className="space-y-4">
        {cards.map((card) => (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Card Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className={`w-16 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                      card.cardType === 'Visa' ? 'bg-blue-600' : 'bg-red-600'
                    }`}>
                      {card.cardType}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono text-lg font-semibold">{card.cardNumber}</h3>
                        <Badge className={getStatusColor(card.status)}>
                          {card.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-800">{card.customerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCategoryColor(card.cardCategory)}>
                          {card.cardCategory}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          الحساب: {card.linkedAccount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="lg:col-span-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">الحد الائتماني:</span>
                      <span className="text-sm font-semibold">₺{card.creditLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">الرصيد المتاح:</span>
                      <span className="text-sm font-semibold text-green-600">₺{card.currentBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">الإنفاق الشهري:</span>
                      <span className="text-sm font-semibold text-blue-600">₺{card.monthlySpent}</span>
                    </div>
                  </div>
                </div>

                {/* Dates and Security */}
                <div className="lg:col-span-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 ml-1" />
                      انتهاء الصلاحية: {card.expiryDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 ml-1" />
                      تاريخ الإصدار: {card.issueDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      {getSecurityIcon(card.securityLevel)}
                      <span className="mr-1">الأمان: {card.securityLevel}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      آخر معاملة: {card.lastTransaction}
                    </div>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="lg:col-span-1">
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>الاستخدام</span>
                      <span>{Math.round((parseInt(card.monthlySpent.replace(',', '')) / parseInt(card.creditLimit.replace(',', ''))) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.round((parseInt(card.monthlySpent.replace(',', '')) / parseInt(card.creditLimit.replace(',', ''))) * 100)}%`
                        }}
                      ></div>
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
                        تعديل الحدود
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="h-4 w-4 mr-2" />
                        تاريخ المعاملات
                      </DropdownMenuItem>
                      {card.status === 'نشطة' ? (
                        <DropdownMenuItem className="text-red-600">
                          <Lock className="h-4 w-4 mr-2" />
                          حظر البطاقة
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <Unlock className="h-4 w-4 mr-2" />
                          إلغاء الحظر
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
          عرض 1 إلى 4 من أصل 3,251 بطاقة
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

export default AdminCardsManagement;
