
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

interface SwiftTransfer {
  id: string;
  referenceNumber: string;
  beneficiaryName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  submittedAt: string;
  bankName: string;
  country: string;
}

const SwiftTransferSection = () => {
  const [transfers] = useState<SwiftTransfer[]>([
    {
      id: 'SWIFT001',
      referenceNumber: 'SWT240603001',
      beneficiaryName: 'John Smith',
      amount: 5000,
      currency: 'USD',
      status: 'pending',
      submittedAt: '2024-06-03',
      bankName: 'Barclays Bank UK',
      country: 'United Kingdom'
    },
    {
      id: 'SWIFT002',
      referenceNumber: 'SWT240603002',
      beneficiaryName: 'Maria Schmidt',
      amount: 2500,
      currency: 'EUR',
      status: 'processing',
      submittedAt: '2024-06-02',
      bankName: 'Commerzbank AG',
      country: 'Germany'
    }
  ]);

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
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            تحويلات SWIFT الدولية
          </CardTitle>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            تحويل جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transfers.map(transfer => (
            <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-medium">{transfer.beneficiaryName}</p>
                    <p className="text-sm text-gray-600">{transfer.bankName} - {transfer.country}</p>
                    <p className="text-xs text-gray-500">{transfer.referenceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{transfer.amount.toLocaleString()} {transfer.currency}</p>
                    <p className="text-xs text-gray-500">{transfer.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transfer.status)}
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status === 'pending' && 'في الانتظار'}
                      {transfer.status === 'approved' && 'معتمد'}
                      {transfer.status === 'rejected' && 'مرفوض'}
                      {transfer.status === 'processing' && 'قيد المعالجة'}
                      {transfer.status === 'completed' && 'مكتمل'}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {transfers.length === 0 && (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد تحويلات SWIFT</p>
              <Button className="mt-4" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                إنشاء تحويل دولي
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SwiftTransferSection;
