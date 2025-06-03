
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Save,
  Search,
  Edit,
  Shield,
  TrendingUp
} from "lucide-react";

const ATMWithdrawalLimits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const defaultLimits = {
    daily: '5000',
    weekly: '25000',
    monthly: '100000'
  };

  const customerLimits = [
    {
      id: 'CUST001',
      name: 'أحمد محمد علي',
      accountType: 'ذهبي',
      dailyLimit: '10000',
      weeklyLimit: '50000',
      monthlyLimit: '200000',
      currentUsage: {
        daily: '2500',
        weekly: '8000',
        monthly: '45000'
      }
    },
    {
      id: 'CUST002',
      name: 'فاطمة حسن محمود',
      accountType: 'فضي',
      dailyLimit: '7500',
      weeklyLimit: '35000',
      monthlyLimit: '150000',
      currentUsage: {
        daily: '1200',
        weekly: '5500',
        monthly: '22000'
      }
    },
    {
      id: 'CUST003',
      name: 'محمد سعد الدين',
      accountType: 'عادي',
      dailyLimit: '5000',
      weeklyLimit: '25000',
      monthlyLimit: '100000',
      currentUsage: {
        daily: '4800',
        weekly: '18000',
        monthly: '75000'
      }
    }
  ];

  const handleSaveDefaultLimits = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الحدود الافتراضية بنجاح",
    });
  };

  const handleEditCustomerLimit = (customerId: string) => {
    toast({
      title: "تعديل الحدود",
      description: `فتح نافذة تعديل حدود العميل ${customerId}`,
    });
  };

  const getUsagePercentage = (current: string, limit: string) => {
    return Math.round((parseFloat(current) / parseFloat(limit)) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <Tabs defaultValue="default" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="default">الحدود الافتراضية</TabsTrigger>
        <TabsTrigger value="customers">حدود العملاء</TabsTrigger>
        <TabsTrigger value="analytics">تحليل الاستخدام</TabsTrigger>
      </TabsList>
      
      <TabsContent value="default" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              الحدود الافتراضية للسحب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">الحد اليومي (ليرة تركية)</label>
                <Input
                  value={defaultLimits.daily}
                  onChange={(e) => {}}
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الحد الأسبوعي (ليرة تركية)</label>
                <Input
                  value={defaultLimits.weekly}
                  onChange={(e) => {}}
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الحد الشهري (ليرة تركية)</label>
                <Input
                  value={defaultLimits.monthly}
                  onChange={(e) => {}}
                  placeholder="100000"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button onClick={handleSaveDefaultLimits} className="mr-auto">
                <Save className="h-4 w-4 mr-2" />
                حفظ الحدود الافتراضية
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="customers" className="space-y-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث باسم العميل أو رقم الحساب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option value="all">جميع الأنواع</option>
            <option value="gold">ذهبي</option>
            <option value="silver">فضي</option>
            <option value="standard">عادي</option>
          </select>
        </div>

        <div className="space-y-4">
          {customerLimits.map((customer) => (
            <Card key={customer.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{customer.name}</h3>
                      <Badge variant="outline">{customer.accountType}</Badge>
                      <span className="text-sm text-gray-500">#{customer.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm text-gray-600">الحد اليومي</span>
                        <p className="font-semibold">₺{customer.dailyLimit}</p>
                        <div className={`text-xs px-2 py-1 rounded ${getUsageColor(getUsagePercentage(customer.currentUsage.daily, customer.dailyLimit))}`}>
                          المستخدم: ₺{customer.currentUsage.daily} ({getUsagePercentage(customer.currentUsage.daily, customer.dailyLimit)}%)
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-sm text-gray-600">الحد الأسبوعي</span>
                        <p className="font-semibold">₺{customer.weeklyLimit}</p>
                        <div className={`text-xs px-2 py-1 rounded ${getUsageColor(getUsagePercentage(customer.currentUsage.weekly, customer.weeklyLimit))}`}>
                          المستخدم: ₺{customer.currentUsage.weekly} ({getUsagePercentage(customer.currentUsage.weekly, customer.weeklyLimit)}%)
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-sm text-gray-600">الحد الشهري</span>
                        <p className="font-semibold">₺{customer.monthlyLimit}</p>
                        <div className={`text-xs px-2 py-1 rounded ${getUsageColor(getUsagePercentage(customer.currentUsage.monthly, customer.monthlyLimit))}`}>
                          المستخدم: ₺{customer.currentUsage.monthly} ({getUsagePercentage(customer.currentUsage.monthly, customer.monthlyLimit)}%)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCustomerLimit(customer.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل الحدود
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">متوسط الاستخدام اليومي</p>
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                  <p className="text-xs text-green-600">ضمن الحدود الآمنة</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">عملاء تجاوزوا 90%</p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                  <p className="text-xs text-red-600">يحتاجون مراقبة</p>
                </div>
                <div className="bg-red-500 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي السحوبات</p>
                  <p className="text-2xl font-bold text-purple-600">₺1.8M</p>
                  <p className="text-xs text-purple-600">هذا الأسبوع</p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ATMWithdrawalLimits;
