
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface KYCApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: {
    id: string;
    customerName: string;
    level: string;
    status: string;
    submittedAt: string;
    progress: number;
    email?: string;
    phone?: string;
    address?: string;
    documents?: Array<{
      type: string;
      status: string;
      uploadedAt: string;
    }>;
  } | null;
  onStatusUpdate?: (applicationId: string, newStatus: string) => void;
}

const KYCApplicationDialog: React.FC<KYCApplicationDialogProps> = ({
  open,
  onOpenChange,
  application,
  onStatusUpdate
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  if (!application) return null;

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusUpdate) {
        onStatusUpdate(application.id, 'approved');
      }
      
      toast({
        title: "تم الموافقة على الطلب",
        description: `تم الموافقة على طلب التحقق ${application.id} بنجاح`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "خطأ في الموافقة",
        description: "حدث خطأ أثناء الموافقة على الطلب",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusUpdate) {
        onStatusUpdate(application.id, 'rejected');
      }
      
      toast({
        title: "تم رفض الطلب",
        description: `تم رفض طلب التحقق ${application.id}`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "خطأ في الرفض",
        description: "حدث خطأ أثناء رفض الطلب",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartReview = async () => {
    setIsProcessing(true);
    try {
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusUpdate) {
        onStatusUpdate(application.id, 'under_review');
      }
      
      toast({
        title: "تم بدء المراجعة",
        description: `تم نقل الطلب ${application.id} إلى مرحلة المراجعة`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "خطأ في بدء المراجعة",
        description: "حدث خطأ أثناء بدء مراجعة الطلب",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير محدد</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'basic':
        return <Badge variant="outline" className="text-green-600">أساسي</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="text-blue-600">متوسط</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="text-purple-600">متقدم</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under_review':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const mockDocuments = [
    { type: 'الهوية الشخصية', status: 'approved', uploadedAt: '2024-01-20 14:30' },
    { type: 'كشف حساب مصرفي', status: 'under_review', uploadedAt: '2024-01-20 14:32' },
    { type: 'إثبات عنوان', status: 'approved', uploadedAt: '2024-01-20 14:35' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <User className="h-6 w-6 text-blue-600" />
            تفاصيل طلب التحقق من الهوية
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {application.customerName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{application.customerName}</h3>
                <p className="text-gray-600">#{application.id}</p>
                <div className="flex items-center gap-2 mt-1">
                  {getLevelBadge(application.level)}
                  {getStatusBadge(application.status)}
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600 mb-2">تاريخ التقديم</p>
              <p className="font-semibold">{application.submittedAt}</p>
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600">التقدم</span>
                  <span className="text-sm font-semibold">{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="w-32" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                المعلومات الشخصية
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">البريد الإلكتروني:</span>
                  <span>{application.email || 'ahmed.mohamed@example.com'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">رقم الهاتف:</span>
                  <span>{application.phone || '+963 123 456 789'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">العنوان:</span>
                  <span>{application.address || 'دمشق، سوريا'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">تاريخ الميلاد:</span>
                  <span>1990-05-15</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                معلومات الطلب
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">نوع الحساب:</span>
                  <Badge variant="outline">حساب شخصي</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">مستوى التحقق:</span>
                  {getLevelBadge(application.level)}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">الحالة:</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    {getStatusBadge(application.status)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">العملة المفضلة:</span>
                  <span>الليرة السورية (SYP)</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Documents Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              الوثائق المرفقة
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDocuments.map((doc, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm">{doc.type}</h5>
                    {getStatusIcon(doc.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">تم الرفع في:</span>
                    <span className="text-xs">{doc.uploadedAt}</span>
                  </div>
                  <div className="mt-2">
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              إغلاق
            </Button>
            {application.status === 'under_review' && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isProcessing}>
                      رفض الطلب
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent dir="rtl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>تأكيد رفض الطلب</AlertDialogTitle>
                      <AlertDialogDescription>
                        هل أنت متأكد من رفض طلب التحقق #{application.id}؟ لا يمكن التراجع عن هذا الإجراء.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
                        {isProcessing ? "جاري الرفض..." : "تأكيد الرفض"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700" disabled={isProcessing}>
                      الموافقة على الطلب
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent dir="rtl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>تأكيد الموافقة على الطلب</AlertDialogTitle>
                      <AlertDialogDescription>
                        هل أنت متأكد من الموافقة على طلب التحقق #{application.id}؟ سيتم تفعيل الحساب فوراً.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                        {isProcessing ? "جاري الموافقة..." : "تأكيد الموافقة"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            {application.status === 'pending' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700" disabled={isProcessing}>
                    بدء المراجعة
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent dir="rtl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>بدء مراجعة الطلب</AlertDialogTitle>
                    <AlertDialogDescription>
                      هل تريد نقل طلب التحقق #{application.id} إلى مرحلة المراجعة؟
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={handleStartReview} className="bg-blue-600 hover:bg-blue-700">
                      {isProcessing ? "جاري البدء..." : "بدء المراجعة"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCApplicationDialog;
