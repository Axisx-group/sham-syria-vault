
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface KYCApplicationsTabProps {
  onStartVerification: () => void;
}

const KYCApplicationsTab: React.FC<KYCApplicationsTabProps> = ({ onStartVerification }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">جميع طلبات التحقق</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-600 mb-4">ابدأ عملية التحقق من الهوية للوصول إلى هذا القسم</p>
          <Button onClick={onStartVerification}>
            بدء التحقق
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCApplicationsTab;
