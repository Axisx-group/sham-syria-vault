
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Globe, 
  Edit, 
  Eye, 
  EyeOff,
  Save,
  Plus,
  Settings,
  Image,
  FileText,
  Layout,
  Palette,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Filter,
  ExternalLink,
  BarChart3,
  Users,
  TrendingUp
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminPageManagement = () => {
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  // Real pages from the application
  const realPages = [
    {
      id: 'home',
      title: 'الصفحة الرئيسية',
      url: '/',
      route: '/',
      status: 'منشور',
      lastModified: '2024-01-20 14:30',
      modifiedBy: 'النظام',
      views: '15,234',
      type: 'صفحة رئيسية',
      template: 'home-template',
      seoScore: 95,
      mobileOptimized: true,
      description: 'الصفحة الرئيسية للبنك السوري الرقمي مع جميع الخدمات والميزات',
      content: {
        sections: ['بانر رئيسي', 'الخدمات', 'إحصائيات', 'شهادات العملاء', 'تطبيق الهاتف']
      }
    },
    {
      id: 'dashboard',
      title: 'لوحة التحكم',
      url: '/dashboard',
      route: '/dashboard',
      status: 'منشور',
      lastModified: '2024-01-19 10:15',
      modifiedBy: 'النظام',
      views: '8,543',
      type: 'لوحة تحكم',
      template: 'dashboard-template',
      seoScore: 88,
      mobileOptimized: true,
      description: 'لوحة تحكم العميل لإدارة الحسابات والمعاملات',
      content: {
        sections: ['نظرة عامة', 'الحسابات', 'المعاملات', 'البطاقات', 'الإعدادات']
      }
    },
    {
      id: 'cards',
      title: 'البطاقات المصرفية',
      url: '/cards',
      route: '/cards',
      status: 'منشور',
      lastModified: '2024-01-18 16:45',
      modifiedBy: 'النظام',
      views: '12,876',
      type: 'صفحة منتجات',
      template: 'product-template',
      seoScore: 92,
      mobileOptimized: true,
      description: 'عرض جميع أنواع البطاقات المصرفية المتاحة',
      content: {
        sections: ['عرض البطاقات', 'المقارنة', 'التقديم', 'الميزات']
      }
    },
    {
      id: 'banking-services',
      title: 'الخدمات المصرفية',
      url: '/banking-services',
      route: '/banking-services',
      status: 'منشور',
      lastModified: '2024-01-17 09:30',
      modifiedBy: 'النظام',
      views: '9,234',
      type: 'صفحة خدمات',
      template: 'services-template',
      seoScore: 85,
      mobileOptimized: true,
      description: 'جميع الخدمات المصرفية المتوفرة للعملاء',
      content: {
        sections: ['تحويل الأموال', 'دفع الفواتير', 'إدارة البطاقات', 'التقارير']
      }
    },
    {
      id: 'apply-personal',
      title: 'طلب حساب شخصي',
      url: '/apply/personal',
      route: '/apply/personal',
      status: 'منشور',
      lastModified: '2024-01-16 14:20',
      modifiedBy: 'النظام',
      views: '6,789',
      type: 'نموذج طلب',
      template: 'form-template',
      seoScore: 78,
      mobileOptimized: true,
      description: 'نموذج التقديم لفتح حساب مصرفي شخصي',
      content: {
        sections: ['المعلومات الشخصية', 'معلومات العنوان', 'تفضيلات الحساب']
      }
    },
    {
      id: 'apply-business',
      title: 'طلب حساب تجاري',
      url: '/apply/business',
      route: '/apply/business',
      status: 'منشور',
      lastModified: '2024-01-15 11:45',
      modifiedBy: 'النظام',
      views: '4,321',
      type: 'نموذج طلب',
      template: 'business-form-template',
      seoScore: 76,
      mobileOptimized: true,
      description: 'نموذج التقديم لفتح حساب مصرفي تجاري',
      content: {
        sections: ['معلومات الشركة', 'المعلومات المالية', 'المستندات المطلوبة']
      }
    },
    {
      id: 'contact',
      title: 'تواصل معنا',
      url: '/contact',
      route: '/contact',
      status: 'منشور',
      lastModified: '2024-01-14 13:15',
      modifiedBy: 'النظام',
      views: '3,456',
      type: 'صفحة تواصل',
      template: 'contact-template',
      seoScore: 82,
      mobileOptimized: true,
      description: 'صفحة التواصل مع خدمة العملاء والدعم الفني',
      content: {
        sections: ['نموذج التواصل', 'معلومات الاتصال', 'الخريطة', 'أسئلة شائعة']
      }
    }
  ];

  const handleViewPage = (page: any) => {
    window.open(page.route, '_blank');
    toast({
      title: "فتح الصفحة",
      description: `تم فتح صفحة ${page.title} في تبويب جديد`,
    });
  };

  const handleEditPage = (page: any) => {
    setSelectedPage(page);
    setEditMode(true);
    toast({
      title: "تحرير الصفحة",
      description: `بدء تحرير صفحة ${page.title}`,
    });
  };

  const handleToggleVisibility = (page: any) => {
    const newStatus = page.status === 'منشور' ? 'مخفي' : 'منشور';
    toast({
      title: "تغيير حالة الصفحة",
      description: `تم تغيير حالة صفحة ${page.title} إلى ${newStatus}`,
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "حفظ التغييرات",
      description: "تم حفظ جميع التغييرات بنجاح",
    });
    setEditMode(false);
  };

  const PageEditorModal = ({ page }: any) => (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle>تحرير الصفحة: {page.title}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان الصفحة</label>
                <Input defaultValue={page.title} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">الرابط</label>
                <Input defaultValue={page.url} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف الصفحة</label>
                <Textarea defaultValue={page.description} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">أقسام الصفحة</label>
                <div className="space-y-2">
                  {page.content.sections.map((section: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input defaultValue={section} />
                      <Button size="sm" variant="outline">تحرير</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">معاينة</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewPage(page)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    عرض مباشر
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="font-semibold">{page.title}</div>
                    <div className="text-sm text-gray-600">{page.description}</div>
                    <div className="space-y-2">
                      {page.content.sections.map((section: string, index: number) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          {section}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان SEO</label>
                  <Input defaultValue={page.title} />
                  <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 60 حرف</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف SEO</label>
                  <Textarea defaultValue={page.description} />
                  <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 160 حرف</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الكلمات المفتاحية</label>
                  <Input placeholder="كلمة1، كلمة2، كلمة3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقييم SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>النقاط الإجمالية</span>
                    <span className="text-2xl font-bold text-green-600">{page.seoScore}/100</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>عنوان الصفحة</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>وصف الصفحة</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>سرعة التحميل</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>تحسين الهاتف</span>
                      <span className={page.mobileOptimized ? "text-green-600" : "text-red-600"}>
                        {page.mobileOptimized ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المشاهدات</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{page.views}</div>
                <p className="text-xs text-muted-foreground">
                  +12% من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">معدل الارتداد</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3%</div>
                <p className="text-xs text-muted-foreground">
                  -5% من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط الوقت</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3:45</div>
                <p className="text-xs text-muted-foreground">
                  +8% من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النشر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">حالة الصفحة</label>
                  <Select defaultValue={page.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="منشور">منشور</SelectItem>
                      <SelectItem value="مخفي">مخفي</SelectItem>
                      <SelectItem value="صيانة">تحت الصيانة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">آخر تعديل</label>
                  <Input value={page.lastModified} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">المحرر</label>
                  <Input value={page.modifiedBy} disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الوصول</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" defaultChecked={page.mobileOptimized} />
                    <span className="text-sm">تحسين للهواتف المحمولة</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">فهرسة في محركات البحث</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">تتبع التحليلات</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={() => handleViewPage(page)}>
          <ExternalLink className="h-4 w-4 mr-2" />
          معاينة
        </Button>
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          حفظ التغييرات
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الصفحات والمحتوى</h2>
          <p className="text-gray-600">إدارة وتحرير محتوى الموقع والصفحات ({realPages.length} صفحة)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات الموقع
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            صفحة جديدة
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الصفحات</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realPages.length}</div>
            <p className="text-xs text-muted-foreground">
              صفحة نشطة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {realPages.reduce((total, page) => total + parseInt(page.views.replace(',', '')), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط SEO</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(realPages.reduce((total, page) => total + page.seoScore, 0) / realPages.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              جيد جداً
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">محسن للهاتف</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {realPages.filter(page => page.mobileOptimized).length}/{realPages.length}
            </div>
            <p className="text-xs text-muted-foreground">
              صفحة محسنة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="البحث في الصفحات..." className="pr-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="نوع الصفحة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="home">صفحة رئيسية</SelectItem>
                <SelectItem value="service">صفحة خدمات</SelectItem>
                <SelectItem value="form">نموذج</SelectItem>
                <SelectItem value="dashboard">لوحة تحكم</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="published">منشور</SelectItem>
                <SelectItem value="hidden">مخفي</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <div className="space-y-4">
        {realPages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Page Info */}
                <div className="lg:col-span-5">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{page.title}</h3>
                        <Badge className={
                          page.status === 'منشور' ? 'bg-green-100 text-green-800' :
                          page.status === 'مخفي' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {page.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{page.url}</p>
                      <p className="text-xs text-gray-500 mt-1">{page.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500 mt-1">
                        <span>آخر تحديث: {page.lastModified}</span>
                        <span>بواسطة: {page.modifiedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{page.views}</p>
                      <p className="text-xs text-gray-500">مشاهدة</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{page.seoScore}%</p>
                      <p className="text-xs text-gray-500">SEO</p>
                    </div>
                  </div>
                </div>

                {/* Type & Mobile */}
                <div className="lg:col-span-2">
                  <div className="space-y-2">
                    <Badge variant="outline">{page.type}</Badge>
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className={`h-4 w-4 ${page.mobileOptimized ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={page.mobileOptimized ? 'text-green-600' : 'text-red-600'}>
                        {page.mobileOptimized ? 'محسن للهاتف' : 'غير محسن'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewPage(page)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => handleEditPage(page)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <PageEditorModal page={page} />
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={page.status === 'منشور' ? 'text-yellow-600' : 'text-green-600'}
                      onClick={() => handleToggleVisibility(page)}
                    >
                      {page.status === 'منشور' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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

export default AdminPageManagement;
