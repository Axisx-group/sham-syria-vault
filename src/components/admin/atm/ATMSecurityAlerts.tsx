import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Shield,
  Camera,
  DollarSign
} from "lucide-react";

interface SecurityAlert {
  id: string;
  type: 'cash_low' | 'security_breach' | 'camera_offline' | 'sensor_triggered' | 'maintenance_due';
  severity: 'low' | 'medium' | 'high' | 'critical';
  atmId: string;
  atmLocation: string;
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  details?: string;
}

const ATMSecurityAlerts = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: 'ALERT001',
      type: 'cash_low',
      severity: 'high',
      atmId: 'ATM002',
      atmLocation: 'مول الشام',
      message: 'مستوى النقد منخفض - يحتاج إعادة تعبئة',
      timestamp: '2024-01-20 15:30:00',
      status: 'active',
      details: 'المستوى الحالي: 45% - الحد الأدنى: 50%'
    },
    {
      id: 'ALERT002',
      type: 'sensor_triggered',
      severity: 'critical',
      atmId: 'ATM005',
      atmLocation: 'مطار دمشق',
      message: 'تم تشغيل أجهزة الاستشعار - احتمال محاولة اختراق',
      timestamp: '2024-01-20 14:45:00',
      status: 'acknowledged',
      details: 'استشعار حركة غير طبيعية في منطقة الخزينة'
    },
    {
      id: 'ALERT003',
      type: 'camera_offline',
      severity: 'medium',
      atmId: 'ATM003',
      atmLocation: 'جامعة دمشق',
      message: 'كاميرا المراقبة غير متاحة',
      timestamp: '2024-01-20 12:20:00',
      status: 'active',
      details: 'انقطاع الاتصال مع كاميرا المراقبة الرئيسية'
    },
    {
      id: 'ALERT004',
      type: 'maintenance_due',
      severity: 'low',
      atmId: 'ATM001',
      atmLocation: 'فرع دمشق الرئيسي',
      message: 'موعد الصيانة الدورية',
      timestamp: '2024-01-20 10:00:00',
      status: 'resolved',
      details: 'صيانة دورية مجدولة كل 30 يوم'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cash_low': return <DollarSign className="h-4 w-4" />;
      case 'security_breach': return <Shield className="h-4 w-4" />;
      case 'camera_offline': return <Camera className="h-4 w-4" />;
      case 'sensor_triggered': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance_due': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' as const } : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => alert.status !== 'resolved');
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          التنبيهات الأمنية
          {activeAlerts.length > 0 && (
            <Badge variant="destructive">{activeAlerts.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تنبيهات نشطة</h3>
            <p className="text-gray-500">جميع الأجهزة تعمل بشكل طبيعي</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Critical Alerts First */}
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(alert.type)}
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity === 'critical' && 'حرج'}
                        {alert.severity === 'high' && 'عالي'}
                        {alert.severity === 'medium' && 'متوسط'}
                        {alert.severity === 'low' && 'منخفض'}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status === 'active' && 'نشط'}
                        {alert.status === 'acknowledged' && 'معترف به'}
                        {alert.status === 'resolved' && 'محلول'}
                      </Badge>
                      <span className="text-sm text-gray-500">{alert.atmId}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{alert.atmLocation}</h4>
                    <p className="text-gray-700 mt-1">{alert.message}</p>
                    {alert.details && (
                      <p className="text-sm text-gray-600 mt-2">{alert.details}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                    {alert.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        اعتراف
                      </Button>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                        className="border-green-300 text-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        حل
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Other Active Alerts */}
            {activeAlerts.filter(alert => alert.severity !== 'critical').map((alert) => (
              <div key={alert.id} className="border border-gray-200 bg-white p-4 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(alert.type)}
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity === 'critical' && 'حرج'}
                        {alert.severity === 'high' && 'عالي'}
                        {alert.severity === 'medium' && 'متوسط'}
                        {alert.severity === 'low' && 'منخفض'}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status === 'active' && 'نشط'}
                        {alert.status === 'acknowledged' && 'معترف به'}
                        {alert.status === 'resolved' && 'محلول'}
                      </Badge>
                      <span className="text-sm text-gray-500">{alert.atmId}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{alert.atmLocation}</h4>
                    <p className="text-gray-700 mt-1">{alert.message}</p>
                    {alert.details && (
                      <p className="text-sm text-gray-600 mt-2">{alert.details}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                    {alert.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        اعتراف
                      </Button>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                        className="border-green-300 text-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        حل
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATMSecurityAlerts;
