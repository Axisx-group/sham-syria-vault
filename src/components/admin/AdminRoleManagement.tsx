
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Users, 
  Settings, 
  Key,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Search,
  Filter,
  Plus,
  Crown,
  Star,
  User
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminRoleManagement = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  const adminUsers = [
    {
      id: 'ADMIN001',
      name: 'أحمد المدير العام',
      email: 'ahmed.manager@bank.sy',
      role: 'مدير عام',
      permissions: ['جميع الصلاحيات'],
      status: 'نشط',
      lastLogin: '2024-01-20 14:30',
      avatar: 'أ',
      department: 'الإدارة العليا',
      joinDate: '2022-01-15',
      actionsThisMonth: 145
    },
    {
      id: 'ADMIN002', 
      name: 'سارة مديرة العملاء',
      email: 'sara.customers@bank.sy',
      role: 'مدير عملاء',
      permissions: ['إدارة العملاء', 'عرض التقارير', 'المراسلة'],
      status: 'نشط',
      lastLogin: '2024-01-20 13:45',
      avatar: 'س',
      department: 'خدمة العملاء',
      joinDate: '2022-03-20',
      actionsThisMonth: 89
    },
    {
      id: 'ADMIN003',
      name: 'محمد مشرف الأمان',
      email: 'mohammed.security@bank.sy',
      role: 'مشرف أمان',
      permissions: ['الحظر والإشراف', 'عرض التقارير الأمنية', 'إدارة المخاطر'],
      status: 'نشط',
      lastLogin: '2024-01-20 12:20',
      avatar: 'م',
      department: 'الأمان والمخاطر',
      joinDate: '2022-05-10',
      actionsThisMonth: 67
    }
  ];

  const roles = [
    {
      id: 'ROLE001',
      name: 'مدير عام',
      description: 'صلاحيات كاملة لجميع أقسام النظام',
      permissions: [
        'إدارة العملاء',
        'إدارة الحسابات',
        'إدارة البطاقات',
        'الحظر والإشراف',
        'نظام المراسلة',
        'إدارة الصفحات',
        'التحليلات المتقدمة',
        'إدارة الأدوار',
        'إعدادات النظام',
        'النسخ الاحتياطي'
      ],
      usersCount: 1,
      level: 'عالي',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'ROLE002',
      name: 'مدير عملاء',
      description: 'إدارة شؤون العملاء والحسابات',
      permissions: [
        'إدارة العملاء',
        'إدارة الحسابات',
        'إدارة البطاقات',
        'نظام المراسلة',
        'عرض التقارير',
        'التحليلات الأساسية'
      ],
      usersCount: 3,
      level: 'متوسط',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'ROLE003',
      name: 'مشرف أمان',
      description: 'مراقبة الأمان والحظر والإشراف',
      permissions: [
        'الحظر والإشراف',
        'عرض بيانات العملاء',
        'التقارير الأمنية',
        'إدارة المخاطر',
        'نظام المراسلة الأمني'
      ],
      usersCount: 2,
      level: 'متوسط',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'ROLE004',
      name: 'محرر محتوى',
      description: 'إدارة محتوى الموقع والصفحات',
      permissions: [
        'إدارة الصفحات',
        'إدارة المحتوى',
        'رفع الوسائط',
        'تحرير القوالب'
      ],
      usersCount: 1,
      level: 'منخفض',
      color: 'bg-green-100 text-green-800'
    }
  ];

  const allPermissions = [
    { id: 'customers', name: 'إدارة العملاء', category: 'العملاء' },
    { id: 'accounts', name: 'إدارة الحسابات', category: 'العملاء' },
    { id: 'cards', name: 'إدارة البطاقات', category: 'العملاء' },
    { id: 'moderation', name: 'الحظر والإشراف', category: 'الأمان' },
    { id: 'security_reports', name: 'التقارير الأمنية', category: 'الأمان' },
    { id: 'risk_management', name: 'إدارة المخاطر', category: 'الأمان' },
    { id: 'messaging', name: 'نظام المراسلة', category: 'التواصل' },
    { id: 'notifications', name: 'إدارة الإشعارات', category: 'التواصل' },
    { id: 'page_management', name: 'إدارة الصفحات', category: 'المحتوى' },
    { id: 'content_editing', name: 'تحرير المحتوى', category: 'المحتوى' },
    { id: 'media_library', name: 'مكتبة الوسائط', category: 'المحتوى' },
    { id: 'analytics', name: 'التحليلات المتقدمة', category: 'التقارير' },
    { id: 'basic_reports', name: 'التقارير الأساسية', category: 'التقارير' },
    { id: 'role_management', name: 'إدارة الأدوار', category: 'النظام' },
    { id: 'system_settings', name: 'إعدادات النظام', category: 'النظام' },
    { id: 'backup', name: 'النسخ الاحتياطي', category: 'النظام' }
  ];

  const CreateAdminModal = () => (
    <DialogContent className="max-w-2xl" dir="rtl">
      <DialogHeader>
        <DialogTitle>إضافة مشرف جديد</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
            <Input placeholder="أدخل الاسم الكامل..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
            <Input type="email" placeholder="admin@bank.sy" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">الدور</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">القسم</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="management">الإدارة العليا</SelectItem>
                <SelectItem value="customers">خدمة العملاء</SelectItem>
                <SelectItem value="security">الأمان والمخاطر</SelectItem>
                <SelectItem value="content">إدارة المحتوى</SelectItem>
                <SelectItem value="technical">التقنية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">كلمة المرور المؤقتة</label>
          <Input type="password" placeholder="كلمة مرور قوية..." />
          <p className="text-xs text-gray-500 mt-1">سيتم إرسال كلمة المرور إلى البريد الإلكتروني</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">ملاحظات</label>
          <Textarea placeholder="ملاحظات إضافية حول المشرف..." />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة المشرف
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const CreateRoleModal = () => (
    <DialogContent className="max-w-3xl" dir="rtl">
      <DialogHeader>
        <DialogTitle>إنشاء دور جديد</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم الدور</label>
            <Input placeholder="مثال: مشرف المبيعات" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">مستوى الدور</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">عالي</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="low">منخفض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">وصف الدور</label>
          <Textarea placeholder="وصف مختصر لمسؤوليات هذا الدور..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">الصلاحيات</label>
          <div className="space-y-4">
            {Object.entries(
              allPermissions.reduce((acc, permission) => {
                if (!acc[permission.category]) acc[permission.category] = [];
                acc[permission.category].push(permission);
                return acc;
              }, {} as Record<string, typeof allPermissions>)
            ).map(([category, permissions]) => (
              <div key={category} className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إنشاء الدور
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الأدوار والصلاحيات</h2>
          <p className="text-gray-600">إدارة المشرفين وتحديد صلاحياتهم</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Key className="h-4 w-4 mr-2" />
                دور جديد
              </Button>
            </DialogTrigger>
            <CreateRoleModal />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                مشرف جديد
              </Button>
            </DialogTrigger>
            <CreateAdminModal />
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المشرفين</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المشرفين النشطين</p>
                <p className="text-2xl font-bold text-green-600">11</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الأدوار المخصصة</p>
                <p className="text-2xl font-bold text-purple-600">6</p>
              </div>
              <Key className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإجراءات هذا الشهر</p>
                <p className="text-2xl font-bold text-orange-600">1,456</p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="admins" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admins">المشرفين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <div className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="البحث عن مشرف..." className="pr-10" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأدوار</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="management">الإدارة العليا</SelectItem>
                      <SelectItem value="customers">خدمة العملاء</SelectItem>
                      <SelectItem value="security">الأمان والمخاطر</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    فلترة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admins List */}
            <div className="space-y-4">
              {adminUsers.map((admin) => (
                <Card key={admin.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Admin Info */}
                      <div className="lg:col-span-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {admin.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{admin.name}</h3>
                              {admin.role === 'مدير عام' && <Crown className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-gray-600">{admin.email}</p>
                            <p className="text-xs text-gray-500">{admin.department}</p>
                          </div>
                        </div>
                      </div>

                      {/* Role & Status */}
                      <div className="lg:col-span-3">
                        <div className="space-y-2">
                          <Badge className={
                            admin.role === 'مدير عام' ? 'bg-red-100 text-red-800' :
                            admin.role === 'مدير عملاء' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {admin.role}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${admin.status === 'نشط' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm">{admin.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Permissions Preview */}
                      <div className="lg:col-span-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">الصلاحيات:</p>
                          <div className="flex flex-wrap gap-1">
                            {admin.permissions.slice(0, 2).map((permission, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {admin.permissions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{admin.permissions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {admin.role !== 'مدير عام' && (
                            <Button size="sm" variant="outline" className="text-red-600">
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>آخر دخول: {admin.lastLogin}</div>
                      <div>تاريخ الانضمام: {admin.joinDate}</div>
                      <div>الإجراءات هذا الشهر: {admin.actionsThisMonth}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Key className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <Badge className={role.color}>{role.level}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">عدد المستخدمين:</span>
                      <Badge variant="outline">{role.usersCount}</Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">الصلاحيات ({role.permissions.length}):</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} المزيد
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <div className="space-y-6">
            {Object.entries(
              allPermissions.reduce((acc, permission) => {
                if (!acc[permission.category]) acc[permission.category] = [];
                acc[permission.category].push(permission);
                return acc;
              }, {} as Record<string, typeof allPermissions>)
            ).map(([category, permissions]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{permission.name}</span>
                        <Badge variant="outline">{permission.id}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRoleManagement;
