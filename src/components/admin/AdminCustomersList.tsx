
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
  Trash2,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminCustomersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const customers = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963-123-456-789',
      accountType: 'شخصي',
      status: 'نشط',
      balance: '₺25,000',
      joinDate: '2023-01-15',
      location: 'دمشق، سوريا',
      accountsCount: 2,
      cardsCount: 1
    },
    {
      id: 2,
      name: 'فاطمة حسن محمود',
      email: 'fatima.hassan@email.com',
      phone: '+963-987-654-321',
      accountType: 'تجاري',
      status: 'نشط',
      balance: '₺150,000',
      joinDate: '2022-08-22',
      location: 'حلب، سوريا',
      accountsCount: 3,
      cardsCount: 2
    },
    {
      id: 3,
      name: 'محمد سعد الدين',
      email: 'mohammed.saad@email.com',
      phone: '+963-555-123-456',
      accountType: 'شخصي',
      status: 'معلق',
      balance: '₺5,500',
      joinDate: '2023-03-10',
      location: 'حمص، سوريا',
      accountsCount: 1,
      cardsCount: 0
    },
    {
      id: 4,
      name: 'نور عبد الرحمن',
      email: 'nour.abdulrahman@email.com',
      phone: '+963-444-789-123',
      accountType: 'تجاري',
      status: 'نشط',
      balance: '₺89,200',
      joinDate: '2022-11-05',
      location: 'اللاذقية، سوريا',
      accountsCount: 2,
      cardsCount: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'معلق':
        return 'bg-yellow-100 text-yellow-800';
      case 'مغلق':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeColor = (type: string) => {
    return type === 'تجاري' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة العملاء</h2>
          <p className="text-gray-600">إدارة وعرض معلومات جميع العملاء</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          إضافة عميل جديد
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن عميل بالاسم، البريد الإلكتروني أو رقم الهاتف..."
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
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="suspended">معلق</option>
                <option value="closed">مغلق</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{customer.name}</h3>
                    <p className="text-sm text-gray-600">معرف العميل: #{customer.id}</p>
                  </div>
                </div>
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
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Type Badges */}
              <div className="flex gap-2">
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
                <Badge className={getAccountTypeColor(customer.accountType)}>
                  {customer.accountType}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 ml-2" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 ml-2" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 ml-2" />
                  {customer.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 ml-2" />
                  انضم في {customer.joinDate}
                </div>
              </div>

              {/* Balance */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">إجمالي الرصيد</p>
                <p className="text-xl font-bold text-gray-900">{customer.balance}</p>
              </div>

              {/* Accounts and Cards Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{customer.accountsCount}</p>
                  <p className="text-sm text-blue-800">حساب</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{customer.cardsCount}</p>
                  <p className="text-sm text-green-800">بطاقة</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  عرض الحسابات
                </Button>
                <Button size="sm" className="flex-1">
                  إدارة البطاقات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          عرض 1 إلى 4 من أصل 247 عميل
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

export default AdminCustomersList;
