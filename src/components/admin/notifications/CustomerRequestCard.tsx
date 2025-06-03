
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Mail,
  Phone
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NewCustomerRequest } from "@/types/customerRequest";
import CustomerDetailModal from './CustomerDetailModal';

interface CustomerRequestCardProps {
  request: NewCustomerRequest;
}

const CustomerRequestCard: React.FC<CustomerRequestCardProps> = ({ request }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const sendApplicationEmail = async (applicationId: string, action: 'approve' | 'reject') => {
    try {
      const { data, error } = await supabase.functions.invoke('send-application-emails', {
        body: {
          applicationToken: applicationId,
          customerName: request.name,
          customerEmail: request.email,
          accountType: request.accountType,
          action: action
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
      toast({
        title: "تحذير",
        description: "تمت الموافقة على الطلب ولكن فشل في إرسال الإيميل للعميل",
        variant: "destructive"
      });
    }
  };

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      setLoading(true);
      console.log(`${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      
      // تحديث حالة الطلب في قاعدة البيانات
      const { error } = await supabase
        .from('account_applications')
        .update({ 
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewed_at: new Date().toISOString(),
          admin_notes: action === 'approve' ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب'
        })
        .eq('application_token', requestId);

      if (error) {
        throw error;
      }

      // إرسال الإيميل للعميل
      await sendApplicationEmail(requestId, action);

      // تسجيل العملية في سجل الوصول
      try {
        await supabase
          .from('admin_access_logs')
          .insert({
            access_type: `application_${action}`,
            additional_data: { 
              application_id: requestId,
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
      setLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold">{request.name}</h4>
                <Badge className="bg-orange-100 text-orange-800">
                  {request.accountType}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{request.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{request.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{request.requestDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" disabled={loading}>
                  <Eye className="h-4 w-4 mr-2" />
                  مراجعة
                </Button>
              </DialogTrigger>
              <CustomerDetailModal request={request} />
            </Dialog>
            
            <Button
              size="sm"
              onClick={() => handleApproval(request.id, 'approve')}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {loading ? 'معالجة...' : 'موافقة'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleApproval(request.id, 'reject')}
              disabled={loading}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              {loading ? 'معالجة...' : 'رفض'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerRequestCard;
