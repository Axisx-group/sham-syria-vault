
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle } from "lucide-react";

interface UpdatesTabProps {
  updateStatus: any;
  onPushUpdate: () => void;
}

const UpdatesTab = ({ updateStatus, onPushUpdate }: UpdatesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          التحديثات المتاحة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {updateStatus.available ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">النسخة {updateStatus.version}</h3>
                <p className="text-sm text-gray-600">حجم التحديث: {updateStatus.size}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">متاح</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">الميزات الجديدة:</h4>
              <ul className="space-y-1">
                {updateStatus.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={onPushUpdate} className="bg-blue-600 hover:bg-blue-700">
                دفع التحديث للجميع
              </Button>
              <Button variant="outline">
                دفع للمجموعة التجريبية
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">التطبيق محدث</h3>
            <p className="text-gray-600">لا توجد تحديثات متاحة حالياً</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdatesTab;
