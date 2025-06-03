
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, UserX, Eye } from "lucide-react";

interface StatsCardsProps {
  securityStatus: any;
}

const StatsCards = ({ securityStatus }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الجلسات النشطة</p>
              <p className="text-2xl font-bold text-green-600">{securityStatus.activeSessions.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">نقاط الأمان</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-blue-600">{securityStatus.securityScore}/100</p>
                <Badge className="bg-blue-100 text-blue-800">ممتاز</Badge>
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">محاولات دخول فاشلة</p>
              <p className="text-2xl font-bold text-red-600">{securityStatus.failedLogins}</p>
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
              <p className="text-sm font-medium text-gray-600">أنشطة مشبوهة</p>
              <p className="text-2xl font-bold text-orange-600">{securityStatus.suspiciousActivity}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
