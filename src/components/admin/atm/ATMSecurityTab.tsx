
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ATMDeviceDetailModal from './ATMDeviceDetailModal';
import ATMSecurityAlerts from './ATMSecurityAlerts';
import { 
  Shield, 
  Camera, 
  AlertTriangle, 
  Eye, 
  Lock,
  Unlock,
  RefreshCw,
  DollarSign,
  MapPin,
  Activity
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

const ATMSecurityTab = () => {
  const [selectedDevice, setSelectedDevice] = useState<ATMDevice | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const atmDevices: ATMDevice[] = [
    {
      id: 'ATM001',
      location: 'فرع دمشق الرئيسي',
      address: 'شارع الثورة، دمشق',
      status: 'online',
      securityStatus: 'secure',
      cashLevel: 85,
      cashAmount: 425000,
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

  const getSecurityStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCameraIcon = (status: string) => {
    switch (status) {
      case 'active': return <Camera className="h-4 w-4 text-green-600" />;
      case 'inactive': return <Camera className="h-4 w-4 text-gray-400" />;
      case 'error': return <Camera className="h-4 w-4 text-red-600" />;
      default: return <Camera className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleViewDetails = (device: ATMDevice) => {
    setSelectedDevice(device);
    setIsDetailModalOpen(true);
  };

  const securityStats = {
    secure: atmDevices.filter(d => d.securityStatus === 'secure').length,
    warning: atmDevices.filter(d => d.securityStatus === 'warning').length,
    critical: atmDevices.filter(d => d.securityStatus === 'critical').length,
    totalCash: atmDevices.reduce((sum, d) => sum + d.cashAmount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أجهزة آمنة</p>
                <p className="text-2xl font-bold text-green-600">{securityStats.secure}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تحذيرات أمنية</p>
                <p className="text-2xl font-bold text-yellow-600">{securityStats.warning}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حالات طوارئ</p>
                <p className="text-2xl font-bold text-red-600">{securityStats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي النقد</p>
                <p className="text-2xl font-bold text-blue-600">₺{securityStats.totalCash.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts Component */}
      <ATMSecurityAlerts />

      {/* ATM Devices Security Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            مراقبة أمان الأجهزة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {atmDevices.map((device) => (
              <Card key={device.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{device.location}</h3>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status === 'online' && 'متصل'}
                          {device.status === 'offline' && 'غير متصل'}
                          {device.status === 'maintenance' && 'صيانة'}
                          {device.status === 'alert' && 'تنبيه'}
                        </Badge>
                        <Badge className={getSecurityStatusColor(device.securityStatus)}>
                          {device.securityStatus === 'secure' && 'آمن'}
                          {device.securityStatus === 'warning' && 'تحذير'}
                          {device.securityStatus === 'critical' && 'خطر'}
                        </Badge>
                        <span className="text-sm text-gray-500">#{device.id}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{device.address}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">مستوى النقد</span>
                          <p className="font-semibold text-blue-600">
                            ₺{device.cashAmount.toLocaleString()} ({device.cashLevel}%)
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">الكاميرات</span>
                          <div className="flex items-center gap-1">
                            {getCameraIcon(device.cameraStatus)}
                            <span className="font-medium capitalize">{device.cameraStatus}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">أجهزة الاستشعار</span>
                          <p className="font-medium">{device.sensorStatus}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">المعاملات اليوم</span>
                          <p className="font-semibold">{device.dailyTransactions}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">آخر وصول</span>
                          <p className="font-medium text-xs">{device.lastAccess}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(device)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          التفاصيل
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={device.isLocked ? "border-red-300 text-red-600" : "border-green-300 text-green-600"}
                        >
                          {device.isLocked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                          {device.isLocked ? 'مقفل' : 'مفتوح'}
                        </Button>
                      </div>
                      {device.securityStatus === 'critical' && (
                        <Button variant="destructive" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          إيقاف طارئ
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

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

export default ATMSecurityTab;
