
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";

const AccountsSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الحسابات</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
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
              <p className="text-sm font-medium text-gray-600">إجمالي الأرصدة</p>
              <p className="text-2xl font-bold text-green-600">₺45.2M</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحسابات النشطة</p>
              <p className="text-2xl font-bold text-purple-600">1,156</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">النمو الشهري</p>
              <p className="text-2xl font-bold text-orange-600">+8.3%</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsSummaryCards;
