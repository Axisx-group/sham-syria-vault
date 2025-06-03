
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
      accountNumber: '1234567890',
      iban: 'SY98 0001 1234 5678 9012 3456',
      customerName: 'أحمد محمد علي',
      accountType: 'جاري',
      currency: 'SYP',
      balance: '₺125,000',
      status: 'نشط',
      openDate: '2023-01-15',
      lastActivity: '2024-01-20',
      branchCode: 'BR001'
    },
    {
      id: 'ACC002',
      accountNumber: '2345678901',
      iban: 'SY98 0001 2345 6789 0123 4567',
      customerName: 'فاطمة حسن محمود',
      accountType: 'توفير',
      currency: 'USD',
      balance: '$15,750',
      status: 'نشط',
      openDate: '2022-08-22',
      lastActivity: '2024-01-19',
      branchCode: 'BR002'
    },
    {
      id: 'ACC003',
      accountNumber: '3456789012',
      iban: 'SY98 0001 3456 7890 1234 5678',
      customerName: 'محمد سعد الدين',
      accountType: 'استثماري',
      currency: 'EUR',
      balance: '€8,200',
      status: 'مجمد',
      openDate: '2023-03-10',
      lastActivity: '2024-01-10',
      branchCode: 'BR001'
    },
    {
      id: 'ACC004',
      accountNumber: '4567890123',
      iban: 'SY98 0001 4567 8901 2345 6789',
      customerName: 'نور عبد الرحمن',
      accountType: 'جاري',
      currency: 'TRY',
      balance: '₺89,500',
      status: 'مغلق',
      openDate: '2022-11-05',
      lastActivity: '2024-01-05',
      branchCode: 'BR003'
    }
  ];

  return (
    <div className="space-y-6">
      <AccountsHeader />
      <AccountsSummaryCards />
      <AccountsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      <AccountsPagination />
    </div>
  );
};

export default AdminAccountsManagement;
