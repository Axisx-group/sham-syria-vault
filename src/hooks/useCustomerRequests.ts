
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { NewCustomerRequest } from "@/types/customerRequest";

export const useCustomerRequests = () => {
  const [newCustomerRequests, setNewCustomerRequests] = useState<NewCustomerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomerRequests();
  }, []);

  const fetchCustomerRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // جلب طلبات الحسابات من قاعدة البيانات
      const { data: applications, error: applicationsError } = await supabase
        .from('account_applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (applicationsError) {
        throw applicationsError;
      }

      // تحويل البيانات إلى النموذج المطلوب وجلب عدد المستندات لكل طلب
      const requests: NewCustomerRequest[] = await Promise.all(
        (applications || []).map(async (app) => {
          // جلب عدد المستندات المرفقة بالطلب
          const { count: documentsCount } = await supabase
            .from('application_documents')
            .select('*', { count: 'exact', head: true })
            .eq('application_id', app.id);

          // جلب عدد مستندات KYC إذا كان متوفراً
          let kycDocumentsCount = 0;
          if (app.kyc_application_id) {
            const { count: kycCount } = await supabase
              .from('kyc_documents')
              .select('*', { count: 'exact', head: true })
              .eq('kyc_application_id', app.kyc_application_id);
            kycDocumentsCount = kycCount || 0;
          }

          const totalDocuments = (documentsCount || 0) + kycDocumentsCount;

          return {
            id: app.application_token || app.id,
            name: `${app.first_name} ${app.last_name}`,
            email: app.email,
            phone: app.phone,
            accountType: app.account_type === 'business' ? 'تجاري' : 'شخصي',
            requestDate: new Date(app.created_at).toLocaleString('ar-SA'),
            location: `${app.city}, ${app.country}`,
            status: 'pending' as const,
            documents: totalDocuments > 0 ? [`${totalDocuments} مستند مرفق`] : [],
            notes: app.admin_notes || 'طلب فتح حساب جديد'
          };
        })
      );

      setNewCustomerRequests(requests);
      console.log('طلبات العملاء المجلبة:', requests);
    } catch (err) {
      console.error('خطأ في جلب طلبات العملاء:', err);
      setError('فشل في جلب طلبات العملاء');
    } finally {
      setLoading(false);
    }
  };

  const pendingRequests = newCustomerRequests.filter(req => req.status === 'pending');

  const refreshRequests = () => {
    fetchCustomerRequests();
  };

  return {
    newCustomerRequests,
    pendingRequests,
    loading,
    error,
    refreshRequests
  };
};
