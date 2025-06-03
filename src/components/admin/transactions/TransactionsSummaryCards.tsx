
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";

const TransactionsSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">معاملات اليوم</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-green-600">+12.5% من الأمس</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المعاملات المكتملة</p>
              <p className="text-2xl font-bold text-green-600">1,156</p>
              <p className="text-xs text-green-600">93.7% معدل النجاح</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
              <p className="text-2xl font-bold text-yellow-600">45</p>
              <p className="text-xs text-yellow-600">تحتاج مراجعة</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المبلغ</p>
              <p className="text-2xl font-bold text-purple-600">₺15.7M</p>
              <p className="text-xs text-purple-600">معاملات اليوم</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsSummaryCards;
