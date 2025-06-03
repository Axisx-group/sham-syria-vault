
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { 
  Globe, 
  Edit, 
  Eye, 
  EyeOff,
  Save,
  Settings,
  Smartphone,
  ExternalLink,
  X
} from "lucide-react";
import PageEditorModal from './PageEditorModal';

interface PageCardProps {
  page: any;
  editingInline: string | null;
  editedPages: { [key: string]: any };
  onView: (page: any) => void;
  onInlineEdit: (pageId: string) => void;
  onSaveInlineEdit: (pageId: string) => void;
  onCancelInlineEdit: () => void;
  onToggleVisibility: (page: any) => void;
  onInputChange: (pageId: string, field: string, value: any) => void;
  onSectionChange: (pageId: string, sectionIndex: number, value: string) => void;
  onSaveChanges: () => void;
}

const PageCard = ({
  page,
  editingInline,
  editedPages,
  onView,
  onInlineEdit,
  onSaveInlineEdit,
  onCancelInlineEdit,
  onToggleVisibility,
  onInputChange,
  onSectionChange,
  onSaveChanges
}: PageCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {editingInline === page.id ? (
          // Inline Edit Mode
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">تحرير: {page.title}</h3>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onSaveInlineEdit(page.id)}>
                  <Save className="h-4 w-4 mr-2" />
                  حفظ
                </Button>
                <Button size="sm" variant="outline" onClick={onCancelInlineEdit}>
                  <X className="h-4 w-4 mr-2" />
                  إلغاء
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان الصفحة</label>
                  <Input 
                    value={editedPages[page.id]?.title || page.title}
                    onChange={(e) => onInputChange(page.id, 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف الصفحة</label>
                  <Textarea 
                    value={editedPages[page.id]?.description || page.description}
                    onChange={(e) => onInputChange(page.id, 'description', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">حالة الصفحة</label>
                  <Select 
                    value={editedPages[page.id]?.status || page.status}
                    onValueChange={(value) => onInputChange(page.id, 'status', value)}
                  >
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
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">أقسام الصفحة</label>
                <div className="space-y-2">
                  {(editedPages[page.id]?.content?.sections || page.content.sections).map((section: string, index: number) => (
                    <div key={index}>
                      <Input 
                        value={section}
                        onChange={(e) => onSectionChange(page.id, index, e.target.value)}
                        placeholder={`القسم ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Display Mode
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
                <Button size="sm" variant="outline" onClick={() => onView(page)}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => onInlineEdit(page.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <PageEditorModal 
                    page={page} 
                    onSave={onSaveChanges}
                    onView={onView}
                  />
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={page.status === 'منشور' ? 'text-yellow-600' : 'text-green-600'}
                  onClick={() => onToggleVisibility(page)}
                >
                  {page.status === 'منشور' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageCard;
