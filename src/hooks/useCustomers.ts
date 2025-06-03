
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_type: 'personal' | 'business';
  status: 'active' | 'suspended' | 'closed';
  join_date: string;
  last_login?: string;
  location?: string;
  nationality?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setCustomers(data || []);
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'حدث خطأ في جلب بيانات العملاء');
      toast({
        title: 'خطأ',
        description: 'فشل في جلب بيانات العملاء',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerStatus = async (customerId: string, status: 'active' | 'suspended' | 'closed') => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', customerId);

      if (error) throw error;

      // Update local state
      setCustomers(prev => 
        prev.map(customer => 
          customer.id === customerId 
            ? { ...customer, status, updated_at: new Date().toISOString() }
            : customer
        )
      );

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة العميل بنجاح'
      });

      return true;
    } catch (err: any) {
      console.error('Error updating customer status:', err);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة العميل',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    updateCustomerStatus
  };
};
