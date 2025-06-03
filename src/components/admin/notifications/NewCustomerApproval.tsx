
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useCustomerRequests } from "@/hooks/useCustomerRequests";
import CustomerRequestCard from './CustomerRequestCard';
import EmptyCustomerRequests from './EmptyCustomerRequests';

const NewCustomerApproval = () => {
  const { pendingRequests, loading, error, refreshRequests } = useCustomerRequests();

  const handleRequestUpdated = () => {
    console.log('تم تحديث طلب - إعادة تحميل القائمة');
    refreshRequests();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">طلبات العملاء الجدد</h3>
            <p className="text-gray-600">مراجعة والموافقة على طلبات فتح الحسابات الجديدة</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            جاري التحميل...
          </Badge>
        </div>
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">طلبات العملاء الجدد</h3>
            <p className="text-gray-600">مراجعة والموافقة على طلبات فتح الحسابات الجديدة</p>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={refreshRequests}
              className="mr-2"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              إعادة المحاولة
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">طلبات العملاء الجدد</h3>
          <p className="text-gray-600">مراجعة والموافقة على طلبات فتح الحسابات الجديدة</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
            {pendingRequests.length} طلب في الانتظار
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshRequests}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            تحديث
          </Button>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <EmptyCustomerRequests />
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <CustomerRequestCard 
              key={request.id} 
              request={request} 
              onRequestUpdated={handleRequestUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCustomerApproval;
