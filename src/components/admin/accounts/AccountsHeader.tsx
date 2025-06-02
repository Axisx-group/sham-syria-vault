
import React from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const AccountsHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">إدارة الحسابات المصرفية</h2>
        <p className="text-gray-600">مراقبة وإدارة جميع الحسابات المصرفية</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <CreditCard className="h-4 w-4 mr-2" />
        إنشاء حساب جديد
      </Button>
    </div>
  );
};

export default AccountsHeader;
