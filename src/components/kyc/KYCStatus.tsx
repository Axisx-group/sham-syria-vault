
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  Shield,
  FileText,
  User,
  CreditCard,
  RefreshCw
} from "lucide-react";

interface KYCStatusProps {
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'incomplete';
  level: 'basic' | 'intermediate' | 'advanced';
  completedSteps: string[];
  pendingSteps: string[];
  rejectedSteps?: string[];
}

const KYCStatus: React.FC<KYCStatusProps> = ({ 
  status, 
  level, 
  completedSteps, 
  pendingSteps,
  rejectedSteps = []
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          badgeColor: 'bg-green-100 text-green-800',
          title: 'تم التحقق بنجاح',
          description: 'تم قبول طلب التحقق من الهوية'
        };
      case 'under_review':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          badgeColor: 'bg-blue-100 text-blue-800',
          title: 'قيد المراجعة',
          description: 'يتم مراجعة مستنداتك من قبل فريقنا'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          badgeColor: 'bg-red-100 text-red-800',
          title: 'تم الرفض',
          description: 'بحاجة لتصحيح بعض المعلومات'
        };
      case 'incomplete':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          badgeColor: 'bg-yellow-100 text-yellow-800',
          title: 'غير مكتمل',
          description: 'يرجى إكمال جميع الخطوات المطلوبة'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          badgeColor: 'bg-gray-100 text-gray-800',
          title: 'في الانتظار',
          description: 'لم يتم البدء في عملية التحقق بعد'
        };
    }
  };

  const getLevelInfo = () => {
    switch (level) {
      case 'basic':
        return {
          title: 'التحقق الأساسي',
          limits: 'حد أقصى: $1,000 شهرياً',
          icon: User,
          color: 'text-green-600'
        };
      case 'intermediate':
        return {
          title: 'التحقق المتوسط',
          limits: 'حد أقصى: $10,000 شهرياً',
          icon: Shield,
          color: 'text-blue-600'
        };
      case 'advanced':
        return {
          title: 'التحقق المتقدم',
          limits: 'حد أقصى: $100,000 شهرياً',
          icon: CreditCard,
          color: 'text-purple-600'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const levelInfo = getLevelInfo();
  const StatusIcon = statusConfig.icon;
  const LevelIcon = levelInfo.icon;

  const getProgress = () => {
    const total = completedSteps.length + pendingSteps.length + rejectedSteps.length;
    return total > 0 ? (completedSteps.length / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`p-3 rounded-full ${statusConfig.bgColor}`}>
                <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
              </div>
              <div>
                <CardTitle className="text-xl">{statusConfig.title}</CardTitle>
                <p className="text-gray-600">{statusConfig.description}</p>
              </div>
            </div>
            <Badge className={statusConfig.badgeColor}>
              {status === 'approved' ? 'مؤكد' : 
               status === 'under_review' ? 'قيد المراجعة' :
               status === 'rejected' ? 'مرفوض' :
               status === 'incomplete' ? 'غير مكتمل' : 'في الانتظار'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Info */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <LevelIcon className={`h-5 w-5 ${levelInfo.color}`} />
              <div>
                <p className="font-semibold">{levelInfo.title}</p>
                <p className="text-sm text-gray-600">{levelInfo.limits}</p>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>التقدم الإجمالي</span>
                <span>{Math.round(getProgress())}%</span>
              </div>
              <Progress value={getProgress()} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completed Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              تم الإنجاز ({completedSteps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
              {completedSteps.length === 0 && (
                <p className="text-sm text-gray-500">لا توجد خطوات مكتملة</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              في الانتظار ({pendingSteps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
              {pendingSteps.length === 0 && (
                <p className="text-sm text-gray-500">لا توجد خطوات معلقة</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rejected Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              بحاجة لتصحيح ({rejectedSteps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rejectedSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
              {rejectedSteps.length === 0 && (
                <p className="text-sm text-gray-500">لا توجد خطوات مرفوضة</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      {(status === 'incomplete' || status === 'rejected') && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                إكمال التحقق
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                عرض المتطلبات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KYCStatus;
