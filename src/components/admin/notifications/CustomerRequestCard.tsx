
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { NewCustomerRequest } from "@/types/customerRequest";
import CustomerInfo from './CustomerInfo';
import CustomerRequestActions from './CustomerRequestActions';

interface CustomerRequestCardProps {
  request: NewCustomerRequest;
  onRequestUpdated?: () => void;
}

const CustomerRequestCard: React.FC<CustomerRequestCardProps> = ({ 
  request, 
  onRequestUpdated 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <CustomerInfo request={request} />
          <CustomerRequestActions 
            request={request} 
            onRequestUpdated={onRequestUpdated} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerRequestCard;
