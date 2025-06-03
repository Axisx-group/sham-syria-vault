
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageSummaryCards from './pages/PageSummaryCards';
import PageFilters from './pages/PageFilters';
import PageCard from './pages/PageCard';

const AdminPageManagement = () => {
  const [editingInline, setEditingInline] = useState<string | null>(null);
  const [editedPages, setEditedPages] = useState<{[key: string]: any}>({});
  const { toast } = useToast();

  // Real pages from the application
  const [pages, setPages] = useState([
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
  ]);

  const handleViewPage = (page: any) => {
    window.open(page.route, '_blank');
    toast({
      title: "فتح الصفحة",
      description: `تم فتح صفحة ${page.title} في تبويب جديد`,
    });
  };

  const handleInlineEdit = (pageId: string) => {
    setEditingInline(pageId);
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setEditedPages({
        ...editedPages,
        [pageId]: { ...page }
      });
    }
  };

  const handleSaveInlineEdit = (pageId: string) => {
    const editedPage = editedPages[pageId];
    if (editedPage) {
      setPages(pages.map(page => 
        page.id === pageId ? {
          ...editedPage,
          lastModified: new Date().toLocaleString('ar-EG', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          modifiedBy: 'المدير'
        } : page
      ));
      
      toast({
        title: "تم حفظ التغييرات",
        description: `تم تحديث صفحة ${editedPage.title} بنجاح`,
      });
    }
    setEditingInline(null);
    setEditedPages({});
  };

  const handleCancelInlineEdit = () => {
    setEditingInline(null);
    setEditedPages({});
  };

  const handleInputChange = (pageId: string, field: string, value: any) => {
    setEditedPages({
      ...editedPages,
      [pageId]: {
        ...editedPages[pageId],
        [field]: value
      }
    });
  };

  const handleSectionChange = (pageId: string, sectionIndex: number, value: string) => {
    const currentPage = editedPages[pageId];
    if (currentPage) {
      const newSections = [...currentPage.content.sections];
      newSections[sectionIndex] = value;
      setEditedPages({
        ...editedPages,
        [pageId]: {
          ...currentPage,
          content: {
            ...currentPage.content,
            sections: newSections
          }
        }
      });
    }
  };

  const handleToggleVisibility = (page: any) => {
    const newStatus = page.status === 'منشور' ? 'مخفي' : 'منشور';
    setPages(pages.map(p => 
      p.id === page.id ? { ...p, status: newStatus } : p
    ));
    
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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الصفحات والمحتوى</h2>
          <p className="text-gray-600">إدارة وتحرير محتوى الموقع والصفحات ({pages.length} صفحة)</p>
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

      <PageSummaryCards pages={pages} />
      <PageFilters />

      {/* Pages List */}
      <div className="space-y-4">
        {pages.map((page) => (
          <PageCard
            key={page.id}
            page={page}
            editingInline={editingInline}
            editedPages={editedPages}
            onView={handleViewPage}
            onInlineEdit={handleInlineEdit}
            onSaveInlineEdit={handleSaveInlineEdit}
            onCancelInlineEdit={handleCancelInlineEdit}
            onToggleVisibility={handleToggleVisibility}
            onInputChange={handleInputChange}
            onSectionChange={handleSectionChange}
            onSaveChanges={handleSaveChanges}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPageManagement;
