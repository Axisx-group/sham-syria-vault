
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Mail,
  Phone,
  Clock
} from "lucide-react";
import { NewCustomerRequest } from "@/types/customerRequest";

interface CustomerInfoProps {
  request: NewCustomerRequest;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ request }) => {
  return (
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
  );
};

export default CustomerInfo;
