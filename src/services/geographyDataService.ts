
import { supabase } from "@/integrations/supabase/client";

export const fetchCustomersData = async () => {
  console.log('جاري جلب بيانات العملاء...');
  const { data, error } = await supabase
    .from('customers')
    .select('*');

  if (error) {
    console.error('خطأ في جلب العملاء:', error);
    throw error;
  }

  console.log('تم جلب العملاء:', data?.length || 0);
  return data || [];
};

export const fetchAccountsData = async () => {
  console.log('جاري جلب بيانات الحسابات...');
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*');

  if (error) {
    console.error('خطأ في جلب الحسابات:', error);
    throw error;
  }

  console.log('تم جلب الحسابات:', data?.length || 0);
  return data || [];
};

export const fetchCardsData = async () => {
  console.log('جاري جلب بيانات البطاقات...');
  const { data, error } = await supabase
    .from('bank_cards')
    .select('*');

  if (error) {
    console.error('خطأ في جلب البطاقات:', error);
    throw error;
  }

  console.log('تم جلب البطاقات:', data?.length || 0);
  return data || [];
};
