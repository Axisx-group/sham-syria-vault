
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
  const CODE_EXPIRY_HOURS = 24; // مدة صلاحية الرمز بالساعات

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

  const isCodeExpired = () => {
    const lastSaveTime = localStorage.getItem('secure_admin_access_time');
    if (!lastSaveTime) return true;
    
    const saveTime = new Date(lastSaveTime);
    const now = new Date();
    const diffHours = (now.getTime() - saveTime.getTime()) / (1000 * 60 * 60);
    
    return diffHours > CODE_EXPIRY_HOURS;
  };

  const clearStoredCode = () => {
    localStorage.removeItem('secure_admin_access');
    localStorage.removeItem('secure_admin_access_time');
  };

  const checkAuthentication = async () => {
    try {
      console.log('بدء فحص المصادقة الشامل...');
      
      // الخطوة 1: التحقق من جلسة المستخدم الحالية
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.log('لا يوجد مستخدم مسجل دخول - تنظيف البيانات المحفوظة');
        clearStoredCode();
        setIsLoading(false);
        return;
      }

      console.log('المستخدم مسجل دخول:', user.email);
      setCurrentUser(user);

      // الخطوة 2: التحقق من صلاحيات المدير
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.log('خطأ في الحصول على الملف الشخصي');
        clearStoredCode();
        setIsLoading(false);
        return;
      }

      console.log('دور المستخدم:', profile.role, 'الإيميل:', profile.email);

      // الخطوة 3: التحقق من كون المستخدم مدير مصرح
      if (profile.role !== 'admin' || profile.email !== 'admin@souripay.com') {
        console.log('المستخدم ليس مدير مصرح');
        clearStoredCode();
        setIsLoading(false);
        return;
      }

      // الخطوة 4: التحقق من الرمز المحفوظ وصلاحيته
      const savedCode = localStorage.getItem('secure_admin_access');
      if (savedCode === SECURE_ACCESS_CODE && !isCodeExpired()) {
        console.log('رمز وصول صحيح وساري الصلاحية');
        setIsAuthenticated(true);
        logAccessAttempt(user.id, 'secure_portal_auto_login');
      } else {
        console.log('رمز الوصول منتهي الصلاحية أو غير صحيح - تنظيف البيانات');
        clearStoredCode();
      }

      logAccessAttempt(user.id, 'secure_portal_check');
      
    } catch (error) {
      console.error('خطأ في فحص المصادقة:', error);
      clearStoredCode();
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

    // التحقق مرة أخرى من صحة المستخدم قبل قبول الرمز
    if (!currentUser) {
      toast({
        title: 'خطأ في المصادقة',
        description: 'يجب تسجيل الدخول أولاً',
        variant: 'destructive'
      });
      return;
    }

    if (accessCode === SECURE_ACCESS_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('secure_admin_access', accessCode);
      localStorage.setItem('secure_admin_access_time', new Date().toISOString());
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
    clearStoredCode();
    setIsAuthenticated(false);
    
    logAccessAttempt(currentUser?.id, 'secure_portal_logout');

    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم الخروج من البوابة الآمنة بنجاح',
    });
  };

  const resetAccessCode = () => {
    clearStoredCode();
    setIsAuthenticated(false);
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
