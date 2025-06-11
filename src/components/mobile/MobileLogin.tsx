
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileLoginProps {
  onLoginSuccess: () => void;
}

const MobileLogin = ({ onLoginSuccess }: MobileLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في SouriPay",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "يرجى التحقق من البيانات المدخلة",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // محاكاة عملية إنشاء الحساب
    setTimeout(() => {
      if (signupData.fullName && signupData.email && signupData.password) {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "مرحباً بك في SouriPay",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">SP</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">SouriPay</CardTitle>
          <CardDescription>البنك الرقمي الأول في سوريا</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="text-right"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="أدخل كلمة المرور"
                      className="text-right pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    placeholder="أدخل اسمك الكامل"
                    className="text-right"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">البريد الإلكتروني</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="text-right"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">كلمة المرور</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    placeholder="أدخل كلمة المرور"
                    className="text-right"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    placeholder="أعد إدخال كلمة المرور"
                    className="text-right"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileLogin;
