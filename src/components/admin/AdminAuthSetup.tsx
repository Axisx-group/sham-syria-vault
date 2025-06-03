
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Key,
  Database,
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminAuthSetup = () => {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const ADMIN_EMAIL = 'admin@souripay.com';
  const ADMIN_PASSWORD = 'Mo5933221100@';

  useEffect(() => {
    checkAdminExists();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const checkAdminExists = async () => {
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) {
        console.error('Error checking admin:', error);
        return;
      }
      
      const adminUser = users?.find(user => user.email === ADMIN_EMAIL);
      setAdminExists(!!adminUser);
      
      if (adminUser) {
        setSetupStatus('success');
        setMessage('حساب المدير الرئيسي موجود بالفعل');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createAdminUser = async () => {
    setIsSettingUp(true);
    setMessage('');

    try {
      // Try to create the admin user
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: 'مدير النظام الرئيسي',
          role: 'admin'
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setSetupStatus('success');
          setMessage('حساب المدير موجود بالفعل');
          setAdminExists(true);
        } else {
          setSetupStatus('error');
          setMessage(`خطأ في إنشاء الحساب: ${error.message}`);
        }
      } else {
        setSetupStatus('success');
        setMessage('تم إنشاء حساب المدير الرئيسي بنجاح!');
        setAdminExists(true);
        
        // Update the user's profile to admin role
        if (data.user) {
          await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              email: ADMIN_EMAIL,
              full_name: 'مدير النظام الرئيسي',
              role: 'admin'
            });
        }
      }
    } catch (error: any) {
      setSetupStatus('error');
      setMessage(`خطأ: ${error.message}`);
    } finally {
      setIsSettingUp(false);
    }
  };

  const signInAsAdmin = async () => {
    setIsSettingUp(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });

      if (error) {
        setSetupStatus('error');
        setMessage(`خطأ في تسجيل الدخول: ${error.message}`);
      } else {
        setSetupStatus('success');
        setMessage('تم تسجيل الدخول كمدير بنجاح!');
        setCurrentUser(data.user);
        // Refresh the page to update the admin state
        window.location.reload();
      }
    } catch (error: any) {
      setSetupStatus('error');
      setMessage(`خطأ: ${error.message}`);
    } finally {
      setIsSettingUp(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            إعداد حساب المدير الرئيسي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span className="font-medium">قاعدة البيانات</span>
              </div>
              <Badge className="bg-green-100 text-green-800">متصل</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                <span className="font-medium">حساب المدير</span>
              </div>
              <Badge className={adminExists ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {adminExists ? 'موجود' : 'غير موجود'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-600" />
                <span className="font-medium">المصادقة</span>
              </div>
              <Badge className={currentUser ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {currentUser ? 'مسجل' : 'غير مسجل'}
              </Badge>
            </div>
          </div>

          {/* Admin Credentials */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <Key className="h-4 w-4" />
              بيانات حساب المدير الرئيسي
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">البريد الإلكتروني:</span>
                <code className="bg-white px-2 py-1 rounded">{ADMIN_EMAIL}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">كلمة المرور:</span>
                <code className="bg-white px-2 py-1 rounded">Mo5933221100@</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">الدور:</span>
                <Badge className="bg-red-100 text-red-800">مدير عام</Badge>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <Alert className={setupStatus === 'error' ? 'border-red-200' : 'border-green-200'}>
              <div className="flex items-center gap-2">
                {setupStatus === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>{message}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!adminExists ? (
              <Button 
                onClick={createAdminUser} 
                disabled={isSettingUp}
                className="flex-1"
              >
                {isSettingUp ? 'جاري الإنشاء...' : 'إنشاء حساب المدير'}
              </Button>
            ) : !currentUser ? (
              <Button 
                onClick={signInAsAdmin} 
                disabled={isSettingUp}
                className="flex-1"
              >
                {isSettingUp ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول كمدير'}
              </Button>
            ) : (
              <div className="flex gap-2 flex-1">
                <div className="flex items-center gap-2 flex-1 p-2 bg-green-50 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">مسجل كمدير: {currentUser.email}</span>
                </div>
                <Button variant="outline" onClick={signOut}>
                  تسجيل الخروج
                </Button>
              </div>
            )}
          </div>

          {/* Security Notes */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">ملاحظات أمنية:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• يرجى تغيير كلمة المرور بعد أول تسجيل دخول</li>
              <li>• تأكد من الاحتفاظ ببيانات المدير في مكان آمن</li>
              <li>• لا تشارك بيانات المدير مع أشخاص غير مخولين</li>
              <li>• استخدم مصادقة ثنائية عند الإمكان</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuthSetup;
