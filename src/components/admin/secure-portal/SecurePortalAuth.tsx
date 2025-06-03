
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  isAuthenticated: boolean;
  currentUser: any;
  isLoading: boolean;
}

interface UseSecurePortalAuthReturn extends AuthState {
  loginAttempts: number;
  isBlocked: boolean;
  handleAccessCodeSubmit: (accessCode: string) => Promise<void>;
  handleSecureLogout: () => Promise<void>;
  resetAccessCode: () => void;
}

export const useSecurePortalAuth = (): UseSecurePortalAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { toast } = useToast();

  const SECURE_ACCESS_CODE = 'NUBARIUM_ADMIN_2024_SECURE';
  const MAX_LOGIN_ATTEMPTS = 3;

  useEffect(() => {
    checkAuthentication();
  }, []);

  const logAccessAttempt = async (userId?: string, accessType: string = 'secure_portal_attempt') => {
    try {
      await supabase
        .from('admin_access_logs')
        .insert({
          user_id: userId,
          access_type: accessType,
          ip_address: 'unknown',
          user_agent: navigator.userAgent,
          additional_data: { timestamp: new Date().toISOString() }
        });
    } catch (error) {
      console.error('فشل في تسجيل محاولة الوصول:', error);
    }
  };

  const checkAuthentication = async () => {
    try {
      console.log('فحص المصادقة...');
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.log('لا يوجد مستخدم مسجل دخول');
        setIsLoading(false);
        return;
      }

      console.log('المستخدم:', user.email);
      setCurrentUser(user);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.log('خطأ في الحصول على الملف الشخصي');
        setIsLoading(false);
        return;
      }

      console.log('دور المستخدم:', profile.role, 'الإيميل:', profile.email);

      if (profile.role !== 'admin' || profile.email !== 'admin@souripay.com') {
        console.log('المستخدم ليس مدير مصرح');
        setIsLoading(false);
        return;
      }

      const savedCode = localStorage.getItem('secure_admin_access');
      if (savedCode === SECURE_ACCESS_CODE) {
        console.log('رمز وصول صحيح محفوظ');
        setIsAuthenticated(true);
      }

      logAccessAttempt(user.id, 'secure_portal_check');
      
    } catch (error) {
      console.error('خطأ في فحص المصادقة:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessCodeSubmit = async (accessCode: string) => {
    if (isBlocked) {
      toast({
        title: 'تم حظر الوصول',
        description: 'تم تجاوز الحد الأقصى لمحاولات الدخول. يرجى المحاولة لاحقاً',
        variant: 'destructive'
      });
      return;
    }

    if (accessCode === SECURE_ACCESS_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('secure_admin_access', accessCode);
      setLoginAttempts(0);
      
      logAccessAttempt(currentUser?.id, 'secure_portal_success');

      toast({
        title: 'تم الوصول بنجاح',
        description: 'مرحباً بك في البوابة الآمنة للإدارة',
      });
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setIsBlocked(true);
        setTimeout(() => {
          setIsBlocked(false);
          setLoginAttempts(0);
        }, 15 * 60 * 1000);
      }

      logAccessAttempt(currentUser?.id, 'secure_portal_failed');

      toast({
        title: 'رمز وصول خاطئ',
        description: `محاولة ${newAttempts} من ${MAX_LOGIN_ATTEMPTS}`,
        variant: 'destructive'
      });
    }
  };

  const handleSecureLogout = async () => {
    localStorage.removeItem('secure_admin_access');
    setIsAuthenticated(false);
    
    logAccessAttempt(currentUser?.id, 'secure_portal_logout');

    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم الخروج من البوابة الآمنة بنجاح',
    });
  };

  const resetAccessCode = () => {
    // This function can be used to reset access code if needed
  };

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    loginAttempts,
    isBlocked,
    handleAccessCodeSubmit,
    handleSecureLogout,
    resetAccessCode
  };
};
