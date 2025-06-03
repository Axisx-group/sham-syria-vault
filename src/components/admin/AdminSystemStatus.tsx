
import React from 'react';
import SystemStatusChecker from './SystemStatusChecker';
import AdminAuthSetup from './AdminAuthSetup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSystemStatus = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">حالة النظام</h1>
        <p className="text-gray-600">فحص الاتصالات والخدمات وإعداد المدير</p>
      </div>
      
      <Tabs defaultValue="status" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">حالة النظام</TabsTrigger>
          <TabsTrigger value="admin">إعداد المدير</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <SystemStatusChecker />
        </TabsContent>

        <TabsContent value="admin">
          <AdminAuthSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSystemStatus;
