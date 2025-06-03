
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import TransactionsHeader from './transactions/TransactionsHeader';
import TransactionsSummaryCards from './transactions/TransactionsSummaryCards';
import TransactionsFilters from './transactions/TransactionsFilters';
import TransactionsList from './transactions/TransactionsList';
import TransactionsPagination from './transactions/TransactionsPagination';

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      type: 'تحويل صادر',
      amount: '50,000',
      currency: 'SYP',
      fromAccount: 'ACC001',
      toAccount: 'ACC002',
      fromCustomer: 'أحمد محمد علي',
      toCustomer: 'فاطمة حسن محمود',
      status: 'مكتمل',
      timestamp: '2024-01-20 14:30:25',
      reference: 'REF123456789',
      description: 'دفع فاتورة',
      fee: '500',
      channel: 'تطبيق الموبايل'
    },
    {
      id: 'TXN002',
      type: 'إيداع',
      amount: '125,000',
      currency: 'USD',
      fromAccount: 'External',
      toAccount: 'ACC003',
      fromCustomer: 'تحويل خارجي',
      toCustomer: 'محمد سعد الدين',
      status: 'قيد المراجعة',
      timestamp: '2024-01-20 13:15:10',
      reference: 'REF987654321',
      description: 'إيداع نقدي',
      fee: '1,000',
      channel: 'فرع البنك'
    },
    {
      id: 'TXN003',
      type: 'سحب',
      amount: '25,000',
      currency: 'EUR',
      fromAccount: 'ACC004',
      toAccount: 'ATM',
      fromCustomer: 'نور عبد الرحمن',
      toCustomer: 'صراف آلي',
      status: 'فشل',
      timestamp: '2024-01-20 12:45:33',
      reference: 'REF456789123',
      description: 'سحب نقدي من الصراف الآلي',
      fee: '200',
      channel: 'صراف آلي'
    },
    {
      id: 'TXN004',
      type: 'دفع فاتورة',
      amount: '75,500',
      currency: 'TRY',
      fromAccount: 'ACC001',
      toAccount: 'Utility',
      fromCustomer: 'أحمد محمد علي',
      toCustomer: 'شركة الكهرباء',
      status: 'مكتمل',
      timestamp: '2024-01-20 11:20:15',
      reference: 'REF789123456',
      description: 'دفع فاتورة الكهرباء',
      fee: '300',
      channel: 'موقع الويب'
    },
    {
      id: 'TXN005',
      type: 'تحويل وارد',
      amount: '200,000',
      currency: 'SYP',
      fromAccount: 'External',
      toAccount: 'ACC002',
      fromCustomer: 'تحويل دولي',
      toCustomer: 'فاطمة حسن محمود',
      status: 'قيد المعالجة',
      timestamp: '2024-01-20 10:05:42',
      reference: 'REF321654987',
      description: 'تحويل من الخارج',
      fee: '2,000',
      channel: 'SWIFT'
    }
  ]);

  const { toast } = useToast();

  const handleViewDetails = (transactionId: string) => {
    console.log('Viewing details for transaction:', transactionId);
    toast({
      title: "عرض التفاصيل",
      description: `عرض تفاصيل المعاملة ${transactionId}`,
    });
  };

  const handleDownloadReceipt = (transactionId: string) => {
    console.log('Downloading receipt for transaction:', transactionId);
    toast({
      title: "تحميل الإيصال",
      description: `تم بدء تحميل إيصال المعاملة ${transactionId}`,
    });
  };

  const handleApproveTransaction = (transactionId: string) => {
    console.log('Approving transaction:', transactionId);
    setTransactions(prevTransactions =>
      prevTransactions.map(tx =>
        tx.id === transactionId ? { ...tx, status: 'مكتمل' } : tx
      )
    );
    toast({
      title: "تمت الموافقة",
      description: `تمت الموافقة على المعاملة ${transactionId}`,
    });
  };

  const handleRejectTransaction = (transactionId: string) => {
    console.log('Rejecting transaction:', transactionId);
    setTransactions(prevTransactions =>
      prevTransactions.map(tx =>
        tx.id === transactionId ? { ...tx, status: 'مرفوض' } : tx
      )
    );
    toast({
      title: "تم الرفض",
      description: `تم رفض المعاملة ${transactionId}`,
      variant: "destructive"
    });
  };

  const handleRefresh = () => {
    console.log('Refreshing transactions');
    toast({
      title: "تم التحديث",
      description: "تم تحديث قائمة المعاملات",
    });
  };

  const handleExport = () => {
    console.log('Exporting transactions');
    toast({
      title: "جاري التصدير",
      description: "سيتم تصدير البيانات قريباً",
    });
  };

  return (
    <div className="space-y-6">
      <TransactionsHeader 
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <TransactionsSummaryCards />

      <TransactionsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <TransactionsList
        transactions={transactions}
        onViewDetails={handleViewDetails}
        onDownloadReceipt={handleDownloadReceipt}
        onApprove={handleApproveTransaction}
        onReject={handleRejectTransaction}
      />

      <TransactionsPagination />
    </div>
  );
};

export default AdminTransactions;
