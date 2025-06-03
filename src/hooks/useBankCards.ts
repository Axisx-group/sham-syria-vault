
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BankCard {
  id: string;
  customer_id: string;
  account_id: string;
  card_number: string;
  card_type: 'debit' | 'credit';
  card_brand: 'Visa' | 'Mastercard';
  card_category: 'standard' | 'gold' | 'platinum';
  status: 'active' | 'blocked' | 'expired';
  expiry_date: string;
  issue_date: string;
  credit_limit?: number;
  current_balance: number;
  security_level: string;
  created_at: string;
  updated_at: string;
  // Relations
  customer?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  account?: {
    account_number: string;
    iban: string;
  };
}

export const useBankCards = () => {
  const [cards, setCards] = useState<BankCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('bank_cards')
        .select(`
          *,
          customer:customers(
            first_name,
            last_name,
            email
          ),
          account:bank_accounts(
            account_number,
            iban
          )
        `)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setCards(data || []);
    } catch (err: any) {
      console.error('Error fetching bank cards:', err);
      setError(err.message || 'حدث خطأ في جلب بيانات البطاقات');
      toast({
        title: 'خطأ',
        description: 'فشل في جلب بيانات البطاقات البنكية',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCardStatus = async (cardId: string, status: 'active' | 'blocked' | 'expired') => {
    try {
      const { error } = await supabase
        .from('bank_cards')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', cardId);

      if (error) throw error;

      setCards(prev => 
        prev.map(card => 
          card.id === cardId 
            ? { ...card, status, updated_at: new Date().toISOString() }
            : card
        )
      );

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة البطاقة بنجاح'
      });

      return true;
    } catch (err: any) {
      console.error('Error updating card status:', err);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة البطاقة',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    fetchCards,
    updateCardStatus
  };
};
