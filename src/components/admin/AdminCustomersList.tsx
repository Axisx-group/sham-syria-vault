
import React, { useState } from 'react';
import CustomersHeader from './customers/CustomersHeader';
import CustomersFilters from './customers/CustomersFilters';
import CustomerCard from './customers/CustomerCard';
import CustomersPagination from './customers/CustomersPagination';

const AdminCustomersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const customers = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed.ali@email.com',
      phone: '+963-123-456-789',
      accountType: 'شخصي',
      status: 'نشط',
      balance: '₺25,000',
      joinDate: '2023-01-15',
      location: 'دمشق، سوريا',
      accountsCount: 2,
      cardsCount: 1
    },
    {
      id: 2,
      name: 'فاطمة حسن محمود',
      email: 'fatima.hassan@email.com',
      phone: '+963-987-654-321',
      accountType: 'تجاري',
      status: 'نشط',
      balance: '₺150,000',
      joinDate: '2022-08-22',
      location: 'حلب، سوريا',
      accountsCount: 3,
      cardsCount: 2
    },
    {
      id: 3,
      name: 'محمد سعد الدين',
      email: 'mohammed.saad@email.com',
      phone: '+963-555-123-456',
      accountType: 'شخصي',
      status: 'معلق',
      balance: '₺5,500',
      joinDate: '2023-03-10',
      location: 'حمص، سوريا',
      accountsCount: 1,
      cardsCount: 0
    },
    {
      id: 4,
      name: 'نور عبد الرحمن',
      email: 'nour.abdulrahman@email.com',
      phone: '+963-444-789-123',
      accountType: 'تجاري',
      status: 'نشط',
      balance: '₺89,200',
      joinDate: '2022-11-05',
      location: 'اللاذقية، سوريا',
      accountsCount: 2,
      cardsCount: 3
    }
  ];

  return (
    <div className="space-y-6">
      <CustomersHeader />
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
