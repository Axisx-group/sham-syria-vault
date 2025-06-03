
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Crown,
  Search,
  Filter,
  Eye,
  Edit,
  UserMinus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminUsers, roles } from "@/data/adminRoleData";

const AdminsList = () => {
  return (
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
  );
};

export default AdminsList;
