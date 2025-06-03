
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone,
  TrendingUp,
  AlertTriangle,
  DollarSign
} from "lucide-react";

const ATMStatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الأجهزة</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-green-600">+2 الشهر الماضي</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المعاملات اليوم</p>
              <p className="text-2xl font-bold text-green-600">1,847</p>
              <p className="text-xs text-green-600">+15.2% من الأمس</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">أجهزة معطلة</p>
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-xs text-red-600">تحتاج صيانة فورية</p>
            </div>
            <div className="bg-red-500 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي السحوبات</p>
              <p className="text-2xl font-bold text-purple-600">₺2.4M</p>
              <p className="text-xs text-purple-600">اليوم</p>
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

export default ATMStatsCards;
