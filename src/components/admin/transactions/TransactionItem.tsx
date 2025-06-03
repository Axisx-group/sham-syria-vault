
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TransactionAmount from './TransactionAmount';
import TransactionDetails from './TransactionDetails';
import TransactionReference from './TransactionReference';
import TransactionTimestamp from './TransactionTimestamp';
import TransactionActions from './TransactionActions';

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
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Transaction Type and Amount */}
          <div className="lg:col-span-3">
            <TransactionAmount
              type={transaction.type}
              amount={transaction.amount}
              currency={transaction.currency}
              fee={transaction.fee}
            />
          </div>

          {/* Transaction Details */}
          <div className="lg:col-span-4">
            <TransactionDetails
              fromCustomer={transaction.fromCustomer}
              fromAccount={transaction.fromAccount}
              toCustomer={transaction.toCustomer}
              toAccount={transaction.toAccount}
              description={transaction.description}
            />
          </div>

          {/* Status and Reference */}
          <div className="lg:col-span-2">
            <TransactionReference
              status={transaction.status}
              reference={transaction.reference}
              channel={transaction.channel}
            />
          </div>

          {/* Timestamp */}
          <div className="lg:col-span-2">
            <TransactionTimestamp timestamp={transaction.timestamp} />
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <TransactionActions
              transactionId={transaction.id}
              status={transaction.status}
              onViewDetails={onViewDetails}
              onDownloadReceipt={onDownloadReceipt}
              onApprove={onApprove}
              onReject={onReject}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
