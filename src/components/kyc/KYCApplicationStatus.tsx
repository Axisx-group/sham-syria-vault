
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  FileText,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface KYCApplication {
  id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'incomplete';
  level: 'basic' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
  verification_notes?: string;
}

interface KYCStep {
  id: string;
  step_name: string;
  step_type: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'incomplete';
  completed_at?: string;
}

const KYCApplicationStatus = () => {
  const [kycApplication, setKycApplication] = useState<KYCApplication | null>(null);
  const [kycSteps, setKycSteps] = useState<KYCStep[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchKYCStatus();
  }, []);

  const fetchKYCStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch latest KYC application
      const { data: kycData, error: kycError } = await supabase
        .from('kyc_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (kycError && kycError.code !== 'PGRST116') {
        throw kycError;
      }

      if (kycData) {
        setKycApplication(kycData);

        // Fetch verification steps
        const { data: stepsData, error: stepsError } = await supabase
          .from('kyc_verification_steps')
          .select('*')
          .eq('kyc_application_id', kycData.id)
          .order('created_at', { ascending: true });

        if (stepsError) throw stepsError;

        setKycSteps(stepsData || []);
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      toast({
        title: "خطأ في تحميل حالة التحقق",
        description: "حدث خطأ أثناء تحميل معلومات حالة التحقق من الهوية",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
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

  const getProgress = () => {
    if (kycSteps.length === 0) return 0;
    const completedSteps = kycSteps.filter(step => step.status === 'approved').length;
    return (completedSteps / kycSteps.length) * 100;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!kycApplication) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">حالة التحقق من الهوية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا يوجد طلب للتحقق من الهوية</h3>
            <p className="text-gray-600">قم بتقديم طلب فتح حساب جديد لبدء عملية التحقق من الهوية</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = getStatusConfig(kycApplication.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`p-3 rounded-full ${statusConfig.bgColor}`}>
                <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
              </div>
              <div>
                <CardTitle className="text-xl">حالة التحقق من الهوية</CardTitle>
                <p className="text-gray-600">{statusConfig.description}</p>
              </div>
            </div>
            <Badge className={statusConfig.badgeColor}>
              {statusConfig.title}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>التقدم الإجمالي</span>
                <span>{Math.round(getProgress())}%</span>
              </div>
              <Progress value={getProgress()} className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">مستوى التحقق</p>
                <p className="text-lg font-semibold">
                  {kycApplication.level === 'basic' ? 'أساسي' : 
                   kycApplication.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">تاريخ التقديم</p>
                <p className="text-lg font-semibold">
                  {new Date(kycApplication.created_at).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>

            {kycApplication.verification_notes && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">ملاحظات المراجعة:</h4>
                <p className="text-yellow-700">{kycApplication.verification_notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">خطوات التحقق</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0">
                  {step.status === 'approved' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : step.status === 'under_review' ? (
                    <Clock className="h-5 w-5 text-blue-500" />
                  ) : step.status === 'rejected' ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.step_name}</p>
                  <p className="text-sm text-gray-600">
                    {step.status === 'approved' ? 'مكتمل' :
                     step.status === 'under_review' ? 'قيد المراجعة' :
                     step.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                  </p>
                </div>
                {step.completed_at && (
                  <div className="text-sm text-gray-500">
                    {new Date(step.completed_at).toLocaleDateString('ar-SA')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {(kycApplication.status === 'incomplete' || kycApplication.status === 'rejected') && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button onClick={fetchKYCStatus} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                تحديث الحالة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KYCApplicationStatus;
