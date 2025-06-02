
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react";

const CardsSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي البطاقات</p>
              <p className="text-2xl font-bold text-gray-900">3,251</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">البطاقات النشطة</p>
              <p className="text-2xl font-bold text-green-600">2,847</p>
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
              <p className="text-sm font-medium text-gray-600">البطاقات المحظورة</p>
              <p className="text-2xl font-bold text-red-600">89</p>
            </div>
            <div className="bg-red-500 p-3 rounded-full">
              <XCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الحدود الائتمانية</p>
              <p className="text-2xl font-bold text-purple-600">₺125M</p>
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

export default CardsSummaryCards;
