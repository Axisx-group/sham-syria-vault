
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Transaction {
  id: string;
  type: string;
  amount: string;
  currency: string;
  fromAccount: string;
  toAccount: string;
  fromCustomer: string;
  toCustomer: string;
  status: string;
  timestamp: string;
  reference: string;
  description: string;
  fee: string;
  channel: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onViewDetails: (id: string) => void;
  onDownloadReceipt: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const TransactionItem = ({ 
  transaction, 
  onViewDetails, 
  onDownloadReceipt, 
  onApprove, 
  onReject 
}: TransactionItemProps) => {
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

  const getTypeIcon = (type: string) => {
    if (type.includes('صادر') || type.includes('سحب') || type.includes('دفع')) {
      return <ArrowUpRight className="h-4 w-4 text-red-600" />;
    } else {
      return <ArrowDownRight className="h-4 w-4 text-green-600" />;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols = { SYP: '₺', USD: '$', EUR: '€', TRY: '₺' };
    return symbols[currency as keyof typeof symbols] || currency;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Transaction Type and Amount */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-3 space-x-reverse">
              {getTypeIcon(transaction.type)}
              <div>
                <h3 className="font-semibold text-gray-900">{transaction.type}</h3>
                <p className="text-lg font-bold text-gray-900">
                  {getCurrencySymbol(transaction.currency)}{transaction.amount}
                </p>
                <p className="text-xs text-gray-500">رسوم: {getCurrencySymbol(transaction.currency)}{transaction.fee}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="lg:col-span-4">
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-gray-600">من: </span>
                <span className="font-medium">{transaction.fromCustomer}</span>
                <span className="text-gray-400 text-xs"> ({transaction.fromAccount})</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">إلى: </span>
                <span className="font-medium">{transaction.toCustomer}</span>
                <span className="text-gray-400 text-xs"> ({transaction.toAccount})</span>
              </div>
              <p className="text-xs text-gray-500">{transaction.description}</p>
            </div>
          </div>

          {/* Status and Reference */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(transaction.status)}
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 font-mono">{transaction.reference}</p>
              <p className="text-xs text-gray-500">{transaction.channel}</p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="lg:col-span-2">
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="h-3 w-3" />
                <span>{transaction.timestamp.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{transaction.timestamp.split(' ')[1]}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetails(transaction.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownloadReceipt(transaction.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  تحميل الإيصال
                </DropdownMenuItem>
                {transaction.status === 'قيد المراجعة' && (
                  <>
                    <DropdownMenuItem 
                      className="text-green-600"
                      onClick={() => onApprove(transaction.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      الموافقة
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onReject(transaction.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      الرفض
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
