
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Camera, 
  DollarSign, 
  Activity,
  Lock,
  Unlock,
  RefreshCw,
  Power,
  Settings,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye
} from "lucide-react";

interface ATMDevice {
  id: string;
  location: string;
  address: string;
  status: 'online' | 'offline' | 'maintenance' | 'alert';
  securityStatus: 'secure' | 'warning' | 'critical';
  cashLevel: number;
  cashAmount: number;
  lastAccess: string;
  cameraStatus: 'active' | 'inactive' | 'error';
  sensorStatus: 'normal' | 'triggered' | 'offline';
  dailyTransactions: number;
  isLocked: boolean;
  coordinates: { lat: number; lng: number };
}

interface ATMDeviceDetailModalProps {
  device: ATMDevice | null;
  isOpen: boolean;
  onClose: () => void;
}

const ATMDeviceDetailModal: React.FC<ATMDeviceDetailModalProps> = ({
  device,
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  if (!device) return null;

  const handleLockToggle = async () => {
    setIsPerformingAction(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: device.isLocked ? "تم إلغاء القفل" : "تم القفل",
        description: `تم ${device.isLocked ? 'إلغاء قفل' : 'قفل'} الجهاز ${device.id} بنجاح`,
      });
      setIsPerformingAction(false);
    }, 1500);
  };

  const handleEmergencyStop = () => {
    toast({
      title: "إيقاف طارئ",
      description: `تم إيقاف الجهاز ${device.id} فوراً`,
      variant: "destructive"
    });
  };

  const handleRestart = () => {
    toast({
      title: "إعادة التشغيل",
      description: `تم إعادة تشغيل الجهاز ${device.id}`,
    });
  };

  const handleCashRefill = () => {
    toast({
      title: "طلب إعادة التعبئة",
      description: `تم إرسال طلب إعادة تعبئة النقد للجهاز ${device.id}`,
    });
  };

  const getSecurityStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentTransactions = [
    { id: 1, type: 'سحب', amount: '500', time: '15:30', user: 'العميل ***1234' },
    { id: 2, type: 'استعلام', amount: '-', time: '15:25', user: 'العميل ***5678' },
    { id: 3, type: 'سحب', amount: '1000', time: '15:20', user: 'العميل ***9012' },
    { id: 4, type: 'سحب', amount: '250', time: '15:15', user: 'العميل ***3456' },
    { id: 5, type: 'تحويل', amount: '750', time: '15:10', user: 'العميل ***7890' }
  ];

  const cashBreakdown = [
    { denomination: '500 ليرة', count: 200, total: 100000 },
    { denomination: '200 ليرة', count: 300, total: 60000 },
    { denomination: '100 ليرة', count: 500, total: 50000 },
    { denomination: '50 ليرة', count: 400, total: 20000 },
    { denomination: '25 ليرة', count: 800, total: 20000 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            تفاصيل وتحكم الجهاز - {device.location}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{device.location}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {device.address}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">#{device.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSecurityStatusColor(device.securityStatus)}>
                    {device.securityStatus === 'secure' && 'آمن'}
                    {device.securityStatus === 'warning' && 'تحذير'}
                    {device.securityStatus === 'critical' && 'خطر'}
                  </Badge>
                  <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                    {device.status === 'online' ? 'متصل' : 'غير متصل'}
                  </Badge>
                </div>
              </div>
              
              {/* Quick Control Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={device.isLocked ? "destructive" : "default"}
                  size="sm"
                  onClick={handleLockToggle}
                  disabled={isPerformingAction}
                >
                  {isPerformingAction ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : device.isLocked ? (
                    <Unlock className="h-4 w-4 mr-2" />
                  ) : (
                    <Lock className="h-4 w-4 mr-2" />
                  )}
                  {device.isLocked ? 'إلغاء القفل' : 'قفل الجهاز'}
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleRestart}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  إعادة التشغيل
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleCashRefill}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  طلب إعادة التعبئة
                </Button>
                
                {device.securityStatus === 'critical' && (
                  <Button variant="destructive" size="sm" onClick={handleEmergencyStop}>
                    <Power className="h-4 w-4 mr-2" />
                    إيقاف طارئ
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="cash">إدارة النقد</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">مستوى النقد</p>
                        <p className="text-2xl font-bold text-blue-600">{device.cashLevel}%</p>
                        <p className="text-sm text-gray-500">₺{device.cashAmount.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">المعاملات اليوم</p>
                        <p className="text-2xl font-bold text-green-600">{device.dailyTransactions}</p>
                        <p className="text-sm text-green-600">+12% من الأمس</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">حالة الكاميرا</p>
                        <p className="text-2xl font-bold text-gray-900 capitalize">{device.cameraStatus}</p>
                        <p className="text-sm text-gray-500">4 كاميرات نشطة</p>
                      </div>
                      <Camera className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات تفصيلية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-600">آخر وصول:</span>
                        <p className="font-medium">{device.lastAccess}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">حالة أجهزة الاستشعار:</span>
                        <p className="font-medium">{device.sensorStatus}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">الإحداثيات:</span>
                        <p className="font-medium">{device.coordinates.lat}, {device.coordinates.lng}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-600">وقت التشغيل:</span>
                        <p className="font-medium">99.8% (720 ساعة)</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">آخر صيانة:</span>
                        <p className="font-medium">2024-01-15</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">الصيانة القادمة:</span>
                        <p className="font-medium">2024-02-15</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    تفاصيل النقد بالفئات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cashBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.denomination}</span>
                          <p className="text-sm text-gray-600">{item.count} ورقة</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg">₺{item.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">الإجمالي:</span>
                        <span className="text-xl font-bold text-blue-600">₺{device.cashAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      كاميرات المراقبة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['كاميرا رئيسية', 'كاميرا الخزينة', 'كاميرا المحيط', 'كاميرا الداخل'].map((camera, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{camera}</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">نشطة</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      أجهزة الاستشعار
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['استشعار الحركة', 'استشعار الاهتزاز', 'استشعار الحرارة', 'استشعار الفتح'].map((sensor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{sensor}</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">طبيعي</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    آخر المعاملات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{transaction.type}</span>
                          <p className="text-sm text-gray-600">{transaction.user}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{transaction.amount !== '-' ? `₺${transaction.amount}` : transaction.amount}</span>
                          <p className="text-sm text-gray-600">{transaction.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    معلومات الصيانة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">الصيانة الدورية</h4>
                        <p className="text-sm text-gray-600">آخر صيانة: 2024-01-15</p>
                        <p className="text-sm text-gray-600">الصيانة القادمة: 2024-02-15</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">حالة المكونات</h4>
                        <p className="text-sm text-green-600">✓ موزع النقد: ممتاز</p>
                        <p className="text-sm text-green-600">✓ قارئ البطاقات: ممتاز</p>
                        <p className="text-sm text-yellow-600">⚠ الطابعة: تحتاج استبدال ورق</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ATMDeviceDetailModal;
