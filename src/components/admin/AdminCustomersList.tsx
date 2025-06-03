
import React, { useState } from 'react';
import CustomersHeader from './customers/CustomersHeader';
import CustomersSummaryCards from './customers/CustomersSummaryCards';
import CustomersFilters from './customers/CustomersFilters';
import CustomerCard from './customers/CustomerCard';
import CustomersPagination from './customers/CustomersPagination';

const AdminCustomersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const customers = [
    {
      id: 1001,
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963 991 234 567',
      accountType: 'شخصي',
      status: 'نشط',
      balance: '₺125,000',
      joinDate: '2023-01-15',
      location: 'دمشق، سوريا',
      accountsCount: 2,
      cardsCount: 3
    },
    {
      id: 1002,
      name: 'فاطمة حسن محمود',
      email: 'fatima.hassan@email.com',
      phone: '+963 992 345 678',
      accountType: 'تجاري',
      status: 'نشط',
      balance: '₺875,000',
      joinDate: '2022-08-22',
      location: 'حلب، سوريا',
      accountsCount: 4,
      cardsCount: 5
    },
    {
      id: 1003,
      name: 'محمد سعد الدين',
      email: 'mohammed.saad@email.com',
      phone: '+963 993 456 789',
      accountType: 'شخصي',
      status: 'معلق',
      balance: '₺45,000',
      joinDate: '2023-03-10',
      location: 'حمص، سوريا',
      accountsCount: 1,
      cardsCount: 1
    },
    {
      id: 1004,
      name: 'نور عبد الرحمن',
      email: 'nour.abdulrahman@email.com',
      phone: '+963 994 567 890',
      accountType: 'تجاري',
      status: 'مغلق',
      balance: '₺0',
      joinDate: '2022-11-05',
      location: 'اللاذقية، سوريا',
      accountsCount: 0,
      cardsCount: 0
    }
  ];

  return (
    <div className="space-y-6">
      <CustomersHeader />
      <CustomersSummaryCards />
      <CustomersFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      
      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      <CustomersPagination />
    </div>
  );
};

export default AdminCustomersList;
