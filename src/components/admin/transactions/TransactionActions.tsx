
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  MoreVertical,
  Eye,
  Download,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionActionsProps {
  transactionId: string;
  status: string;
  onViewDetails: (id: string) => void;
  onDownloadReceipt: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const TransactionActions = ({ 
  transactionId, 
  status, 
  onViewDetails, 
  onDownloadReceipt, 
  onApprove, 
  onReject 
}: TransactionActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(transactionId)}>
          <Eye className="h-4 w-4 mr-2" />
          عرض التفاصيل
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownloadReceipt(transactionId)}>
          <Download className="h-4 w-4 mr-2" />
          تحميل الإيصال
        </DropdownMenuItem>
        {status === 'قيد المراجعة' && (
          <>
            <DropdownMenuItem 
              className="text-green-600"
              onClick={() => onApprove(transactionId)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              الموافقة
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onReject(transactionId)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              الرفض
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionActions;
