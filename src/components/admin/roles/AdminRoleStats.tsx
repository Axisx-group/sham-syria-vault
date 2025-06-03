
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Key, Settings } from "lucide-react";

const AdminRoleStats = () => {
  return (
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
  );
};

export default AdminRoleStats;
