
import React from 'react';
import TransactionItem from './TransactionItem';

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

interface TransactionsListProps {
  transactions: Transaction[];
  onViewDetails: (id: string) => void;
  onDownloadReceipt: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const TransactionsList = ({ 
  transactions, 
  onViewDetails, 
  onDownloadReceipt, 
  onApprove, 
  onReject 
}: TransactionsListProps) => {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onViewDetails={onViewDetails}
          onDownloadReceipt={onDownloadReceipt}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default TransactionsList;
