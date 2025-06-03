
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewCustomerRequest } from "@/types/customerRequest";
import { useCustomerRequestActions } from "@/hooks/useCustomerRequestActions";
import CustomerDetailModal from './CustomerDetailModal';

interface CustomerRequestActionsProps {
  request: NewCustomerRequest;
  onRequestUpdated?: () => void;
}

const CustomerRequestActions: React.FC<CustomerRequestActionsProps> = ({ 
  request, 
  onRequestUpdated 
}) => {
  const { loading, handleApproval } = useCustomerRequestActions();

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" disabled={loading}>
            <Eye className="h-4 w-4 mr-2" />
            مراجعة
          </Button>
        </DialogTrigger>
        <CustomerDetailModal request={request} onRequestUpdated={onRequestUpdated} />
      </Dialog>
      
      <Button
        size="sm"
        onClick={() => handleApproval(request.id, 'approve', onRequestUpdated)}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        {loading ? 'معالجة...' : 'موافقة'}
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleApproval(request.id, 'reject', onRequestUpdated)}
        disabled={loading}
        className="border-red-500 text-red-600 hover:bg-red-50"
      >
        <XCircle className="h-4 w-4 mr-2" />
        {loading ? 'معالجة...' : 'رفض'}
      </Button>
    </div>
  );
};

export default CustomerRequestActions;
