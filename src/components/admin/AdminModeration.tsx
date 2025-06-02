
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Ban, 
  AlertTriangle, 
  Eye, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Flag,
  User,
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  MessageSquare,
  Lock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminModeration = () => {
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const moderationCases = [
    {
      id: 'MOD001',
      type: 'نشاط مشبوه',
      customer: {
        name: 'أحمد محمد علي',
        id: 'CUST001',
        riskLevel: 'عالي'
      },
      description: 'تحويلات متكررة بمبالغ كبيرة في فترة قصيرة',
      amount: '₺500,000',
      timestamp: '2024-01-20 14:30',
      status: 'قيد المراجعة',
      priority: 'عالي',
      assignedTo: 'فريق الأمان',
      evidence: [
        'تحويل ₺200,000 إلى حساب جديد',
        'تحويل ₺150,000 إلى نفس الحساب خلال ساعة',
        'محاولة تحويل ₺150,000 أخرى (تم رفضها)'
      ],
      customerHistory: {
        violations: 0,
        accountAge: '6 أشهر',
        averageBalance: '₺50,000',
        previousFlags: 1
      }
    },
    {
      id: 'MOD002',
      type: 'شكوى عميل',
      customer: {
        name: 'فاطمة حسن محمود',
        id: 'CUST002',
        riskLevel: 'منخفض'
      },
      description: 'شكوى من رسوم غير متوقعة على الحساب',
      amount: '₺250',
      timestamp: '2024-01-20 13:15',
      status: 'مفتوح',
      priority: 'متوسط',
      assignedTo: 'قسم خدمة العملاء',
      evidence: [
        'رسوم خدمة بقيمة ₺250',
        'عدم إشعار مسبق للعميل',
        'تطبيق رسوم خاطئة'
      ],
      customerHistory: {
        violations: 0,
        accountAge: '2 سنة',
        averageBalance: '₺25,000',
        previousFlags: 0
      }
    }
  ];

  const bannedAccounts = [
    {
      id: 'BAN001',
      customer: 'محمد سعد الدين',
      reason: 'احتيال مؤكد',
      banDate: '2024-01-15',
      duration: 'دائم',
      bannedBy: 'أحمد المدير',
      appealStatus: 'مرفوض'
    }
  ];

  const suspiciousActivities = [
    {
      id: 'SUS001',
      type: 'تسجيل دخول مشبوه',
      customer: 'نور عبد الرحمن',
      details: 'تسجيل دخول من موقع جديد (اسطنبول، تركيا)',
      timestamp: '2024-01-20 15:00',
      risk: 'متوسط',
      action: 'تم إرسال تنبيه SMS'
    },
    {
      id: 'SUS002',
      type: 'معاملة غير عادية',
      customer: 'سارة أحمد',
      details: 'تحويل بمبلغ أكبر من المعتاد بـ10 مرات',
      timestamp: '2024-01-20 14:45',
      risk: 'عالي',
      action: 'تم تجميد الحساب مؤقتاً'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">نظام الحظر والإشراف</h2>
          <p className="text-gray-600">مراقبة ومعالجة الأنشطة المشبوهة والمخالفات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Flag className="h-4 w-4 mr-2" />
            تقرير جديد
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            مراجعة سريعة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قضايا مفتوحة</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حسابات محظورة</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Ban className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أنشطة مشبوهة</p>
                <p className="text-2xl font-bold text-yellow-600">45</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قضايا محلولة</p>
                <p className="text-2xl font-bold text-green-600">156</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">قضايا المراجعة</TabsTrigger>
          <TabsTrigger value="banned">الحسابات المحظورة</TabsTrigger>
          <TabsTrigger value="suspicious">الأنشطة المشبوهة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <div className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <Input placeholder="البحث في القضايا..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع القضية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suspicious">نشاط مشبوه</SelectItem>
                      <SelectItem value="complaint">شكوى عميل</SelectItem>
                      <SelectItem value="fraud">احتيال</SelectItem>
                      <SelectItem value="violation">مخالفة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالي</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="low">منخفض</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">مفتوح</SelectItem>
                      <SelectItem value="review">قيد المراجعة</SelectItem>
                      <SelectItem value="resolved">محلول</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cases List */}
            <div className="space-y-4">
              {moderationCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Case Info */}
                      <div className="lg:col-span-4">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            case_.priority === 'عالي' ? 'bg-red-100' :
                            case_.priority === 'متوسط' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            <AlertTriangle className={`h-6 w-6 ${
                              case_.priority === 'عالي' ? 'text-red-600' :
                              case_.priority === 'متوسط' ? 'text-yellow-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{case_.id}</h3>
                              <Badge className={
                                case_.priority === 'عالي' ? 'bg-red-100 text-red-800' :
                                case_.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }>
                                {case_.priority}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-800">{case_.type}</p>
                            <p className="text-sm text-gray-600">{case_.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="lg:col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{case_.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">معرف العميل:</span>
                            <span className="text-sm font-medium">{case_.customer.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">مستوى المخاطر:</span>
                            <Badge className={case_.customer.riskLevel === 'عالي' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                              {case_.customer.riskLevel}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Amount & Time */}
                      <div className="lg:col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="font-bold text-lg">{case_.amount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{case_.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="lg:col-span-3">
                        <div className="space-y-3">
                          <Badge className={case_.status === 'قيد المراجعة' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
                            {case_.status}
                          </Badge>
                          <p className="text-sm text-gray-600">المسؤول: {case_.assignedTo}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              موافقة
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              رفض
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evidence Preview */}
                    {case_.evidence && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">الأدلة:</h4>
                        <ul className="space-y-1">
                          {case_.evidence.slice(0, 2).map((evidence, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {evidence}
                            </li>
                          ))}
                          {case_.evidence.length > 2 && (
                            <li className="text-sm text-blue-600">
                              +{case_.evidence.length - 2} المزيد...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="banned">
          <Card>
            <CardHeader>
              <CardTitle>الحسابات المحظورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bannedAccounts.map((banned) => (
                  <div key={banned.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Ban className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{banned.customer}</h4>
                        <p className="text-sm text-gray-600">{banned.reason}</p>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>تاريخ الحظر: {banned.banDate}</span>
                          <span>المدة: {banned.duration}</span>
                          <span>بواسطة: {banned.bannedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={banned.appealStatus === 'مرفوض' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                        طعن {banned.appealStatus}
                      </Badge>
                      <Button size="sm" variant="outline">مراجعة</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious">
          <Card>
            <CardHeader>
              <CardTitle>الأنشطة المشبوهة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suspiciousActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.risk === 'عالي' ? 'bg-red-100' : 
                        activity.risk === 'متوسط' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          activity.risk === 'عالي' ? 'text-red-600' : 
                          activity.risk === 'متوسط' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{activity.type}</h4>
                        <p className="text-sm text-gray-600">العميل: {activity.customer}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        activity.risk === 'عالي' ? 'bg-red-100 text-red-800' : 
                        activity.risk === 'متوسط' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }>
                        {activity.risk}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">الإجراء المتخذ:</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير الأمان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير الأنشطة المشبوهة الشهري
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير الحسابات المحظورة
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير معدلات الاحتيال
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>معدل الكشف عن الاحتيال:</span>
                    <span className="font-bold text-green-600">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت المعالجة:</span>
                    <span className="font-bold">2.3 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>القضايا المحلولة هذا الشهر:</span>
                    <span className="font-bold text-blue-600">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminModeration;
