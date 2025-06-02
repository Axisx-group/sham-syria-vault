
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Settings, 
  DollarSign,
  Clock,
  AlertTriangle,
  User,
  Edit,
  Save,
  X,
  Eye,
  Lock,
  Unlock,
  CreditCard,
  History,
  Bell
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminCustomerControl = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [actionReason, setActionReason] = useState('');

  const customers = [
    {
      id: 'CUST001',
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963-123-456-789',
      status: 'نشط',
      accountType: 'شخصي',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20 14:30',
      totalBalance: '₺125,000',
      accountsCount: 2,
      cardsCount: 1,
      riskLevel: 'منخفض',
      verificationStatus: 'مؤكد',
      permissions: {
        transfer: true,
        international: false,
        lending: true,
        investment: false
      },
      limits: {
        dailyTransfer: '50000',
        monthlyTransfer: '500000',
        cardLimit: '100000'
      },
      violations: 0,
      notes: 'عميل موثوق، تاريخ جيد في السداد'
    }
  ];

  const CustomerDetailModal = ({ customer, onClose }: any) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          تفاصيل العميل: {customer.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">معرف العميل:</span>
                <span className="font-medium">{customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">البريد الإلكتروني:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رقم الهاتف:</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الانضمام:</span>
                <span className="font-medium">{customer.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">آخر دخول:</span>
                <span className="font-medium">{customer.lastLogin}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الحالة والأمان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الحالة:</span>
                <Badge className={customer.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {customer.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">مستوى المخاطر:</span>
                <Badge className={
                  customer.riskLevel === 'منخفض' ? 'bg-green-100 text-green-800' :
                  customer.riskLevel === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {customer.riskLevel}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">التحقق:</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {customer.verificationStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المخالفات:</span>
                <span className="font-medium text-red-600">{customer.violations}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الملخص المالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{customer.totalBalance}</p>
                <p className="text-sm text-gray-600">إجمالي الرصيد</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{customer.accountsCount}</p>
                <p className="text-sm text-gray-600">عدد الحسابات</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-600">{customer.cardsCount}</p>
                <p className="text-sm text-gray-600">عدد البطاقات</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold text-orange-600">{customer.violations}</p>
                <p className="text-sm text-gray-600">المخالفات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الصلاحيات والحدود</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">الصلاحيات</h4>
                <div className="space-y-2">
                  {Object.entries(customer.permissions).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {key === 'transfer' ? 'التحويلات المحلية' :
                         key === 'international' ? 'التحويلات الدولية' :
                         key === 'lending' ? 'القروض' : 'الاستثمار'}
                      </span>
                      {value ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">الحدود المالية</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">التحويل اليومي:</span>
                    <span className="font-medium">₺{customer.limits.dailyTransfer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التحويل الشهري:</span>
                    <span className="font-medium">₺{customer.limits.monthlyTransfer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">حد البطاقة:</span>
                    <span className="font-medium">₺{customer.limits.cardLimit}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملاحظات الإدارة</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={customer.notes}
              placeholder="إضافة ملاحظات حول العميل..."
              className="min-h-[100px]"
            />
            <Button className="mt-3">
              <Save className="h-4 w-4 mr-2" />
              حفظ الملاحظات
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">إجراءات إدارية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                <Lock className="h-4 w-4 mr-2" />
                تجميد الحساب
              </Button>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                <Ban className="h-4 w-4 mr-2" />
                حظر العميل
              </Button>
              <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <Settings className="h-4 w-4 mr-2" />
                تعديل الصلاحيات
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                <Bell className="h-4 w-4 mr-2" />
                إرسال إشعار
              </Button>
            </div>
            <div className="mt-4">
              <Textarea 
                placeholder="سبب الإجراء (مطلوب)..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="mb-3"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">التحكم الكامل بالعملاء</h2>
          <p className="text-gray-600">إدارة شاملة لحسابات العملاء والصلاحيات</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Input placeholder="البحث عن عميل..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
                <SelectItem value="banned">محظور</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="مستوى المخاطر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">منخفض</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              بحث متقدم
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer List with Enhanced Controls */}
      <div className="space-y-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Customer Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={customer.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {customer.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {customer.accountType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="lg:col-span-3">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">إجمالي الرصيد:</span>
                      <span className="font-semibold">{customer.totalBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">الحسابات:</span>
                      <span className="font-semibold">{customer.accountsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">البطاقات:</span>
                      <span className="font-semibold">{customer.cardsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Risk & Status */}
                <div className="lg:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">المخاطر:</span>
                      <Badge className={
                        customer.riskLevel === 'منخفض' ? 'bg-green-100 text-green-800' :
                        customer.riskLevel === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {customer.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">المخالفات:</span>
                      <span className="font-semibold text-red-600">{customer.violations}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-3">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <CustomerDetailModal customer={customer} />
                    </Dialog>
                    
                    <Button size="sm" variant="outline" className="text-blue-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button size="sm" variant="outline" className="text-yellow-600">
                      <Lock className="h-4 w-4" />
                    </Button>
                    
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomerControl;
