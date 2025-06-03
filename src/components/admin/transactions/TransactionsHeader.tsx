
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface TransactionsHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
}

const TransactionsHeader = ({ onRefresh, onExport }: TransactionsHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">إدارة المعاملات المصرفية</h2>
        <p className="text-gray-600">مراقبة ومراجعة جميع المعاملات المصرفية</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
        <Button onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          تصدير
        </Button>
      </div>
    </div>
  );
};

export default TransactionsHeader;
