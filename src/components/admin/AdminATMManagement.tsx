
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import ATMHeader from './atm/ATMHeader';
import ATMStatsCards from './atm/ATMStatsCards';
import ATMDevicesList from './atm/ATMDevicesList';
import ATMWithdrawalLimits from './atm/ATMWithdrawalLimits';
import ATMAnalytics from './atm/ATMAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminATMManagement = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    console.log('Refreshing ATM data');
    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات أجهزة الصراف الآلي",
    });
  };

  const handleExport = () => {
    console.log('Exporting ATM data');
    toast({
      title: "جاري التصدير",
      description: "سيتم تصدير تقارير ATM قريباً",
    });
  };

  return (
    <div className="space-y-6">
      <ATMHeader onRefresh={handleRefresh} onExport={handleExport} />
      
      <ATMStatsCards />

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="devices">الأجهزة</TabsTrigger>
          <TabsTrigger value="limits">حدود السحب</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="devices" className="space-y-4">
          <ATMDevicesList />
        </TabsContent>
        
        <TabsContent value="limits" className="space-y-4">
          <ATMWithdrawalLimits />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <ATMAnalytics />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-600">قريباً</h3>
            <p className="text-gray-500">نظام إدارة الصيانة قيد التطوير</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminATMManagement;
