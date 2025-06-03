
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, MapPin } from "lucide-react";
import { NewCustomerRequest } from "@/types/customerRequest";

interface CustomerPersonalInfoProps {
  request: NewCustomerRequest;
}

const CustomerPersonalInfo: React.FC<CustomerPersonalInfoProps> = ({ request }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">المعلومات الشخصية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">البريد الإلكتروني</p>
              <p className="font-medium">{request.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">رقم الهاتف</p>
              <p className="font-medium">{request.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">تاريخ الطلب</p>
              <p className="font-medium">{request.requestDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">الموقع</p>
              <p className="font-medium">{request.location}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerPersonalInfo;
