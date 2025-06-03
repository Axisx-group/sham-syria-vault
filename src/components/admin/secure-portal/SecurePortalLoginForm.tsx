
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle } from "lucide-react";

interface SecurePortalLoginFormProps {
  currentUser: any;
  loginAttempts: number;
  isBlocked: boolean;
  onAccessCodeSubmit: (accessCode: string) => Promise<void>;
}

const SecurePortalLoginForm: React.FC<SecurePortalLoginFormProps> = ({
  currentUser,
  loginAttempts,
  isBlocked,
  onAccessCodeSubmit
}) => {
  const [accessCode, setAccessCode] = useState('');
  const MAX_LOGIN_ATTEMPTS = 3;

  const handleSubmit = async () => {
    await onAccessCodeSubmit(accessCode);
    setAccessCode('');
  };

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
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                المحاولات: {loginAttempts}/{MAX_LOGIN_ATTEMPTS}
              </span>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                مدير مصرح
              </Badge>
            </div>

            <Button 
              onClick={handleSubmit}
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
              <p>• المستخدم الحالي: {currentUser?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurePortalLoginForm;
