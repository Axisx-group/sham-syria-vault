
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
  Filter
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

const AdminPageManagement = () => {
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const pages = [
    {
      id: 'PAGE001',
      title: 'الصفحة الرئيسية',
      url: '/',
      status: 'منشور',
      lastModified: '2024-01-20 14:30',
      modifiedBy: 'أحمد المطور',
      views: '12,543',
      type: 'صفحة رئيسية',
      template: 'home-template',
      seoScore: 95,
      mobileOptimized: true,
      content: {
        heroTitle: 'البنك السوري الرقمي',
        heroSubtitle: 'خدمات مصرفية متطورة ومبتكرة',
        featuresCount: 6,
        testimonialsCount: 4
      }
    },
    {
      id: 'PAGE002',
      title: 'الخدمات المصرفية',
      url: '/banking-services',
      status: 'منشور',
      lastModified: '2024-01-19 10:15',
      modifiedBy: 'سارة المحررة',
      views: '8,234',
      type: 'صفحة خدمات',
      template: 'services-template',
      seoScore: 88,
      mobileOptimized: true,
      content: {
        servicesCount: 8,
        categoriesCount: 4,
        ctaButtons: 3
      }
    },
    {
      id: 'PAGE003',
      title: 'تطبيق للحساب الشخصي',
      url: '/apply/personal',
      status: 'مسودة',
      lastModified: '2024-01-18 16:45',
      modifiedBy: 'محمد المطور',
      views: '5,671',
      type: 'نموذج طلب',
      template: 'form-template',
      seoScore: 76,
      mobileOptimized: false,
      content: {
        formSteps: 4,
        fieldsCount: 12,
        validationRules: 8
      }
    }
  ];

  const pageTemplates = [
    { id: 'home', name: 'قالب الصفحة الرئيسية', preview: '/previews/home.jpg' },
    { id: 'services', name: 'قالب الخدمات', preview: '/previews/services.jpg' },
    { id: 'form', name: 'قالب النماذج', preview: '/previews/form.jpg' },
    { id: 'landing', name: 'قالب الهبوط', preview: '/previews/landing.jpg' }
  ];

  const siteSettings = {
    siteName: 'البنك السوري الرقمي',
    siteDescription: 'خدمات مصرفية متطورة ومبتكرة للعملاء في سوريا',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    supportedLanguages: ['العربية', 'English'],
    socialMedia: {
      facebook: 'https://facebook.com/syrianbank',
      twitter: 'https://twitter.com/syrianbank',
      linkedin: 'https://linkedin.com/company/syrianbank'
    }
  };

  const PageEditorModal = ({ page }: any) => (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle>تحرير الصفحة: {page.title}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="design">التصميم</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Editor */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان الصفحة</label>
                <Input defaultValue={page.title} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">الرابط</label>
                <Input defaultValue={page.url} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف قصير</label>
                <Textarea placeholder="وصف مختصر للصفحة..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المحتوى الرئيسي</label>
                <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                  <p className="text-gray-500">محرر المحتوى المرئي</p>
                  <div className="mt-4 space-y-2">
                    <div className="bg-white p-3 rounded border">العنوان الرئيسي</div>
                    <div className="bg-white p-3 rounded border">الفقرة الأولى</div>
                    <div className="bg-white p-3 rounded border">صورة</div>
                    <div className="bg-white p-3 rounded border">الفقرة الثانية</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">معاينة</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg aspect-video bg-white p-4">
                <div className="bg-gray-100 h-full rounded flex items-center justify-center">
                  <span className="text-gray-500">معاينة الصفحة</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اختيار القالب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {pageTemplates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-3 cursor-pointer hover:border-blue-500">
                      <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                        <Layout className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">{template.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تخصيص الألوان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#1e40af" className="w-16 h-10" />
                    <Input defaultValue="#1e40af" className="flex-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                    <Input defaultValue="#3b82f6" className="flex-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون النص</label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#1f2937" className="w-16 h-10" />
                    <Input defaultValue="#1f2937" className="flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <Input placeholder="عنوان الصفحة في محركات البحث" />
                  <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 60 حرف</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف SEO</label>
                  <Textarea placeholder="وصف الصفحة في محركات البحث..." />
                  <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 160 حرف</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الكلمات المفتاحية</label>
                  <Input placeholder="كلمة1، كلمة2، كلمة3" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">صورة المشاركة</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">اختر صورة للمشاركة</p>
                  </div>
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
                      <span>الكلمات المفتاحية</span>
                      <span className="text-yellow-600">!</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>صورة المشاركة</span>
                      <span className="text-red-600">✗</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>سرعة التحميل</span>
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                </div>
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
                      <SelectItem value="مسودة">مسودة</SelectItem>
                      <SelectItem value="مخفي">مخفي</SelectItem>
                      <SelectItem value="محذوف">محذوف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">تاريخ النشر</label>
                  <Input type="datetime-local" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">المؤلف</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المؤلف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin1">أحمد المطور</SelectItem>
                      <SelectItem value="admin2">سارة المحررة</SelectItem>
                      <SelectItem value="admin3">محمد المطور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الوصول</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الرؤية</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الرؤية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">عام</SelectItem>
                      <SelectItem value="members">الأعضاء فقط</SelectItem>
                      <SelectItem value="private">خاص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور (للصفحات الخاصة)</label>
                  <Input type="password" placeholder="كلمة مرور اختيارية" />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">السماح بالتعليقات</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">فهرسة في محركات البحث</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">تحسين للهواتف المحمولة</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline">معاينة</Button>
        <Button>حفظ التغييرات</Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الصفحات والمحتوى</h2>
          <p className="text-gray-600">إدارة وتحرير محتوى الموقع والصفحات</p>
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

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">الصفحات</TabsTrigger>
          <TabsTrigger value="media">المكتبة</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="site-settings">إعدادات الموقع</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="space-y-4">
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
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="published">منشور</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="hidden">مخفي</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="home">صفحة رئيسية</SelectItem>
                      <SelectItem value="service">صفحة خدمات</SelectItem>
                      <SelectItem value="form">نموذج</SelectItem>
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
              {pages.map((page) => (
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
                                page.status === 'مسودة' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {page.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{page.url}</p>
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <PageEditorModal page={page} />
                          </Dialog>
                          
                          <Button size="sm" variant="outline" className={page.status === 'منشور' ? 'text-yellow-600' : 'text-green-600'}>
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
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>مكتبة الوسائط</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  رفع ملف جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قوالب الصفحات</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  قالب جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <Layout className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">معاينة</Button>
                        <Button size="sm" className="flex-1">استخدام</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site-settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الموقع</label>
                  <Input defaultValue={siteSettings.siteName} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف الموقع</label>
                  <Textarea defaultValue={siteSettings.siteDescription} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">شعار الموقع</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">ارفع شعار الموقع</p>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">فيسبوك</label>
                  <Input defaultValue={siteSettings.socialMedia.facebook} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">تويتر</label>
                  <Input defaultValue={siteSettings.socialMedia.twitter} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">لينكدإن</label>
                  <Input defaultValue={siteSettings.socialMedia.linkedin} />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الروابط
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPageManagement;
