
import React from 'react';

interface TransactionDetailsProps {
  fromCustomer: string;
  fromAccount: string;
  toCustomer: string;
  toAccount: string;
  description: string;
}

const TransactionDetails = ({ 
  fromCustomer, 
  fromAccount, 
  toCustomer, 
  toAccount, 
  description 
}: TransactionDetailsProps) => {
  return (
    <div className="space-y-1">
      <div className="text-sm">
        <span className="text-gray-600">من: </span>
        <span className="font-medium">{fromCustomer}</span>
        <span className="text-gray-400 text-xs"> ({fromAccount})</span>
      </div>
      <div className="text-sm">
        <span className="text-gray-600">إلى: </span>
        <span className="font-medium">{toCustomer}</span>
        <span className="text-gray-400 text-xs"> ({toAccount})</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default TransactionDetails;
