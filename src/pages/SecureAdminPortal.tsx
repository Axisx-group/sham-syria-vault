
import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ModernSidebar from '@/components/layout/ModernSidebar';
import { useSecurePortalAuth } from '@/components/admin/secure-portal/SecurePortalAuth';
import SecurePortalLoadingScreen from '@/components/admin/secure-portal/SecurePortalLoadingScreen';
import SecurePortalAccessDenied from '@/components/admin/secure-portal/SecurePortalAccessDenied';
import SecurePortalLoginForm from '@/components/admin/secure-portal/SecurePortalLoginForm';
import SecurePortalHeader from '@/components/admin/secure-portal/SecurePortalHeader';
import SecurePortalTabContent from '@/components/admin/secure-portal/SecurePortalTabContent';
import { sidebarItems } from '@/components/admin/secure-portal/SecurePortalSidebarConfig';

const SecureAdminPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const {
    isAuthenticated,
    currentUser,
    isLoading,
    loginAttempts,
    isBlocked,
    handleAccessCodeSubmit,
    handleSecureLogout
  } = useSecurePortalAuth();

  // شاشة التحميل أثناء فحص المصادقة
  if (isLoading) {
    return <SecurePortalLoadingScreen />;
  }

  // إذا لم يكن هناك مستخدم مسجل أو ليس مدير مصرح
  if (!currentUser) {
    return <SecurePortalAccessDenied />;
  }

  // إذا لم يدخل رمز الوصول الآمن أو انتهت صلاحيته
  if (!isAuthenticated) {
    return (
      <SecurePortalLoginForm
        currentUser={currentUser}
        loginAttempts={loginAttempts}
        isBlocked={isBlocked}
        onAccessCodeSubmit={handleAccessCodeSubmit}
      />
    );
  }

  // الوصول الآمن مؤكد - عرض البوابة
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
          <SecurePortalHeader onSecureLogout={handleSecureLogout} />
          <SecurePortalTabContent activeTab={activeTab} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SecureAdminPortal;
