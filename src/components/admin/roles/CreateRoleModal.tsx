
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
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
import { allPermissions } from "@/data/adminRoleData";

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

export default CreateRoleModal;
