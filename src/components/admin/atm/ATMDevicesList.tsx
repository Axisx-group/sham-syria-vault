
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  MapPin,
  Activity,
  DollarSign,
  Settings,
  AlertCircle
} from "lucide-react";

const ATMDevicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const atmDevices = [
    {
      id: 'ATM001',
      location: 'فرع دمشق الرئيسي',
      address: 'شارع الثورة، دمشق',
      status: 'متاح',
      cashLevel: 85,
      lastTransaction: '2024-01-20 15:30:25',
      dailyTransactions: 156,
      dailyAmount: '₺450,000'
    },
    {
      id: 'ATM002',
      location: 'مول الشام',
      address: 'مول الشام، دمشق',
      status: 'متاح',
      cashLevel: 45,
      lastTransaction: '2024-01-20 15:28:10',
      dailyTransactions: 203,
      dailyAmount: '₺670,000'
    },
    {
      id: 'ATM003',
      location: 'جامعة دمشق',
      address: 'الجامعة، دمشق',
      status: 'صيانة',
      cashLevel: 0,
      lastTransaction: '2024-01-20 10:15:30',
      dailyTransactions: 89,
      dailyAmount: '₺230,000'
    },
    {
      id: 'ATM004',
      location: 'فرع حلب',
      address: 'شارع السبع بحرات، حلب',
      status: 'متاح',
      cashLevel: 92,
      lastTransaction: '2024-01-20 15:25:45',
      dailyTransactions: 134,
      dailyAmount: '₺380,000'
    },
    {
      id: 'ATM005',
      location: 'مطار دمشق',
      address: 'مطار دمشق الدولي',
      status: 'معطل',
      cashLevel: 60,
      lastTransaction: '2024-01-20 08:45:20',
      dailyTransactions: 45,
      dailyAmount: '₺120,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متاح': return 'bg-green-100 text-green-800';
      case 'صيانة': return 'bg-yellow-100 text-yellow-800';
      case 'معطل': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCashLevelColor = (level: number) => {
    if (level > 70) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

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
        {atmDevices.map((device) => (
          <Card key={device.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{device.location}</h3>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status}
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
                    </div>
                    <div>
                      <span className="text-gray-500">المعاملات اليومية</span>
                      <p className="font-semibold">{device.dailyTransactions}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">المبلغ اليومي</span>
                      <p className="font-semibold">{device.dailyAmount}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">آخر معاملة</span>
                      <p className="font-semibold text-xs">{device.lastTransaction}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    المراقبة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    الإعدادات
                  </Button>
                  {device.status === 'معطل' && (
                    <Button variant="outline" size="sm" className="border-red-300 text-red-600">
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
    </div>
  );
};

export default ATMDevicesList;
