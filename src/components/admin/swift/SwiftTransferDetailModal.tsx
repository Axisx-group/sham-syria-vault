
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  User, 
  Building, 
  CreditCard, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";

interface SwiftTransfer {
  id: string;
  referenceNumber: string;
  fromAccount: string;
  toAccount: string;
  beneficiaryName: string;
  swiftCode: string;
  bankName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  submittedAt: string;
  purpose: string;
  customerName: string;
  fees: number;
  country: string;
}

interface SwiftTransferDetailModalProps {
  transfer: SwiftTransfer | null;
  isOpen: boolean;
  onClose: () => void;
}

const SwiftTransferDetailModal: React.FC<SwiftTransferDetailModalProps> = ({
  transfer,
  isOpen,
  onClose
}) => {
  if (!transfer) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'approved': return 'معتمد';
      case 'rejected': return 'مرفوض';
      case 'processing': return 'قيد المعالجة';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            تفاصيل التحويل الدولي
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{transfer.referenceNumber}</h3>
                  <p className="text-gray-600">{transfer.submittedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transfer.status)}
                  <Badge className={getStatusColor(transfer.status)}>
                    {getStatusText(transfer.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-blue-600">
                  {transfer.amount.toLocaleString()} {transfer.currency}
                </p>
                <p className="text-sm text-gray-500">المبلغ المحول</p>
                <p className="text-sm text-gray-500 mt-1">رسوم التحويل: ${transfer.fees}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  معلومات العميل
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">اسم العميل</p>
                    <p className="font-medium">{transfer.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الحساب المرسل من</p>
                    <p className="font-medium font-mono">{transfer.fromAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الغرض من التحويل</p>
                    <p className="font-medium">{transfer.purpose}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beneficiary Info */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  معلومات المستفيد
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">اسم المستفيد</p>
                    <p className="font-medium">{transfer.beneficiaryName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الحساب</p>
                    <p className="font-medium font-mono">{transfer.toAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">البلد</p>
                    <p className="font-medium">{transfer.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bank Info */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Building className="h-4 w-4" />
                معلومات البنك المستقبل
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">اسم البنك</p>
                  <p className="font-medium">{transfer.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">رمز SWIFT</p>
                  <p className="font-medium font-mono">{transfer.swiftCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الدولة</p>
                  <p className="font-medium">{transfer.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Timeline */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                المراحل الزمنية للتحويل
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">تم إرسال التحويل</p>
                    <p className="text-sm text-gray-600">{transfer.submittedAt}</p>
                  </div>
                </div>
                
                {transfer.status === 'approved' && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">تمت الموافقة على التحويل</p>
                      <p className="text-sm text-gray-600">معتمد للمعالجة</p>
                    </div>
                  </div>
                )}

                {transfer.status === 'processing' && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                    <div className="flex-1">
                      <p className="font-medium">قيد المعالجة</p>
                      <p className="text-sm text-gray-600">جاري تنفيذ التحويل</p>
                    </div>
                  </div>
                )}

                {transfer.status === 'rejected' && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium">تم رفض التحويل</p>
                      <p className="text-sm text-gray-600">لم يتم تنفيذ التحويل</p>
                    </div>
                  </div>
                )}

                {transfer.status === 'completed' && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">تم إكمال التحويل بنجاح</p>
                      <p className="text-sm text-gray-600">وصل المبلغ للمستفيد</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwiftTransferDetailModal;
