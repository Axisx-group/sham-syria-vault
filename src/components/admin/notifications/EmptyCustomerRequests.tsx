
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const EmptyCustomerRequests: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h4 className="text-lg font-medium text-gray-600 mb-2">
          لا توجد طلبات جديدة
        </h4>
        <p className="text-gray-500">
          جميع طلبات العملاء الجدد تمت مراجعتها
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyCustomerRequests;
