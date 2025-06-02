
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Download
} from "lucide-react";

const AdminQuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">الإجراءات السريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-500 hover:bg-blue-600">
            <Users className="h-6 w-6" />
            <span>إضافة عميل جديد</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-500 hover:bg-green-600">
            <CreditCard className="h-6 w-6" />
            <span>إنشاء حساب جديد</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-500 hover:bg-purple-600">
            <MessageSquare className="h-6 w-6" />
            <span>إرسال رسالة جماعية</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-500 hover:bg-orange-600">
            <Download className="h-6 w-6" />
            <span>تصدير التقارير</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;
