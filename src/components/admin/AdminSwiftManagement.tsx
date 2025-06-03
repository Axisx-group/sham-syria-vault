import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Eye,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SwiftTransferDetailModal from './swift/SwiftTransferDetailModal';

interface SwiftTransfer {
  id: string;
  referenceNumber: string;
  fromAccount: string;
  toAccount: string;
  beneficiaryName: string;
  swiftCode: string;
  bankName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  submittedAt: string;
  purpose: string;
  customerName: string;
  fees: number;
  country: string;
}

const AdminSwiftManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransfer, setSelectedTransfer] = useState<SwiftTransfer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [transfers, setTransfers] = useState<SwiftTransfer[]>([
    {
      id: 'SWIFT001',
      referenceNumber: 'SWT240603001',
      fromAccount: 'ACC001',
      toAccount: 'GB33BUKB20201555555555',
      beneficiaryName: 'John Smith',
      swiftCode: 'BUKBGB22',
      bankName: 'Barclays Bank UK',
      amount: 5000,
      currency: 'USD',
      status: 'pending',
      submittedAt: '2024-06-03 14:30:00',
      purpose: 'Business payment',
      customerName: 'أحمد محمد علي',
      fees: 25,
      country: 'United Kingdom'
    },
    {
      id: 'SWIFT002',
      referenceNumber: 'SWT240603002',
      fromAccount: 'ACC002',
      toAccount: 'DE89370400440532013000',
      beneficiaryName: 'Maria Schmidt',
      swiftCode: 'COBADEFF',
      bankName: 'Commerzbank AG',
      amount: 2500,
      currency: 'EUR',
      status: 'approved',
      submittedAt: '2024-06-03 13:15:00',
      purpose: 'Personal transfer',
      customerName: 'فاطمة حسن',
      fees: 25,
      country: 'Germany'
    },
    {
      id: 'SWIFT003',
      referenceNumber: 'SWT240603003',
      fromAccount: 'ACC003',
      toAccount: 'US64SVBKUS6S3300000000',
      beneficiaryName: 'Robert Johnson',
      swiftCode: 'SVBKUS6S',
      bankName: 'Silicon Valley Bank',
      amount: 10000,
      currency: 'USD',
      status: 'processing',
      submittedAt: '2024-06-03 12:00:00',
      purpose: 'Investment',
      customerName: 'محمد سعد',
      fees: 25,
      country: 'United States'
    }
  ]);

  const { toast } = useToast();

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
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleViewDetails = (transferId: string) => {
    const transfer = transfers.find(t => t.id === transferId);
    if (transfer) {
      setSelectedTransfer(transfer);
      setIsDetailModalOpen(true);
      console.log('عرض تفاصيل التحويل:', transfer);
    }
  };

  const handleApprove = (transferId: string) => {
    setTransfers(prev => prev.map(t => 
      t.id === transferId ? { ...t, status: 'approved' as const } : t
    ));
    toast({
      title: "تمت الموافقة",
      description: `تمت الموافقة على التحويل ${transferId}`,
    });
  };

  const handleReject = (transferId: string) => {
    setTransfers(prev => prev.map(t => 
      t.id === transferId ? { ...t, status: 'rejected' as const } : t
    ));
    toast({
      title: "تم الرفض",
      description: `تم رفض التحويل ${transferId}`,
      variant: "destructive"
    });
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: transfers.filter(t => t.status === 'pending').length,
    approved: transfers.filter(t => t.status === 'approved').length,
    processing: transfers.filter(t => t.status === 'processing').length,
    total: transfers.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            إدارة تحويلات SWIFT
          </h1>
          <p className="text-gray-600 mt-2">مراجعة وإدارة التحويلات المصرفية الدولية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معتمد</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد المعالجة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي التحويلات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Globe className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث بالمرجع أو اسم المستفيد أو العميل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                  <SelectItem value="processing">قيد المعالجة</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfers List */}
      <div className="space-y-4">
        {filteredTransfers.map(transfer => (
          <Card key={transfer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{transfer.referenceNumber}</p>
                    <p className="text-sm text-gray-600">{transfer.customerName}</p>
                    <p className="text-xs text-gray-500">{transfer.submittedAt}</p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="space-y-1">
                    <p className="font-medium">{transfer.beneficiaryName}</p>
                    <p className="text-sm text-gray-600">{transfer.bankName}</p>
                    <p className="text-xs text-gray-500">{transfer.country}</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{transfer.amount.toLocaleString()} {transfer.currency}</p>
                    <p className="text-xs text-gray-500">رسوم: ${transfer.fees}</p>
                    <p className="text-xs text-gray-500">{transfer.purpose}</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">SWIFT: {transfer.swiftCode}</p>
                    <p className="text-xs text-gray-500 font-mono">{transfer.toAccount}</p>
                  </div>
                </div>

                <div className="lg:col-span-1">
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
                </div>

                <div className="lg:col-span-1">
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(transfer.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {transfer.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleApprove(transfer.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReject(transfer.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransfers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد تحويلات تطابق معايير البحث</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      <SwiftTransferDetailModal
        transfer={selectedTransfer}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTransfer(null);
        }}
      />
    </div>
  );
};

export default AdminSwiftManagement;
