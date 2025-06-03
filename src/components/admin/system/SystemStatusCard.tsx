
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import type { SystemCheck } from "@/types/systemStatus";

interface SystemStatusCardProps {
  check: SystemCheck;
}

const SystemStatusCard = ({ check }: SystemStatusCardProps) => {
  const IconComponent = check.icon;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">يعمل</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">فحص</Badge>;
    }
  };

  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-gray-600" />
            <span className="font-medium">{check.name}</span>
          </div>
          {getStatusIcon(check.status)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{check.message}</span>
          {getStatusBadge(check.status)}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
