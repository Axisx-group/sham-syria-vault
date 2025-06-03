
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Download, CreditCard, Shield } from "lucide-react";

const AdminHeader = () => {
  const handleNetBankLogin = () => {
    console.log('تسجيل الدخول عبر نت بنك');
  };

  const handleSecurePortalAccess = () => {
    window.location.href = '/secure-admin-portal-nubarium-2024';
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة الشاملة</h1>
            <p className="text-sm text-gray-600">إدارة كاملة وشاملة لجميع عمليات البنك</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button 
              onClick={handleSecurePortalAccess}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              البوابة الآمنة
            </Button>
            <Button 
              onClick={handleNetBankLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              نت بنك
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              اليوم
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير شامل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
