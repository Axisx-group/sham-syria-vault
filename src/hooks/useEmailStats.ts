
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface EmailStats {
  totalEmails: number;
  unreadEmails: number;
  sentEmails: number;
  inboxEmails: number;
  lastUpdated: Date;
}

export const useEmailStats = () => {
  const [emailStats, setEmailStats] = useState<EmailStats>({
    totalEmails: 0,
    unreadEmails: 0,
    sentEmails: 0,
    inboxEmails: 0,
    lastUpdated: new Date()
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmailStats = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // يمكن استبدال هذا بـ API حقيقي لجلب إحصائيات الإيميل
      // const { data, error } = await supabase.functions.invoke('get-email-stats');
      
      // بيانات تجريبية للآن
      const mockStats = {
        totalEmails: Math.floor(Math.random() * 1000) + 500,
        unreadEmails: Math.floor(Math.random() * 50) + 10,
        sentEmails: Math.floor(Math.random() * 200) + 100,
        inboxEmails: Math.floor(Math.random() * 300) + 150,
        lastUpdated: new Date()
      };
      
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setEmailStats(mockStats);
    } catch (err) {
      setError('فشل في جلب إحصائيات البريد الإلكتروني');
      console.error('Email stats fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailStats();
    
    // تحديث تلقائي كل 5 دقائق
    const interval = setInterval(fetchEmailStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    emailStats,
    isLoading,
    error,
    refetch: fetchEmailStats
  };
};
