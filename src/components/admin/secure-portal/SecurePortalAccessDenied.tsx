
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Lock } from "lucide-react";

const SecurePortalAccessDenied: React.FC = () => {
  const handleLoginRedirect = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">وصول مرفوض</CardTitle>
          <p className="text-gray-600">يتطلب تسجيل دخول كمدير مصرح</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              هذه البوابة مخصصة للمدير الأساسي (admin@souripay.com) فقط
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <Button 
              onClick={handleLoginRedirect}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Lock className="h-4 w-4 mr-2" />
              تسجيل الدخول كمدير
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
            >
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurePortalAccessDenied;
