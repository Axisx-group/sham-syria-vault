
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle,
  Mail,
  Phone,
  Calendar,
  MapPin
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { NewCustomerRequest } from "@/types/customerRequest";

interface CustomerDetailModalProps {
  request: NewCustomerRequest;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ request }) => {
  const [actionNotes, setActionNotes] = useState('');
  const { toast } = useToast();

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      console.log(`${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      console.log('ملاحظات الإدارة:', actionNotes);
      
      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });

      setActionNotes('');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الطلب",
        variant: "destructive"
      });
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          تفاصيل طلب العميل: {request.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* معلومات العميل */}
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

        {/* تفاصيل الحساب */}
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

        {/* المستندات المطلوبة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المستندات المرفقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {request.documents?.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إجراءات الموافقة */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إجراء الموافقة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="إضافة ملاحظات حول القرار (اختياري)..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-3">
              <Button
                onClick={() => handleApproval(request.id, 'approve')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                الموافقة على الطلب
              </Button>
              <Button
                onClick={() => handleApproval(request.id, 'reject')}
                variant="outline"
                className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                رفض الطلب
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
};

export default CustomerDetailModal;
