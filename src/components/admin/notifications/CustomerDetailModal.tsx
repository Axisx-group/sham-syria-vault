
import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewCustomerRequest } from "@/types/customerRequest";
import { useCustomerDetailModal } from "@/hooks/useCustomerDetailModal";
import CustomerPersonalInfo from './CustomerPersonalInfo';
import CustomerAccountDetails from './CustomerAccountDetails';
import CustomerDocuments from './CustomerDocuments';
import CustomerApprovalActions from './CustomerApprovalActions';

interface CustomerDetailModalProps {
  request: NewCustomerRequest;
  onRequestUpdated?: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ request, onRequestUpdated }) => {
  const {
    documents,
    loadingDocuments,
    processing,
    setProcessing,
    handleDownloadDocument
  } = useCustomerDetailModal(request);

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          تفاصيل طلب العميل: {request.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <CustomerPersonalInfo request={request} />
        <CustomerAccountDetails request={request} />
        <CustomerDocuments 
          documents={documents}
          loadingDocuments={loadingDocuments}
          onDownloadDocument={handleDownloadDocument}
        />
        <CustomerApprovalActions 
          request={request}
          processing={processing}
          setProcessing={setProcessing}
          onRequestUpdated={onRequestUpdated}
        />
      </div>
    </DialogContent>
  );
};

export default CustomerDetailModal;
