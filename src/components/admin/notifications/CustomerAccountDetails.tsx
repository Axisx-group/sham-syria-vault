
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewCustomerRequest } from "@/types/customerRequest";

interface CustomerAccountDetailsProps {
  request: NewCustomerRequest;
}

const CustomerAccountDetails: React.FC<CustomerAccountDetailsProps> = ({ request }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">تفاصيل الحساب المطلوب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">نوع الحساب:</span>
            <Badge className="bg-blue-100 text-blue-800">{request.accountType}</Badge>
          </div>
          <div>
            <p className="text-gray-600 mb-2">ملاحظات الطلب:</p>
            <p className="bg-gray-50 p-3 rounded-lg text-sm">{request.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAccountDetails;
