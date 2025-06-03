
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Mail,
  Phone
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { NewCustomerRequest } from "@/types/customerRequest";
import CustomerDetailModal from './CustomerDetailModal';

interface CustomerRequestCardProps {
  request: NewCustomerRequest;
}

const CustomerRequestCard: React.FC<CustomerRequestCardProps> = ({ request }) => {
  const { toast } = useToast();

  const handleApproval = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      console.log(`${action === 'approve' ? 'موافقة' : 'رفض'} طلب العميل:`, requestId);
      
      toast({
        title: action === 'approve' ? "تمت الموافقة" : "تم الرفض",
        description: `تم ${action === 'approve' ? 'الموافقة على' : 'رفض'} طلب العميل بنجاح`,
        variant: action === 'approve' ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الطلب",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
  );
};

export default CustomerRequestCard;
