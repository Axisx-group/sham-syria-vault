
import React from 'react';

interface AccountCategory {
  id: string;
  type: 'personal' | 'business';
  name: string;
  description: string;
  benefits: string[];
  minDeposit: number;
  currency: string;
  color: string;
  bgColor: string;
  popular?: boolean;
}

interface SelectedAccountSummaryProps {
  selectedAccount: AccountCategory;
  title: string;
}

const SelectedAccountSummary: React.FC<SelectedAccountSummaryProps> = ({
  selectedAccount,
  title
}) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-semibold text-blue-900 mb-2">{title}</h4>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${selectedAccount.bgColor} flex items-center justify-center`}>
          <div className={`w-6 h-6 ${selectedAccount.color}`}>💳</div>
        </div>
        <div>
          <p className="font-medium text-blue-800">{selectedAccount.name}</p>
          <p className="text-sm text-blue-600">{selectedAccount.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedAccountSummary;
