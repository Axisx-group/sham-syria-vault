
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CustomersHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">إدارة العملاء</h2>
        <p className="text-gray-600">إدارة وعرض معلومات جميع العملاء</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4 mr-2" />
        إضافة عميل جديد
      </Button>
    </div>
  );
};

export default CustomersHeader;
