
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock
} from "lucide-react";

interface TransactionStatusProps {
  status: string;
}

const TransactionStatus = ({ status }: TransactionStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'قيد المعالجة':
        return 'bg-blue-100 text-blue-800';
      case 'قيد المراجعة':
        return 'bg-yellow-100 text-yellow-800';
      case 'فشل':
      case 'مرفوض':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'قيد المعالجة':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'قيد المراجعة':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'فشل':
      case 'مرفوض':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon(status)}
      <Badge className={getStatusColor(status)}>
        {status}
      </Badge>
    </div>
  );
};

export default TransactionStatus;
