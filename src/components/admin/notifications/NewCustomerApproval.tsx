
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface NewCustomerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: string;
  requestDate: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
  notes?: string;
}

const NewCustomerApproval = () => {
  const [selectedRequest, setSelectedRequest] = useState<NewCustomerRequest | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const { toast } = useToast();

  const newCustomerRequests: NewCustomerRequest[] = [
    {
      id: 'REQ001',
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963 991 234 567',
      accountType: 'شخصي',
      requestDate: '2024-01-20 14:30',
      location: 'دمشق، سوريا',
      status: 'pending',
      documents: ['الهوية الشخصية', 'إثبات العنوان', 'إثبات الدخل'],
      notes: 'طلب فتح حساب جاري شخصي'
    },
    {
      id: 'REQ002',
      name: 'فاطمة حسن محمود',
      email: 'fatima.hassan@email.com',
      phone: '+963 992 345 678',
      accountType: 'تجاري',
      requestDate: '2024-01-20 13:15',
      location: 'حلب، سوريا',
      status: 'pending',
      documents: ['السجل التجاري', 'البطاقة الضريبية', 'عقد التأسيس'],
      notes: 'طلب فتح حساب تجاري لشركة استيراد وتصدير'
    },
    {
      id: 'REQ003',
      name: 'محمد سعد الدين',
      email: 'mohammed.saad@email.com',
      phone: '+963 993 456 789',
      accountType: 'توفير',
      requestDate: '2024-01-20 12:00',
      location: 'حمص، سوريا',
      status: 'pending',
      documents: ['الهوية الشخصية', 'إثبات العنوان'],
      notes: 'طلب فتح حساب توفير'
    }
  ];

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      console.log(`${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      console.log('ملاحظات الإدارة:', actionNotes);
      
      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });

      setSelectedRequest(null);
      setActionNotes('');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الطلب",
        variant: "destructive"
      });
    }
  };

  const CustomerDetailModal = ({ request }: { request: NewCustomerRequest }) => (
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

  const pendingRequests = newCustomerRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">طلبات العملاء الجدد</h3>
          <p className="text-gray-600">مراجعة والموافقة على طلبات فتح الحسابات الجديدة</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
          {pendingRequests.length} طلب في الانتظار
        </Badge>
      </div>

      {pendingRequests.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">
              لا توجد طلبات جديدة
            </h4>
            <p className="text-gray-500">
              جميع طلبات العملاء الجدد تمت مراجعتها
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{request.name}</h4>
                        <Badge className="bg-orange-100 text-orange-800">
                          {request.accountType}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{request.requestDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          مراجعة
                        </Button>
                      </DialogTrigger>
                      <CustomerDetailModal request={request} />
                    </Dialog>
                    
                    <Button
                      size="sm"
                      onClick={() => handleApproval(request.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      موافقة
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApproval(request.id, 'reject')}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      رفض
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCustomerApproval;
