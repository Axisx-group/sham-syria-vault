
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useCustomerRequests } from "@/hooks/useCustomerRequests";
import CustomerRequestCard from './CustomerRequestCard';
import EmptyCustomerRequests from './EmptyCustomerRequests';

const NewCustomerApproval = () => {
  const { pendingRequests } = useCustomerRequests();

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
        <EmptyCustomerRequests />
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <CustomerRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCustomerApproval;
