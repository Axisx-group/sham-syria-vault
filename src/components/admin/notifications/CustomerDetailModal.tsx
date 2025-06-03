import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Download,
  Eye
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { NewCustomerRequest } from "@/types/customerRequest";
import { supabase } from "@/integrations/supabase/client";

interface CustomerDetailModalProps {
  request: NewCustomerRequest;
}

interface DocumentInfo {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ request }) => {
  const [actionNotes, setActionNotes] = useState('');
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // جلب المستندات المرفقة بالطلب
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoadingDocuments(true);
        
        // جلب المستندات من جدول application_documents
        const { data: appDocuments, error: appDocsError } = await supabase
          .from('application_documents')
          .select('*')
          .eq('application_id', request.id);

        if (appDocsError) {
          console.error('خطأ في جلب مستندات الطلب:', appDocsError);
        }

        // جلب المستندات من جدول kyc_documents إذا كان هناك kyc_application_id
        const { data: application } = await supabase
          .from('account_applications')
          .select('kyc_application_id')
          .eq('application_token', request.id)
          .single();

        let kycDocuments: any[] = [];
        if (application?.kyc_application_id) {
          const { data: kycDocs, error: kycDocsError } = await supabase
            .from('kyc_documents')
            .select('*')
            .eq('kyc_application_id', application.kyc_application_id);

          if (kycDocsError) {
            console.error('خطأ في جلب مستندات KYC:', kycDocsError);
          } else {
            kycDocuments = kycDocs || [];
          }
        }

        // دمج جميع المستندات
        const allDocuments = [
          ...(appDocuments || []),
          ...kycDocuments.map(doc => ({
            ...doc,
            application_id: request.id // إضافة application_id للتوحيد
          }))
        ];

        setDocuments(allDocuments);
        console.log('المستندات المجلبة:', allDocuments);
      } catch (error) {
        console.error('خطأ في جلب المستندات:', error);
        toast({
          title: "خطأ",
          description: "فشل في جلب المستندات المرفقة",
          variant: "destructive"
        });
      } finally {
        setLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, [request.id, toast]);

  const sendApplicationEmail = async (applicationId: string, action: 'approve' | 'reject', customerName: string, customerEmail: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-application-emails', {
        body: {
          applicationToken: applicationId,
          customerName: customerName,
          customerEmail: customerEmail,
          accountType: request.accountType,
          action: action,
          adminNotes: actionNotes
        }
      });

      if (error) {
        console.error('خطأ في إرسال الإيميل:', error);
        throw error;
      }

      console.log('تم إرسال الإيميل بنجاح:', data);
      return data;
    } catch (error) {
      console.error('فشل في إرسال الإيميل:', error);
      // لا نرمي خطأ هنا لأن عدم إرسال الإيميل لا يجب أن يوقف عملية الموافقة
      toast({
        title: "تحذير",
        description: "تمت الموافقة على الطلب ولكن فشل في إرسال الإيميل للعميل",
        variant: "destructive"
      });
    }
  };

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      setProcessing(true);
      console.log(`${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      
      // تحديث حالة الطلب في قاعدة البيانات
      const { error } = await supabase
        .from('account_applications')
        .update({ 
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewed_at: new Date().toISOString(),
          admin_notes: actionNotes || (action === 'approve' ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب')
        })
        .eq('application_token', requestId);

      if (error) {
        throw error;
      }

      // إرسال الإيميل للعميل
      await sendApplicationEmail(requestId, action, request.name, request.email);

      // تسجيل العملية في سجل الوصول
      try {
        await supabase
          .from('admin_access_logs')
          .insert({
            access_type: `application_${action}`,
            additional_data: { 
              application_id: requestId,
              notes: actionNotes,
              timestamp: new Date().toISOString() 
            }
          });
      } catch (logError) {
        console.error('خطأ في تسجيل العملية:', logError);
        // نتجاهل خطأ التسجيل ولا نوقف العملية
      }

      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });

      setActionNotes('');
      
      // إعادة تحميل الصفحة لإظهار التحديثات
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('خطأ في معالجة الطلب:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الطلب",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'national_id': 'بطاقة الهوية الشخصية',
      'passport': 'جواز السفر',
      'driving_license': 'رخصة القيادة',
      'business_license': 'رخصة العمل',
      'commercial_registration': 'السجل التجاري',
      'bank_statement': 'كشف حساب بنكي',
      'salary_certificate': 'شهادة راتب',
      'other': 'مستند آخر'
    };
    return types[type] || type;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownloadDocument = async (doc: DocumentInfo) => {
    try {
      // محاولة تحميل المستند من Supabase Storage
      const { data, error } = await supabase.storage
        .from('kyc-documents')
        .download(doc.file_path);

      if (error) {
        console.error('خطأ في تحميل المستند:', error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل المستند",
          variant: "destructive"
        });
        return;
      }

      // إنشاء رابط للتحميل
      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "تم التحميل",
        description: `تم تحميل ${doc.file_name} بنجاح`
      });
    } catch (error) {
      console.error('خطأ في تحميل المستند:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل المستند",
        variant: "destructive"
      });
    }
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          تفاصيل طلب العميل: {request.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* معلومات العميل */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                  <p className="font-medium">{request.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">رقم الهاتف</p>
                  <p className="font-medium">{request.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">تاريخ الطلب</p>
                  <p className="font-medium">{request.requestDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">الموقع</p>
                  <p className="font-medium">{request.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل الحساب */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تفاصيل الحساب المطلوب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">نوع الحساب:</span>
                <Badge className="bg-blue-100 text-blue-800">{request.accountType}</Badge>
              </div>
              <div>
                <p className="text-gray-600 mb-2">ملاحظات الطلب:</p>
                <p className="bg-gray-50 p-3 rounded-lg text-sm">{request.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* المستندات المرفقة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              المستندات المرفقة ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDocuments ? (
              <div className="text-center py-4">
                <p className="text-gray-600">جاري تحميل المستندات...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-4">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">لا توجد مستندات مرفقة بهذا الطلب</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{getDocumentTypeLabel(doc.document_type)}</p>
                          <p className="text-xs text-gray-500 truncate max-w-32">{doc.file_name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {doc.mime_type?.includes('pdf') ? 'PDF' : 'صورة'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>الحجم:</span>
                        <span>{formatFileSize(doc.file_size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تاريخ الرفع:</span>
                        <span>{new Date(doc.uploaded_at).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadDocument(doc)}
                        className="flex-1"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        تحميل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadDocument(doc)}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        عرض
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* إجراءات الموافقة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إجراء الموافقة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="إضافة ملاحظات حول القرار (اختياري)..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              className="min-h-[100px]"
              disabled={processing}
            />
            <div className="flex gap-3">
              <Button
                onClick={() => handleApproval(request.id, 'approve')}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={processing}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {processing ? 'جاري المعالجة...' : 'الموافقة على الطلب'}
              </Button>
              <Button
                onClick={() => handleApproval(request.id, 'reject')}
                variant="outline"
                className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                disabled={processing}
              >
                <XCircle className="h-4 w-4 mr-2" />
                {processing ? 'جاري المعالجة...' : 'رفض الطلب'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
};

export default CustomerDetailModal;
