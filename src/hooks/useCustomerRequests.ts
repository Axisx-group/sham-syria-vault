
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

      // تحويل البيانات إلى النموذج المطلوب
      const requests: NewCustomerRequest[] = applications?.map(app => ({
        id: app.application_token || app.id,
        name: `${app.first_name} ${app.last_name}`,
        email: app.email,
        phone: app.phone,
        accountType: app.account_type === 'business' ? 'تجاري' : 'شخصي',
        requestDate: new Date(app.created_at).toLocaleString('ar-SA'),
        location: `${app.city}, ${app.country}`,
        status: 'pending' as const,
        documents: [], // سيتم جلبها من جدول منفصل لاحقاً
        notes: app.admin_notes || 'طلب فتح حساب جديد'
      })) || [];

      setNewCustomerRequests(requests);
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
