
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Monitor,
  Activity,
  Users,
  Database,
  Settings,
  LogOut
} from "lucide-react";
import ModernSidebar from '@/components/layout/ModernSidebar';
import AdminHeader from '@/components/admin/dashboard/AdminHeader';
import EnhancedAdminOverview from '@/components/admin/dashboard/EnhancedAdminOverview';
import AdminSystemStatus from "@/components/admin/AdminSystemStatus";
import AdminCustomersList from "@/components/admin/AdminCustomersList";
import AdminAccountsManagement from "@/components/admin/AdminAccountsManagement";
import AdminCardsManagement from "@/components/admin/AdminCardsManagement";
import AdminReportsStats from "@/components/admin/AdminReportsStats";
import AdminTransactions from "@/components/admin/AdminTransactions";
import AdminCustomerControl from "@/components/admin/AdminCustomerControl";
import AdminMessaging from "@/components/admin/AdminMessaging";
import AdminModeration from "@/components/admin/AdminModeration";
import AdminPageManagement from "@/components/admin/AdminPageManagement";
import AdminAdvancedAnalytics from "@/components/admin/AdminAdvancedAnalytics";
import AdminRoleManagement from "@/components/admin/AdminRoleManagement";
import AdminMobileAppControl from "@/components/admin/AdminMobileAppControl";
import AdminATMManagement from "@/components/admin/AdminATMManagement";
import AdminSwiftManagement from "@/components/admin/AdminSwiftManagement";
import KYCDashboard from "@/components/kyc/KYCDashboard";

const SecureAdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { toast } = useToast();

  // رمز الوصول الآمن (يمكن تغييره حسب الحاجة)
  const SECURE_ACCESS_CODE = 'NUBARIUM_ADMIN_2024_SECURE';
  const MAX_LOGIN_ATTEMPTS = 3;

  useEffect(() => {
    checkAuthentication();
    logAccessAttempt();
  }, []);

  const checkAuthentication = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // التحقق من دور المدير
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, email')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin' && profile?.email === 'admin@souripay.com') {
          setCurrentUser(user);
          // التحقق من رمز الوصول المحفوظ محلياً
          const savedCode = localStorage.getItem('secure_admin_access');
          if (savedCode === SECURE_ACCESS_CODE) {
            setIsAuthenticated(true);
          }
        } else {
          toast({
            title: 'وصول غير مخول',
            description: 'ليس لديك صلاحية للوصول لهذه الصفحة',
            variant: 'destructive'
          });
          window.location.href = '/';
        }
      } else {
        toast({
          title: 'مطلوب تسجيل الدخول',
          description: 'يجب تسجيل الدخول أولاً للوصول لهذه الصفحة',
          variant: 'destructive'
        });
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      window.location.href = '/';
    } finally {
      setIsLoading(false);
    }
  };

  const logAccessAttempt = async () => {
    try {
      // تسجيل محاولة الوصول
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log('Access attempt logged:', {
        user_id: user?.id,
        access_type: 'secure_portal_attempt',
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log access attempt:', error);
    }
  };

  const handleAccessCodeSubmit = async () => {
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
      
      // تسجيل الوصول الناجح
      console.log('Successful access logged:', {
        user_id: currentUser?.id,
        access_type: 'secure_portal_success',
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });

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
        }, 15 * 60 * 1000); // حظر لمدة 15 دقيقة
      }

      // تسجيل المحاولة الفاشلة
      console.log('Failed access attempt logged:', {
        user_id: currentUser?.id,
        access_type: 'secure_portal_failed',
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });

      toast({
        title: 'رمز وصول خاطئ',
        description: `محاولة ${newAttempts} من ${MAX_LOGIN_ATTEMPTS}`,
        variant: 'destructive'
      });
    }
    setAccessCode('');
  };

  const handleSecureLogout = async () => {
    localStorage.removeItem('secure_admin_access');
    setIsAuthenticated(false);
    
    // تسجيل الخروج
    console.log('Logout logged:', {
      user_id: currentUser?.id,
      access_type: 'secure_portal_logout',
      ip_address: 'unknown',
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم الخروج من البوابة الآمنة بنجاح',
    });
  };

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة شاملة', icon: Monitor },
    { id: 'system-status', label: 'مراقبة النظام', icon: Activity },
    { 
      id: 'customers', 
      label: 'إدارة العملاء المتقدمة', 
      icon: Users,
      children: [
        { id: 'customers', label: 'قاعدة بيانات العملاء', icon: Users },
        { id: 'customer-control', label: 'التحكم المتقدم', icon: Shield }
      ]
    },
    { 
      id: 'accounts', 
      label: 'النظام المصرفي', 
      icon: Database,
      children: [
        { id: 'accounts', label: 'إدارة الحسابات', icon: Database },
        { id: 'cards', label: 'نظام البطاقات', icon: Shield }
      ]
    },
    { id: 'transactions', label: 'مراقبة المعاملات', icon: Activity },
    { id: 'swift', label: 'تحويلات SWIFT الدولية', icon: Shield, badge: 2 },
    { id: 'atm', label: 'شبكة الصرافات الآلية', icon: Monitor, badge: 3 },
    { id: 'kyc', label: 'نظام التحقق المتقدم', icon: Shield, badge: 3 },
    { id: 'app-control', label: 'التطبيق المحمول', icon: Monitor, badge: 2 },
    { id: 'messaging', label: 'نظام المراسلة المؤسسي', icon: Shield, badge: 5 },
    { id: 'moderation', label: 'الأمان والإشراف', icon: Shield },
    { id: 'page-management', label: 'إدارة المحتوى', icon: Settings },
    { id: 'analytics', label: 'التحليلات الذكية', icon: Activity },
    { id: 'role-management', label: 'إدارة الصلاحيات', icon: Settings },
    { id: 'reports', label: 'التقارير التنفيذية', icon: Activity }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system-status':
        return <AdminSystemStatus />;
      case 'customers':
        return <AdminCustomersList />;
      case 'customer-control':
        return <AdminCustomerControl />;
      case 'accounts':
        return <AdminAccountsManagement />;
      case 'cards':
        return <AdminCardsManagement />;
      case 'transactions':
        return <AdminTransactions />;
      case 'swift':
        return <AdminSwiftManagement />;
      case 'atm':
        return <AdminATMManagement />;
      case 'kyc':
        return <KYCDashboard />;
      case 'app-control':
        return <AdminMobileAppControl />;
      case 'messaging':
        return <AdminMessaging />;
      case 'moderation':
        return <AdminModeration />;
      case 'page-management':
        return <AdminPageManagement />;
      case 'analytics':
        return <AdminAdvancedAnalytics />;
      case 'role-management':
        return <AdminRoleManagement />;
      case 'reports':
        return <AdminReportsStats />;
      default:
        return <EnhancedAdminOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">البوابة الآمنة للإدارة</CardTitle>
            <p className="text-gray-600">نظام الحماية المتقدم - المستوى الأعلى</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                منطقة محظورة - يتطلب رمز وصول خاص
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  رمز الوصول الآمن
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="أدخل رمز الوصول الخاص"
                    className="pl-10"
                    disabled={isBlocked}
                    onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  المحاولات: {loginAttempts}/{MAX_LOGIN_ATTEMPTS}
                </span>
                {currentUser && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    مدير مصرح
                  </Badge>
                )}
              </div>

              <Button 
                onClick={handleAccessCodeSubmit}
                disabled={!accessCode || isBlocked}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isBlocked ? 'محظور مؤقتاً' : 'دخول آمن'}
              </Button>

              {isBlocked && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    تم حظر الوصول لمدة 15 دقيقة بسبب المحاولات المتكررة
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="text-xs text-gray-500 space-y-1">
                <p>• جميع المحاولات مسجلة ومراقبة</p>
                <p>• الوصول محدود للمدير الأساسي فقط</p>
                <p>• نظام حماية متعدد الطبقات نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex w-full admin-dashboard">
        <ModernSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          items={sidebarItems}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Shield className="h-6 w-6" />
                  <div>
                    <h1 className="text-lg font-bold">البوابة الآمنة للإدارة الشاملة</h1>
                    <p className="text-red-100 text-sm">النظام المتقدم - حماية المستوى الأعلى</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Badge className="bg-red-800 text-red-100">
                    <Activity className="h-3 w-3 mr-1" />
                    نشط وآمن
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSecureLogout}
                    className="border-red-300 text-red-100 hover:bg-red-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    خروج آمن
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SecureAdminPortal;
