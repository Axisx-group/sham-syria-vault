
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Phone, Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface NetBankLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetBankLoginDialog: React.FC<NetBankLoginDialogProps> = ({ isOpen, onClose }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // التحقق من صحة البيانات
    if (!identifier || !password) {
      setError('يرجى إدخال جميع البيانات المطلوبة');
      setIsLoading(false);
      return;
    }

    // التحقق من صحة تنسيق الإيميل أو رقم الهاتف
    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('يرجى إدخال عنوان بريد إلكتروني صحيح');
        setIsLoading(false);
        return;
      }
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(identifier)) {
        setError('يرجى إدخال رقم هاتف صحيح');
        setIsLoading(false);
        return;
      }
    }

    try {
      // محاكاة عملية تسجيل الدخول
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('تسجيل دخول نت بنك:', {
        method: loginMethod,
        identifier,
        password: '***'
      });

      // إغلاق النافذة والانتقال لصفحة لوحة التحكم
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError('حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIdentifier('');
    setPassword('');
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            تسجيل الدخول - نت بنك
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* طريقة تسجيل الدخول */}
          <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الهاتف
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right text-gray-700 font-medium">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pr-10 text-right"
                    dir="ltr"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right text-gray-700 font-medium">
                  رقم الهاتف
                </Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+963 xxx xxx xxx"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pr-10 text-right"
                    dir="ltr"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* كلمة السر */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right text-gray-700 font-medium">
              كلمة السر
            </Label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 pl-10 text-right"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-right">{error}</p>
            </div>
          )}

          {/* أزرار العمل */}
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => console.log('نسيت كلمة السر')}
              >
                نسيت كلمة السر؟
              </button>
              
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => console.log('مساعدة تسجيل الدخول')}
              >
                تحتاج مساعدة؟
              </button>
            </div>
          </div>

          {/* معلومات الأمان */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm text-right">
              🔒 جلسة آمنة ومشفرة. بياناتك محمية بأعلى معايير الأمان.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NetBankLoginDialog;
