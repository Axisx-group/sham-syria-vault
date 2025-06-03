
import React from 'react';
import TransactionStatus from './TransactionStatus';

interface TransactionReferenceProps {
  status: string;
  reference: string;
  channel: string;
}

const TransactionReference = ({ status, reference, channel }: TransactionReferenceProps) => {
  return (
    <div className="space-y-2">
      <TransactionStatus status={status} />
      <p className="text-xs text-gray-500 font-mono">{reference}</p>
      <p className="text-xs text-gray-500">{channel}</p>
    </div>
  );
};

export default TransactionReference;
