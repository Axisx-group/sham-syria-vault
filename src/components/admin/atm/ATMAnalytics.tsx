
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3,
  Clock,
  MapPin,
  TrendingUp
} from "lucide-react";

const ATMAnalytics = () => {
  const peakHours = [
    { hour: '09:00', transactions: 45 },
    { hour: '12:00', transactions: 78 },
    { hour: '15:00', transactions: 65 },
    { hour: '18:00', transactions: 89 },
    { hour: '21:00', transactions: 34 }
  ];

  const topLocations = [
    { location: 'مول الشام', transactions: 203, amount: '₺670,000' },
    { location: 'فرع دمشق الرئيسي', transactions: 156, amount: '₺450,000' },
    { location: 'فرع حلب', transactions: 134, amount: '₺380,000' },
    { location: 'جامعة دمشق', transactions: 89, amount: '₺230,000' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              أوقات الذروة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peakHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{hour.hour}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(hour.transactions / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{hour.transactions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              أكثر المواقع استخداماً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{location.location}</p>
                    <p className="text-sm text-gray-600">{location.transactions} معاملة</p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-green-600">{location.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط المعاملة</p>
                <p className="text-2xl font-bold text-gray-900">₺2,450</p>
                <p className="text-xs text-green-600">+5.2% من الأسبوع الماضي</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">وقت الذروة</p>
                <p className="text-2xl font-bold text-gray-900">18:00</p>
                <p className="text-xs text-blue-600">89 معاملة/ساعة</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-gray-900">97.8%</p>
                <p className="text-xs text-green-600">أداء ممتاز</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ATMAnalytics;
