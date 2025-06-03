
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Eye,
  Download,
  Filter
} from "lucide-react";
import KYCVerificationForm from './KYCVerificationForm';
import KYCStatus from './KYCStatus';

const KYCDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);

  // Mock data for demonstration
  const kycStats = {
    total: 1247,
    pending: 89,
    approved: 1089,
    rejected: 47,
    underReview: 22
  };

  const recentApplications = [
    {
      id: 'KYC001',
      customerName: 'أحمد محمد علي',
      level: 'advanced',
      status: 'under_review',
      submittedAt: '2024-01-20 14:30',
      progress: 85
    },
    {
      id: 'KYC002',
      customerName: 'فاطمة حسن محمود',
      level: 'intermediate',
      status: 'approved',
      submittedAt: '2024-01-19 11:15',
      progress: 100
    },
    {
      id: 'KYC003',
      customerName: 'محمد سعد الدين',
      level: 'basic',
      status: 'rejected',
      submittedAt: '2024-01-18 16:45',
      progress: 60
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير محدد</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'basic':
        return <Badge variant="outline" className="text-green-600">أساسي</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="text-blue-600">متوسط</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="text-purple-600">متقدم</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  if (showForm) {
    return (
      <div>
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowForm(false)}
            className="mb-4"
          >
            العودة للوحة التحكم
          </Button>
        </div>
        <KYCVerificationForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة التحقق من الهوية (KYC)</h1>
          <p className="text-gray-600">مراقبة وإدارة طلبات التحقق من هوية العملاء</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Shield className="h-4 w-4 mr-2" />
          بدء عملية التحقق
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{kycStats.total}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-blue-600">{kycStats.underReview}</p>
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
                <p className="text-sm font-medium text-gray-600">تم الموافقة</p>
                <p className="text-2xl font-bold text-green-600">{kycStats.approved}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">{kycStats.pending}</p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مرفوض</p>
                <p className="text-2xl font-bold text-red-600">{kycStats.rejected}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="applications">الطلبات</TabsTrigger>
          <TabsTrigger value="my-status">حالة التحقق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">الطلبات الحديثة</CardTitle>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    فلترة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {application.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{application.customerName}</h3>
                        <p className="text-sm text-gray-600">#{application.id}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          {getLevelBadge(application.level)}
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-2">{application.submittedAt}</p>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${application.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{application.progress}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      عرض
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">جميع طلبات التحقق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات</h3>
                <p className="text-gray-600 mb-4">ابدأ عملية التحقق من الهوية للوصول إلى هذا القسم</p>
                <Button onClick={() => setShowForm(true)}>
                  بدء التحقق
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-status" className="space-y-6">
          <KYCStatus
            status="incomplete"
            level="intermediate"
            completedSteps={[
              'المعلومات الشخصية',
              'معلومات العنوان'
            ]}
            pendingSteps={[
              'رفع الوثائق',
              'التحقق النهائي'
            ]}
            rejectedSteps={[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KYCDashboard;
