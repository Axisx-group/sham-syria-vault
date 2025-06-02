
import React, { useState } from 'react';
import AccountsHeader from './accounts/AccountsHeader';
import AccountsSummaryCards from './accounts/AccountsSummaryCards';
import AccountsFilters from './accounts/AccountsFilters';
import AccountCard from './accounts/AccountCard';
import AccountsPagination from './accounts/AccountsPagination';

const AdminAccountsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const accounts = [
    {
      id: 'ACC001',
      iban: 'SY21 CBSY 0000 1234 5678 9012',
      customerName: 'أحمد محمد علي',
      accountType: 'حساب جاري شخصي',
      currency: 'SYP',
      balance: '2,500,000',
      status: 'نشط',
      openDate: '2023-01-15',
      lastTransaction: '2024-01-20',
      monthlyTransactions: 45,
      avgMonthlyBalance: '2,200,000'
    },
    {
      id: 'ACC002',
      iban: 'SY21 CBSY 0000 9876 5432 1098',
      customerName: 'فاطمة حسن محمود',
      accountType: 'حساب توفير تجاري',
      currency: 'USD',
      balance: '15,000',
      status: 'نشط',
      openDate: '2022-08-22',
      lastTransaction: '2024-01-19',
      monthlyTransactions: 28,
      avgMonthlyBalance: '14,500'
    },
    {
      id: 'ACC003',
      iban: 'SY21 CBSY 0000 5555 1234 5678',
      customerName: 'محمد سعد الدين',
      accountType: 'حساب جاري شخصي',
      currency: 'EUR',
      balance: '5,200',
      status: 'مجمد',
      openDate: '2023-03-10',
      lastTransaction: '2024-01-10',
      monthlyTransactions: 12,
      avgMonthlyBalance: '5,000'
    },
    {
      id: 'ACC004',
      iban: 'SY21 CBSY 0000 7777 8888 9999',
      customerName: 'نور عبد الرحمن',
      accountType: 'حساب استثماري',
      currency: 'TRY',
      balance: '89,200',
      status: 'نشط',
      openDate: '2022-11-05',
      lastTransaction: '2024-01-20',
      monthlyTransactions: 67,
      avgMonthlyBalance: '85,000'
    }
  ];

  return (
    <div className="space-y-6">
      <AccountsHeader />
      <AccountsSummaryCards />
      <AccountsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      <AccountsPagination />
    </div>
  );
};

export default AdminAccountsManagement;
