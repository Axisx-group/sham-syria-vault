
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import KYCVerificationForm from './KYCVerificationForm';
import KYCStatus from './KYCStatus';
import KYCApplicationDialog from './KYCApplicationDialog';
import KYCStatsCards from './KYCStatsCards';
import KYCRecentApplications from './KYCRecentApplications';
import KYCApplicationsTab from './KYCApplicationsTab';

const KYCDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);

  // Mock data for demonstration
  const [kycStats, setKycStats] = useState({
    total: 1247,
    pending: 89,
    approved: 1089,
    rejected: 47,
    underReview: 22
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 'KYC001',
      customerName: 'أحمد محمد علي',
      level: 'advanced',
      status: 'under_review',
      submittedAt: '2024-01-20 14:30',
      progress: 85,
      email: 'ahmed.mohamed@example.com',
      phone: '+963 123 456 789',
      address: 'دمشق، سوريا'
    },
    {
      id: 'KYC002',
      customerName: 'فاطمة حسن محمود',
      level: 'intermediate',
      status: 'approved',
      submittedAt: '2024-01-19 11:15',
      progress: 100,
      email: 'fatima.hassan@example.com',
      phone: '+963 987 654 321',
      address: 'حلب، سوريا'
    },
    {
      id: 'KYC003',
      customerName: 'محمد سعد الدين',
      level: 'basic',
      status: 'rejected',
      submittedAt: '2024-01-18 16:45',
      progress: 60,
      email: 'mohammed.saad@example.com',
      phone: '+963 555 123 456',
      address: 'حمص، سوريا'
    }
  ]);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationDialog(true);
  };

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    // تحديث حالة الطلب
    setRecentApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus, progress: newStatus === 'approved' ? 100 : app.progress }
          : app
      )
    );

    // تحديث الإحصائيات
    setKycStats(prev => {
      const updatedStats = { ...prev };
      const oldApplication = recentApplications.find(app => app.id === applicationId);
      
      if (oldApplication) {
        // تقليل العدد من الحالة القديمة
        switch (oldApplication.status) {
          case 'pending':
            updatedStats.pending = Math.max(0, updatedStats.pending - 1);
            break;
          case 'under_review':
            updatedStats.underReview = Math.max(0, updatedStats.underReview - 1);
            break;
          case 'approved':
            updatedStats.approved = Math.max(0, updatedStats.approved - 1);
            break;
          case 'rejected':
            updatedStats.rejected = Math.max(0, updatedStats.rejected - 1);
            break;
        }

        // زيادة العدد للحالة الجديدة
        switch (newStatus) {
          case 'pending':
            updatedStats.pending += 1;
            break;
          case 'under_review':
            updatedStats.underReview += 1;
            break;
          case 'approved':
            updatedStats.approved += 1;
            break;
          case 'rejected':
            updatedStats.rejected += 1;
            break;
        }
      }

      return updatedStats;
    });
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
      <KYCStatsCards stats={kycStats} />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="applications">الطلبات</TabsTrigger>
          <TabsTrigger value="my-status">حالة التحقق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <KYCRecentApplications 
            applications={recentApplications}
            onViewApplication={handleViewApplication}
          />
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <KYCApplicationsTab onStartVerification={() => setShowForm(true)} />
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

      {/* Application Details Dialog */}
      <KYCApplicationDialog
        open={showApplicationDialog}
        onOpenChange={setShowApplicationDialog}
        application={selectedApplication}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default KYCDashboard;
