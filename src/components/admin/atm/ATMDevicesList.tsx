
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ATMDeviceDetailModal from './ATMDeviceDetailModal';
import { 
  Search,
  MapPin,
  Activity,
  DollarSign,
  Settings,
  AlertCircle
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

const ATMDevicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<ATMDevice | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();

  const atmDevices: ATMDevice[] = [
    {
      id: 'ATM001',
      location: 'فرع دمشق الرئيسي',
      address: 'شارع الثورة، دمشق',
      status: 'online',
      securityStatus: 'secure',
      cashLevel: 85,
      cashAmount: 450000,
      lastAccess: '2024-01-20 15:30:25',
      cameraStatus: 'active',
      sensorStatus: 'normal',
      dailyTransactions: 156,
      isLocked: false,
      coordinates: { lat: 33.5138, lng: 36.2765 }
    },
    {
      id: 'ATM002',
      location: 'مول الشام',
      address: 'مول الشام، دمشق',
      status: 'online',
      securityStatus: 'warning',
      cashLevel: 45,
      cashAmount: 112500,
      lastAccess: '2024-01-20 15:28:10',
      cameraStatus: 'active',
      sensorStatus: 'triggered',
      dailyTransactions: 203,
      isLocked: false,
      coordinates: { lat: 33.5020, lng: 36.2441 }
    },
    {
      id: 'ATM003',
      location: 'جامعة دمشق',
      address: 'الجامعة، دمشق',
      status: 'maintenance',
      securityStatus: 'critical',
      cashLevel: 0,
      cashAmount: 0,
      lastAccess: '2024-01-20 10:15:30',
      cameraStatus: 'error',
      sensorStatus: 'offline',
      dailyTransactions: 89,
      isLocked: true,
      coordinates: { lat: 33.5117, lng: 36.2853 }
    },
    {
      id: 'ATM004',
      location: 'فرع حلب',
      address: 'شارع السبع بحرات، حلب',
      status: 'online',
      securityStatus: 'secure',
      cashLevel: 92,
      cashAmount: 460000,
      lastAccess: '2024-01-20 15:25:45',
      cameraStatus: 'active',
      sensorStatus: 'normal',
      dailyTransactions: 134,
      isLocked: false,
      coordinates: { lat: 36.2021, lng: 37.1343 }
    },
    {
      id: 'ATM005',
      location: 'مطار دمشق',
      address: 'مطار دمشق الدولي',
      status: 'alert',
      securityStatus: 'critical',
      cashLevel: 60,
      cashAmount: 150000,
      lastAccess: '2024-01-20 08:45:20',
      cameraStatus: 'active',
      sensorStatus: 'triggered',
      dailyTransactions: 45,
      isLocked: true,
      coordinates: { lat: 33.4114, lng: 36.5156 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCashLevelColor = (level: number) => {
    if (level > 70) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleMonitoring = (device: ATMDevice) => {
    setSelectedDevice(device);
    setIsDetailModalOpen(true);
    toast({
      title: "فتح نافذة المراقبة",
      description: `تم فتح تفاصيل الجهاز ${device.id} للمراقبة المباشرة`,
    });
  };

  const handleSettings = (device: ATMDevice) => {
    toast({
      title: "إعدادات الجهاز",
      description: `فتح إعدادات الجهاز ${device.id} - ${device.location}`,
    });
    console.log('Opening settings for device:', device);
  };

  const handleRepair = (device: ATMDevice) => {
    toast({
      title: "طلب إصلاح",
      description: `تم إرسال طلب إصلاح للجهاز ${device.id}`,
      variant: "destructive"
    });
  };

  const filteredDevices = atmDevices.filter(device =>
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="البحث باسم الموقع أو رقم الجهاز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option value="all">جميع الحالات</option>
          <option value="active">متاح</option>
          <option value="maintenance">صيانة</option>
          <option value="offline">معطل</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredDevices.map((device) => (
          <Card key={device.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{device.location}</h3>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status === 'online' && 'متاح'}
                      {device.status === 'offline' && 'معطل'}
                      {device.status === 'maintenance' && 'صيانة'}
                      {device.status === 'alert' && 'تنبيه'}
                    </Badge>
                    <span className="text-sm text-gray-500">#{device.id}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{device.address}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">مستوى النقد</span>
                      <p className={`font-semibold ${getCashLevelColor(device.cashLevel)}`}>
                        {device.cashLevel}%
                      </p>
                      <p className="text-xs text-gray-500">₺{device.cashAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">المعاملات اليومية</span>
                      <p className="font-semibold">{device.dailyTransactions}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">المبلغ اليومي</span>
                      <p className="font-semibold">₺{(device.dailyTransactions * 2500).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">آخر معاملة</span>
                      <p className="font-semibold text-xs">{device.lastAccess}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMonitoring(device)}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    المراقبة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSettings(device)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    الإعدادات
                  </Button>
                  {device.status === 'alert' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-600"
                      onClick={() => handleRepair(device)}
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      إصلاح
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Device Detail Modal */}
      <ATMDeviceDetailModal
        device={selectedDevice}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDevice(null);
        }}
      />
    </div>
  );
};

export default ATMDevicesList;
