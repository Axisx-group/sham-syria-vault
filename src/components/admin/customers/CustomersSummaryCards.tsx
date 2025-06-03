
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users,
  UserCheck,
  UserX,
  TrendingUp
} from "lucide-react";

const CustomersSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">العملاء النشطون</p>
              <p className="text-2xl font-bold text-green-600">1,089</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">العملاء المعلقون</p>
              <p className="text-2xl font-bold text-red-600">47</p>
            </div>
            <div className="bg-red-500 p-3 rounded-full">
              <UserX className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">نمو العملاء الشهري</p>
              <p className="text-2xl font-bold text-purple-600">+12.5%</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersSummaryCards;
