
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye,
  Download,
  Filter
} from "lucide-react";

interface Application {
  id: string;
  customerName: string;
  level: string;
  status: string;
  submittedAt: string;
  progress: number;
  email?: string;
  phone?: string;
  address?: string;
}

interface KYCRecentApplicationsProps {
  applications: Application[];
  onViewApplication: (application: Application) => void;
}

const KYCRecentApplications: React.FC<KYCRecentApplicationsProps> = ({ 
  applications, 
  onViewApplication 
}) => {
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

  return (
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
          {applications.map((application) => (
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewApplication(application)}
              >
                <Eye className="h-4 w-4 mr-2" />
                عرض
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCRecentApplications;
