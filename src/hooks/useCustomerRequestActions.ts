
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useCustomerRequestActions = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const sendApplicationEmail = async (applicationId: string, action: 'approve' | 'reject') => {
    try {
      console.log('إرسال إيميل للطلب:', applicationId, 'الإجراء:', action);
      
      const { data, error } = await supabase.functions.invoke('send-application-emails', {
        body: {
          applicationToken: applicationId,
          customerName: '',
          customerEmail: '',
          accountType: '',
          action: action
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

  const handleApproval = async (requestId: string, action: 'approve' | 'reject', onRequestUpdated?: () => void) => {
    try {
      setLoading(true);
      console.log(`بدء ${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('غير مصرح: يجب تسجيل الدخول كمدير');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile || profile.role !== 'admin') {
        throw new Error('غير مصرح: يجب أن تكون مديراً للقيام بهذا الإجراء');
      }

      const { data: existingApp, error: searchError } = await supabase
        .from('account_applications')
        .select('*')
        .or(`application_token.eq.${requestId},id.eq.${requestId}`)
        .single();

      if (searchError) {
        console.error('خطأ في البحث عن الطلب:', searchError);
        throw new Error('لم يتم العثور على الطلب');
      }

      const { data: updatedApp, error: updateError } = await supabase
        .from('account_applications')
        .update({ 
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          admin_notes: action === 'approve' ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب'
        })
        .eq('id', existingApp.id)
        .select()
        .single();

      if (updateError) {
        console.error('خطأ في تحديث الطلب:', updateError);
        throw new Error(`فشل في تحديث حالة الطلب: ${updateError.message}`);
      }

      await sendApplicationEmail(requestId, action);

      try {
        const { error: logError } = await supabase
          .from('admin_access_logs')
          .insert({
            user_id: user.id,
            access_type: `application_${action}`,
            additional_data: { 
              application_id: requestId,
              application_token: existingApp.application_token,
              timestamp: new Date().toISOString() 
            }
          });

        if (logError) {
          console.error('خطأ في تسجيل العملية:', logError);
        }
      } catch (logError) {
        console.error('خطأ في تسجيل العملية:', logError);
      }

      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });

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
      setLoading(false);
    }
  };

  return {
    loading,
    handleApproval
  };
};
