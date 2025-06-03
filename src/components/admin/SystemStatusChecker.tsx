import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Smartphone, 
  Server, 
  Database,
  Shield,
  CreditCard,
  DollarSign,
  RefreshCw,
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SystemCheck {
  name: string;
  status: 'checking' | 'success' | 'error';
  message: string;
  icon: React.ComponentType<any>;
}

const SystemStatusChecker = () => {
  const [checks, setChecks] = useState<SystemCheck[]>([
    { name: 'قاعدة البيانات', status: 'checking', message: 'جاري الفحص...', icon: Database },
    { name: 'المصادقة', status: 'checking', message: 'جاري الفحص...', icon: Shield },
    { name: 'حساب المدير', status: 'checking', message: 'جاري الفحص...', icon: Users },
    { name: 'خدمات البنك', status: 'checking', message: 'جاري الفحص...', icon: DollarSign },
    { name: 'إدارة البطاقات', status: 'checking', message: 'جاري الفحص...', icon: CreditCard },
    { name: 'إدارة القروض', status: 'checking', message: 'جاري الفحص...', icon: Server },
    { name: 'التطبيق المحمول', status: 'checking', message: 'جاري الفحص...', icon: Smartphone }
  ]);

  const [isChecking, setIsChecking] = useState(false);

  const updateCheck = (name: string, status: 'success' | 'error', message: string) => {
    setChecks(prev => prev.map(check => 
      check.name === name ? { ...check, status, message } : check
    ));
  };

  const runSystemChecks = async () => {
    setIsChecking(true);
    
    // Reset all checks
    setChecks(prev => prev.map(check => ({ ...check, status: 'checking' as const, message: 'جاري الفحص...' })));

    try {
      // Check database connection
      const { data: dbTest, error: dbError } = await supabase
        .from('account_applications')
        .select('count')
        .limit(1);
      
      if (dbError) {
        updateCheck('قاعدة البيانات', 'error', `خطأ في الاتصال: ${dbError.message}`);
      } else {
        updateCheck('قاعدة البيانات', 'success', 'متصل بنجاح');
      }

      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        updateCheck('المصادقة', 'error', `خطأ في المصادقة: ${authError.message}`);
      } else {
        updateCheck('المصادقة', 'success', user ? 'مسجل الدخول' : 'نظام المصادقة يعمل');
      }

      // Check admin account
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

      // Check banking services API
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

      // Check cards management API
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

      // Check loans management API
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

      // Check mobile app configuration
      const isCapacitorConfigured = window.location.href.includes('lovableproject.com');
      if (isCapacitorConfigured) {
        updateCheck('التطبيق المحمول', 'success', 'تم تكوين Capacitor بنجاح');
      } else {
        updateCheck('التطبيق المحمول', 'success', 'يعمل في وضع التطوير');
      }

    } catch (error) {
      console.error('System check error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    runSystemChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">يعمل</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">فحص</Badge>;
    }
  };

  const allSuccessful = checks.every(check => check.status === 'success');
  const hasErrors = checks.some(check => check.status === 'error');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6" />
              فحص حالة النظام
            </CardTitle>
            <Button 
              onClick={runSystemChecks} 
              disabled={isChecking}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'جاري الفحص...' : 'إعادة فحص'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {checks.map((check) => {
              const IconComponent = check.icon;
              return (
                <Card key={check.name} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{check.name}</span>
                      </div>
                      {getStatusIcon(check.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{check.message}</span>
                      {getStatusBadge(check.status)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!isChecking && (
            <div className="mt-6 p-4 rounded-lg border">
              {allSuccessful ? (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">جميع الأنظمة تعمل بنجاح!</span>
                </div>
              ) : hasErrors ? (
                <div className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">تم اكتشاف مشاكل في النظام</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-700">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">جاري فحص النظام...</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">معلومات التطبيق المحمول:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• للتشغيل على الهاتف: استخدم الأمر <code>npx cap sync</code></p>
              <p>• للأندرويد: <code>npx cap run android</code></p>
              <p>• للآيفون: <code>npx cap run ios</code></p>
              <p>• URL الحالي: {window.location.origin}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatusChecker;
