
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ExternalLink,
  Save,
  Eye,
  TrendingUp,
  BarChart3,
  Smartphone
} from "lucide-react";

interface PageEditorModalProps {
  page: any;
  onSave: () => void;
  onView: (page: any) => void;
}

const PageEditorModal = ({ page, onSave, onView }: PageEditorModalProps) => {
  return (
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
                  <Button size="sm" variant="outline" onClick={() => onView(page)}>
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
        <Button variant="outline" onClick={() => onView(page)}>
          <ExternalLink className="h-4 w-4 mr-2" />
          معاينة
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          حفظ التغييرات
        </Button>
      </div>
    </DialogContent>
  );
};

export default PageEditorModal;
