
import React from 'react';
import TransactionTypeIcon from './TransactionTypeIcon';

interface TransactionAmountProps {
  type: string;
  amount: string;
  currency: string;
  fee: string;
}

const TransactionAmount = ({ type, amount, currency, fee }: TransactionAmountProps) => {
  const getCurrencySymbol = (currency: string) => {
    const symbols = { SYP: '₺', USD: '$', EUR: '€', TRY: '₺' };
    return symbols[currency as keyof typeof symbols] || currency;
  };

  return (
    <div className="flex items-center space-x-3 space-x-reverse">
      <TransactionTypeIcon type={type} />
      <div>
        <h3 className="font-semibold text-gray-900">{type}</h3>
        <p className="text-lg font-bold text-gray-900">
          {getCurrencySymbol(currency)}{amount}
        </p>
        <p className="text-xs text-gray-500">رسوم: {getCurrencySymbol(currency)}{fee}</p>
      </div>
    </div>
  );
};

export default TransactionAmount;
