
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BankTransaction {
  id: string;
  transaction_type: string;
  amount: number;
  currency: 'SYP' | 'USD' | 'EUR' | 'TRY';
  from_account_id?: string;
  to_account_id?: string;
  from_customer_name?: string;
  to_customer_name?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference_number: string;
  description?: string;
  fee: number;
  channel: 'mobile_app' | 'web' | 'atm' | 'branch';
  created_at: string;
  processed_at?: string;
  notes?: string;
  // Relations
  from_account?: {
    account_number: string;
    iban: string;
  };
  to_account?: {
    account_number: string;
    iban: string;
  };
}

export const useBankTransactions = () => {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('bank_transactions')
        .select(`
          *,
          from_account:bank_accounts!bank_transactions_from_account_id_fkey(
            account_number,
            iban
          ),
          to_account:bank_accounts!bank_transactions_to_account_id_fkey(
            account_number,
            iban
          )
        `)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setTransactions(data || []);
    } catch (err: any) {
      console.error('Error fetching bank transactions:', err);
      setError(err.message || 'حدث خطأ في جلب بيانات المعاملات');
      toast({
        title: 'خطأ',
        description: 'فشل في جلب بيانات المعاملات المالية',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (transactionId: string, status: 'pending' | 'completed' | 'failed' | 'cancelled') => {
    try {
      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'completed') {
        updateData.processed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('bank_transactions')
        .update(updateData)
        .eq('id', transactionId);

      if (error) throw error;

      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === transactionId 
            ? { ...transaction, ...updateData }
            : transaction
        )
      );

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة المعاملة بنجاح'
      });

      return true;
    } catch (err: any) {
      console.error('Error updating transaction status:', err);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة المعاملة',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    updateTransactionStatus
  };
};
