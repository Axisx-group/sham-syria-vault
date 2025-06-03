
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Plus, Settings } from "lucide-react";

interface ATMHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
}

const ATMHeader = ({ onRefresh, onExport }: ATMHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">إدارة أجهزة الصراف الآلي</h2>
        <p className="text-gray-600">مراقبة وإدارة أجهزة الصراف الآلي وحدود السحب</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          إضافة جهاز
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          الإعدادات
        </Button>
        <Button onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          تصدير التقارير
        </Button>
      </div>
    </div>
  );
};

export default ATMHeader;
