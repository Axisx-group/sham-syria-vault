
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NewCustomerRequest } from "@/types/customerRequest";

interface CustomerApprovalActionsProps {
  request: NewCustomerRequest;
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  onRequestUpdated?: () => void;
}

const CustomerApprovalActions: React.FC<CustomerApprovalActionsProps> = ({
  request,
  processing,
  setProcessing,
  onRequestUpdated
}) => {
  const [actionNotes, setActionNotes] = useState('');
  const { toast } = useToast();

  const sendApplicationEmail = async (applicationId: string, action: 'approve' | 'reject', customerName: string, customerEmail: string) => {
    try {
      console.log('إرسال إيميل للطلب:', applicationId, 'الإجراء:', action);
      
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
        toast({
          title: "تحذير",
          description: "تمت معالجة الطلب ولكن فشل في إرسال الإيميل للعميل",
          variant: "destructive"
        });
      } else {
        console.log('تم إرسال الإيميل بنجاح:', data);
      }

      return data;
    } catch (error) {
      console.error('فشل في إرسال الإيميل:', error);
      toast({
        title: "تحذير",
        description: "تمت معالجة الطلب ولكن فشل في إرسال الإيميل للعميل",
        variant: "destructive"
      });
    }
  };

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      setProcessing(true);
      console.log(`بدء ${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('غير مصرح: يجب تسجيل الدخول كمدير');
      }
      console.log('المستخدم المصادق:', user.id);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile || profile.role !== 'admin') {
        throw new Error('غير مصرح: يجب أن تكون مديراً للقيام بهذا الإجراء');
      }
      console.log('تم تأكيد صلاحيات المدير');

      const { data: existingApp, error: searchError } = await supabase
        .from('account_applications')
        .select('*')
        .or(`application_token.eq.${requestId},id.eq.${requestId}`)
        .single();

      if (searchError) {
        console.error('خطأ في البحث عن الطلب:', searchError);
        throw new Error('لم يتم العثور على الطلب');
      }

      console.log('تم العثور على الطلب:', existingApp);

      const { data: updatedApp, error: updateError } = await supabase
        .from('account_applications')
        .update({ 
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          admin_notes: actionNotes || (action === 'approve' ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب')
        })
        .eq('id', existingApp.id)
        .select()
        .single();

      if (updateError) {
        console.error('خطأ في تحديث الطلب:', updateError);
        throw new Error(`فشل في تحديث حالة الطلب: ${updateError.message}`);
      }

      console.log('تم تحديث الطلب بنجاح:', updatedApp);

      await sendApplicationEmail(requestId, action, request.name, request.email);

      try {
        const { error: logError } = await supabase
          .from('admin_access_logs')
          .insert({
            user_id: user.id,
            access_type: `application_${action}`,
            additional_data: { 
              application_id: requestId,
              application_token: existingApp.application_token,
              notes: actionNotes,
              timestamp: new Date().toISOString() 
            }
          });

        if (logError) {
          console.error('خطأ في تسجيل العملية:', logError);
        } else {
          console.log('تم تسجيل العملية بنجاح');
        }
      } catch (logError) {
        console.error('خطأ في تسجيل العملية:', logError);
      }

      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });

      setActionNotes('');
      
      if (onRequestUpdated) {
        onRequestUpdated();
      }
      
    } catch (error: any) {
      console.error('خطأ في معالجة الطلب:', error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء معالجة الطلب",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
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
  );
};

export default CustomerApprovalActions;
