
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Server, Smartphone, Database, Shield, CreditCard, DollarSign, Users } from "lucide-react";
import SystemStatusCard from './system/SystemStatusCard';
import SystemStatusSummary from './system/SystemStatusSummary';
import MobileAppInfo from './system/MobileAppInfo';
import type { SystemCheck } from "@/types/systemStatus";
import {
  checkDatabase,
  checkAuthentication,
  checkAdminAccount,
  checkBankingServices,
  checkCardsManagement,
  checkLoansManagement,
  checkMobileApp
} from "@/utils/systemChecks";

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
      await Promise.all([
        checkDatabase(updateCheck),
        checkAuthentication(updateCheck),
        checkAdminAccount(updateCheck),
        checkBankingServices(updateCheck),
        checkCardsManagement(updateCheck),
        checkLoansManagement(updateCheck),
        checkMobileApp(updateCheck)
      ]);
    } catch (error) {
      console.error('System check error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    runSystemChecks();
  }, []);

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
            {checks.map((check) => (
              <SystemStatusCard key={check.name} check={check} />
            ))}
          </div>

          <SystemStatusSummary checks={checks} isChecking={isChecking} />
          <MobileAppInfo />
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatusChecker;
