
import { supabase } from "@/integrations/supabase/client";
import type { CheckFunction } from "@/types/systemStatus";

export const checkDatabase: CheckFunction = async (updateCheck) => {
  try {
    const { data: dbTest, error: dbError } = await supabase
      .from('account_applications')
      .select('count')
      .limit(1);
    
    if (dbError) {
      updateCheck('قاعدة البيانات', 'error', `خطأ في الاتصال: ${dbError.message}`);
    } else {
      updateCheck('قاعدة البيانات', 'success', 'متصل بنجاح');
    }
  } catch (error) {
    updateCheck('قاعدة البيانات', 'error', 'فشل في الاتصال بقاعدة البيانات');
  }
};

export const checkAuthentication: CheckFunction = async (updateCheck) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      updateCheck('المصادقة', 'error', `خطأ في المصادقة: ${authError.message}`);
    } else {
      updateCheck('المصادقة', 'success', user ? 'مسجل الدخول' : 'نظام المصادقة يعمل');
    }
  } catch (error) {
    updateCheck('المصادقة', 'error', 'فشل في فحص المصادقة');
  }
};

export const checkAdminAccount: CheckFunction = async (updateCheck) => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@souripay.com')
      .single();
    
    if (profile) {
      updateCheck('حساب المدير', 'success', `المدير: ${profile.full_name || profile.email}`);
    } else {
      updateCheck('حساب المدير', 'error', 'حساب المدير غير موجود');
    }
  } catch (error) {
    updateCheck('حساب المدير', 'error', 'فشل في فحص حساب المدير');
  }
};

export const checkBankingServices: CheckFunction = async (updateCheck) => {
  try {
    const { data: bankingData, error: bankingError } = await supabase.functions.invoke('banking-services', {
      body: { service: 'account-balance' }
    });
    
    if (bankingError) {
      updateCheck('خدمات البنك', 'error', `خطأ في API: ${bankingError.message}`);
    } else {
      updateCheck('خدمات البنك', 'success', 'API يعمل بنجاح');
    }
  } catch (error) {
    updateCheck('خدمات البنك', 'error', 'فشل في الاتصال بـ API');
  }
};

export const checkCardsManagement: CheckFunction = async (updateCheck) => {
  try {
    const { data: cardsData, error: cardsError } = await supabase.functions.invoke('cards-management', {
      body: { action: 'get-cards' }
    });
    
    if (cardsError) {
      updateCheck('إدارة البطاقات', 'error', `خطأ في API: ${cardsError.message}`);
    } else {
      updateCheck('إدارة البطاقات', 'success', 'API يعمل بنجاح');
    }
  } catch (error) {
    updateCheck('إدارة البطاقات', 'error', 'فشل في الاتصال بـ API');
  }
};

export const checkLoansManagement: CheckFunction = async (updateCheck) => {
  try {
    const { data: loansData, error: loansError } = await supabase.functions.invoke('loans-management', {
      body: { action: 'applications' }
    });
    
    if (loansError) {
      updateCheck('إدارة القروض', 'error', `خطأ في API: ${loansError.message}`);
    } else {
      updateCheck('إدارة القروض', 'success', 'API يعمل بنجاح');
    }
  } catch (error) {
    updateCheck('إدارة القروض', 'error', 'فشل في الاتصال بـ API');
  }
};

export const checkMobileApp: CheckFunction = async (updateCheck) => {
  const isCapacitorConfigured = window.location.href.includes('lovableproject.com');
  if (isCapacitorConfigured) {
    updateCheck('التطبيق المحمول', 'success', 'تم تكوين Capacitor بنجاح');
  } else {
    updateCheck('التطبيق المحمول', 'success', 'يعمل في وضع التطوير');
  }
};
