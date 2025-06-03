
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
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
import { roles } from "@/data/adminRoleData";

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

export default CreateAdminModal;
