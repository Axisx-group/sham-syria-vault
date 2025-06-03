
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BankAccount {
  id: string;
  customer_id: string;
  account_number: string;
  iban: string;
  account_type: 'checking' | 'savings' | 'business';
  currency: 'SYP' | 'USD' | 'EUR' | 'TRY';
  balance: number;
  status: 'active' | 'suspended' | 'closed';
  open_date: string;
  last_activity?: string;
  branch_code?: string;
  created_at: string;
  updated_at: string;
  // Relations
  customer?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const useBankAccounts = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('bank_accounts')
        .select(`
          *,
          customer:customers(
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setAccounts(data || []);
    } catch (err: any) {
      console.error('Error fetching bank accounts:', err);
      setError(err.message || 'حدث خطأ في جلب بيانات الحسابات');
      toast({
        title: 'خطأ',
        description: 'فشل في جلب بيانات الحسابات البنكية',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAccountStatus = async (accountId: string, status: 'active' | 'suspended' | 'closed') => {
    try {
      const { error } = await supabase
        .from('bank_accounts')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', accountId);

      if (error) throw error;

      setAccounts(prev => 
        prev.map(account => 
          account.id === accountId 
            ? { ...account, status, updated_at: new Date().toISOString() }
            : account
        )
      );

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة الحساب بنجاح'
      });

      return true;
    } catch (err: any) {
      console.error('Error updating account status:', err);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الحساب',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    updateAccountStatus
  };
};
